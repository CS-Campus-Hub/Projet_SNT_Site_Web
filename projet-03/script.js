document.addEventListener("DOMContentLoaded", () => {
    initialiserMinuteur202020();
    afficherResumeIa();
});

function initialiserMinuteur202020() {
    const boutonDemarrer = document.getElementById("btn-minuteur-20");
    const boutonReset = document.getElementById("btn-reset-20");
    const affichage = document.getElementById("affichage-minuteur-20");
    const statut = document.getElementById("statut-minuteur-20");

    if (!boutonDemarrer || !affichage) return;

    const dureePause = 20;
    let tempsRestant = dureePause;
    let intervalle = null;

    function mettreAJourAffichage() {
        affichage.textContent = `${tempsRestant} s`;
    }

    function arreterMinuteur(messageStatut) {
        clearInterval(intervalle);
        intervalle = null;
        boutonDemarrer.textContent = "Démarrer la pause de 20 s";
        if (statut && messageStatut) {
            statut.textContent = messageStatut;
        }
    }

    boutonDemarrer.addEventListener("click", () => {
        if (intervalle) {
            arreterMinuteur("Minuteur mis en pause.");
            return;
        }

        if (tempsRestant <= 0) {
            tempsRestant = dureePause;
            mettreAJourAffichage();
        }

        boutonDemarrer.textContent = "Mettre en pause";
        if (statut) {
            statut.textContent = "Regardez un objet à environ 6 mètres (20 pieds)...";
        }

        intervalle = setInterval(() => {
            tempsRestant -= 1;
            mettreAJourAffichage();

            if (tempsRestant <= 0) {
                tempsRestant = 0;
                mettreAJourAffichage();
                arreterMinuteur("Pause terminée ! Vous pouvez reprendre.");
            }
        }, 1000);
    });

    if (boutonReset) {
        boutonReset.addEventListener("click", () => {
            tempsRestant = dureePause;
            mettreAJourAffichage();
            arreterMinuteur("Prêt pour une pause de 20 secondes.");
        });
    }
}

function afficherResumeIa() {
    const conteneurResume = document.getElementById("resume-ia");
    if (!conteneurResume) return;

    const outilsIa = ["Bolt AI", "Gemini"];
    conteneurResume.textContent = `Outils d'intelligence artificielle utilisés pour ce projet : ${outilsIa.join(" et ")}.`;
}