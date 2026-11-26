
function reveler() {
  

    const message = document.getElementById("message");

    message.innerText =
    "🔎 Enquête ouverte ! La prochaine étape : découvrir ce qui se passe réellement dans tes articulations.";

    message.style.animation = "apparition 0.6s ease";
}

const questions = [
    {
        question: "Quel liquide se trouve dans nos articulations ?",
        answers: ["A. Le sang", "B. Le liquide synovial", "C. La salive"],
        correct: 1,
        explanation: "Le liquide synovial lubrifie les articulations."
    },
    {
        question: "Qui a étudié le craquement des doigts pendant 50 ans ?",
        answers: ["A. Donald Unger", "B. Louis Pasteur", "C. Albert Einstein"],
        correct: 0,
        explanation: "Donald Unger a étudié cette habitude pendant 50 ans."
    },
    {
        question: "Le craquement des doigts provoque-t-il l'arthrose ?",
        answers: ["A. Oui, toujours", "B. Aucun lien causal n'est établi", "C. Oui, après quelques jours"],
        correct: 1,
        explanation: "Les études n'ont pas établi de lien causal avec l'arthrose."
    }
];

let numero = 0;
let score = 0;

function afficherQuestion() {
    const q = questions[numero];

    document.getElementById("question").innerText = q.question;

    const zone = document.getElementById("answers");
    zone.innerHTML = "";

    q.answers.forEach((reponse, i) => {
        const bouton = document.createElement("button");
        bouton.innerText = reponse;
        bouton.onclick = () => repondre(i);
        zone.appendChild(bouton);
    });

    document.getElementById("feedback").innerText = "";
    document.getElementById("next-button").hidden = true;
    document.getElementById("progress-text").innerText =
        `QUESTION ${numero + 1} / 3`;
    document.getElementById("progress-fill").style.width =
        ((numero + 1) / 3 * 100) + "%";
}

function repondre(i) {
    const q = questions[numero];
    const boutons = document.querySelectorAll("#answers button");

    boutons.forEach(b => b.disabled = true);

    if (i === q.correct) {
        score++;
        document.getElementById("feedback").innerText =
            "✅ Bonne réponse ! " + q.explanation;
    } else {
        document.getElementById("feedback").innerText =
            "❌ Mauvaise réponse. " + q.explanation;
    }

    document.getElementById("next-button").hidden = false;
}

function questionSuivante() {
    numero++;

    if (numero < 3) {
        afficherQuestion();
    } else {
        document.getElementById("question-box").hidden = true;
        document.getElementById("quiz-finish").hidden = false;
        document.getElementById("final-score").innerText =
            "Ton score : " + score + " / 3";
    }
}

function recommencer() {
    numero = 0;
    score = 0;
    document.getElementById("question-box").hidden = false;
    document.getElementById("quiz-finish").hidden = true;
    afficherQuestion();
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("question-box")) {
        afficherQuestion();
    }
});
