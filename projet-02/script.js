(function () {
  const STORAGE_KEY = "infoIntoxAvis";

  const libellesAvis = {
    vrai: "Oui, les jeux rendent violent",
    faux: "Non, c'est une idée reçue",
    nuancer: "Il faut nuancer"
  };

  const questions = [
    {
      texte: "Selon la résolution de l'APA publiée en 2020, peut-on scientifiquement attribuer des actes de violence graves (comme des fusillades) aux jeux vidéo violents ?",
      choix: [
        { id: "oui", label: "Oui" },
        { id: "non", label: "Non" },
        { id: "action", label: "Seulement pour les jeux d'action" }
      ],
      bonne: "non",
      ok: "Exact. L'APA prévient que ce n'est pas scientifiquement fondé. La violence a des causes complexes, et pointer uniquement les jeux détourne l'attention des vraies causes.",
      ko: "Pas tout à fait. En 2020, l'APA indique qu'attribuer des actes de violence graves aux jeux vidéo n'est pas scientifiquement fondé."
    },
    {
      texte: "En 2019, l'étude de Przybylski et Weinstein (Oxford Internet Institute) auprès de 1 004 adolescents a trouvé :",
      choix: [
        { id: "fort", label: "Un lien fort entre jeux violents et agressivité" },
        { id: "aucun", label: "Aucun lien avec le comportement agressif rapporté par les parents" },
        { id: "garcons", label: "Que seuls les garçons deviennent agressifs" }
      ],
      bonne: "aucun",
      ok: "Oui. Aucun lien n'apparaît entre le temps passé sur des jeux violents et le comportement agressif rapporté par les parents.",
      ko: "L'étude d'Oxford ne trouve pas de lien entre le temps passé sur des jeux violents et le comportement agressif rapporté par les parents."
    },
    {
      texte: "Le « trouble du jeu vidéo » reconnu par l'OMS concerne :",
      choix: [
        { id: "violence", label: "La violence que les jeux provoqueraient chez les joueurs" },
        { id: "usage", label: "Un usage excessif, avec perte de contrôle, qui n'affecte qu'une petite partie des joueurs" },
        { id: "tous", label: "Tous les adolescents qui jouent tous les jours" }
      ],
      bonne: "usage",
      ok: "C'est ça. L'OMS parle d'un usage excessif (perte de contrôle, jeu qui envahit la vie quotidienne), pas d'un trouble de la violence.",
      ko: "Attention : l'OMS ne classe pas les jeux comme une cause de violence. Le trouble du jeu vidéo désigne un usage excessif, et il ne touche qu'une petite partie des joueurs."
    },
    {
      texte: "À quoi sert le système PEGI indiqué sur les jeux ?",
      choix: [
        { id: "interdire", label: "À interdire tous les jeux violents" },
        { id: "age", label: "À indiquer l'âge conseillé et le type de contenu" },
        { id: "niveau", label: "À mesurer le niveau de difficulté du jeu" }
      ],
      bonne: "age",
      ok: "Parfait. Le PEGI aide à choisir un jeu adapté à son âge et signale certains contenus (violence, langage, etc.).",
      ko: "Le PEGI n'interdit pas tous les jeux violents et ne mesure pas la difficulté : il indique l'âge conseillé et le type de contenu."
    }
  ];

  let indexQuestion = 0;
  let score = 0;
  let repondu = false;

  function $(id) {
    return document.getElementById(id);
  }

  function lireAvis() {
    try {
      if (!window.localStorage) {
        return null;
      }
      const valeur = window.localStorage.getItem(STORAGE_KEY);
      if (valeur === "vrai" || valeur === "faux" || valeur === "nuancer") {
        return valeur;
      }
    } catch (erreur) {
      return null;
    }
    return null;
  }

  function ecrireAvis(valeur) {
    try {
      if (!window.localStorage) {
        return false;
      }
      window.localStorage.setItem(STORAGE_KEY, valeur);
      return true;
    } catch (erreur) {
      return false;
    }
  }

  function messageComparaison() {
    const avis = lireAvis();
    if (!avis) {
      return "Vous n'aviez pas encore donné votre avis au début du dossier.";
    }
    if (avis === "nuancer") {
      return "Votre avis de départ était déjà le bon : il faut nuancer.";
    }
    if (avis === "faux") {
      return "Votre avis de départ (« Non, c'est une idée reçue ») allait dans le bon sens. Le dossier ajoute une nuance importante : trop jouer peut quand même nuire à la santé.";
    }
    return "Votre avis de départ était « Oui, les jeux rendent violent ». Les sources montrent plutôt que cette affirmation est fausse sur la violence, tout en restant à nuancer sur la santé.";
  }

  function initialiserSondage() {
    const boutons = document.querySelectorAll("[data-poll]");
    const feedback = $("poll-feedback");
    if (!feedback || boutons.length === 0) {
      return;
    }

    function afficherChoix(valeur) {
      boutons.forEach(function (b) {
        b.classList.toggle("selected", b.getAttribute("data-poll") === valeur);
      });
      feedback.hidden = false;
      feedback.textContent = "Avis enregistré : " + libellesAvis[valeur] + ". Passez ensuite à la page « Ce que dit la science », puis comparez avec le bilan.";
    }

    const deja = lireAvis();
    if (deja) {
      afficherChoix(deja);
    }

    boutons.forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        const valeur = bouton.getAttribute("data-poll");
        ecrireAvis(valeur);
        afficherChoix(valeur);
      });
    });
  }

  function initialiserCartes() {
    const cartes = document.querySelectorAll("[data-flip]");
    if (cartes.length === 0) {
      return;
    }

    cartes.forEach(function (carte) {
      const label = carte.querySelector(".flip-label");
      if (label && !label.getAttribute("data-origine")) {
        label.setAttribute("data-origine", label.textContent);
      }

      carte.addEventListener("click", function () {
        const ouverte = carte.classList.toggle("is-open");
        carte.setAttribute("aria-expanded", ouverte ? "true" : "false");
        if (label) {
          label.textContent = ouverte ? "Ce que dit la science" : label.getAttribute("data-origine");
        }
      });
    });
  }

  function initialiserVerdict() {
    const bouton = $("btn-verdict");
    const boite = $("verdict-box");
    if (!bouton || !boite) {
      return;
    }

    bouton.addEventListener("click", function () {
      boite.hidden = false;
      boite.innerHTML = "<p class=\"seal\">Verdict : à nuancer</p>" +
        "<p>Cette affirmation est <strong>fausse en ce qui concerne la violence</strong> : les jeux vidéo ne transforment pas un joueur en personne violente. Elle doit être <strong>nuancée sur le plan de la santé</strong> : trop jouer peut perturber le sommeil, la concentration et la vie quotidienne. Il faut aussi respecter les âges conseillés (PEGI).</p>" +
        "<p>" + messageComparaison() + "</p>";
      bouton.textContent = "Verdict révélé";
    });
  }

  function badgeScore(points, total) {
    if (points === total) {
      return "Détective certifié";
    }
    if (points === total - 1) {
      return "Enquêteur aguerri";
    }
    if (points >= 2) {
      return "Enquêteur en herbe";
    }
    return "Apprenti détective";
  }

  function afficherQuestion() {
    const panneau = $("quiz-panel");
    const finale = $("quiz-final");
    const etape = $("quiz-step");
    const barre = $("quiz-progress");
    if (!panneau || !finale || !etape || !barre) {
      return;
    }

    finale.hidden = true;
    panneau.hidden = false;
    repondu = false;

    const total = questions.length;
    const question = questions[indexQuestion];
    etape.textContent = "Question " + (indexQuestion + 1) + " sur " + total;
    barre.style.width = String((indexQuestion / total) * 100) + "%";

    let html = "<p><strong>" + question.texte + "</strong></p><div class=\"quiz-choices\">";
    question.choix.forEach(function (choix) {
      html += "<button type=\"button\" data-quiz=\"" + choix.id + "\">" + choix.label + "</button>";
    });
    html += "</div><div id=\"quiz-explain\" class=\"quiz-explain\" hidden></div>";
    html += "<button type=\"button\" class=\"quiz-next\" id=\"quiz-next\" hidden>Question suivante</button>";
    panneau.innerHTML = html;

    const boutons = panneau.querySelectorAll("[data-quiz]");
    const explain = $("quiz-explain");
    const suivant = $("quiz-next");

    boutons.forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        if (repondu) {
          return;
        }
        repondu = true;
        const choix = bouton.getAttribute("data-quiz");
        const bon = choix === question.bonne;
        if (bon) {
          score += 1;
        }

        boutons.forEach(function (b) {
          const id = b.getAttribute("data-quiz");
          b.disabled = true;
          if (id === question.bonne) {
            b.classList.add("selected");
          }
        });

        explain.hidden = false;
        explain.className = "quiz-explain " + (bon ? "ok" : "ko");
        explain.textContent = (bon ? "Bonne réponse. " : "Pas tout à fait. ") + (bon ? question.ok : question.ko);
        suivant.hidden = false;
        suivant.textContent = indexQuestion === total - 1 ? "Voir mon score" : "Question suivante";
        barre.style.width = String(((indexQuestion + 1) / total) * 100) + "%";
      });
    });

    suivant.addEventListener("click", function () {
      if (indexQuestion === total - 1) {
        afficherScore();
      } else {
        indexQuestion += 1;
        afficherQuestion();
      }
    });
  }

  function afficherScore() {
    const panneau = $("quiz-panel");
    const finale = $("quiz-final");
    const etape = $("quiz-step");
    const total = questions.length;
    if (!panneau || !finale || !etape) {
      return;
    }

    panneau.hidden = true;
    finale.hidden = false;
    etape.textContent = "Résultat du quiz";
    finale.innerHTML = "<p class=\"badge-score\">" + badgeScore(score, total) + " · " + score + " / " + total + "</p>" +
      "<p>Vous avez obtenu <strong>" + score + " bonne" + (score > 1 ? "s" : "") + " réponse" + (score > 1 ? "s" : "") + "</strong> sur " + total + ".</p>" +
      "<p>" + messageComparaison() + "</p>" +
      "<button type=\"button\" id=\"quiz-retry\">Recommencer le quiz</button>";

    const retry = $("quiz-retry");
    if (retry) {
      retry.addEventListener("click", function () {
        indexQuestion = 0;
        score = 0;
        afficherQuestion();
      });
    }
  }

  function initialiserQuiz() {
    if (!$("quiz-app")) {
      return;
    }
    afficherQuestion();
  }

  function conseilHabitudes() {
    const sommeilEl = $("habit-sommeil");
    const pausesEl = $("habit-pauses");
    const pegiEl = $("habit-pegi");
    const boite = $("habit-conseil");
    if (!sommeilEl || !pausesEl || !pegiEl || !boite) {
      return;
    }

    const sommeil = Number(sommeilEl.value);
    const pauses = Number(pausesEl.value);
    const pegi = Number(pegiEl.value);
    const phrases = [];

    if (sommeil === 0) {
      phrases.push("Essayer d'arrêter de jouer un peu avant de vous coucher aiderait votre sommeil : l'écran et l'excitation d'une partie retardent souvent l'endormissement.");
    } else if (sommeil === 1) {
      phrases.push("Vous faites déjà attention le soir. Si vous le pouvez, éloignez encore un peu plus la dernière partie de l'heure du coucher.");
    } else {
      phrases.push("Très bonne habitude : garder un temps calme avant de dormir protège vraiment le sommeil.");
    }

    if (pauses === 0) {
      phrases.push("Pensez à souffler pendant une longue session : une courte pause de temps en temps repose les yeux et aide à garder le contrôle du temps de jeu.");
    } else if (pauses === 1) {
      phrases.push("Les pauses de temps en temps, c'est déjà un bon réflexe. Les rendre un peu plus régulières serait encore mieux.");
    } else {
      phrases.push("Bravo pour les pauses régulières : c'est l'un des gestes les plus utiles pour jouer sans s'épuiser.");
    }

    if (pegi === 0) {
      phrases.push("Jeter un coup d'œil au pictogramme PEGI avant de choisir un jeu permet de savoir s'il est adapté à votre âge et d'éviter certains contenus trop durs.");
    } else if (pegi === 1) {
      phrases.push("Vous regardez parfois le PEGI : en prendre l'habitude à chaque nouveau jeu est un geste simple et utile.");
    } else {
      phrases.push("Respecter le PEGI, c'est choisir un jeu adapté à son âge. Continuez comme ça.");
    }

    if (sommeil + pauses + pegi === 6) {
      phrases.push("Dans l'ensemble, vos habitudes sont déjà très saines. L'essentiel est de les garder, surtout en période de devoirs ou d'examens.");
    } else if (sommeil + pauses + pegi <= 2) {
      phrases.push("Si le jeu prend trop de place, ou si vous peinez à vous arrêter, parlez-en à l'infirmière du lycée ou à un adulte de confiance.");
    }

    boite.innerHTML = "<p>" + phrases.join("</p><p>") + "</p>";
  }

  function initialiserHabitudes() {
    const ids = ["habit-sommeil", "habit-pauses", "habit-pegi"];
    let pret = true;
    ids.forEach(function (id) {
      const champ = $(id);
      if (!champ) {
        pret = false;
        return;
      }
      champ.addEventListener("input", conseilHabitudes);
    });
    if (pret) {
      conseilHabitudes();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initialiserSondage();
    initialiserCartes();
    initialiserVerdict();
    initialiserQuiz();
    initialiserHabitudes();
  });
})();
