const phases = [
{id:"p00",n:"00",title:"Diagnostic & remise à niveau",level:"Fondations",period:"1–2 semaines",tags:["core","network"],goal:"Mesurer les acquis réels et reconstruire les trous sans perdre du temps sur ce qui est déjà maîtrisé.",concepts:["TCP/IP","DNS","routing","NAT","firewalls","virtualisation","Git","CLI"],tasks:["Expliquer le trajet complet d'une requête DNS puis HTTP","Lire une capture Wireshark et reconstruire une connexion TCP","Créer un petit lab virtualisé avec plusieurs sous-réseaux","Utiliser Git proprement : clone, branch, commit, diff, merge","Écrire un diagnostic initial : points forts, lacunes, priorités"],deliverable:"Un lab local reproductible + une matrice de compétences initiale.",resources:[["Wireshark Docs","https://www.wireshark.org/docs/"],["HTB Academy Paths","https://academy.hackthebox.com/catalogue/paths"]]},
{id:"p01",n:"01",title:"Linux — fondamentaux système",level:"Fondations",period:"3–5 semaines",tags:["core","linux","infra"],goal:"Retrouver une vraie maîtrise de Linux avant de parler d'exploitation.",concepts:["filesystem","permissions","processes","systemd","SSH","cron","sudo","logs","packages","storage"],tasks:["Naviguer et expliquer FHS, fichiers spéciaux et points de montage","Gérer users, groups, UID/GID, permissions classiques et ACL","Comprendre processus, signals, jobs, /proc et systemd","Configurer SSH, clés, sudoers et journalisation","Diagnostiquer réseau, DNS, ports et services depuis le shell","Écrire des scripts Bash simples pour automatiser l'administration"],deliverable:"Administrer et dépanner une VM Linux sans interface graphique.",resources:[["Linux man-pages","https://man7.org/linux/man-pages/"],["OverTheWire Bandit","https://overthewire.org/wargames/bandit/"]]},
{id:"p02",n:"02",title:"Windows — fondamentaux système",level:"Fondations",period:"3–5 semaines",tags:["core","windows","internal"],goal:"Comprendre Windows comme OS, pas seulement comme poste utilisateur.",concepts:["NTFS","ACL","services","registry","tokens","UAC","SMB","WinRM","RDP","Event Logs"],tasks:["Comprendre comptes locaux, groupes, SID, SAM et tokens","Maîtriser NTFS permissions, héritage, ownership et ACL","Explorer services, scheduled tasks, registry et processus","Administrer SMB, RDP, WinRM et Windows Firewall","Utiliser PowerShell pour l'inventaire et le diagnostic","Lire les journaux Windows et corréler une action à sa télémétrie"],deliverable:"Une VM Windows administrée en PowerShell avec notes de sécurité.",resources:[["Microsoft Learn Windows Server","https://learn.microsoft.com/windows-server/"],["Sysinternals","https://learn.microsoft.com/sysinternals/"]]},
{id:"p03",n:"03",title:"Réseau orienté sécurité",level:"Fondations",period:"2–4 semaines",tags:["core","network","infra"],goal:"Transformer les connaissances réseau en capacité d'énumération et de diagnostic offensif.",concepts:["ARP","ICMP","TCP/UDP","VLAN","VPN","proxy","segmentation","TLS","IPv6"],tasks:["Expliquer précisément SYN/SYN-ACK/ACK, RST et timeouts","Différencier routage, filtrage, NAT, proxy et tunnel","Analyser DNS, DHCP, ARP, ICMP et TLS dans Wireshark","Construire une segmentation de lab avec firewall et plusieurs zones","Identifier ce qu'un scan peut et ne peut pas conclure"],deliverable:"Schéma réseau + captures commentées + règles de filtrage expliquées.",resources:[["RFC Editor","https://www.rfc-editor.org/"],["Wireshark Docs","https://www.wireshark.org/docs/"]]},
{id:"p04",n:"04",title:"Scripting pour pentester",level:"Fondations",period:"4–6 semaines",tags:["core","code","automation"],goal:"Pouvoir automatiser, lire un exploit et modifier un outil sans dépendance permanente à l'IA.",concepts:["Python","Bash","PowerShell","HTTP clients","sockets","parsing","regex","JSON","Git"],tasks:["Python : fonctions, exceptions, fichiers, modules, venv et argparse","Python : requests/httpx, sockets et parsing JSON/HTML","Bash : pipes, redirections, grep/sed/awk et scripts robustes","PowerShell : objets, pipeline, remoting et scripts d'inventaire","Écrire un petit scanner/énumérateur uniquement pour le lab","Lire puis modifier un script public en expliquant chaque changement"],deliverable:"Un mini toolkit personnel documenté et versionné.",resources:[["Python Docs","https://docs.python.org/3/"],["PowerShell Docs","https://learn.microsoft.com/powershell/"]]},
{id:"p05",n:"05",title:"Méthodologie de pentest",level:"Intermédiaire",period:"2–3 semaines",tags:["core","methodology"],goal:"Remplacer la logique «outil → exploit» par une démarche scientifique et reproductible.",concepts:["scope","recon","enumeration","hypothesis","evidence","risk","ROE","notes"],tasks:["Définir scope, objectifs et Rules of Engagement d'un scénario fictif","Construire une checklist d'énumération par type de cible","Appliquer Observation → Hypothèse → Test → Résultat → Interprétation","Tenir des notes horodatées et conserver les preuves","Séparer finding, impact, cause racine et remédiation"],deliverable:"Template personnel de mission, notes, preuves et rapport.",resources:[["NIST SP 800-115","https://csrc.nist.gov/pubs/sp/800/115/final"],["OWASP WSTG","https://wstg.owasp.org/"]]},
{id:"p06",n:"06",title:"Recon & enumeration",level:"Intermédiaire",period:"3–4 semaines",tags:["core","recon","network"],goal:"Savoir transformer quelques signaux en carte d'attaque exploitable.",concepts:["Nmap","service fingerprinting","DNS","SMB","SNMP","LDAP","HTTP","TLS","metadata"],tasks:["Comprendre ce que Nmap envoie réellement pour chaque famille de scan","Énumérer services et versions puis vérifier manuellement les résultats","Cartographier DNS, virtual hosts, certificats et surfaces HTTP","Énumérer proprement SMB, SNMP, LDAP et autres services exposés","Prioriser les hypothèses sans lancer d'exploitation prématurée"],deliverable:"Rapport d'attaque surface d'une machine ou petit réseau.",resources:[["Nmap Reference Guide","https://nmap.org/book/man.html"],["OWASP WSTG Info Gathering","https://wstg.owasp.org/"]]},
{id:"p07",n:"07",title:"Fondamentaux Web",level:"Intermédiaire",period:"3–5 semaines",tags:["core","web","api"],goal:"Comprendre le Web de bout en bout avant les vulnérabilités.",concepts:["HTTP","TLS","cookies","sessions","SOP","CORS","HTML","JavaScript","REST","JSON"],tasks:["Reconstituer une requête HTTP brute et chaque en-tête important","Expliquer cookies, sessions, Same-Origin Policy et CORS","Comprendre formulaires, encodages, URL, DOM et JavaScript de base","Manipuler API REST et JSON avec curl et Python","Utiliser Burp Proxy/Repeater en comprenant chaque modification"],deliverable:"Une application de lab analysée uniquement par trafic et code client.",resources:[["MDN HTTP","https://developer.mozilla.org/docs/Web/HTTP"],["PortSwigger Academy","https://portswigger.net/web-security"]]},
{id:"p08",n:"08",title:"Web Pentesting — vulnérabilités cœur",level:"Intermédiaire",period:"8–12 semaines",tags:["web","api","core"],goal:"Maîtriser les grandes classes de vulnérabilités en comprenant source → input → validation → sink → impact.",concepts:["SQLi","XSS","IDOR","auth","path traversal","file upload","command injection","SSRF","XXE","SSTI"],tasks:["SQLi : reconnaître contexte, erreurs, blind et impact","XSS : distinguer reflected, stored, DOM et contexte d'encodage","Tester authentification, sessions, reset et contrôle d'accès","Tester path traversal, file upload et inclusion de fichiers","Tester command injection, SSRF, XXE et SSTI dans des labs dédiés","Pour chaque vulnérabilité, écrire cause racine + détection + mitigation"],deliverable:"Au moins 30 labs documentés sans copier les solutions.",resources:[["PortSwigger Academy","https://portswigger.net/web-security"],["OWASP WSTG","https://wstg.owasp.org/"]]},
{id:"p09",n:"09",title:"API Security & logique métier",level:"Avancé",period:"5–8 semaines",tags:["web","api"],goal:"Passer du test de pages au test de systèmes distribués, objets et workflows métier.",concepts:["REST","GraphQL","JWT","OAuth","BOLA","mass assignment","rate limits","race conditions"],tasks:["Cartographier une API depuis documentation, trafic et client","Tester object-level et function-level authorization","Comprendre JWT, signatures, claims et erreurs d'implémentation","Étudier OAuth/OIDC et frontières de confiance","Tester GraphQL, mass assignment, limites de débit et logique métier","Construire des scénarios d'abus multi-étapes plutôt que des payloads isolés"],deliverable:"Audit complet d'une API de lab avec diagramme de flux de confiance.",resources:[["OWASP API Security","https://owasp.org/www-project-api-security/"],["PortSwigger API Testing","https://portswigger.net/web-security/api-testing"]]},
{id:"p10",n:"10",title:"Linux Pentesting & Privilege Escalation",level:"Avancé",period:"6–9 semaines",tags:["linux","infra","internal","core"],goal:"De l'accès initial à root en comprenant exactement la faiblesse exploitée.",concepts:["sudo","SUID","capabilities","cron","PATH","credentials","NFS","containers","kernel"],tasks:["Construire une checklist d'énumération locale manuelle","Analyser sudoers, SUID/SGID, capabilities et permissions faibles","Étudier cron, PATH, services et fichiers de configuration","Chercher credentials, secrets et réutilisation de mots de passe","Comprendre NFS, Docker/containers et frontières de privilèges","Utiliser les scripts d'énumération seulement pour confirmer, pas remplacer l'analyse"],deliverable:"10 cibles Linux indépendantes + 5 writeups de PrivEsc détaillés.",resources:[["GTFOBins","https://gtfobins.github.io/"],["HTB Academy Paths","https://academy.hackthebox.com/catalogue/paths"]]},
{id:"p11",n:"11",title:"Windows Pentesting & Privilege Escalation",level:"Avancé",period:"6–9 semaines",tags:["windows","internal","core"],goal:"Comprendre les primitives Windows qui créent des chemins vers des privilèges élevés.",concepts:["services","ACL","tokens","UAC","registry","scheduled tasks","credentials","SMB","WinRM"],tasks:["Énumérer identité, groupes, privilèges, sessions et services","Analyser permissions faibles de services et chemins exécutables","Étudier ACL fichiers/registry, scheduled tasks et credentials","Comprendre access tokens, impersonation et privilèges Windows","Tester SMB/WinRM/RDP dans des labs avec plusieurs identités","Relier chaque technique à des événements et traces observables"],deliverable:"10 cibles Windows + procédures de validation et mitigation.",resources:[["Microsoft Sysinternals","https://learn.microsoft.com/sysinternals/"],["LOLBAS","https://lolbas-project.github.io/"]]},
{id:"p12",n:"12",title:"Active Directory",level:"Avancé",period:"10–14 semaines",tags:["windows","ad","internal","red","core"],goal:"Comprendre AD comme graphe d'identités, permissions et relations, puis raisonner en chemins d'attaque.",concepts:["AD DS","DNS","LDAP","Kerberos","NTLM","SID","SPN","GPO","ACL","trusts","delegation","AD CS"],tasks:["Construire un domaine de lab et expliquer chaque rôle","Comprendre Kerberos TGT/TGS, SPN, PAC et flux d'authentification","Comprendre NTLM, LDAP, SMB et résolution DNS dans le domaine","Énumérer users, groups, computers, sessions, ACL et relations","Étudier Kerberoasting, AS-REP, credential abuse et mouvements latéraux en lab","Étudier délégations, GPO, trusts, ACL et AD CS comme chemins d'attaque","Utiliser BloodHound après avoir compris les relations qu'il modélise"],deliverable:"Compromission multi-hôtes d'un domaine de lab + carte des attack paths.",resources:[["Microsoft AD DS","https://learn.microsoft.com/windows-server/identity/ad-ds/"],["MITRE ATT&CK Enterprise","https://attack.mitre.org/matrices/enterprise/"]]},
{id:"p13",n:"13",title:"Infrastructure & services réseau",level:"Avancé",period:"5–8 semaines",tags:["network","infra","internal"],goal:"Auditer les services d'entreprise comme systèmes de confiance, pas comme simples ports.",concepts:["SMB","NFS","FTP","SSH","SMTP","DNS","SNMP","databases","VPN","firewalls"],tasks:["Créer une matrice service → auth → permissions → secrets → impact","Auditer partages SMB/NFS et permissions associées","Étudier DNS, SNMP, SMTP, SSH, bases de données et VPN en lab","Analyser segmentation et chemins réseau réels","Identifier les erreurs de configuration qui permettent mouvement latéral ou exposition de secrets"],deliverable:"Audit d'un mini réseau d'entreprise segmenté.",resources:[["Nmap NSE Docs","https://nmap.org/nsedoc/"],["CIS Benchmarks","https://www.cisecurity.org/cis-benchmarks"]]},
{id:"p14",n:"14",title:"Pivoting, tunneling & movement",level:"Avancé",period:"4–6 semaines",tags:["network","internal","red","core"],goal:"Savoir atteindre et tester des réseaux non directement accessibles en gardant une représentation claire des flux.",concepts:["routing","SOCKS","SSH tunnels","port forwarding","reverse tunnels","proxychains","Chisel","Ligolo-ng"],tasks:["Dessiner les routes et interfaces avant toute action de pivot","Maîtriser local/remote/dynamic port forwarding avec SSH","Comprendre SOCKS et le rôle réel de proxychains","Utiliser Chisel ou Ligolo-ng dans un lab multi-réseaux","Prouver quel trafic passe dans quel tunnel avec capture réseau","Gérer plusieurs pivots sans perdre la topologie"],deliverable:"Lab 3 réseaux : attaquant → DMZ → interne → domaine.",resources:[["OpenSSH Manuals","https://www.openssh.com/manual.html"],["MITRE ATT&CK Proxy","https://attack.mitre.org/techniques/T1090/"]]},
{id:"p15",n:"15",title:"Attack Chains & post-exploitation",level:"Professionnel",period:"6–10 semaines",tags:["core","red","internal","web"],goal:"Combiner les compétences en scénarios réalistes multi-étapes et démontrer l'impact sans actions inutiles.",concepts:["initial access","credentials","lateral movement","privilege escalation","pivoting","impact","evidence"],tasks:["Enchaîner Web → foothold → PrivEsc dans un lab","Enchaîner credentials → service distant → nouvel hôte","Enchaîner Linux/Windows → pivot → Active Directory","Construire au moins 5 scénarios multi-étapes différents","Pour chaque chaîne, documenter préconditions, preuves, détection et mitigations","Limiter les actions à ce qui est nécessaire pour prouver l'impact"],deliverable:"5 rapports de chaînes d'attaque avec diagrammes.",resources:[["MITRE ATT&CK","https://attack.mitre.org/"],["HTB Academy Paths","https://academy.hackthebox.com/catalogue/paths"]]},
{id:"p16",n:"16",title:"Cloud, containers & modern infrastructure",level:"Avancé",period:"6–10 semaines",tags:["cloud","infra","red"],goal:"Étendre le pentest aux identités cloud, workloads, containers et orchestrateurs.",concepts:["IAM","metadata","secrets","Docker","Kubernetes","CI/CD","storage","network policy"],tasks:["Comprendre shared responsibility et IAM avant les attaques cloud","Étudier credentials temporaires, rôles, policies et secrets","Comprendre images, namespaces, capabilities et sockets Docker","Comprendre Kubernetes API, RBAC, service accounts et secrets","Auditer un pipeline CI/CD de lab et ses frontières de confiance","Relier exposition Web à identité cloud dans des scénarios contrôlés"],deliverable:"Lab cloud/container avec cartographie IAM et remédiations.",resources:[["Kubernetes Docs","https://kubernetes.io/docs/"],["OWASP Kubernetes Top Ten","https://owasp.org/www-project-kubernetes-top-ten/"]]},
{id:"p17",n:"17",title:"Exploit Development & Reverse foundations",level:"Avancé",period:"8–16 semaines",tags:["exploit","binary","red"],goal:"Comprendre ce qui se passe sous les outils : mémoire, exécution, binaires et vulnérabilités bas niveau.",concepts:["C","assembly","stack","heap","registers","ELF","PE","debuggers","ROP","mitigations"],tasks:["Reprendre C : mémoire, pointeurs, structures et compilation","Lire assembleur x86-64 de base et suivre les registres","Utiliser GDB/WinDbg pour comprendre crash et contrôle du flot","Étudier stack overflow, NX, ASLR, canaries et PIE","Comprendre ELF et PE, imports, sections et symboles","Construire des exploits uniquement sur programmes de lab conçus pour cela"],deliverable:"Série de challenges bas niveau documentés et reproductibles.",resources:[["pwn.college","https://pwn.college/"],["OpenSecurityTraining2","https://p.ost2.fyi/"]]},
{id:"p18",n:"18",title:"Détection-aware offensive & Purple Team",level:"Professionnel",period:"4–8 semaines",tags:["purple","red","defense","core"],goal:"Comprendre la trace laissée par les techniques offensives et aider l'entreprise à mieux détecter.",concepts:["telemetry","Windows events","Sysmon","EDR","Sigma","MITRE ATT&CK","network logs","detection engineering"],tasks:["Associer chaque technique étudiée à ses sources de télémétrie","Collecter Event Logs/Sysmon et observer une action en lab","Écrire quelques règles Sigma simples et les tester","Comparer réseau, endpoint et logs applicatifs pour une même attaque","Proposer détection + prévention + durcissement après chaque finding"],deliverable:"Mini exercice Purple Team : attaque contrôlée → détection → tuning.",resources:[["MITRE ATT&CK","https://attack.mitre.org/"],["SigmaHQ","https://sigmahq.io/"]]},
{id:"p19",n:"19",title:"Pentest professionnel & reporting",level:"Professionnel",period:"Continu",tags:["core","professional"],goal:"Être capable de conduire une mission de bout en bout et produire une restitution utile à l'entreprise.",concepts:["scoping","ROE","evidence","CVSS","risk","remediation","executive summary","retest"],tasks:["Préparer scope, exclusions, fenêtre de test et contacts d'urgence","Organiser notes, captures, timestamps et preuves reproductibles","Rédiger findings : contexte, preuve, impact, risque, correction","Rédiger une synthèse exécutive sans jargon inutile","Présenter oralement les chemins d'attaque et priorités de correction","Effectuer un retest et distinguer corrigé, partiel et non corrigé"],deliverable:"Mission blanche complète avec rapport exécutif + technique + restitution.",resources:[["CVSS","https://www.first.org/cvss/"],["NIST SP 800-115","https://csrc.nist.gov/pubs/sp/800/115/final"]]}
];

const tracks = [
{id:"general",icon:"[ 360° ]",name:"Pentester généraliste",desc:"Le chemin recommandé pour devenir autonome sur Web, systèmes et infrastructure avant de spécialiser.",focus:["Phases 00→15","Web + Linux + Windows","AD + pivoting","Reporting"],phaseTags:["core"]},
{id:"web",icon:"[ HTTP ]",name:"Web & API Pentester",desc:"Applications, APIs, authentification, contrôle d'accès, logique métier et exploitation côté serveur.",focus:["HTTP profond","PortSwigger / OWASP","API & GraphQL","Attack chains Web→System"],phaseTags:["web","api"]},
{id:"internal",icon:"[ AD ]",name:"Internal / Active Directory",desc:"Pentests internes d'entreprise : Windows, identité, Kerberos, ACL, AD CS et mouvement latéral.",focus:["Windows","AD DS","Attack paths","Pivoting"],phaseTags:["internal","ad","windows"]},
{id:"infra",icon:"[ /root ]",name:"Infrastructure / Linux",desc:"Serveurs, services réseau, Linux, segmentation, tunnels, erreurs de configuration et privilèges.",focus:["Linux","Services","Network","PrivEsc"],phaseTags:["linux","infra","network"]},
{id:"red",icon:"[ RED ]",name:"Red Team",desc:"Après une base pentest solide : chaînes multi-hôtes, objectifs, discrétion, identité et compréhension de la détection.",focus:["AD/Internal","Attack chains","Pivoting","Detection-aware"],phaseTags:["red","internal","purple"]},
{id:"cloud",icon:"[ ☁ ]",name:"Cloud & Containers",desc:"IAM, secrets, Docker, Kubernetes, CI/CD et frontières de confiance des architectures modernes.",focus:["IAM","Containers","Kubernetes","CI/CD"],phaseTags:["cloud","infra"]},
{id:"exploit",icon:"[ 0x ]",name:"Exploit Development",desc:"C, assembleur, mémoire, debugging, formats binaires et exploitation bas niveau sur programmes de lab.",focus:["C","Assembly","GDB/WinDbg","ROP foundations"],phaseTags:["exploit","binary"]},
{id:"purple",icon:"[ ↔ ]",name:"Purple Team",desc:"Offensif + télémétrie + détection : comprendre comment les techniques apparaissent dans les logs et EDR.",focus:["MITRE ATT&CK","Sysmon","Sigma","Detection engineering"],phaseTags:["purple","defense","red"]},
{id:"mobile",icon:"[ APP ]",name:"Mobile Security",desc:"Extension après Web : Android/iOS, stockage local, IPC, trafic API, reverse et sécurité applicative mobile.",focus:["Android/iOS","Mobile APIs","Reverse basics","OWASP MAS"],phaseTags:["web","binary"]},
{id:"wireless",icon:"[ RF ]",name:"Wireless / IoT",desc:"Spécialisation additionnelle : Wi‑Fi, protocoles radio, firmware et appareils embarqués, uniquement en environnement autorisé.",focus:["802.11","Radio basics","Firmware","Embedded Linux"],phaseTags:["network","binary","infra"]}
];

const chains = [
{name:"Web → Linux → Root",desc:"Une faiblesse applicative mène à un accès serveur, puis une mauvaise séparation de privilèges augmente l'impact.",steps:["Web surface","Initial foothold","Local enumeration","Credential/config leak","Privilege escalation","Root","Evidence"]},
{name:"Web → Internal Network",desc:"L'application exposée devient un point d'appui vers un réseau qui n'était pas directement accessible.",steps:["Web app","Server access","Network discovery","Tunnel","Internal service","New foothold","Impact"]},
{name:"Credentials → Windows → AD",desc:"Des identifiants valides peuvent être plus importants qu'un exploit si les frontières de confiance sont faibles.",steps:["Credential exposure","Remote service","Domain user","AD enumeration","Attack path","Privilege gain","Domain impact"]},
{name:"Linux → Secrets → Cloud",desc:"Un serveur ou container compromis peut contenir des identités permettant d'atteindre des ressources cloud.",steps:["Linux foothold","Secrets","Cloud identity","IAM analysis","Resource access","Privilege path","Evidence"]},
{name:"API → Authorization → Business Impact",desc:"Les attaques Web modernes peuvent reposer sur la logique métier et non sur une injection classique.",steps:["API mapping","Object IDs","Authorization gap","Workflow abuse","Cross-account impact","Proof","Fix"]},
{name:"Misconfiguration → Lateral Movement",desc:"Plusieurs faiblesses de configuration modestes peuvent former une chaîne critique.",steps:["Weak share","Credential material","Remote access","New host","Higher privileges","Pivot","Critical asset"]}
];

const resourceGroups = [
{name:"Web & API",desc:"Référence vivante et labs pratiques.",link:"https://portswigger.net/web-security",label:"PortSwigger Web Security Academy"},
{name:"Méthodologie Web",desc:"Guide de test structuré par catégories.",link:"https://wstg.owasp.org/",label:"OWASP WSTG"},
{name:"Pentest paths",desc:"Parcours modulaires systèmes, Web et job roles.",link:"https://academy.hackthebox.com/catalogue/paths",label:"Hack The Box Academy"},
{name:"Linux pratique",desc:"Wargame shell et permissions idéal pour retrouver les réflexes.",link:"https://overthewire.org/wargames/bandit/",label:"OverTheWire Bandit"},
{name:"Windows / AD",desc:"Documentation officielle des technologies d'entreprise.",link:"https://learn.microsoft.com/windows-server/identity/ad-ds/",label:"Microsoft Learn AD DS"},
{name:"Adversary behavior",desc:"Techniques, tactiques, mitigations et sources de détection.",link:"https://attack.mitre.org/",label:"MITRE ATT&CK"},
{name:"Exploit foundations",desc:"Entraînement bas niveau progressif.",link:"https://pwn.college/",label:"pwn.college"},
{name:"Hardening",desc:"Benchmarks utiles pour passer de finding à mitigation.",link:"https://www.cisecurity.org/cis-benchmarks",label:"CIS Benchmarks"},
{name:"Pentest standard",desc:"Référence pour planification, exécution et reporting.",link:"https://csrc.nist.gov/pubs/sp/800/115/final",label:"NIST SP 800-115"}
];

const stateKey="pentest-roadmap-progress-v1";
const themeKey="pentest-roadmap-theme";
let progress=JSON.parse(localStorage.getItem(stateKey)||"{}");
let activeTrack="general";

function taskId(phase,index){return phase.id+"-t"+index}
function save(){localStorage.setItem(stateKey,JSON.stringify(progress));updateProgress()}
function esc(s){return s.replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]})}

function renderPhases(){
  const q=document.getElementById("searchInput").value.trim().toLowerCase();
  const filter=document.getElementById("trackFilter").value;
  const level=document.getElementById("levelFilter").value;
  const grid=document.getElementById("roadmapGrid");
  const selectedTrack=tracks.find(function(t){return t.id===filter});
  const items=phases.filter(function(p){
    const hay=[p.title,p.goal,p.level].concat(p.tags,p.concepts,p.tasks).join(" ").toLowerCase();
    const qok=!q||hay.includes(q);
    const lok=level==="all"||p.level===level;
    const tok=filter==="all"||filter==="general"&&p.tags.includes("core")||(selectedTrack&&selectedTrack.phaseTags.some(function(t){return p.tags.includes(t)}));
    return qok&&lok&&tok;
  });
  grid.innerHTML=items.map(function(p){
    const tasks=p.tasks.map(function(t,i){
      const id=taskId(p,i);const checked=progress[id]?" checked":"";
      return '<label class="task"><input type="checkbox" data-task="'+id+'"'+checked+'><span>'+esc(t)+'</span></label>';
    }).join("");
    const res=p.resources.map(function(r){return '<a href="'+r[1]+'" target="_blank" rel="noreferrer">↗ '+esc(r[0])+'</a>'}).join("");
    return '<article class="phase" data-phase="'+p.id+'"><div class="phase-head" role="button" tabindex="0"><div class="phase-number">'+p.n+'</div><div class="phase-title"><h3>'+esc(p.title)+'</h3><p>'+esc(p.goal)+'</p></div><div class="phase-meta"><span class="tag">'+p.level+'</span><span class="tag">'+p.period+'</span></div></div><div class="phase-body"><div class="phase-columns"><div><h4>Objectifs de maîtrise</h4><div class="task-list">'+tasks+'</div><div class="deliverable"><strong>Livrable :</strong> '+esc(p.deliverable)+'</div></div><div><h4>Concepts</h4><div class="concept-list">'+p.concepts.map(function(x){return "<span>"+esc(x)+"</span>"}).join("")+'</div><h4 style="margin-top:22px">Ressources</h4><div class="resources-mini">'+res+'</div></div></div></div></article>';
  }).join("")||'<div class="phase"><div class="phase-head"><div class="phase-title"><h3>Aucun résultat</h3><p>Modifie les filtres ou la recherche.</p></div></div></div>';
  bindPhaseEvents();
}

function bindPhaseEvents(){
  document.querySelectorAll(".phase-head").forEach(function(h){
    const toggle=function(){h.parentElement.classList.toggle("open")};
    h.addEventListener("click",toggle);
    h.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle()}});
  });
  document.querySelectorAll("[data-task]").forEach(function(cb){
    cb.addEventListener("change",function(){progress[cb.dataset.task]=cb.checked;if(!cb.checked)delete progress[cb.dataset.task];save()});
  });
}

function renderTracks(){
  const grid=document.getElementById("tracksGrid");
  grid.innerHTML=tracks.map(function(t){
    return '<article class="track-card '+(t.id===activeTrack?"active":"")+'"><span class="track-icon">'+t.icon+'</span><h3>'+esc(t.name)+'</h3><p>'+esc(t.desc)+'</p><ul>'+t.focus.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul><button class="button ghost small" data-track="'+t.id+'">Afficher ce parcours</button></article>';
  }).join("");
  document.querySelectorAll("[data-track]").forEach(function(b){b.addEventListener("click",function(){
    activeTrack=b.dataset.track;
    document.getElementById("trackFilter").value=activeTrack;
    document.getElementById("activeTrackLabel").textContent=(tracks.find(function(t){return t.id===activeTrack})||{}).name||"Généraliste";
    renderTracks();renderPhases();document.getElementById("roadmap").scrollIntoView({behavior:"smooth"});
  })});
}

function renderChains(){
  document.getElementById("chainsGrid").innerHTML=chains.map(function(c){
    return '<article class="chain"><h3>'+esc(c.name)+'</h3><p>'+esc(c.desc)+'</p><div class="chain-flow">'+c.steps.map(function(s,i){return (i?'<i>→</i>':'')+'<span>'+esc(s)+'</span>'}).join("")+'</div></article>';
  }).join("");
}

function renderResources(){
  document.getElementById("resourcesGrid").innerHTML=resourceGroups.map(function(r){
    return '<article class="resource-card"><h3>'+esc(r.name)+'</h3><p>'+esc(r.desc)+'</p><a href="'+r.link+'" target="_blank" rel="noreferrer">↗ '+esc(r.label)+'</a></article>';
  }).join("");
}

function updateProgress(){
  const phaseTaskIds=[];phases.forEach(function(p){p.tasks.forEach(function(_,i){phaseTaskIds.push(taskId(p,i))})});
  document.querySelectorAll("[data-global-task]").forEach(function(cb){const id=cb.dataset.globalTask;cb.checked=!!progress[id]});
  const globals=Array.from(document.querySelectorAll("[data-global-task]")).map(function(x){return x.dataset.globalTask});
  const all=phaseTaskIds.concat(globals);
  const done=all.filter(function(id){return !!progress[id]}).length;
  const pct=all.length?Math.round(done/all.length*100):0;
  document.getElementById("overallProgress").textContent=pct+"%";
  document.getElementById("completedTasks").textContent=done;
  document.getElementById("totalTasks").textContent=all.length;
  document.getElementById("progressBar").style.width=pct+"%";
}

function initFilters(){
  const select=document.getElementById("trackFilter");
  tracks.forEach(function(t){const o=document.createElement("option");o.value=t.id;o.textContent=t.name;select.appendChild(o)});
  ["searchInput","trackFilter","levelFilter"].forEach(function(id){
    const el=document.getElementById(id);el.addEventListener(id==="searchInput"?"input":"change",renderPhases);
  });
}

document.getElementById("resetProgress").addEventListener("click",function(){
  if(confirm("Réinitialiser toutes les cases cochées sur cet appareil ?")){progress={};save();renderPhases()}
});
document.querySelectorAll("[data-global-task]").forEach(function(cb){cb.addEventListener("change",function(){const id=cb.dataset.globalTask;progress[id]=cb.checked;if(!cb.checked)delete progress[id];save()})});

const root=document.documentElement;
if(localStorage.getItem(themeKey)==="light")root.classList.add("light");
document.getElementById("themeToggle").addEventListener("click",function(){root.classList.toggle("light");localStorage.setItem(themeKey,root.classList.contains("light")?"light":"dark")});

initFilters();renderPhases();renderTracks();renderChains();renderResources();updateProgress();
