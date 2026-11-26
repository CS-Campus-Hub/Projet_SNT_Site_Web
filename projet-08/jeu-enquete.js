
/* =====================================================
   JEU : LE LABORATOIRE DES MYSTÈRES MARINS
===================================================== */

const mysteryQuestions = [
    {
        title: "Le mystère du récif",
        image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
        clue: "Des coraux perdent leurs couleurs. Quel phénomène pourrait expliquer cette observation ?",
        options: [
            "Une augmentation de la température de l'eau",
            "Une augmentation de la salinité uniquement",
            "Une disparition des courants marins"
        ],
        correct: 0,
        explanation: "Une hausse de la température de l'eau peut provoquer le blanchissement des coraux."
    },
    {
        title: "Le mystère des tortues",
        image: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg",
        clue: "Une tortue marine remonte régulièrement à la surface. Pourquoi ?",
        options: [
            "Pour boire de l'eau douce",
            "Pour respirer de l'air",
            "Pour changer de température"
        ],
        correct: 1,
        explanation: "Les tortues marines sont des reptiles : elles possèdent des poumons et doivent respirer à la surface."
    },
    {
        title: "Le mystère de l'eau verte",
        image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
        clue: "Une zone côtière devient verte à cause d'une forte multiplication d'algues. Quel phénomène peut en être la cause ?",
        options: [
            "L'eutrophisation",
            "La marée noire",
            "La diminution de la lumière"
        ],
        correct: 0,
        explanation: "L'eutrophisation est liée à un excès de nutriments dans l'eau, qui favorise la multiplication des algues."
    },
    {
        title: "Le mystère des poissons",
        image: "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg",
        clue: "Les poissons deviennent moins nombreux dans une zone où l'oxygène dissous diminue. Pourquoi ?",
        options: [
            "Ils ont besoin d'oxygène pour respirer",
            "Ils ne supportent pas la lumière",
            "Ils ne peuvent plus nager"
        ],
        correct: 0,
        explanation: "Les poissons utilisent l'oxygène dissous dans l'eau pour respirer. Une baisse importante peut menacer leur survie."
    }
];

let mysteryIndex = 0;
let mysteryScore = 0;
let mysteryAnswered = false;


/* =====================================================
   AFFICHER UNE ENQUÊTE
===================================================== */

function displayMystery() {

    const question = mysteryQuestions[mysteryIndex];

    document.getElementById("mysteryNumber").textContent =
        `ENQUÊTE ${mysteryIndex + 1} / ${mysteryQuestions.length}`;

    document.getElementById("mysteryProgress").style.width =
        `${((mysteryIndex + 1) / mysteryQuestions.length) * 100}%`;

    document.getElementById("mysteryImage").src = question.image;
    document.getElementById("mysteryImage").alt = question.title;

    document.getElementById("mysteryTitle").textContent = question.title;
    document.getElementById("mysteryClue").textContent = question.clue;

    const optionsContainer = document.getElementById("mysteryOptions");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "mystery-option";
        button.textContent = option;

        button.addEventListener("click", function () {
            answerMystery(index);
        });

        optionsContainer.appendChild(button);

    });

    document.getElementById("mysteryFeedback").textContent = "";
    document.getElementById("mysteryNext").hidden = true;
    document.getElementById("mysteryOptions").hidden = false;
    document.getElementById("mysteryResult").hidden = true;

    mysteryAnswered = false;
}


/* =====================================================
   VÉRIFIER LA RÉPONSE
===================================================== */

function answerMystery(answerIndex) {

    if (mysteryAnswered) return;

    mysteryAnswered = true;

    const question = mysteryQuestions[mysteryIndex];
    const buttons = document.querySelectorAll(".mystery-option");
    const feedback = document.getElementById("mysteryFeedback");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (answerIndex === question.correct) {

        mysteryScore++;

        feedback.textContent =
            "Bonne réponse ! " + question.explanation;

    } else {

        feedback.textContent =
            "Ce n'est pas la bonne réponse. " + question.explanation;

    }

    document.getElementById("mysteryNext").hidden = false;

    if (mysteryIndex === mysteryQuestions.length - 1) {
        document.getElementById("mysteryNext").textContent =
            "Voir mon résultat";
    } else {
        document.getElementById("mysteryNext").textContent =
            "Enquête suivante";
    }
}


/* =====================================================
   PASSER À L'ENQUÊTE SUIVANTE
===================================================== */

function nextMystery() {

    if (!mysteryAnswered) return;

    mysteryIndex++;

    if (mysteryIndex < mysteryQuestions.length) {

        displayMystery();

    } else {

        showMysteryResult();

    }
}


/* =====================================================
   AFFICHER LE RÉSULTAT FINAL
===================================================== */

function showMysteryResult() {

    document.getElementById("mysteryOptions").hidden = true;
    document.getElementById("mysteryNext").hidden = true;
    document.getElementById("mysteryFeedback").textContent = "";

    document.getElementById("mysteryTitle").textContent =
        "Enquête terminée !";

    document.getElementById("mysteryClue").textContent =
        "Tu as terminé les quatre mystères marins.";

    document.getElementById("mysteryFinalScore").textContent =
        `Ton score : ${mysteryScore} / ${mysteryQuestions.length}`;

    let message = "";

    if (mysteryScore === 4) {
        message = "Excellent ! Tu es une véritable enquêtrice des océans !";
    } else if (mysteryScore >= 2) {
        message = "Bravo ! Tu as de bonnes connaissances en biologie marine.";
    } else {
        message = "Continue à apprendre : chaque enquête te permet de progresser !";
    }

    document.getElementById("mysteryFinalMessage").textContent = message;

    document.getElementById("mysteryResult").hidden = false;

    document.getElementById("mysteryNumber").textContent =
        "ENQUÊTE TERMINÉE";
}


/* =====================================================
   RECOMMENCER LE JEU
===================================================== */

function restartMystery() {

    mysteryIndex = 0;
    mysteryScore = 0;
    mysteryAnswered = false;

    displayMystery();

}


/* =====================================================
   LANCEMENT DU JEU
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const game = document.getElementById("jeu-enquete");

    if (game) {
        displayMystery();
    }

});
