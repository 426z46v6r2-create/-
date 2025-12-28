// Hero Content Patch - Stable 2-Line Revert
(function () {
    const CONTENT = {
        he: {
            title: "יפית שמעון טואטי - משרד עורכי דין",
            subtitle: "מעל 16 שנות מומחיות בחוזים, נדל״ן וירושה בגישה אנושית ונחושה",
            cta: "צור קשר",
            fontClass: "font-rubik"
        },
        en: {
            title: "Yafit Shimon Touati - Law Office",
            subtitle: "16+ years of expertise in contracts, real estate, and inheritance – a human approach with professional determination",
            cta: "Contact Us",
            fontClass: "font-montserrat"
        },
        fr: {
            title: "Yafit Shimon Touati - Cabinet d'Avocats",
            subtitle: "Plus de 16 ans d'expertise en contrats, immobilier et successions – une approche humaine avec une détermination professionnelle",
            cta: "Nous Contacter",
            fontClass: "font-montserrat"
        }
    };

    function getLanguage() {
        const lang = document.documentElement.lang || 'he';
        return ['he', 'en', 'fr'].includes(lang) ? lang : 'he';
    }

    function createGlassHero(lang) {
        const data = CONTENT[lang];
        const wrapper = document.createElement('div');
        wrapper.className = 'hero-glass-wrapper';
        wrapper.id = 'hero-glass-patch';

        const overlay = document.createElement('div');
        overlay.className = 'hero-glass-overlay';
        wrapper.appendChild(overlay);

        const container = document.createElement('div');
        container.className = 'hero-glass-container';

        const card = document.createElement('div');
        card.className = `glass-card ${data.fontClass}`;

        const h1 = document.createElement('h1');
        h1.className = `glass-h1`;
        h1.textContent = data.title;

        const p = document.createElement('p');
        p.className = `glass-subtitle`;
        p.textContent = data.subtitle;

        const btn = document.createElement('a');
        btn.href = '#contact';
        btn.className = `glass-btn`;
        btn.textContent = data.cta;

        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(btn);

        container.appendChild(card);
        wrapper.appendChild(container);

        return wrapper;
    }

    function applyPatch() {
        const main = document.querySelector('main');
        if (!main) return;
        const aboutSection = document.getElementById('about');

        if (aboutSection) {
            const existingPatch = document.getElementById('hero-glass-patch');
            if (existingPatch) existingPatch.remove();

            const oldHero = aboutSection.previousElementSibling;
            if (oldHero && oldHero.tagName !== 'SCRIPT' && oldHero.tagName !== 'STYLE' && oldHero.tagName !== 'A') {
                const lang = getLanguage();
                const newHero = createGlassHero(lang);
                oldHero.style.display = 'none';
                oldHero.classList.add('hidden-by-patch');
                main.insertBefore(newHero, aboutSection);
            } else {
                const lang = getLanguage();
                const newHero = createGlassHero(lang);
                main.insertBefore(newHero, aboutSection);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyPatch);
    } else {
        applyPatch();
    }

    setInterval(() => {
        if (!document.getElementById('hero-glass-patch') && document.getElementById('about')) {
            applyPatch();
        }
    }, 1000);
})();
