
/* ==========================================================
   FANTA CASTRONUOVO 2026/2027
   Main JavaScript
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       1. INTRO ANIMATA CON LOGO
    ====================================================== */

    const introStyle = document.createElement("style");

    introStyle.textContent = `
        .fc-intro {
            position: fixed;
            inset: 0;
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            overflow: hidden;
            background:
                radial-gradient(ellipse at center, rgba(18, 55, 99, .75), transparent 65%),
                linear-gradient(145deg, #071426, #0b1d36 55%, #06101f);
            color: white;
            opacity: 1;
            visibility: visible;
            transition: opacity .85s ease, visibility .85s ease;
        }

        .fc-intro.hide {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .fc-intro::before,
        .fc-intro::after {
            content: "";
            position: absolute;
            width: 380px;
            height: 380px;
            border: 1px solid rgba(255,255,255,.07);
            border-radius: 50%;
            animation: introPulse 4s ease-in-out infinite;
        }

        .fc-intro::after {
            width: 520px;
            height: 520px;
            animation-delay: .8s;
        }

        .fc-intro-content {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            flex-direction: column;
            text-align: center;
            padding: 25px;
            animation: introAppear 1s ease both;
        }

        .fc-intro-logo {
            width: 165px;
            height: 165px;
            object-fit: contain;
            margin-bottom: 28px;
            filter: drop-shadow(0 10px 30px rgba(0,0,0,.35));
            animation: logoAppear 1.2s cubic-bezier(.2,.8,.2,1) both;
        }

        .fc-intro-line {
            width: 55px;
            height: 3px;
            margin-bottom: 22px;
            border-radius: 10px;
            background: linear-gradient(90deg, #d5b45b, #fff0b0);
            animation: lineAppear 1s ease .4s both;
        }

        .fc-intro-title {
            margin: 0;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: clamp(25px, 5vw, 38px);
            font-weight: 800;
            letter-spacing: 4px;
            text-transform: uppercase;
            animation: textAppear .9s ease .5s both;
        }

        .fc-intro-subtitle {
            margin: 13px 0 0;
            color: #d5b45b;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            animation: textAppear .9s ease .7s both;
        }

        .fc-intro-motto {
            margin-top: 28px;
            color: rgba(255,255,255,.78);
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            letter-spacing: .7px;
            animation: textAppear .9s ease .9s both;
        }

        .fc-intro-loader {
            position: absolute;
            bottom: 55px;
            width: 130px;
            height: 2px;
            overflow: hidden;
            background: rgba(255,255,255,.13);
            border-radius: 10px;
        }

        .fc-intro-loader::after {
            content: "";
            display: block;
            width: 45%;
            height: 100%;
            background: #d5b45b;
            animation: introLoading 2.1s ease-in-out forwards;
        }

        .fc-intro-version {
            position: absolute;
            bottom: 23px;
            color: rgba(255,255,255,.35);
            font-size: 9px;
            letter-spacing: 2px;
        }

        @keyframes introAppear {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes logoAppear {
            from {
                opacity: 0;
                transform: scale(.65) rotate(-8deg);
            }
            to {
                opacity: 1;
                transform: scale(1) rotate(0);
            }
        }

        @keyframes textAppear {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineAppear {
            from { opacity: 0; width: 0; }
            to { opacity: 1; width: 55px; }
        }

        @keyframes introPulse {
            0%, 100% { transform: scale(.92); opacity: .35; }
            50% { transform: scale(1.08); opacity: .8; }
        }

        @keyframes introLoading {
            from { transform: translateX(-110%); }
            to { transform: translateX(240%); }
        }

        @media (max-width: 480px) {
            .fc-intro-logo {
                width: 140px;
                height: 140px;
            }

            .fc-intro-motto {
                font-size: 11px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .fc-intro *,
            .fc-intro::before,
            .fc-intro::after {
                animation: none !important;
                transition: none !important;
            }
        }
    `;

    document.head.appendChild(introStyle);

    // Mostra l'introduzione una sola volta per sessione
    let showIntro = true;

    try {
        showIntro = sessionStorage.getItem("fc-intro-shown") !== "true";
    } catch (error) {
        showIntro = true;
    }

    if (showIntro) {
        const intro = document.createElement("div");

        intro.className = "fc-intro";

        intro.innerHTML = `
            <div class="fc-intro-content">

                <img
                    src="assets/img/logo.png"
                    alt="Logo Fanta Castronuovo"
                    class="fc-intro-logo"
                >

                <div class="fc-intro-line"></div>

                <h1 class="fc-intro-title">
                    Fanta Castronuovo
                </h1>

                <p class="fc-intro-subtitle">
                    Stagione 2026 / 2027
                </p>

                <p class="fc-intro-motto">
                    Una passione. Una lega. Una sola gloria.
                </p>

            </div>

            <div class="fc-intro-loader"></div>

            <div class="fc-intro-version">
                IL CAMPIONATO DEI CAMPIONI
            </div>
        `;

        document.body.appendChild(intro);

        try {
            sessionStorage.setItem("fc-intro-shown", "true");
        } catch (error) {
            // Il sito funziona anche senza sessionStorage
        }

        const logo = intro.querySelector(".fc-intro-logo");

        // Se il logo non viene trovato, nasconde l'introduzione
        logo.addEventListener("error", () => {
            console.warn("Logo non trovato: controlla il percorso assets/img/logo.png");
        });

        // Apertura del sito dopo l'animazione
        setTimeout(() => {
            intro.classList.add("hide");

            setTimeout(() => {
                intro.remove();
            }, 900);

        }, 2600);
    }


    /* ======================================================
       2. MENU MOBILE
    ====================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", event => {
            if (
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* ======================================================
       3. ANNO AUTOMATICO NEL FOOTER
    ====================================================== */

    document.querySelectorAll("#current-year, [data-year]")
        .forEach(element => {
            element.textContent = new Date().getFullYear();
        });


    /* ======================================================
       4. ANIMAZIONI ALLO SCORRIMENTO
    ====================================================== */

    const animatedElements = document.querySelectorAll(`
        .section-heading,
        .info-item,
        .newspaper-feature,
        .newspaper-card,
        .communication-preview,
        .communication-card,
        .regulation-banner,
        .regulation-article,
        .regulation-table,
        .prize-table
    `);

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        animatedElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    } else {

        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* ======================================================
       5. LIGHTBOX GIORNALI
    ====================================================== */

    const lightboxStyle = document.createElement("style");

    lightboxStyle.textContent = `
        .newspaper-lightbox {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 25px;
            background: rgba(5, 12, 25, .96);
            opacity: 0;
            visibility: hidden;
            transition: .3s ease;
        }

        .newspaper-lightbox.active {
            opacity: 1;
            visibility: visible;
        }

        .newspaper-lightbox img {
            max-width: 95%;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 8px;
            transform: scale(.96);
            transition: transform .3s ease;
        }

        .newspaper-lightbox.active img {
            transform: scale(1);
        }

        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 25px;
            width: 45px;
            height: 45px;
            border: 1px solid rgba(255,255,255,.3);
            border-radius: 50%;
            background: rgba(255,255,255,.1);
            color: white;
            font-size: 28px;
            cursor: pointer;
        }

        body.lightbox-open {
            overflow: hidden;
        }

        .newspaper-image img,
        .newspaper-card img,
        [data-lightbox] {
            cursor: zoom-in;
        }

        .reveal {
            opacity: 0;
            transform: translateY(25px);
            transition: opacity .7s ease, transform .7s ease;
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .reveal,
            .newspaper-lightbox,
            .newspaper-lightbox img {
                transition: none !important;
            }

            .reveal {
                opacity: 1;
                transform: none;
            }
        }
    `;

    document.head.appendChild(lightboxStyle);

    const lightbox = document.createElement("div");

    lightbox.className = "newspaper-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Visualizzazione giornale");

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Chiudi immagine">
            &times;
        </button>
        <img src="" alt="Giornale Fanta Castronuovo">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".lightbox-close");

    function openLightbox(image) {
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "Giornale Fanta Castronuovo";

        lightbox.classList.add("active");
        document.body.classList.add("lightbox-open");
        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.classList.remove("lightbox-open");
        lightboxImage.src = "";
    }

    document.querySelectorAll(`
        .newspaper-image img,
        .newspaper-card img,
        [data-lightbox]
    `).forEach(image => {
        image.addEventListener("click", () => openLightbox(image));
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });


    /* ======================================================
       6. INDICE REGOLAMENTO
    ====================================================== */

    const regulationArticles = document.querySelectorAll(
        ".regulation-article[id]"
    );

    const regulationLinks = document.querySelectorAll(
        ".regulation-index a"
    );

    if (
        regulationArticles.length &&
        regulationLinks.length &&
        "IntersectionObserver" in window
    ) {

        const articleObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const articleId = entry.target.id;

                    regulationLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${articleId}`
                        );

                    });

                }

            });

        }, {
            rootMargin: "-20% 0px -65% 0px"
        });

        regulationArticles.forEach(article => {
            articleObserver.observe(article);
        });
    }


    /* ======================================================
       7. SCORRIMENTO FLUIDO
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ======================================================
       8. HEADER DURANTE LO SCORRIMENTO
    ====================================================== */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 30);
        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

    }


    /* ======================================================
       9. DATA DI AGGIORNAMENTO
    ====================================================== */

    document.querySelectorAll("[data-last-update]").forEach(element => {

        element.textContent = new Date().toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    });


    console.log("Fanta Castronuovo 2026/2027 - sito inizializzato.");

});
