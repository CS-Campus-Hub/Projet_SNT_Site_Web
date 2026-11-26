

/* ==========================================
   BIOMARINE — SCRIPT GÉNÉRAL
========================================== */


/* ==========================================
   FENÊTRE EN SAVOIR PLUS
========================================== */

function openInfo() {
    const infoBox = document.getElementById("infoBox");

    if (infoBox) {
        infoBox.classList.add("show");
    }
}

function closeInfo() {
    const infoBox = document.getElementById("infoBox");

    if (infoBox) {
        infoBox.classList.remove("show");
    }
}


/* ==========================================
   TEXTE SUPPLÉMENTAIRE
========================================== */

function showMore() {
    const moreText = document.getElementById("moreText");
    const button = document.querySelector(".read-more");

    if (!moreText || !button) return;

    moreText.classList.toggle("show");

    button.textContent = moreText.classList.contains("show")
        ? "Réduire −"
        : "En savoir plus +";
}


/* ==========================================
   CARTES INTERACTIVES — ACCUEIL
========================================== */

function openCard(type) {
    const popup = document.getElementById("cardPopup");
    const popupText = document.getElementById("popupText");

    if (!popup || !popupText) return;

    const contents = {
        research: `
            <p class="small-title">01 — RECHERCHER</p>
            <h2>Un travail scientifique</h2>
            <p>
                La chercheuse réalise des recherches afin de mieux
                comprendre les organismes marins et leur environnement.
                Elle peut analyser des échantillons, effectuer des
                expériences et étudier les résultats obtenus.
            </p>
            <p>
                Ces recherches permettent d'améliorer les connaissances
                scientifiques sur les océans et les espèces qui y vivent.
            </p>
        `,

        explore: `
            <p class="small-title">02 — EXPLORER</p>
            <h2>À la découverte des océans</h2>
            <p>
                Une chercheuse en biologie marine peut travailler
                directement sur le terrain, notamment en mer ou à bord
                d'un bateau scientifique.
            </p>
            <p>
                Elle peut observer différents milieux marins et
                participer à des missions scientifiques pour recueillir
                des informations.
            </p>
        `,

        observe: `
            <p class="small-title">03 — OBSERVER</p>
            <h2>Étudier les espèces marines</h2>
            <p>
                La chercheuse observe les organismes marins afin de
                comprendre leur comportement, leur développement,
                leur alimentation ou leurs relations avec leur milieu.
            </p>
            <p>
                Chaque observation peut apporter de nouvelles
                informations utiles aux scientifiques.
            </p>
        `,

        protect: `
            <p class="small-title">04 — PROTÉGER</p>
            <h2>Préserver les océans</h2>
            <p>
                Les recherches scientifiques peuvent contribuer à
                mieux comprendre les menaces qui pèsent sur les
                océans, comme la pollution ou le changement climatique.
            </p>
            <p>
                Les résultats obtenus peuvent aider à mieux protéger
                les écosystèmes marins et leur biodiversité.
            </p>
        `
    };

    if (!contents[type]) return;

    popupText.innerHTML = contents[type];
    popup.classList.add("show");
}


/* ==========================================
   FERMER LES CARTES
========================================== */

function closeCard() {
    document.getElementById("cardPopup")
        ?.classList.remove("show");
}


/* ==========================================
   CARTES INTERACTIVES — PRÉSENTATION
========================================== */

const presentationInfos = {
    observer: {
        title: "OBSERVER LES ESPÈCES",
        text: "La chercheuse observe les animaux et les organismes marins dans leur environnement naturel. Elle utilise des appareils photo, des caméras sous-marines et des instruments de mesure pour étudier leur comportement."
    },

    samples: {
        title: "PRÉLEVER DES ÉCHANTILLONS",
        text: "Elle collecte des échantillons d'eau, de sable, de plancton ou d'organismes marins. Ces prélèvements permettent ensuite de réaliser des études scientifiques en laboratoire."
    },

    analyze: {
        title: "ANALYSER LES RÉSULTATS",
        text: "Au laboratoire, elle examine les échantillons et analyse les données recueillies. Elle utilise des outils scientifiques et informatiques pour mieux comprendre les phénomènes observés."
    },

    communicate: {
        title: "COMMUNIQUER LES DÉCOUVERTES",
        text: "Elle présente les résultats de ses recherches à d'autres scientifiques, rédige des articles et participe parfois à des conférences pour partager ses découvertes."
    }
};


function openPresentationCard(type) {
    const popup = document.getElementById("presentationPopup");
    const popupText = document.getElementById("presentationPopupText");

    if (!popup || !popupText || !presentationInfos[type]) return;

    const info = presentationInfos[type];

    popupText.innerHTML = `
        <h2>${info.title}</h2>
        <p>${info.text}</p>
    `;

    popup.classList.add("show");
}


function closePresentationCard() {
    document.getElementById("presentationPopup")
        ?.classList.remove("show");
}


/* ==========================================
   FERMER LES FENÊTRES EN CLIQUANT À CÔTÉ
========================================== */

document.addEventListener("click", function(event) {
    const infoBox = document.getElementById("infoBox");
    const cardPopup = document.getElementById("cardPopup");
    const presentationPopup =
        document.getElementById("presentationPopup");

    if (event.target === infoBox) closeInfo();

    if (event.target === cardPopup) closeCard();

    if (event.target === presentationPopup) {
        closePresentationCard();
    }
});


/* ==========================================
   FERMER AVEC LA TOUCHE ÉCHAP
========================================== */

document.addEventListener("keydown", function(event) {
    if (event.key !== "Escape") return;

    closeInfo();
    closeCard();
    closePresentationCard();
});


/* ==========================================
   ANIMATION AU DÉFILEMENT
========================================== */

document.addEventListener("DOMContentLoaded", function() {

    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(
            ".discover, .explore, .final-section"
        ).forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    document.querySelectorAll(
        ".discover, .explore, .final-section"
    ).forEach(function(element) {
        element.classList.add("reveal");
        observer.observe(element);
    });

});
