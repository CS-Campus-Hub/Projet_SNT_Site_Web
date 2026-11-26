function verifierQuiz(bonnesReponses, numero) {
    let score = 0;

    for (let i = 0; i < bonnesReponses.length; i++) {
        let choix = document.querySelector(
            'input[name="q' + numero + '_' + (i + 1) + '"]:checked'
        );

        if (choix && choix.value === bonnesReponses[i]) {
            score++;
        }
    }

    let resultat = document.getElementById("resultat" + numero);

    resultat.textContent = "Ton score : " + score + "/" + bonnesReponses.length + " — ";

    if (score === bonnesReponses.length) {
        resultat.textContent += "Bravo ! Excellent travail ! 🎉";
    } else if (score === 2) {
        resultat.textContent += "Très bien ! Tu y es presque ! 😊";
    } else {
        resultat.textContent += "Continue tes efforts, tu vas progresser ! 💪";
    }

    resultat.classList.remove("anim-score");
    void resultat.offsetWidth;
    resultat.classList.add("anim-score");
}

// Faire flotter le premier emoji du titre principal
const titrePrincipal = document.querySelector("header h1");
if (titrePrincipal) {
    const texte = titrePrincipal.textContent.trim();
    const premierEspace = texte.indexOf(" ");
    if (premierEspace > 0) {
        const emoji = texte.slice(0, premierEspace);
        const reste = texte.slice(premierEspace);
        titrePrincipal.innerHTML = `<span class="emoji-flottant">${emoji}</span>${reste}`;
    }
}

// Bouton remonter en haut en douceur
const btnHaut = document.createElement("button");
btnHaut.className = "btn-haut";
btnHaut.setAttribute("aria-label", "Remonter en haut");
btnHaut.textContent = "↑";
document.body.appendChild(btnHaut);

btnHaut.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Barre de progression + apparition du bouton remonter
window.addEventListener("scroll", () => {
    const barre = document.querySelector(".barre-progression");
    const hauteurTotale = document.documentElement.scrollHeight - window.innerHeight;
    const pourcentage = hauteurTotale > 0 ? (window.scrollY / hauteurTotale) * 100 : 0;

    if (barre) {
        barre.style.width = pourcentage + "%";
    }

    if (window.scrollY > 300) {
        btnHaut.classList.add("visible");
    } else {
        btnHaut.classList.remove("visible");
    }
});

// Reflet lumineux qui suit la souris sur chaque carte
document.querySelectorAll(".carte").forEach((carte) => {
    carte.addEventListener("mousemove", (e) => {
        const rect = carte.getBoundingClientRect();
        carte.style.setProperty("--x", (e.clientX - rect.left) + "px");
        carte.style.setProperty("--y", (e.clientY - rect.top) + "px");
    });
});

// Apparition fluide des sections au défilement + léger décalage sur les cartes
const sectionsAnimees = document.querySelectorAll("main section");
sectionsAnimees.forEach((sec) => sec.classList.add("revele"));

document.querySelectorAll(".cartes .carte").forEach((carte, index) => {
    carte.style.transitionDelay = `${index * 90}ms`;
});

const observateur = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.12 }
);

sectionsAnimees.forEach((sec) => observateur.observe(sec));