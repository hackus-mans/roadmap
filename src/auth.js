import { createClient } from "@supabase/supabase-js";
const config = window.CYBERPATH_CONFIG || {};
export const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey);
export const client = configured
  ? createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        flowType: "pkce",
        detectSessionInUrl: true,
        persistSession: true,
      },
    })
  : null;
export async function getUser() {
  if (!client) return null;
  const { data, error } = await client.auth.getUser();
  if (error) return null;
  return data.user;
}
export async function signIn(email) {
  const { error } = await client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: new URL("./index.html", location.href).href },
  });
  if (error) throw error;
}
export async function signOut() {
  const { error } = await client.auth.signOut();
  if (error) throw error;
}
export async function upload(state) {
  const user = await getUser();
  if (!user) throw new Error("Reconnecte-toi pour sauvegarder.");
  const { error } = await client
    .from("learning_progress")
    .upsert(
      { user_id: user.id, state, updated_at: new Date().toISOString() },
      { onConflict: "user_id" },
    );
  if (error) throw error;
}
export async function download() {
  const user = await getUser();
  if (!user) throw new Error("Reconnecte-toi pour restaurer.");
  const { data, error } = await client
    .from("learning_progress")
    .select("state")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Aucune sauvegarde en ligne pour ce compte.");
  return data.state;
}
