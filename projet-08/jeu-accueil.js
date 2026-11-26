

/* ==========================================
   QUIZ BIOLOGIE MARINE - NIVEAU SECONDE
========================================== */

const exploreQuestions = [
    {
        question: "Quel organite permet aux cellules végétales de réaliser la photosynthèse ?",
        answers: [
            "La mitochondrie",
            "Le chloroplaste",
            "Le noyau",
            "La membrane cellulaire"
        ],
        correct: 1,
        explanation: "Le chloroplaste contient la chlorophylle, un pigment qui capte l'énergie lumineuse nécessaire à la photosynthèse."
    },
    {
        question: "Quel est le rôle principal du phytoplancton dans les écosystèmes marins ?",
        answers: [
            "Il consomme les poissons",
            "Il décompose les roches",
            "Il produit de la matière organique grâce à la photosynthèse",
            "Il empêche les courants marins"
        ],
        correct: 2,
        explanation: "Le phytoplancton réalise la photosynthèse. Il produit de la matière organique et constitue la base de nombreuses chaînes alimentaires marines."
    },
    {
        question: "Pourquoi l'énergie disponible diminue-t-elle généralement le long d'une chaîne alimentaire ?",
        answers: [
            "Toute l'énergie est transformée en matière",
            "Une partie de l'énergie est dissipée sous forme de chaleur",
            "Les prédateurs ne mangent jamais",
            "L'énergie disparaît complètement"
        ],
        correct: 1,
        explanation: "À chaque niveau trophique, une partie de l'énergie est utilisée par les organismes et dissipée sous forme de chaleur."
    },
    {
        question: "Lequel de ces éléments est un facteur abiotique du milieu marin ?",
        answers: [
            "La présence de poissons",
            "Le nombre de coraux",
            "La température de l'eau",
            "La quantité de plancton"
        ],
        correct: 2,
        explanation: "Un facteur abiotique est un élément non vivant de l'environnement, comme la température, la lumière ou la salinité."
    },
    {
        question: "Pourquoi la biodiversité est-elle importante pour un écosystème marin ?",
        answers: [
            "Elle permet aux espèces de toutes vivre au même endroit",
            "Elle contribue au fonctionnement et à la stabilité de l'écosystème",
            "Elle empêche les changements environnementaux",
            "Elle supprime les relations alimentaires"
        ],
        correct: 1,
        explanation: "Une biodiversité importante favorise le fonctionnement des écosystèmes et peut contribuer à leur résistance face aux perturbations."
    },
    {
        question: "Que peut provoquer un excès de nutriments dans l'eau de mer ?",
        answers: [
            "Une eutrophisation pouvant entraîner un manque d'oxygène",
            "Une disparition immédiate du sel",
            "Une augmentation systématique de la biodiversité",
            "Une baisse de la température de l'eau"
        ],
        correct: 0,
        explanation: "Un excès de nutriments peut provoquer une forte multiplication des algues. Leur décomposition consomme de l'oxygène et peut perturber la vie marine."
    }
];


/* ==========================================
   VARIABLES DU QUIZ
========================================== */

let exploreCurrentQuestion = 0;
let exploreGameScore = 0;


/* ==========================================
   AFFICHER UNE QUESTION
========================================== */

function displayExploreQuestion() {

    const number = document.getElementById("exploreQuestionNumber");
    const score = document.getElementById("exploreScore");
    const progress = document.getElementById("exploreProgress");
    const question = document.getElementById("exploreQuestion");
    const options = document.getElementById("exploreOptions");
    const feedback = document.getElementById("exploreFeedback");
    const nextButton = document.getElementById("exploreNext");
    const result = document.getElementById("exploreResult");

    if (!number || !score || !progress || !question || !options) {
        console.error("Un ou plusieurs éléments du quiz sont introuvables dans index.html.");
        return;
    }

    const current = exploreQuestions[exploreCurrentQuestion];

    number.textContent =
        `QUESTION ${exploreCurrentQuestion + 1} / ${exploreQuestions.length}`;

    score.textContent = `Score : ${exploreGameScore}`;

    progress.style.width =
        `${((exploreCurrentQuestion + 1) / exploreQuestions.length) * 100}%`;

    question.textContent = current.question;

    options.innerHTML = "";

    feedback.textContent = "";
    feedback.className = "";
    feedback.hidden = true;

    nextButton.hidden = true;
    result.hidden = true;

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "game-option";
        button.textContent = answer;

        button.addEventListener("click", function () {
            answerExploreGame(index);
        });

        options.appendChild(button);

    });

}


/* ==========================================
   VERIFIER LA REPONSE
========================================== */

function answerExploreGame(selectedIndex) {

    const current = exploreQuestions[exploreCurrentQuestion];

    const options = document.querySelectorAll(".game-option");
    const feedback = document.getElementById("exploreFeedback");
    const nextButton = document.getElementById("exploreNext");
    const score = document.getElementById("exploreScore");

    options.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === current.correct) {

        exploreGameScore++;

        options[selectedIndex].classList.add("correct");

        feedback.textContent =
            "Bonne réponse ! " + current.explanation;

        feedback.className = "correct-feedback";

    } else {

        options[selectedIndex].classList.add("incorrect");

        options[current.correct].classList.add("correct");

        feedback.textContent =
            "Ce n'est pas la bonne réponse. " + current.explanation;

        feedback.className = "incorrect-feedback";

    }

    feedback.hidden = false;

    score.textContent = `Score : ${exploreGameScore}`;

    nextButton.hidden = false;

    if (exploreCurrentQuestion === exploreQuestions.length - 1) {
        nextButton.textContent = "Voir mon résultat";
    } else {
        nextButton.textContent = "Question suivante";
    }

}


/* ==========================================
   PASSER A LA QUESTION SUIVANTE
========================================== */

function nextExploreQuestion() {

    exploreCurrentQuestion++;

    if (exploreCurrentQuestion < exploreQuestions.length) {

        displayExploreQuestion();

    } else {

        showExploreResult();

    }

}


/* ==========================================
   AFFICHER LE RESULTAT FINAL
========================================== */

function showExploreResult() {

    const question = document.getElementById("exploreQuestion");
    const options = document.getElementById("exploreOptions");
    const feedback = document.getElementById("exploreFeedback");
    const nextButton = document.getElementById("exploreNext");
    const result = document.getElementById("exploreResult");
    const finalScore = document.getElementById("exploreFinalScore");
    const finalMessage = document.getElementById("exploreFinalMessage");

    question.textContent = "Quiz terminé !";

    options.innerHTML = "";

    feedback.hidden = true;
    nextButton.hidden = true;

    result.hidden = false;

    finalScore.textContent =
        `${exploreGameScore} / ${exploreQuestions.length}`;

    if (exploreGameScore === exploreQuestions.length) {

        finalMessage.textContent =
            "Excellent ! Tu maîtrises très bien les notions de biologie marine. Bravo !";

    } else if (exploreGameScore >= 4) {

        finalMessage.textContent =
            "Très bon travail ! Tu as de bonnes connaissances en SVT.";

    } else if (exploreGameScore >= 2) {

        finalMessage.textContent =
            "C'est un bon début ! Relis les explications pour progresser.";

    } else {

        finalMessage.textContent =
            "Continue à apprendre ! Chaque question est une occasion de découvrir la biologie marine.";

    }

}


/* ==========================================
   RECOMMENCER LE QUIZ
========================================== */

function restartExploreGame() {

    exploreCurrentQuestion = 0;
    exploreGameScore = 0;

    displayExploreQuestion();

}


/* ==========================================
   LANCEMENT AUTOMATIQUE DU QUIZ
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    displayExploreQuestion();

});
