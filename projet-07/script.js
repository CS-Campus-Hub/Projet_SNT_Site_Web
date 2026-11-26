// Chaque question contient ses réponses, l’index de la bonne réponse et une explication.
const questions = [
  {
    texte: "Quel est le rôle de l’ambulancier ?",
    choix: ["Préparer les repas à l’hôpital", "Transporter et accompagner des patients", "Fabriquer les ambulances"],
    bonne: 1,
    explication: "L’ambulancier accompagne les patients et veille sur eux pendant le trajet."
  },
  {
    texte: "Comment s’appelle le diplôme d’État d’ambulancier ?",
    choix: ["DEA", "BAFA", "BTS"],
    bonne: 0,
    explication: "DEA signifie diplôme d’État d’ambulancier."
  },
  {
    texte: "Quel équipement sert à transporter une personne allongée ?",
    choix: ["Un gyrophare", "Un tableau de bord", "Un brancard"],
    bonne: 2,
    explication: "Le brancard permet d’installer et de déplacer un patient allongé."
  },
  {
    texte: "Une ambulance peut-elle conduire un patient à une consultation programmée ?",
    choix: ["Oui", "Seulement de nuit", "Jamais"],
    bonne: 0,
    explication: "Certains trajets sont prévus à l’avance, par exemple pour une consultation."
  },
  {
    texte: "Qu’est-ce qui tirait les ambulances « volantes » de Larrey ?",
    choix: ["Des motos", "Des chevaux", "Des bateaux"],
    bonne: 1,
    explication: "Ces ambulances étaient des voitures tirées par des chevaux."
  }
];

function initialiserQuiz() {
  const progression = document.querySelector("#progression");
  const barre = document.querySelector("#barre");
  const question = document.querySelector("#question");
  const reponses = document.querySelector("#reponses");
  const correction = document.querySelector("#correction");
  const suivant = document.querySelector("#suivant");

  let index = 0;
  let score = 0;

  function afficherQuestion() {
    const actuelle = questions[index];
    progression.textContent = "Question " + (index + 1) + " sur " + questions.length;
    barre.value = index;
    question.textContent = actuelle.texte;
    correction.textContent = "";
    reponses.replaceChildren();
    suivant.hidden = true;

    actuelle.choix.forEach(function (choix, numero) {
      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "answer";
      bouton.textContent = choix;
      bouton.addEventListener("click", function () {
        corriger(numero);
      });
      reponses.append(bouton);
    });
  }

  function corriger(numero) {
    const actuelle = questions[index];
    const reussi = numero === actuelle.bonne;
    if (reussi) score++;

    const boutons = reponses.querySelectorAll("button");
    boutons.forEach(function (bouton) { bouton.disabled = true; });
    boutons[actuelle.bonne].classList.add("correct");
    if (!reussi) boutons[numero].classList.add("incorrect");

    barre.value = index + 1;
    correction.textContent = (reussi ? "Bonne réponse ! " : "Réponse attendue : " + actuelle.choix[actuelle.bonne] + ". ") + actuelle.explication;
    suivant.textContent = index === questions.length - 1 ? "Voir mon score →" : "Question suivante →";
    suivant.hidden = false;
    suivant.focus();
  }

  suivant.addEventListener("click", function () {
    if (index === questions.length) {
      index = 0;
      score = 0;
      afficherQuestion();
    } else {
      index++;
      if (index < questions.length) {
        afficherQuestion();
      } else {
        progression.textContent = "Quiz terminé";
        question.textContent = "Ton score : " + score + " / " + questions.length;
        reponses.replaceChildren();
        correction.textContent = score === questions.length ? "Bravo, tu as tout trouvé !" : "Tu peux rejouer pour améliorer ton score.";
        suivant.textContent = "Rejouer ↻";
      }
    }
    question.focus();
  });

  afficherQuestion();
}

if (document.querySelector("#quiz")) initialiserQuiz();

const checklist = document.querySelector(".checklist");
if (checklist) {
  const cases = [...checklist.querySelectorAll("input")];
  const jauge = checklist.querySelector("progress");
  const resultat = checklist.querySelector('[role="status"]');
  function actualiserChecklist() {
    const total = cases.filter(caseACocher => caseACocher.checked).length;
    jauge.value = total;
    resultat.textContent = total === cases.length ? "Les trois vérifications sont faites !" : total + " sur 3 vérifications.";
  }
  checklist.addEventListener("change", actualiserChecklist);
  window.addEventListener("pageshow", actualiserChecklist);
  actualiserChecklist();
}

const mission = document.querySelector(".mission");
if (mission) {
  const etapes = [
    "L’équipage vérifie le véhicule et le matériel avant le premier transport.",
    "Au domicile, il repère l’accès, se présente et explique au patient comment le trajet va se dérouler.",
    "En route, l’équipe veille au confort du patient et reste attentive à l’évolution de son état.",
    "À destination, l’équipage transmet les informations utiles et remet le véhicule en état pour le trajet suivant."
  ];
  const boutons = [...mission.querySelectorAll("button")];
  const route = mission.querySelector(".mission-road");
  const message = mission.querySelector(".mission-text");
  boutons.forEach(function (bouton, numero) {
    bouton.addEventListener("click", function () {
      boutons.forEach(element => element.setAttribute("aria-pressed", String(element === bouton)));
      route.style.setProperty("--position", (numero * 100 / (boutons.length - 1)) + "%");
      message.textContent = etapes[numero];
    });
  });
}
