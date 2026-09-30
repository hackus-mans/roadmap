const M=(n,title,type,duration,summary,learn,practice,exit,resources,prereqs,criteria)=>({
  n,title,type,duration,summary,learn,practice,exit,resources,prereqs,criteria
});

export const stages=[
{
  id:"foundations",label:"PHASE 1",title:"Reconstruction technique",desc:"Reprendre les fondamentaux jusqu’à pouvoir les expliquer, les administrer et les dépanner sans dépendance.",
  modules:[
    M("01","Diagnostic technique & laboratoire","CORE","1–2 semaines","Mesurer ton niveau réel et construire un laboratoire fiable avant toute progression.",
      ["Virtualisation, snapshots et réseaux de lab","Méthode de diagnostic : symptôme → hypothèse → test → correction","Architecture d’un poste d’attaque et d’une cible","Hygiène opérationnelle : notes, sauvegardes et séparation des environnements"],
      ["Construire un lab Linux + Windows + réseau isolé","Documenter une panne volontaire et sa résolution","Créer une matrice initiale de compétences"],
      "Tu peux reconstruire ton lab, expliquer son réseau et diagnostiquer une panne sans tutoriel.",
      [["HTB Information Security Foundations","https://academy.hackthebox.com/catalogue/paths"],["VirtualBox Manual","https://www.virtualbox.org/manual/"]],[],
      ["Je peux dessiner mon lab et ses flux","Je peux restaurer proprement une VM cassée","Je peux expliquer mon diagnostic sans réciter une solution"]),

    M("02","Linux administration — reset complet","CORE","3–5 semaines","Retrouver une maîtrise Linux suffisamment profonde pour comprendre ensuite l’élévation de privilèges.",
      ["Filesystem, /proc, /sys, mounts et FHS","Users, groups, UID/GID, permissions, ACL, sudo","Processes, signals, jobs, systemd, cron et logs","SSH, package management, storage et networking"],
      ["Administrer une VM uniquement en CLI","Créer services, utilisateurs, tâches planifiées et règles de permissions","Dépanner volontairement DNS, SSH, stockage et systemd"],
      "Tu peux administrer, diagnostiquer et sécuriser une VM Linux sans interface graphique.",
      [["Linux man-pages","https://man7.org/linux/man-pages/"],["OverTheWire Bandit","https://overthewire.org/wargames/bandit/"]],["01"],
      ["Je comprends les permissions effectives Linux","Je diagnostique un service depuis logs/processus","Je peux expliquer sudo, SUID et capabilities avant de les auditer"]),

    M("03","Windows administration & internals","CORE","3–5 semaines","Reprendre Windows depuis l’administration jusqu’aux mécanismes d’identité et de sécurité.",
      ["Users, groups, SID, SAM et access tokens","NTFS, ACL, ownership et héritage","Services, Registry, scheduled tasks, UAC","SMB, RDP, WinRM, PowerShell et Event Logs"],
      ["Administrer une VM en PowerShell","Comparer NTFS et Share permissions dans un lab","Retrouver les événements produits par plusieurs actions d’administration"],
      "Tu peux expliquer identité, permissions, services et accès distant Windows avec leurs traces.",
      [["Microsoft Learn Windows Server","https://learn.microsoft.com/windows-server/"],["Sysinternals","https://learn.microsoft.com/sysinternals/"]],["01"],
      ["Je sais calculer des droits effectifs Windows","Je sais relier processus, service et compte d’exécution","Je peux retrouver une action dans les Event Logs"]),

    M("04","Réseau — maîtrise orientée sécurité","CORE","3–5 semaines","Transformer tes connaissances réseau en capacité de raisonnement offensif et défensif.",
      ["Ethernet, ARP, IPv4/IPv6, ICMP, TCP/UDP","DNS, DHCP, NAT, routing, VLAN et VPN","Firewalls, proxies, load balancers et segmentation","TLS, certificats, ports, sockets et états de connexion"],
      ["Expliquer plusieurs captures Wireshark paquet par paquet","Construire trois zones réseau et justifier les flux autorisés","Diagnostiquer refus, timeout, erreur DNS et erreur TLS"],
      "À partir d’un flux, tu peux expliquer chaque couche et localiser précisément la panne ou le contrôle.",
      [["Wireshark Documentation","https://www.wireshark.org/docs/"],["RFC Editor","https://www.rfc-editor.org/"]],["01"],
      ["Je sais dessiner un chemin réseau aller/retour","Je distingue routage, NAT, proxy et tunnel","Je peux expliquer ce qu’un scan réseau prouve réellement"]),

    M("05","Web, HTTP & navigateur","CORE","3–4 semaines","Comprendre le Web avant d’étudier ses vulnérabilités.",
      ["HTTP/1.1, HTTP/2, méthodes, headers et status codes","Cookies, sessions, caching et content types","DNS, TLS, Same-Origin Policy et CORS","HTML, DOM, JavaScript, formulaires, encodages et URL"],
      ["Rejouer des requêtes avec curl et Burp Repeater","Tracer navigateur → reverse proxy → application → base","Expliquer une session authentifiée complète"],
      "Tu peux lire une requête HTTP brute et expliquer où sont prises authentification et autorisation.",
      [["MDN HTTP","https://developer.mozilla.org/docs/Web/HTTP"],["PortSwigger Web Security Academy","https://portswigger.net/web-security"]],["04"],
      ["Je comprends cookies et sessions","Je distingue contrôle client et contrôle serveur","Je peux expliquer SOP/CORS sans mémorisation"]),

    M("06","FORGE — Python, Bash & PowerShell","CORE","6–10 semaines","Construire l’autonomie de programmation nécessaire au pentest et à l’automatisation.",
      ["Python : types, fonctions, exceptions, fichiers, modules, venv, OOP utile","Bash : pipes, redirections, tests, fonctions, sed/awk/grep","PowerShell : objets, pipeline, remoting et fichiers","HTTP clients, sockets, parsing, regex, JSON et CLI"],
      ["Coder chaque semaine sans copier une solution","Écrire un outil d’inventaire multi-plateforme de lab","Lire puis modifier un script de sécurité en expliquant chaque changement"],
      "Tu peux concevoir, déboguer et documenter un outil utile sans dépendre d’une IA pour chaque ligne.",
      [["Python Documentation","https://docs.python.org/3/"],["PowerShell Documentation","https://learn.microsoft.com/powershell/"]],["02","04"],
      ["Je peux coder une solution à partir d’un problème","Je comprends les erreurs au lieu de copier un correctif","Je peux expliquer entrées, sorties, états et limites de mon programme"]),

    M("07","Git, notes & système de connaissances","CORE","2–3 semaines","Mettre en place une discipline qui transforme chaque lab en connaissance réutilisable.",
      ["Git : commits, branches, diffs, merges et historique","Structure de notes : concept, technique, preuve, erreur, correction","Writeups reproductibles et séparation données sensibles/publicables","Méthode Obsidian : index, liens, checklists et consolidation"],
      ["Créer un dépôt de notes techniques structuré","Transformer trois labs en fiches réutilisables","Écrire une procédure qu’un autre étudiant peut reproduire"],
      "Une nouvelle technique apprise devient une note exploitable, une checklist et une preuve.",
      [["Git Documentation","https://git-scm.com/doc"],["OWASP WSTG","https://wstg.owasp.org/"]],["01"],
      ["Mes notes permettent de reproduire le raisonnement","Je distingue observation, hypothèse et conclusion","Je peux retrouver rapidement une méthode déjà apprise"]),

    M("08","Crypto, encodages & représentation des données","CORE","3–5 semaines","Maîtriser les transformations fréquemment rencontrées en CTF, Web et systèmes.",
      ["ASCII, bytes, hex, Base64, URL encoding et Unicode","Hash, MAC, chiffrement symétrique/asymétrique","RSA, modular arithmetic et signatures à niveau fondamental","Entropy, randomness, key derivation et erreurs classiques"],
      ["Écrire des conversions en Python sans CyberChef","Résoudre des exercices CryptoHack fondamentaux","Expliquer pourquoi encodage, hash et chiffrement ne sont pas interchangeables"],
      "Tu peux passer entre représentations et raisonner sur un schéma cryptographique de base.",
      [["CryptoHack","https://cryptohack.org/"],["Python hashlib","https://docs.python.org/3/library/hashlib.html"]],["06"],
      ["Je manipule bytes/hex/Base64 sans confusion","Je distingue hash, MAC et chiffrement","Je peux expliquer RSA à partir des opérations mathématiques essentielles"])
  ]
},
{
  id:"core",label:"PHASE 2",title:"Pentest operator",desc:"Construire la méthodologie et l’autonomie nécessaires pour compromettre et documenter une cible de laboratoire.",
  modules:[
    M("09","Méthodologie, scope & règles d’engagement","CORE","2–3 semaines","Apprendre le métier de pentester avant les techniques.",
      ["Pre-engagement, scope, exclusions et critères d’arrêt","Reconnaissance, enumeration, validation et exploitation","Evidence handling, notes, impact et remediation","Différence entre CTF, lab, pentest, red team et bug bounty"],
      ["Rédiger un scope fictif complet","Construire une checklist d’engagement","Produire un finding avec preuve et correction"],
      "Chaque action de test a une justification, une limite et une preuve attendue.",
      [["HTB Penetration Testing Process","https://academy.hackthebox.com/course/preview/penetration-testing-process"],["NIST SP 800-115","https://csrc.nist.gov/pubs/sp/800/115/final"]],["02","03","04","07"],
      ["Je peux définir les limites d’un test","Je sais quand arrêter une hypothèse","Je peux produire un finding exploitable"]),

    M("10","Reconnaissance, Nmap & attack surface","CORE","3–5 semaines","Savoir découvrir une cible sans transformer Nmap en boîte noire.",
      ["Host discovery, TCP/UDP scan concepts et service detection","DNS, certificates, virtual hosts et metadata","OSINT technique et différence actif/passif","Matrice hôte → port → service → hypothèse"],
      ["Comparer plusieurs scans et expliquer leurs différences","Vérifier manuellement les résultats importants","Produire une attack surface map priorisée"],
      "Tu peux passer d’une IP inconnue à une carte de services et hypothèses justifiées.",
      [["Nmap Reference Guide","https://nmap.org/book/man.html"],["HTB Penetration Tester Path","https://academy.hackthebox.com/path/preview/penetration-tester"]],["09","04"],
      ["Je comprends ce que Nmap envoie","Je vérifie les fingerprints critiques","Je priorise sans lancer immédiatement une CVE"]),

    M("11","Footprinting & enumeration des services","CORE","4–6 semaines","Apprendre à interroger les services d’entreprise avant toute exploitation.",
      ["SMB, NFS, FTP, SSH, SMTP et DNS","SNMP, LDAP, RPC, WinRM et RDP","MySQL, MSSQL, PostgreSQL et services Web","Anonymous access, information disclosure et permissions"],
      ["Créer une checklist par protocole","Documenter service → auth → données → permissions","Résoudre plusieurs labs de footprinting sans walkthrough"],
      "Devant un port ouvert, tu sais quelles questions poser au protocole et pourquoi.",
      [["HTB Penetration Tester Path","https://academy.hackthebox.com/path/preview/penetration-tester"],["Nmap NSE","https://nmap.org/nsedoc/"]],["10"],
      ["Je sais énumérer sans brute-force aveugle","Je distingue bannière et preuve réelle","Je sais quelles données peuvent devenir un pivot"]),

    M("12","Vulnerability assessment & CVE triage","CORE","3–4 semaines","Évaluer une vulnérabilité sans confondre scanner, exploitabilité et impact.",
      ["CVE, CWE, CVSS et vendor advisories","Version matching et backports","Scanner findings, false positives et manual validation","Exploit prerequisites, reliability et blast radius"],
      ["Trier dix findings de scanner","Valider manuellement des versions et configurations","Écrire une justification de risque sans exagération"],
      "Tu peux décider si un finding mérite un test manuel et expliquer le risque avec ses incertitudes.",
      [["NVD","https://nvd.nist.gov/"],["FIRST CVSS","https://www.first.org/cvss/"]],["10","11"],
      ["Je ne confonds pas version et vulnérabilité","Je recherche la source éditeur","Je distingue sévérité technique et impact réel"]),

    M("13","Credential security & password auditing","CORE","3–5 semaines","Comprendre comment mots de passe, hashes et secrets influencent une chaîne d’attaque.",
      ["Credential lifecycle, reuse et secrets en configuration","Hash formats, salts et cracking concepts","Password spraying et lockout policy à niveau méthodologique","Credential hygiene, vaults et rotation"],
      ["Auditer un jeu de hashes de lab","Analyser une politique de mots de passe","Documenter comment un secret exposé devrait être corrigé"],
      "Tu peux auditer des identifiants de laboratoire en respectant limites, lockout et preuve minimale.",
      [["Hashcat Wiki","https://hashcat.net/wiki/"],["OWASP Authentication Cheat Sheet","https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"]],["06","11"],
      ["Je reconnais les principaux formats de hash","Je comprends coût, sel et espace de recherche","Je sais éviter un test destructif sur l’authentification"]),

    M("14","Sessions, shells & transferts — mécanismes","CORE","3–4 semaines","Comprendre les canaux d’exécution et de transport avant les outils.",
      ["stdin/stdout/stderr, TTY et pseudo-terminal","Bind/reverse connection concepts","HTTP, SMB, SSH et autres mécanismes de transfert","Process context, network context et session stability"],
      ["Observer les sockets d’un lab pendant une session","Comparer plusieurs méthodes de transfert autorisées","Documenter utilisateur, processus parent et flux réseau"],
      "Tu peux expliquer techniquement comment une session distante fonctionne et quelles traces elle laisse.",
      [["Linux proc","https://man7.org/linux/man-pages/man5/proc.5.html"],["Microsoft TCP/IP","https://learn.microsoft.com/windows-server/networking/"]],["06","11","13"],
      ["Je comprends le sens des connexions","Je sais identifier le contexte d’un processus","Je relie session, socket et journalisation"]),

    M("15","Linux local enumeration & privilege escalation","CORE","6–9 semaines","Transformer l’administration Linux en méthodologie d’élévation de privilèges.",
      ["sudo, SUID/SGID, capabilities et permissions","cron, PATH, services, environment et writable resources","Credentials, SSH keys, NFS, containers et groups","Kernel exposure et distinction misconfiguration/vulnerability"],
      ["10 labs Linux PrivEsc documentés","Toujours effectuer une enumeration manuelle avant un script","Pour chaque élévation, proposer la correction et son test"],
      "Sur une machine de lab, tu peux passer d’un utilisateur faible à root et expliquer la frontière cassée.",
      [["GTFOBins","https://gtfobins.github.io/"],["HTB Penetration Tester Path","https://academy.hackthebox.com/path/preview/penetration-tester"]],["02","11","14"],
      ["Je trouve plusieurs hypothèses sans linPEAS","Je peux expliquer la permission fautive","Je sais valider la mitigation après correction"]),

    M("16","Windows local enumeration & privilege escalation","CORE","6–9 semaines","Maîtriser les primitives Windows qui créent des chemins vers des privilèges élevés.",
      ["Services, scheduled tasks, Registry et filesystem ACL","Tokens, privileges, impersonation concepts et UAC","Credential material, sessions et remote management","Event Logs, Sysmon concepts et traces des actions"],
      ["10 labs Windows PrivEsc documentés","Comparer enumeration manuelle et outils d’aide","Pour chaque finding, écrire cause, impact et mitigation"],
      "Sur un Windows de lab, tu peux expliquer et démontrer un chemin de privilèges sans boîte noire.",
      [["Sysinternals","https://learn.microsoft.com/sysinternals/"],["LOLBAS","https://lolbas-project.github.io/"]],["03","11","14"],
      ["Je comprends les droits effectifs du service","Je sais raisonner sur tokens et privilèges","Je sais relier la technique aux logs Windows"]),

    M("17","Single-host pentest & reporting","CORE","4–6 semaines","Assembler reconnaissance, enumeration, accès, PrivEsc et reporting sur une cible complète.",
      ["Priorisation des hypothèses","Evidence minimal et reproductible","Impact technique vs impact métier","Rapport technique, executive summary et retest"],
      ["Réaliser 10 machines sans walkthrough","Écrire au moins 5 rapports complets","Faire un retest après avoir corrigé une VM de lab"],
      "Tu peux conduire seul un pentest mono-cible du scope à la restitution.",
      [["HTB Penetration Tester Path","https://academy.hackthebox.com/path/preview/penetration-tester"],["NIST SP 800-115","https://csrc.nist.gov/pubs/sp/800/115/final"]],["09","10","11","12","13","15","16"],
      ["Je peux expliquer toute la chronologie","Mes preuves permettent de reproduire","Mon rapport donne une correction vérifiable"])
  ]
},
{
  id:"web",label:"PHASE 3",title:"Web & API exploitation",desc:"Passer des fondamentaux HTTP aux vulnérabilités avancées, à la logique métier et au whitebox.",
  modules:[
    M("18","Burp Suite & méthodologie Web","CORE","3–4 semaines","Faire de Burp un microscope, pas un bouton magique.",
      ["Proxy, Repeater, Decoder, Comparer et Intruder concepts","Content discovery, parameters, endpoints et state","Mapping authentication/authorization flows","Recon côté client et serveur"],
      ["Cartographier trois applications de lab","Reconstruire un workflow complet dans Repeater","Résoudre des mystery labs sans connaître la classe de faille"],
      "Tu peux cartographier une application inconnue et construire une stratégie de test.",
      [["PortSwigger Web Security Academy","https://portswigger.net/web-security"],["OWASP WSTG","https://wstg.owasp.org/"]],["05","09","10"],
      ["Je cartographie avant de tester","Je peux reconstruire un workflow sans navigateur","Je sais formuler une hypothèse applicative"]),

    M("19","SQLi, NoSQL & injection de données","CORE","5–8 semaines","Comprendre comment données et interpréteurs se mélangent.",
      ["SQL contexts, UNION, blind et error-based concepts","NoSQL injection concepts","Query construction et parameterization","Root cause : données interprétées comme syntaxe"],
      ["Résoudre les labs PortSwigger du niveau adapté","Écrire une mini-app vulnérable puis la corriger","Comparer payload, sink et requête générée"],
      "Tu peux reconnaître le contexte d’une injection, expliquer l’impact et la correction côté code.",
      [["PortSwigger SQL Injection","https://portswigger.net/web-security/sql-injection"],["OWASP Injection Prevention","https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html"]],["18"],
      ["Je comprends le contexte avant le payload","Je distingue blind et visible","Je peux expliquer la requête paramétrée qui corrige la cause"]),

    M("20","Authentication, sessions & access control","CORE","5–8 semaines","Apprendre à casser la logique d’identité plutôt que seulement les entrées.",
      ["Authentication flows, MFA, reset et account recovery","Sessions, fixation, expiration et rotation","IDOR/BOLA, horizontal/vertical authorization","Business rules, role matrices et object ownership"],
      ["Construire une matrice rôles × actions","Résoudre labs auth/access control","Écrire tests de non-régression pour chaque correction"],
      "Tu peux prouver une faiblesse d’autorisation et décrire précisément la règle serveur manquante.",
      [["PortSwigger Access Control","https://portswigger.net/web-security/access-control"],["OWASP Authorization Cheat Sheet","https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"]],["18"],
      ["Je distingue authN et authZ","Je raisonne par objet et action","Je peux proposer un test de non-régression"]),

    M("21","XSS, DOM, CSRF & browser security","CORE","5–8 semaines","Maîtriser les vulnérabilités côté navigateur et leurs contextes.",
      ["Reflected, stored et DOM XSS","HTML/JS/URL contexts et encodings","CSRF tokens, SameSite et origin validation","CORS, clickjacking, postMessage et DOM trust boundaries"],
      ["Résoudre progressivement les labs client-side","Expliquer source → transformation → sink","Corriger une mini-app avec output encoding et politiques adaptées"],
      "Tu peux analyser un contexte client-side et expliquer pourquoi une défense fonctionne ou échoue.",
      [["PortSwigger XSS","https://portswigger.net/web-security/cross-site-scripting"],["MDN Web Security","https://developer.mozilla.org/docs/Web/Security"]],["18"],
      ["Je reconnais le contexte d’exécution","Je comprends SameSite/SOP/CORS","Je peux distinguer source, sink et encodage"]),

    M("22","Path traversal, file upload, command injection & SSTI","CORE","5–8 semaines","Étudier les frontières entre application, filesystem et système.",
      ["Path normalization et traversal","Upload validation, content type et storage boundaries","OS command injection concepts","Template engines, SSTI et sandbox assumptions"],
      ["Résoudre des labs dédiés","Construire et corriger un upload sécurisé de lab","Tracer input → filesystem/process/template"],
      "Tu peux expliquer comment une entrée applicative atteint une ressource système et comment couper la chaîne.",
      [["PortSwigger Path Traversal","https://portswigger.net/web-security/file-path-traversal"],["PortSwigger SSTI","https://portswigger.net/web-security/server-side-template-injection"]],["18","20"],
      ["Je distingue validation de nom et de contenu","Je comprends la frontière application/OS","Je propose une correction côté architecture et code"]),

    M("23","SSRF, XXE & deserialization","CORE","5–8 semaines","Comprendre les vulnérabilités où le serveur devient lui-même un acteur de l’attaque.",
      ["SSRF trust boundaries, allowlists et metadata services","XML parsers et entity resolution","Serialization formats et dangerous object construction","Network reachability vs application authorization"],
      ["Résoudre des labs SSRF/XXE/deserialization","Dessiner les flux serveur → ressource interne","Comparer plusieurs mitigations et leurs limites"],
      "Tu peux identifier la frontière de confiance réellement contournée, pas seulement reproduire un payload.",
      [["PortSwigger SSRF","https://portswigger.net/web-security/ssrf"],["PortSwigger Deserialization","https://portswigger.net/web-security/deserialization"]],["18","22"],
      ["Je sais ce que le serveur peut atteindre","Je comprends le parseur impliqué","Je peux expliquer pourquoi une allowlist seule peut être insuffisante"]),

    M("24","API, GraphQL, JWT & OAuth/OIDC","CORE","6–9 semaines","Auditer les identités et objets d’architectures API modernes.",
      ["REST resources, object IDs et versioning","GraphQL schema, resolvers et introspection","JWT structure, claims, signatures et validation","OAuth/OIDC actors, redirects, scopes et trust boundaries"],
      ["Cartographier une API inconnue","Auditer rôles, objets et fonctions","Dessiner puis tester un flow OAuth de lab"],
      "Tu peux auditer une API par modèle d’autorisation, pas uniquement par endpoints.",
      [["OWASP API Security","https://owasp.org/www-project-api-security/"],["PortSwigger API Testing","https://portswigger.net/web-security/api-testing"]],["18","20","21"],
      ["Je raisonne par ressource et rôle","Je peux expliquer validation JWT","Je comprends qui fait confiance à qui dans OAuth/OIDC"]),

    M("25","HTTP request smuggling, cache, Host & race conditions","CORE","6–10 semaines","Approfondir les classes où plusieurs composants interprètent différemment une requête.",
      ["HTTP desync/request smuggling concepts","Cache poisoning/deception et cache keys","Host header trust","Race conditions et state transitions"],
      ["Étudier les learning paths PortSwigger avancés","Dessiner frontend/backend/cache comme composants distincts","Documenter préconditions et mitigations"],
      "Tu peux raisonner sur les divergences d’interprétation entre composants HTTP.",
      [["PortSwigger Request Smuggling","https://portswigger.net/web-security/request-smuggling"],["PortSwigger Race Conditions","https://portswigger.net/web-security/race-conditions"]],["18","19","21","24"],
      ["Je modélise chaque composant HTTP séparément","Je distingue cache key et réponse","Je peux expliquer une race par transitions d’état"]),

    M("26","Whitebox pentesting & secure code review","CORE","6–10 semaines","Passer de la boîte noire à la lecture de code, au debugging et à la correction.",
      ["Data flow, taint, sources et sinks","Authentication/authorization code review","Framework routing, ORM, templating et serialization","PoC minimal, patching et tests de non-régression"],
      ["Auditer une petite application Python/Node/PHP","Tracer une vulnérabilité du contrôleur au sink","Proposer un patch et vérifier qu’il ne casse pas le comportement attendu"],
      "Tu peux trouver une faiblesse en lisant le code et démontrer le correctif avec un test.",
      [["HTB Intro to Whitebox Pentesting","https://academy.hackthebox.com/course/preview/intro-to-whitebox-pentesting"],["PortSwigger Essential Skills","https://portswigger.net/web-security/essential-skills"]],["06","18","19","20","22","24"],
      ["Je peux suivre un flux de données dans le code","Je produis un PoC minimal","Je valide le patch par un test de régression"])
  ]
},
{
  id:"enterprise",label:"PHASE 4",title:"Enterprise & Active Directory",desc:"Apprendre à lire une entreprise comme un graphe d’identités, services, permissions, réseaux et chemins de confiance.",
  modules:[
    M("27","Active Directory fundamentals","CORE","4–6 semaines","Comprendre l’architecture AD avant toute technique offensive.",
      ["Forest, domain, OU, DC, DNS et Global Catalog","Users, groups, computers, SID et group nesting","LDAP, GPO, ACL/DACL et inheritance","Trusts, replication et service accounts"],
      ["Construire ton propre domaine de lab","Créer utilisateurs, groupes, OU et GPO","Dessiner les principales relations de confiance"],
      "Tu peux expliquer comment une identité AD obtient réellement ses permissions.",
      [["Microsoft Learn AD DS","https://learn.microsoft.com/windows-server/identity/ad-ds/"],["HTB AD Pentester Path","https://academy.hackthebox.com/path/preview/active-directory-penetration-tester"]],["03","04","09","17"],
      ["Je sais expliquer domain/forest/DC","Je comprends groupes imbriqués et ACL","Je peux administrer un petit domaine avant de l’auditer"]),

    M("28","Kerberos, NTLM & Windows authentication","CORE","5–7 semaines","Comprendre les protocoles d’authentification qui structurent les environnements Windows.",
      ["Kerberos : KDC, TGT, TGS, SPN, PAC","NTLM challenge-response concepts","Credential material et ticket lifecycle","Fallback, name resolution et protocol selection"],
      ["Tracer un login Kerberos dans un lab","Comparer Kerberos et NTLM sur plusieurs services","Corréler authentification et Event Logs"],
      "Tu peux dessiner Kerberos de mémoire et expliquer pourquoi un service utilise un ticket donné.",
      [["Microsoft Kerberos","https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview"],["MITRE ATT&CK","https://attack.mitre.org/"]],["27","13"],
      ["Je peux expliquer TGT vs TGS","Je comprends quand NTLM apparaît","Je relie identité, SPN et service"]),

    M("29","AD enumeration & BloodHound reasoning","CORE","4–6 semaines","Cartographier les relations sans laisser l’outil remplacer la compréhension.",
      ["LDAP enumeration, sessions, groups et computers","ACL relationships et rights semantics","BloodHound graph concepts","Attack path prioritization"],
      ["Énumérer d’abord manuellement un domaine de lab","Comparer tes résultats avec BloodHound","Expliquer chaque arête importante du graphe"],
      "Tu peux défendre pourquoi un chemin existe sans répondre « parce que BloodHound le dit ».",
      [["BloodHound Docs","https://bloodhound.specterops.io/"],["Microsoft AD DS","https://learn.microsoft.com/windows-server/identity/ad-ds/"]],["27","28","10"],
      ["Je comprends les relations du graphe","Je peux vérifier une relation manuellement","Je priorise les chemins par préconditions et impact"]),

    M("30","AD attack paths — Kerberos, ACL, delegation & trusts","CORE","8–12 semaines","Étudier les classes de chemins d’attaque AD dans des labs explicitement autorisés.",
      ["Kerberoasting et AS-REP concepts","ACL abuse et excessive delegation","Constrained/unconstrained/resource-based delegation concepts","Domain trusts et transitive risk"],
      ["Résoudre plusieurs labs AD dédiés","Pour chaque technique, expliquer la misconfiguration","Associer la technique à détection et hardening"],
      "Tu peux analyser une chaîne AD multi-étapes et expliquer chaque primitive d’identité.",
      [["HTB AD Pentester Path","https://academy.hackthebox.com/path/preview/active-directory-penetration-tester"],["MITRE ATT&CK Enterprise","https://attack.mitre.org/matrices/enterprise/"]],["28","29","13"],
      ["Je comprends la primitive avant l’outil","Je distingue permission, credential et ticket","Je peux proposer une rupture de chaîne"]),

    M("31","AD CS & enterprise services","CORE","5–8 semaines","Comprendre comment certificats et services adjacents élargissent la surface AD.",
      ["PKI, CA, certificate templates et enrollment","AD CS trust model et misconfiguration concepts","MSSQL, WSUS, Exchange et service identities","Certificate-based authentication et lifecycle"],
      ["Construire une petite PKI de lab","Auditer templates et permissions","Tracer un certificat de l’enrollment à l’authentification"],
      "Tu peux expliquer comment une mauvaise politique de certificat devient un risque d’identité.",
      [["Microsoft AD CS","https://learn.microsoft.com/windows-server/identity/ad-cs/"],["HTB AD Pentester Path","https://academy.hackthebox.com/path/preview/active-directory-penetration-tester"]],["29","30"],
      ["Je comprends CA/template/enrollment","Je sais lire permissions d’un template","Je peux expliquer le chemin identité → certificat → accès"]),

    M("32","Lateral movement & remote administration","CORE","5–7 semaines","Comprendre les mouvements entre hôtes comme réutilisation de confiance et de protocoles.",
      ["SMB, WinRM, RDP, WMI et PowerShell Remoting","SSH and service-based remote administration","Identity context, sessions and credential boundaries","Telemetry and administrative baselines"],
      ["Comparer plusieurs mécanismes d’administration dans ton lab","Documenter identité, protocole, port et logs","Créer des contrôles limitant l’administration latérale"],
      "Tu peux expliquer pourquoi un compte peut atteindre un hôte et comment réduire ce chemin.",
      [["Microsoft Remote Management","https://learn.microsoft.com/windows/win32/winrm/portal"],["MITRE Remote Services","https://attack.mitre.org/techniques/T1021/"]],["15","16","29"],
      ["Je distingue mouvement latéral et élévation","Je comprends les prérequis de chaque protocole","Je peux proposer segmentation et tiering"]),

    M("33","Pivoting, tunneling & routing","CORE","5–7 semaines","Maîtriser la topologie avant les outils de tunnel.",
      ["Routing tables, interfaces et reachability","Local/remote/dynamic forwarding concepts","SOCKS, application proxying et reverse tunnels","Multi-hop topology et observability"],
      ["Construire attaquant → DMZ → interne dans ton lab","Prouver le chemin réseau avec captures","Documenter routes avant et après le pivot"],
      "Tu peux construire et expliquer un pivot multi-réseaux sans perdre la topologie.",
      [["OpenSSH Manuals","https://www.openssh.com/manual.html"],["HTB Penetration Tester Path","https://academy.hackthebox.com/path/preview/penetration-tester"]],["04","10","32"],
      ["Je dessine les routes avant de pivoter","Je distingue tunnel et route","Je sais où apparaissent les traces réseau"]),

    M("34","Internal enterprise assessment","CORE","8–12 semaines","Conduire une évaluation multi-hôtes comme une vraie mission interne.",
      ["Asset prioritization and trust boundaries","Identity, service and network attack paths","Evidence management across hosts","Blast radius and remediation sequencing"],
      ["Réaliser plusieurs réseaux de lab multi-machines","Créer une chronologie complète par preuve","Présenter les points de rupture prioritaires"],
      "Tu peux conduire un pentest interne multi-hôtes sans te perdre dans les outils.",
      [["HTB Penetration Tester Path","https://academy.hackthebox.com/path/preview/penetration-tester"],["MITRE ATT&CK","https://attack.mitre.org/"]],["17","30","31","32","33"],
      ["Je garde une carte de l’environnement","Je sais pourquoi je change d’hôte","Je limite la preuve au strict nécessaire"]),

    M("35","CAPT → CPTS readiness & professional engagement","CORE","8–16 semaines","Transformer tes compétences en performance d’examen et de mission professionnelle.",
      ["Timeboxing, note taking et exam strategy","Full engagement workflow from pre-engagement to report","Evidence quality and reproducibility","Retest, prioritization and communication"],
      ["Utiliser CAPT comme checkpoint pratique","Terminer le HTB Penetration Tester Job Role Path","Effectuer plusieurs mock engagements chronométrés"],
      "Tu peux finir une évaluation complète avec rapport sans dépendre de walkthroughs.",
      [["HTB CPTS","https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist"],["HTB Penetration Tester Path","https://academy.hackthebox.com/path/preview/penetration-tester"]],["17","26","34"],
      ["Je respecte un temps limité","Je conserve des preuves pendant l’engagement","Je produis un rapport exploitable après la technique"])
  ]
},
{
  id:"advanced",label:"PHASE 5",title:"Engineering & spécialités techniques",desc:"Ajouter les domaines qui élargissent fortement ta compréhension : cloud, containers, mobile, wireless et bas niveau.",
  modules:[
    M("36","Cloud IAM & security foundations","OPTION","6–10 semaines","Comprendre les clouds par leurs identités, politiques et frontières de responsabilité.",
      ["Shared responsibility, accounts/projects/subscriptions","IAM users, roles, policies et temporary credentials","Storage, metadata, secrets et logging","Network controls et cloud identity"],
      ["Dessiner une architecture cloud de lab","Auditer une politique IAM","Construire un plan de logging et moindre privilège"],
      "Tu peux lire une politique IAM et expliquer exactement ce qu’une identité peut faire.",
      [["AWS IAM Docs","https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"],["Microsoft Azure IAM","https://learn.microsoft.com/azure/role-based-access-control/overview"]],["04","06","09","13"],
      ["Je raisonne d’abord sur l’identité","Je distingue permission effective et policy isolée","Je peux proposer least privilege et logging"]),

    M("37","Containers, Docker & Kubernetes","OPTION","6–10 semaines","Comprendre isolation, orchestration et identités de workloads.",
      ["Namespaces, cgroups, capabilities et container images","Docker socket, mounts et secrets","Kubernetes API, RBAC, service accounts et namespaces","Network policies, admission and supply chain"],
      ["Construire un cluster de lab","Auditer RBAC et service accounts","Documenter les frontières host/container/cluster"],
      "Tu peux expliquer comment un workload obtient accès au cluster et comment limiter cet accès.",
      [["Kubernetes Documentation","https://kubernetes.io/docs/"],["OWASP Kubernetes Top Ten","https://owasp.org/www-project-kubernetes-top-ten/"]],["02","04","06","36"],
      ["Je comprends isolation vs virtualisation","Je sais lire un rôle RBAC","Je peux cartographier secrets et identities de workloads"]),

    M("38","C, assembly & memory foundations","OPTION","8–12 semaines","Acquérir le langage nécessaire pour comprendre vulnérabilités binaires et reverse engineering.",
      ["C, pointers, arrays, structs et memory lifetime","Stack, heap, registers et calling conventions","Compilation, linking et debugging","x86-64 assembly fundamentals"],
      ["Écrire de petits programmes C","Lire le désassemblage de fonctions simples","Suivre stack et registres dans un debugger"],
      "Tu peux expliquer ce que devient ton code C au niveau mémoire et instructions.",
      [["OpenSecurityTraining2","https://p.ost2.fyi/"],["pwn.college","https://pwn.college/"]],["06","02","08"],
      ["Je comprends pointeurs et mémoire","Je peux suivre un appel de fonction en assembleur","Je sais utiliser un debugger pour expliquer un crash"]),

    M("39","Reverse engineering & binary analysis","OPTION","8–12 semaines","Apprendre à comprendre un binaire sans son code source.",
      ["ELF/PE sections, imports, symbols et relocations","Static vs dynamic analysis","Control flow and data flow","Debuggers, decompilers and instrumentation concepts"],
      ["Analyser plusieurs petits binaires de challenge","Comparer strings/disassembly/decompiler/debugger","Produire un rapport de comportement"],
      "Tu peux retrouver la logique essentielle d’un petit programme compilé.",
      [["Ghidra","https://ghidra-sre.org/"],["pwn.college","https://pwn.college/"]],["38"],
      ["Je sais lire ELF/PE à haut niveau","Je combine statique et dynamique","Je peux expliquer la logique sans source"]),

    M("40","Exploit development foundations","OPTION","10–16 semaines","Comprendre les vulnérabilités mémoire dans des programmes conçus pour l’apprentissage.",
      ["Memory corruption and control flow","Stack overflow concepts","NX, ASLR, canaries and PIE","ROP concepts and exploit reliability"],
      ["Travailler uniquement sur challenges vulnérables dédiés","Analyser cause → crash → contrôle → mitigation","Documenter chaque mitigation rencontrée"],
      "Tu peux expliquer un exploit de lab depuis la cause mémoire jusqu’aux mitigations.",
      [["pwn.college","https://pwn.college/"],["OpenSecurityTraining2","https://p.ost2.fyi/"]],["38","39"],
      ["Je comprends la cause mémoire","Je sais pourquoi une mitigation bloque une approche","Je peux corriger le code vulnérable"]),

    M("41","Mobile application security","OPTION","6–10 semaines","Étendre le Web aux applications Android/iOS et à leurs frontières locales.",
      ["Mobile app architecture and platform permissions","Local storage, IPC and deep links","API traffic, certificate trust and app secrets","Static/dynamic analysis concepts"],
      ["Auditer une application volontairement vulnérable","Tracer mobile → API → backend","Documenter stockage, permissions et données sensibles"],
      "Tu peux cartographier une application mobile et ses frontières avec le backend.",
      [["OWASP MAS","https://mas.owasp.org/"],["Android Security","https://developer.android.com/privacy-and-security/security"]],["05","06","18"],
      ["Je distingue vulnérabilité mobile et API","Je sais où les secrets peuvent apparaître","Je peux expliquer permissions et storage"]),

    M("42","Wireless & IoT foundations","OPTION","6–10 semaines","Comprendre les systèmes radio et embarqués avant toute spécialisation offensive.",
      ["802.11 architecture and authentication concepts","Radio basics, spectrum and capture concepts","Embedded Linux, firmware and update mechanisms","IoT protocols, trust and physical boundaries"],
      ["Construire un lab Wi‑Fi personnel autorisé","Analyser un firmware de challenge","Produire un modèle de menace IoT"],
      "Tu peux expliquer la pile d’un appareil connecté du radio au service applicatif.",
      [["Wi-Fi Alliance","https://www.wi-fi.org/"],["OWASP IoT","https://owasp.org/www-project-internet-of-things/"]],["04","09"],
      ["Je comprends AP/client/authentication","Je sais identifier les composants d’un firmware","Je peux modéliser les frontières physiques et réseau"])
  ]
},
{
  id:"mastery",label:"PHASE 6",title:"Red Team, Purple Team & maîtrise professionnelle",desc:"Transformer les compétences techniques en capacité de planifier, mesurer, automatiser, rechercher et restituer.",
  modules:[
    M("43","Red Team planning & threat emulation","CORE","6–10 semaines","Passer du pentest à une évaluation guidée par des objectifs et comportements adverses.",
      ["Objectives, Rules of Engagement and deconfliction","Threat modeling and ATT&CK mapping","Assumed breach vs full-scope design","Success criteria, safety and executive communication"],
      ["Créer un Red Team plan fictif","Construire un exercise plan mappé à ATT&CK","Présenter objectifs, risques et critères d’arrêt"],
      "Tu peux concevoir une évaluation Red Team cohérente avant de parler d’outillage.",
      [["MITRE ATT&CK","https://attack.mitre.org/"],["MITRE Engage","https://engage.mitre.org/"]],["35"],
      ["Je pars d’un objectif métier","Je définis les limites avant les techniques","Je peux justifier chaque comportement émulé"]),

    M("44","C2 architecture, OPSEC & detection-aware tradecraft","OPTION","6–10 semaines","Comprendre les compromis entre contrôle, observabilité, sécurité de l’exercice et détection.",
      ["C2 architecture concepts and communication channels","Operational security and artifact awareness","Endpoint/network telemetry considerations","Infrastructure lifecycle and deconfliction"],
      ["Dessiner plusieurs architectures de lab sans les déployer hors environnement autorisé","Comparer traces réseau et endpoint de scénarios contrôlés","Définir des critères d’arrêt et de sécurité"],
      "Tu peux expliquer les compromis opérationnels d’un exercice sans dépendre d’un framework particulier.",
      [["MITRE ATT&CK Command and Control","https://attack.mitre.org/tactics/TA0011/"],["MITRE Engage","https://engage.mitre.org/"]],["43","32","33"],
      ["Je comprends l’architecture avant le produit","Je sais quelles traces chaque choix génère","Je peux protéger le périmètre de l’exercice"]),

    M("45","Purple Team & detection engineering","CORE","6–10 semaines","Relier attaque, télémétrie, détection, investigation et mitigation.",
      ["Log sources, Windows events, Sysmon and network telemetry","MITRE ATT&CK technique mapping","Sigma rules and detection hypotheses","False positives, coverage and validation"],
      ["Exécuter des actions contrôlées dans ton lab et collecter les logs","Écrire et tester des règles Sigma","Mesurer couverture avant/après amélioration"],
      "Pour une technique offensive, tu peux montrer les traces, la détection et la correction.",
      [["SigmaHQ","https://sigmahq.io/"],["MITRE ATT&CK","https://attack.mitre.org/"]],["17","27","34","43"],
      ["Je sais quelles sources de logs sont nécessaires","Je peux écrire une hypothèse de détection","Je mesure faux positifs et couverture"]),

    M("46","DFIR & malware analysis foundations","OPTION","6–10 semaines","Comprendre ce que voient les défenseurs après une compromission.",
      ["Evidence, timeline and chain of custody fundamentals","Process, filesystem and network artifacts","Static/dynamic malware analysis concepts","Memory and endpoint telemetry fundamentals"],
      ["Analyser un jeu de logs de lab","Construire une timeline d’incident","Analyser un binaire pédagogique dans une sandbox isolée"],
      "Tu peux reconstruire une chronologie à partir d’artefacts et distinguer faits et hypothèses.",
      [["Volatility Foundation","https://volatilityfoundation.org/"],["MITRE ATT&CK","https://attack.mitre.org/"]],["02","03","45"],
      ["Je sais préserver et dater une preuve","Je peux reconstruire une timeline","Je distingue comportement observé et intention supposée"]),

    M("47","Security research & vulnerability discovery","OPTION","8–16 semaines","Apprendre à découvrir, expliquer et corriger des vulnérabilités au-delà des checklists.",
      ["Research question and hypothesis","Code reading, differential testing and fuzzing concepts","Root cause analysis and minimal PoC","Responsible disclosure and patch validation"],
      ["Choisir un petit projet open source de lab","Chercher des invariants et cas limites","Écrire un advisory pédagogique avec patch"],
      "Tu peux passer d’une anomalie à une cause racine documentée et un correctif vérifié.",
      [["OWASP Code Review Guide","https://owasp.org/www-project-code-review-guide/"],["GitHub Security Lab","https://securitylab.github.com/"]],["26","39","40"],
      ["Je formule une question de recherche","Je réduis un comportement à un PoC minimal","Je peux proposer et tester un correctif"]),

    M("48","Tooling engineering & automation","CORE","8–12 semaines","Passer de scripts jetables à des outils fiables qui augmentent réellement ta capacité.",
      ["CLI design, config and error handling","Concurrency, networking and parsers","Testing, logging and packaging","APIs, plugin architecture and safe defaults"],
      ["Construire un toolkit modulaire pour tes labs","Ajouter tests automatisés et documentation","Créer un outil qui transforme des sorties brutes en hypothèses"],
      "Tu peux maintenir un petit outil cyber comme un projet logiciel réel.",
      [["Python Packaging","https://packaging.python.org/"],["pytest","https://docs.pytest.org/"]],["06","17","26","34"],
      ["Mon outil possède des tests","Les erreurs sont explicites et gérées","Je peux expliquer où l’automatisation ne doit pas décider à ma place"]),

    M("49","Portfolio, writeups & communication technique","CORE","continu","Transformer trois années de travail en preuves professionnelles lisibles.",
      ["Technical writing and reproducibility","Executive communication and diagrams","Portfolio curation and redaction","Public vs private evidence hygiene"],
      ["Publier des writeups sans secrets ni données clients","Transformer projets et labs en études de cas","Présenter une chaîne d’attaque en 10 minutes"],
      "Ton portfolio montre ce que tu comprends, ce que tu as construit et comment tu raisonnes.",
      [["GitHub Docs","https://docs.github.com/"],["OWASP WSTG","https://wstg.owasp.org/"]],["07","17","35","48"],
      ["Chaque projet a contexte, méthode et résultat","Je sais expliquer sans jargon inutile","Je peux montrer ma progression sans divulguer de données sensibles"]),

    M("50","MASTER CAPSTONE — full-scope cyber assessment","CORE","12–20 semaines","Valider l’intégration de toutes les compétences sur un environnement de laboratoire complexe.",
      ["External + Web + internal assessment planning","Linux, Windows, AD, segmentation and identity","Attack-chain reasoning and evidence control","Detection, remediation, retest and executive reporting"],
      ["Construire ou utiliser un environnement multi-segments autorisé","Conduire l’engagement de bout en bout avec journal de mission","Produire rapport technique, synthèse exécutive et plan de détection"],
      "Tu peux mener une évaluation complète, expliquer chaque transition et défendre tes conclusions devant une équipe technique.",
      [["HTB Penetration Tester Path","https://academy.hackthebox.com/path/preview/penetration-tester"],["MITRE ATT&CK","https://attack.mitre.org/"]],["35","43","45","48","49"],
      ["Je conserve la carte et les preuves de bout en bout","Je relie attaque, impact, détection et mitigation","Je peux défendre mes choix et limites lors d’une restitution"])
  ]
}
];

export const modules=stages.flatMap(s=>s.modules.map(m=>({...m,id:`${s.id}-${m.n}`,stage:s.id,stageTitle:s.title})));
export const byNumber=Object.fromEntries(modules.map(m=>[m.n,m]));
export const byId=Object.fromEntries(modules.map(m=>[m.id,m]));

export const tracks=[
  {id:"web",icon:"</>",title:"Web & API Exploitation",desc:"De PortSwigger au whitebox, à la logique métier et aux applications modernes.",requires:["18","19","20","21","22","23","24","25","26","48","49"],focus:["Web blackbox","API & business logic","Whitebox & secure code review"],project:"Audit complet d’une application et de son API avec tests de non-régression."},
  {id:"internal",icon:"◇",title:"Internal / Active Directory",desc:"Pentest d’entreprise : identité, Windows, AD, services, segmentation et chemins d’attaque.",requires:["27","28","29","30","31","32","33","34","35","45","49"],focus:["Kerberos / NTLM","AD attack paths","Multi-host assessments"],project:"Évaluation complète d’un domaine de lab multi-segments avec remédiations."},
  {id:"red",icon:"⚑",title:"Red Team",desc:"Objectifs métier, threat emulation, chaînes multi-hôtes et travail detection-aware.",requires:["34","35","43","44","45","48","49","50"],focus:["Threat emulation","Attack-chain planning","Detection-aware operations"],project:"Planifier et restituer une évaluation Red Team complète dans un environnement contrôlé."},
  {id:"cloud",icon:"☁",title:"Cloud & Containers",desc:"IAM, workloads, secrets, Docker, Kubernetes et CI/CD.",requires:["36","37","43","45","48"],focus:["IAM","Containers/Kubernetes","Cloud detection"],project:"Audit d’une architecture cloud/container de lab avec IAM et journalisation."},
  {id:"exploit",icon:"0x",title:"Exploit Development & Research",desc:"C, assembleur, reverse, vulnérabilités mémoire et recherche.",requires:["38","39","40","47","48","49"],focus:["Memory internals","Reverse engineering","Vulnerability research"],project:"Analyse d’une vulnérabilité de lab, PoC minimal, patch et writeup technique."},
  {id:"purple",icon:"◎",title:"Purple Team / Detection",desc:"Utiliser l’offensif pour améliorer télémétrie, détection et investigation.",requires:["43","45","46","48","49"],focus:["ATT&CK mapping","Sigma & telemetry","DFIR"],project:"Exercise purple : technique contrôlée → logs → détection → tuning → retest."},
  {id:"mobile",icon:"APP",title:"Mobile Security",desc:"Applications Android/iOS, stockage local, API, permissions et reverse mobile.",requires:["18","24","39","41","49"],focus:["Mobile architecture","API trust","Static/dynamic analysis"],project:"Audit d’une application mobile volontairement vulnérable et de son backend."},
  {id:"wireless",icon:"RF",title:"Wireless & IoT",desc:"Wi‑Fi, radio, embedded Linux, firmware et IoT.",requires:["04","38","39","42","49"],focus:["802.11","Firmware","Embedded security"],project:"Modèle de menace et audit d’un environnement Wi‑Fi/IoT personnel."}
];

export const projects=[
 {id:"foundation-lab",stage:"foundations",title:"Jalon 1 — Cyber Range personnel",requires:["01","02","03","04","07"],desc:"Construire ton environnement de travail longue durée.",deliverables:["Schéma réseau versionné","VM Linux et Windows restaurables","Journal de changements et snapshots","Procédure de reconstruction complète"]},
 {id:"forge-core",stage:"foundations",title:"Jalon 2 — FORGE Core",requires:["06","08"],desc:"Prouver que le code devient une compétence, pas une dépendance.",deliverables:["10 mini-programmes Python sans copier","Toolkit Bash/PowerShell documenté","Tests et gestion d’erreurs","Une réécriture d’un outil dans un second langage"]},
 {id:"capt-checkpoint",stage:"core",title:"Jalon 3 — CAPT checkpoint",requires:["09","10","11","12","13","15","16","17"],desc:"Utiliser CAPT comme validation intermédiaire avant le niveau CPTS.",deliverables:["Checklist pentest personnelle","10 machines récentes sans walkthrough","3 rapports complets","Simulation chronométrée documentée"]},
 {id:"web-mastery",stage:"web",title:"Jalon 4 — Web Exploitation Campaign",requires:["18","19","20","21","22","23","24","25","26"],desc:"Construire une profondeur Web/API bien au-delà de quelques payloads.",deliverables:["Parcours PortSwigger progressif documenté","Application de lab vulnérable puis corrigée","Audit API avec matrice de rôles","Whitebox review avec patch et tests"]},
 {id:"cpts",stage:"enterprise",title:"Jalon 5 — CPTS readiness",requires:["17","26","34","35"],desc:"Faire du CPTS une preuve de méthode professionnelle, pas une fin.",deliverables:["HTB Penetration Tester Path terminé","30+ machines pertinentes documentées","5 engagements complets simulés","Rapports relus et améliorés après retest"]},
 {id:"fifty-boxes",stage:"enterprise",title:"Jalon 6 — 50 machines / 60 challenges",requires:["15","16","17","26","30","34"],desc:"Créer le volume nécessaire pour développer reconnaissance des patterns et autonomie.",deliverables:["50 machines catégorisées par enseignement","60 challenges multi-domaines","Journal des échecs et erreurs récurrentes","Index de techniques consolidé dans Obsidian"]},
 {id:"prolabs",stage:"mastery",title:"Jalon 7 — 4 Pro Labs",requires:["34","35","43"],desc:"Passer des machines isolées aux environnements qui exigent mémoire, pivoting et planification.",deliverables:["4 Pro Labs terminés ou équivalents","Carte d’attaque par environnement","Rapport des pivots et décisions","Rétrospective : technique, temps, erreurs, améliorations"]},
 {id:"purple",stage:"mastery",title:"Jalon 8 — Offensive ↔ Detection",requires:["43","45"],desc:"Prouver que tu sais voir une attaque des deux côtés.",deliverables:["Pack de logs de lab","10 hypothèses de détection","Règles Sigma ou équivalentes testées","Matrice attaque → télémétrie → mitigation"]},
 {id:"tooling",stage:"mastery",title:"Jalon 9 — Outil cyber maintenable",requires:["48","49"],desc:"Construire un vrai projet logiciel qui améliore ton workflow.",deliverables:["Architecture et README professionnel","Tests automatisés","Versioning et releases","Étude de cas avec limites et décisions de design"]},
 {id:"master",stage:"mastery",title:"Jalon 10 — Master Assessment",requires:["50"],desc:"Ton examen personnel final : technique, méthode, détection et restitution.",deliverables:["Scope et plan d’engagement","Évaluation multi-segments complète","Rapport technique + executive summary","Retest + plan de détection et durcissement"]}
];

export const scenarios=[
 {title:"Web → Linux → privilèges",tag:"WEB + LINUX",requires:["22","15"],story:"Une application de lab conduit à un contexte système. Analyse chaque frontière traversée et la permission qui rend la transition possible.",steps:["Surface Web","Contexte applicatif","Identité système","Frontière de privilèges"],questions:["Quelle preuve établit chaque transition ?","Quelle correction coupe le chemin le plus tôt ?","Quelle télémétrie permettrait de voir la chaîne ?"],evidence:"Trafic HTTP, configuration, permissions et journaux de ton propre lab."},
 {title:"API → identité → données métier",tag:"API + AUTHZ",requires:["20","24"],story:"Un défaut d’autorisation permet à une identité d’agir sur un objet qui ne lui appartient pas.",steps:["Identity","Object","Authorization decision","Business impact"],questions:["Où le serveur décide-t-il ?","Quels rôles et objets sont concernés ?","Quel test empêche la régression ?"],evidence:"Matrice rôles/objets, requêtes de lab et test de correction."},
 {title:"Credential → Windows → AD",tag:"WINDOWS + AD",requires:["16","28","29","30"],story:"Un credential de laboratoire prend de la valeur à travers plusieurs relations d’entreprise.",steps:["Credential","Remote service","Domain identity","Attack path"],questions:["Quelle confiance rend chaque étape possible ?","Quelles permissions sont réellement nécessaires ?","Quels événements permettent la reconstruction ?"],evidence:"ACL, groupes, sessions, journaux et graphe de lab."},
 {title:"DMZ → pivot → réseau interne",tag:"NETWORK + PIVOT",requires:["32","33","34"],story:"Un hôte exposé possède un chemin réseau vers une zone interne. Le travail consiste à comprendre la topologie avant l’outil.",steps:["DMZ","Route/Tunnel","Internal service","New trust boundary"],questions:["Quel flux doit exister pour le métier ?","Où observer le passage ?","Quelle segmentation réduit le risque ?"],evidence:"Routes, firewall rules, captures et diagramme réseau."},
 {title:"AD → business impact",tag:"IDENTITY + ENTERPRISE",requires:["30","31","34"],story:"Plusieurs permissions apparemment limitées se combinent jusqu’à une ressource critique de laboratoire.",steps:["Low privilege","Delegated right","Identity escalation","Critical resource"],questions:["Quelle relation est la plus importante ?","Quelle rupture corrige plusieurs chemins ?","Comment démontrer l’impact sans action destructive ?"],evidence:"BloodHound/LDAP export, ACL, service configuration et rapport."},
 {title:"Technique → télémétrie → détection",tag:"PURPLE",requires:["43","45"],story:"Une action offensive contrôlée devient un exercice de détection et d’amélioration SOC.",steps:["Technique","Telemetry","Detection hypothesis","Retest"],questions:["Quels logs manquent ?","Quel comportement est suffisamment distinctif ?","Comment mesurer les faux positifs ?"],evidence:"Jeu de logs de lab, règle de détection, résultat avant/après."}
];

export const forgeProjects=[
["01","Linux Hardening Lab","FOUNDATIONS"],["02","Windows Baseline Lab","FOUNDATIONS"],["03","Segmented Network Lab","FOUNDATIONS"],["04","Packet Analysis Casebook","FOUNDATIONS"],["05","Python Recon Toolkit","FORGE"],["06","Bash Admin Toolkit","FORGE"],["07","PowerShell Inventory Toolkit","FORGE"],["08","Crypto Conversion Toolkit","FORGE"],
["09","External Recon Dossier","PENTEST"],["10","Service Enumeration Matrix","PENTEST"],["11","Vulnerability Triage Dashboard","PENTEST"],["12","Credential Audit Lab","PENTEST"],["13","Linux PrivEsc Range","PENTEST"],["14","Windows PrivEsc Range","PENTEST"],["15","Single-Host Full Assessment","PENTEST"],["16","Professional Report Pack","PENTEST"],
["17","Vulnerable Web App","WEB"],["18","Access-Control Matrix Lab","WEB"],["19","SQL/NoSQL Injection Lab","WEB"],["20","XSS & Browser Security Lab","WEB"],["21","Upload/Filesystem Boundary Lab","WEB"],["22","SSRF/Internal Services Lab","WEB"],["23","API RBAC Lab","WEB"],["24","OAuth/JWT Trust Lab","WEB"],["25","HTTP Desync/Cache Study","WEB"],["26","Whitebox Review & Patch","WEB"],
["27","Mini Active Directory Domain","ENTERPRISE"],["28","Kerberos Telemetry Lab","ENTERPRISE"],["29","AD Attack-Path Graph","ENTERPRISE"],["30","AD CS Review Lab","ENTERPRISE"],["31","Segmented Enterprise Range","ENTERPRISE"],["32","Pivoting Topology Lab","ENTERPRISE"],["33","Internal Assessment Capstone","ENTERPRISE"],
["34","Cloud IAM Review Lab","ADVANCED"],["35","Docker/Kubernetes Security Lab","ADVANCED"],["36","Binary Analysis Workbook","ADVANCED"],["37","Memory Corruption Challenge Pack","ADVANCED"],["38","Purple Detection Pack","MASTERY"],["39","Red Team Tabletop & Emulation Plan","MASTERY"],["40","Full-Scope Master Assessment","MASTERY"]
].map(([n,title,stage])=>({n,title,stage}));
