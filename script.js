/* =========================================================
   MZ GARAGE × NO NAME GARAGE
   V4 PREMIUM JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    whatsapp: "595991358422",

    musicFile: "Cancion1.mp3"

};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initHeader();

    initMobileMenu();

    initScrollReveal();

    initActiveNavigation();

    initProjectCarousel();

    initGallery();

    initLightbox();

    initWhatsAppServices();

    initWhatsAppForm();

    initMusic();

    initVideos();

    initCurrentYear();

    initDate();

    initSmoothLinks();

});


/* =========================================================
   PRELOADER
========================================================= */

function initPreloader() {

    const preloader =
        document.getElementById("preloader");

    const bar =
        document.getElementById("loadingBar");

    const percent =
        document.getElementById("loadingPercent");

    const text =
        document.getElementById("loadingText");

    if (!preloader || !bar || !percent) {
        return;
    }

    const preloaderSeenKey = "mzGaragePreloaderSeen";

    try {
        if (sessionStorage.getItem(preloaderSeenKey)) {
            preloader.classList.add("hide");
            document.body.classList.add("page-loaded");
            return;
        }
    } catch {}

    const messages = [

        "INITIALIZING SYSTEM",

        "CHECKING ENGINEERING",

        "LOADING PROJECTS",

        "PREPARING GARAGE",

        "SYSTEM READY"

    ];

    let progress = 0;

    let finished = false;

    const update = () => {

        bar.style.width = `${progress}%`;

        percent.textContent =
            `${progress}%`;

        const index =
            Math.min(
                messages.length - 1,
                Math.floor(
                    progress /
                    (100 / messages.length)
                )
            );

        if (text) {
            text.textContent =
                messages[index];
        }

    };


    const interval =
        setInterval(() => {

            if (progress < 90) {

                progress +=
                    Math.random() * 8 + 2;

                progress =
                    Math.min(progress, 90);

                update();

            }

        }, 100);


    const finish = () => {

        if (finished) {
            return;
        }

        finished = true;

        try {
            sessionStorage.setItem(preloaderSeenKey, "true");
        } catch {}

        clearInterval(interval);

        progress = 100;

        update();

        setTimeout(() => {

            preloader.classList.add("hide");

            document.body.classList.add(
                "page-loaded"
            );

        }, 350);

    };


    window.addEventListener(
        "load",
        () => {

            setTimeout(
                finish,
                300
            );

        },
        { once: true }
    );


    setTimeout(
        finish,
        4500
    );

}


/* =========================================================
   HEADER
========================================================= */

function initHeader() {

    const header =
        document.getElementById("siteHeader");

    if (!header) {
        return;
    }

    const updateHeader = () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const toggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");

    if (!toggle || !nav) {
        return;
    }


    toggle.addEventListener(
        "click",
        () => {

            const active =
                toggle.classList.toggle("active");

            nav.classList.toggle(
                "active",
                active
            );

            document.body.classList.toggle(
                "menu-open",
                active
            );

            toggle.setAttribute(
                "aria-expanded",
                String(active)
            );

        }
    );


    nav.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    toggle.classList.remove(
                        "active"
                    );

                    nav.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            "[data-aos]"
        );

    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    elements.forEach(
        element => {

            observer.observe(element);

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    if (
        !links.length ||
        !sections.length
    ) {
        return;
    }


    const setActive = id => {

        links.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                `#${id}`
            );

        });

    };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            setActive(
                                entry.target.id
                            );

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section => {

            observer.observe(section);

        }
    );

}


/* =========================================================
   PROJECT CAROUSEL
========================================================= */

function initProjectCarousel() {

    const track =
        document.getElementById(
            "projectsTrack"
        );

    const prev =
        document.getElementById(
            "projectsPrev"
        );

    const next =
        document.getElementById(
            "projectsNext"
        );

    const progress =
        document.querySelector(
            ".carousel-progress span"
        );

    if (!track) {
        return;
    }


    const getAmount = () => {

        const card =
            track.querySelector(
                ".project-card"
            );

        if (!card) {
            return 500;
        }

        return card.offsetWidth + 25;

    };


    const scrollByAmount = direction => {

        track.scrollBy({

            left:
                getAmount() *
                direction,

            behavior: "smooth"

        });

    };


    prev?.addEventListener(
        "click",
        () => scrollByAmount(-1)
    );

    next?.addEventListener(
        "click",
        () => scrollByAmount(1)
    );


    const updateProgress = () => {

        if (!progress) {
            return;
        }

        const max =
            track.scrollWidth -
            track.clientWidth;

        if (max <= 0) {
            progress.style.width = "100%";
            return;
        }

        const value =
            (
                track.scrollLeft /
                max
            ) * 100;

        progress.style.width =
            `${Math.max(12, value)}%`;

    };


    track.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();

}


/* =========================================================
   GALLERY
========================================================= */

function initGallery() {

    const track =
        document.getElementById(
            "galleryTrack"
        );

    const prev =
        document.getElementById(
            "galleryPrev"
        );

    const next =
        document.getElementById(
            "galleryNext"
        );

    const dots =
        document.getElementById(
            "galleryDots"
        );

    if (!track) {
        return;
    }


    const cards =
        [...track.querySelectorAll(
            ".gallery-card"
        )];


    const getAmount = () => {

        const card = cards[0];

        if (!card) {
            return 500;
        }

        return card.offsetWidth + 20;

    };


    prev?.addEventListener(
        "click",
        () => {

            track.scrollBy({

                left: -getAmount(),

                behavior: "smooth"

            });

        }
    );


    next?.addEventListener(
        "click",
        () => {

            track.scrollBy({

                left: getAmount(),

                behavior: "smooth"

            });

        }
    );


    if (dots) {

        cards.forEach(
            (_, index) => {

                const dot =
                    document.createElement(
                        "button"
                    );

                dot.type = "button";

                dot.className =
                    "gallery-dot";

                if (index === 0) {
                    dot.classList.add(
                        "active"
                    );
                }

                dot.setAttribute(
                    "aria-label",
                    `Ir a imagen ${index + 1}`
                );

                dot.addEventListener(
                    "click",
                    () => {

                        track.scrollTo({

                            left:
                                index *
                                getAmount(),

                            behavior: "smooth"

                        });

                    }
                );

                dots.appendChild(dot);

            }
        );

    }


    const updateDots = () => {

        if (!dots) {
            return;
        }

        const current =
            Math.round(
                track.scrollLeft /
                getAmount()
            );

        dots.querySelectorAll(
            ".gallery-dot"
        ).forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === current
                );

            }
        );

    };


    track.addEventListener(
        "scroll",
        updateDots,
        { passive: true }
    );

}


/* =========================================================
   LIGHTBOX
========================================================= */

function initLightbox() {

    const lightbox =
        document.getElementById(
            "imageLightbox"
        );

    const image =
        document.getElementById(
            "lightboxImage"
        );

    const title =
        document.getElementById(
            "lightboxTitle"
        );

    const close =
        document.getElementById(
            "lightboxClose"
        );

    const buttons =
        document.querySelectorAll(
            ".gallery-image-btn"
        );

    if (
        !lightbox ||
        !image ||
        !buttons.length
    ) {
        return;
    }


    const open = button => {

        const src =
            button.dataset.image;

        const text =
            button.dataset.title || "";

        image.src = src;

        image.alt = text;

        if (title) {
            title.textContent = text;
        }

        lightbox.classList.add(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    };


    const closeLightbox = () => {

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    };


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => open(button)
            );

        }
    );


    close?.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {
                closeLightbox();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {
                closeLightbox();
            }

        }
    );

}


/* =========================================================
   SERVICE BUTTONS
========================================================= */

function initWhatsAppServices() {

    const buttons =
        document.querySelectorAll(
            "[data-service]"
        );

    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const service =
                        button.dataset.service;

                    const select =
                        document.getElementById(
                            "tipoServicio"
                        );

                    if (select) {

                        [
                            ...select.options
                        ].forEach(option => {

                            if (
                                option.textContent.trim() ===
                                service
                            ) {

                                select.value =
                                    option.value;

                            }

                        });

                    }

                }
            );

        }
    );

}


/* =========================================================
   WHATSAPP FORM
========================================================= */

function initWhatsAppForm() {

    const form =
        document.getElementById(
            "whatsappForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const nombre =
                getValue("nombre");

            const telefono =
                getValue("telefono");

            const vehiculo =
                getValue("vehiculo");

            const servicio =
                getValue("tipoServicio");

            const fecha =
                getValue("fecha");

            const hora =
                getValue("hora");

            const mensaje =
                getValue("mensaje");


            if (
                !nombre ||
                !telefono ||
                !vehiculo ||
                !servicio
            ) {

                alert(
                    "Por favor completá los campos obligatorios."
                );

                return;

            }


            let text =
                "Hola MZ Garage × No Name Garage,%0A%0A";

            text +=
                "*NUEVA CONSULTA DE PROYECTO*%0A%0A";

            text +=
                `*Nombre:* ${encodeURIComponent(nombre)}%0A`;

            text +=
                `*Teléfono:* ${encodeURIComponent(telefono)}%0A`;

            text +=
                `*Vehículo:* ${encodeURIComponent(vehiculo)}%0A`;

            text +=
                `*Servicio:* ${encodeURIComponent(servicio)}%0A`;


            if (fecha) {

                text +=
                    `*Fecha:* ${encodeURIComponent(fecha)}%0A`;

            }


            if (hora) {

                text +=
                    `*Hora:* ${encodeURIComponent(hora)}%0A`;

            }


            if (mensaje) {

                text +=
                    `%0A*Detalles:*%0A${encodeURIComponent(mensaje)}%0A`;

            }


            const url =
                `https://wa.me/${CONFIG.whatsapp}?text=${text}`;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   HELPERS
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();

}


/* =========================================================
   MUSIC
========================================================= */

function initMusic() {

    const audio =
        document.getElementById(
            "backgroundMusic"
        );

    const button =
        document.getElementById(
            "musicToggleBtn"
        );

    if (!audio || !button) {
        return;
    }


    audio.volume = .22;


    button.addEventListener(
        "click",
        async () => {

            try {

                if (
                    audio.paused
                ) {

                    await audio.play();

                    button.classList.add(
                        "playing"
                    );

                    button.innerHTML =
                        '<i class="fa-solid fa-volume-high"></i>';

                    button.setAttribute(
                        "aria-label",
                        "Desactivar música"
                    );

                    button.setAttribute(
                        "aria-pressed",
                        "true"
                    );

                } else {

                    audio.pause();

                    button.classList.remove(
                        "playing"
                    );

                    button.innerHTML =
                        '<i class="fa-solid fa-volume-xmark"></i>';

                    button.setAttribute(
                        "aria-label",
                        "Activar música"
                    );

                    button.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                }

            } catch (error) {

                console.warn(
                    "No se pudo reproducir el audio:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   VIDEOS
========================================================= */

function initVideos() {

    const videos =
        document.querySelectorAll(
            ".project-card video"
        );

    if (!videos.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        const video =
                            entry.target;


                        if (
                            entry.isIntersecting
                        ) {

                            video.play()
                                .catch(
                                    () => {}
                                );

                        } else {

                            video.pause();

                        }

                    }
                );

            },
            {
                threshold: .35
            }
        );


    videos.forEach(
        video => {

            observer.observe(video);

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const year =
        document.getElementById(
            "currentYear"
        );

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   DATE
========================================================= */

function initDate() {

    const input =
        document.getElementById(
            "fecha"
        );

    if (!input) {
        return;
    }

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    input.min =
        `${year}-${month}-${day}`;

}


/* =========================================================
   SMOOTH LINKS
========================================================= */

function initSmoothLinks() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );

}