const config = window.CYBERPATH_CONFIG || {};
export const configured = false;
export const client = null;

const unavailable = () =>
  new Error("La synchronisation de compte n’est pas activée sur cette version.");

export async function getUser() {
  return null;
}
export async function signIn() {
  throw unavailable();
}
export async function signOut() {
  return null;
}
export async function upload() {
  throw unavailable();
}
export async function download() {
  throw unavailable();
}

// Kept for future account activation without changing the app API.
export const accountConfigPresent = Boolean(
  config.supabaseUrl && config.supabaseAnonKey,
);
