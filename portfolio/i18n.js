/* =====================================================
   FR / EN language switch
   - The HTML is written in English.
   - Any element with data-i18n="key" is translated with the
     French text below (FR["key"]). Edit French text here.
   - Project pages add their own texts in window.PAGE_FR.
   ===================================================== */
(function () {
  const FR = {
    /* accessibility + shared */
    "a11y.skip": "Aller au contenu principal",
    "a11y.newtab": " (s’ouvre dans un nouvel onglet)",
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.research": "Recherche",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.contact": "Contact",
    "cta.cv": "Télécharger CV",
    "cta.contact": "Me contacter",
    "footer.built": "Conçu en HTML, CSS et JS · Hébergé gratuitement",
    "footer.top": "Haut de page",

    /* hero */
    "hero.hello": "Bonjour, je suis",
    "hero.role": "Élève ingénieure en IA, dernière année",
    "hero.school": "Génie logiciel · ENSI, Université de la Manouba",
    "hero.focus": "Agents LLM <span aria-hidden=\"true\">·</span> RAG <span aria-hidden=\"true\">·</span> Deep learning <span aria-hidden=\"true\">·</span> MLOps",
    "hero.lead": "Je transforme des travaux de recherche prometteurs en outils fiables : pipelines LLM multi-agents, systèmes RAG et modèles de deep learning, évalués sur des données réelles.",
    "hero.pfeTitle": "À la recherche d’un stage PFE",
    "hero.pfeSub": "Projet de fin d’études · 2027 · IA / ingénierie LLM",
    "hero.spin": "DÉCOUVRIR MES PROJETS • DÉCOUVRIR MES PROJETS •",
    "hero.spinLabel": "Découvrir mes projets",

    /* badge */
    "badge.role": "Élève ingénieure en IA",
    "badge.focus": "Agents LLM · RAG · Deep learning",
    "badge.open": "Ouverte au PFE",
    "badge.r1": "Décomposition de PR",
    "badge.r2": "Segmentation de lésions cutanées",
    "badge.r2v": "97,0 % Dice",
    "badge.r3": "Changements Gerrit analysés",
    "badge.r4": "Erreur matching CV-offre",
    "badge.hint": "ou faites-le balancer",

    /* stats */
    "stats.s1": "stages de R&amp;D<br/>au laboratoire Larodec",
    "stats.s2": "changements Gerrit<br/>collectés et analysés",
    "stats.s3": "de précision face à une<br/>référence publiée à ICSE ’26",
    "stats.s4": "score Dice sur<br/>la segmentation PH2",

    /* about */
    "about.eyebrow": "Qui je suis",
    "about.title": "À propos de moi",
    "about.p1": "Je suis élève ingénieure en dernière année de génie logiciel à l’<strong>École Nationale des Sciences de l’Informatique (ENSI)</strong>, Université de la Manouba, après deux ans de classes préparatoires Maths-Physique à l’IPEIB.",
    "about.p2": "Ce qui me motive, c’est l’écart entre un article prometteur et un outil sur lequel on peut compter. Pendant mes stages de recherche, je reprends des méthodes publiées, je les teste sur des <em>données réelles et imparfaites</em>, je trouve où elles échouent, puis je construis mieux.",
    "about.p3": "Je suis à l’aise sur toute la chaîne, de l’entraînement et l’évaluation des modèles jusqu’à leur mise en production avec <strong>LangChain / LangGraph, Docker et Jenkins CI/CD</strong>.",
    "about.looking": "<span class=\"mono accent\" aria-hidden=\"true\">&gt;</span> Je recherche actuellement un <strong>stage de fin d’études (PFE)</strong> en IA / ingénierie LLM.",
    "facts.loc": "lieu",
    "facts.locV": "Manouba, Tunisie",
    "facts.deg": "diplôme",
    "facts.degV": "Cycle ingénieur, génie logiciel (2024–2027)",
    "facts.lang": "langues",
    "facts.langV": "Arabe (maternelle) · Français (C1) · Anglais (B2)",
    "facts.also": "aussi",
    "facts.alsoV": "Trésorière, Association Robotique de l’ENSI",

    /* research */
    "exp.eyebrow": "En laboratoire",
    "exp.title": "Expérience de recherche",
    "exp.lab": "Laboratoire Larodec, ENSI",
    "exp.case": "Lire l’étude de cas complète",
    "exp.e1date": "Été 2026",
    "exp.e1role": "Stagiaire R&amp;D en IA",
    "exp.e1title": "Vers une décomposition assistée par IA des grandes pull requests en changements révisables",
    "exp.e1desc": "Les grandes pull requests sont difficiles à relire. J’ai testé si un framework LLM multi-agents publié pouvait les découper en changements plus petits et révisables, à partir de <strong>l’historique réel des développeurs</strong> plutôt que de benchmarks synthétiques.",
    "exp.e1m1": "Atomizer (ICSE 2026) sur des données Gerrit réelles",
    "exp.e1m2": "mon pipeline guidé par la taxonomie",
    "exp.e1m3": "accord inter-annotateurs sur la taxonomie",
    "exp.e1b1": "Collecte de <strong>937 327 changements Gerrit</strong> issus de 7 écosystèmes, réduits à 142 cas de découpage validés, chacun relié aux propres mots du développeur.",
    "exp.e1b2": "Construction d’une taxonomie du <em>pourquoi</em> et du <em>comment</em> les développeurs découpent leurs changements (κ = 0,896 et 0,769).",
    "exp.e1b3": "Identification du sur-découpage comme principale source d’erreur, puis conception d’un pipeline guidé par la taxonomie qui dépasse la référence.",
    "exp.e2date": "Été 2025",
    "exp.e2role": "Stagiaire en deep learning",
    "exp.e2title": "AC-MambaSeg : modèle hybride CNN-Mamba pour la segmentation des lésions cutanées",
    "exp.e2desc": "Reproduction et extension d’une architecture hybride combinant des CNN avec des blocs Mamba (modèles à espace d’états), CBAM et des portes d’attention pour la segmentation d’images médicales, avec PyTorch Lightning.",
    "exp.e2m1": "Dice sur PH2 (référence CNN 95,0 %)",
    "exp.e2m2": "IoU sur PH2 (référence 91,0 %)",
    "exp.e2m3": "Dice sur ISIC 2018, devant SM-UNet",
    "exp.e2b1": "Le prétraitement anti-poils, AdamW et le fine-tuning ont fait passer le Dice sur ISIC 2018 de <strong>85,3 % à 90,5 %</strong>.",

    /* projects */
    "proj.eyebrow": "Mes réalisations",
    "proj.title": "Mes projets",
    "proj.intro": "Cliquez sur un projet pour voir son fonctionnement, ses résultats et sa stack technique.",
    "proj.fAll": "Tous",
    "proj.fResearch": "Recherche",
    "proj.fWeb": "Applications web",
    "proj.view": "Voir le projet",
    "proj.c1meta": "Recherche · 2026",
    "proj.c1title": "Vers une décomposition assistée par IA des grandes pull requests",
    "proj.c1tag": "Test d’un LLM multi-agents publié sur l’historique Gerrit réel, puis conception d’un pipeline qui fait passer la précision de 65,0 % à 72,4 %.",
    "proj.c2tag": "Posez des questions sur n’importe quelle vidéo YouTube et obtenez des réponses fondées sur ce qui y est dit.",
    "proj.c3tag": "Posez des questions sur n’importe quel dépôt Git et obtenez des réponses qui citent les hashes des commits.",
    "proj.c4title": "Matching CV-offre explicable",
    "proj.c4tag": "Associe des CV à des offres en justifiant chaque décision, puis vérifie l’absence de biais.",

    /* skills */
    "skills.eyebrow": "Ma boîte à outils",
    "skills.title": "Compétences",
    "skills.g1": "LLM &amp; agents",
    "skills.g2": "Deep learning &amp; NLP",
    "skills.g3": "Programmation &amp; web",
    "skills.g4": "DevOps &amp; outils",
    "skills.act": "Activités",
    "skills.a1": "<strong>Trésorière, bureau exécutif</strong> — Association Robotique de l’ENSI <span class=\"muted\">· 2025–2026</span>",
    "skills.a2": "<strong>Membre</strong> — IEEE ENSI Student Branch <span class=\"muted\">· 2024–2025</span>",
    "skills.a3": "<strong>Membre</strong> — Junior Entreprise de l’ENSI <span class=\"muted\">· 2024–2025</span>",
    "skills.a4": "<strong>Membre</strong> — Club de programmation compétitive de l’ENSI <span class=\"muted\">· 2024–2025</span>",

    /* contact */
    "contact.eyebrow": "Parlons-en",
    "contact.title": "Me contacter",
    "contact.h": "Construisons quelque chose de fiable.",
    "contact.p": "Je recherche un stage PFE en IA / ingénierie LLM. Si votre équipe travaille sur les agents, le RAG ou le deep learning appliqué, j’aimerais beaucoup en discuter.",
    "contact.phone": "tél.",
    "form.name": "Nom",
    "form.email": "E-mail",
    "form.send": "Envoyer le message",

    /* project pages (shared parts) */
    "pp.all": "Tous les projets",
    "pp.code": "Voir le code",
    "pp.demoSoon": "Démo bientôt disponible",
    "pp.ask": "Me poser une question sur ces travaux",
    "pp.caption": "Le fonctionnement du pipeline, étape par étape.",
    "pp.problem": "Le problème",
    "pp.how": "Fonctionnement",
    "pp.results": "Résultats",
    "pp.learned": "Ce que j’ai appris",
    "pp.glance": "En bref",
    "pp.stack": "Stack technique",
    "pp.prev": "Projet précédent",
    "pp.next": "Projet suivant",
  };

  /* Short texts used by the scripts (buttons, messages) */
  const UI = {
    en: {
      toLight: "Switch to light mode", toDark: "Switch to dark mode",
      flip: "Flip badge", flipBack: "Flip back",
      projects: n => n === 1 ? "1 project" : n + " projects",
      sending: "Sending…", sent: "Thanks! Your message was sent. I'll get back to you soon.",
      failed: "Something went wrong. Please email me directly.",
      network: "Network error. Please email me directly at ",
      mailApp: "Your email app should open with this message. If it doesn't, write to ",
    },
    fr: {
      toLight: "Passer en mode clair", toDark: "Passer en mode sombre",
      flip: "Retourner le badge", flipBack: "Revenir au recto",
      projects: n => n === 1 ? "1 projet" : n + " projets",
      sending: "Envoi en cours…", sent: "Merci ! Votre message a bien été envoyé. Je vous réponds très vite.",
      failed: "Une erreur est survenue. Écrivez-moi directement par e-mail.",
      network: "Erreur réseau. Écrivez-moi directement à ",
      mailApp: "Votre application e-mail devrait s’ouvrir avec ce message. Sinon, écrivez à ",
    },
  };

  /* aria-label translations (data-i18n-aria="key") */
  const ARIA_FR = {
    "aria.stats": "Résultats clés",
    "aria.filter": "Filtrer les projets",
    "aria.form": "Formulaire de contact",
    "aria.front": "Badge, recto",
    "aria.back": "Badge, verso",
    "aria.email": "E-mail",
    "aria.facts": "Informations du projet",
    "aria.more": "Autres projets",
  };

  const dict = Object.assign({}, FR, window.PAGE_FR || {});
  const root = document.documentElement;
  const current = () => (root.lang === "fr" ? "fr" : "en");

  window.t = function (key) {
    const l = current();
    return (UI[l] && UI[l][key]) || UI.en[key] || key;
  };

  function apply(lang, save) {
    root.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const svg = el instanceof SVGElement;
      if (el.dataset.en === undefined) el.dataset.en = svg ? el.textContent : el.innerHTML;
      const key = el.dataset.i18n;
      const val = lang === "fr" && dict[key] !== undefined ? dict[key] : el.dataset.en;
      if (svg) el.textContent = val; else el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
      if (el.dataset.enAria === undefined) el.dataset.enAria = el.getAttribute("aria-label") || "";
      const key = el.dataset.i18nAria;
      el.setAttribute("aria-label", lang === "fr" && ARIA_FR[key] ? ARIA_FR[key] : el.dataset.enAria);
    });
    document.querySelectorAll(".lang-switch [data-lang]").forEach(b =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    if (save) { try { localStorage.setItem("lang", lang); } catch (e) {} }
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  window.setLang = apply;
  document.querySelectorAll(".lang-switch [data-lang]").forEach(b =>
    b.addEventListener("click", () => apply(b.dataset.lang, true)));
  apply(current(), false);
})();
