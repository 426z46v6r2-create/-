/* ============================================
   CONTROLLED LINE BREAKS FOR HERO H1
   Yafit Shimon Touati Law Office
   ============================================ */

/* 
   This script adds controlled line breaks to the hero H1 heading
   based on screen size and language.
   
   Desktop (1024px+): Single line (enforced by CSS white-space: nowrap)
   Mobile/Tablet (< 1024px): Controlled break after comma
*/

(function () {
    'use strict';

    // Wait for DOM to be ready
    function init() {
        const heroH1 = document.querySelector('#hero h1');
        if (!heroH1) {
            // If not found, try again after a short delay
            setTimeout(init, 100);
            return;
        }

        // Get current language
        const lang = document.documentElement.getAttribute('lang') || 'he';

        // Store original text
        const originalTexts = {
            he: 'יפית שמעון טואטי, משרד עורכי דין',
            en: 'Yafit Shimon-Touati, Law Office',
            fr: 'Yafit Shimon Touati, Cabinet d\'Avocats'
        };

        // Function to apply line breaks based on screen size
        function applyLineBreaks() {
            const width = window.innerWidth;
            const currentLang = document.documentElement.getAttribute('lang') || 'he';
            const text = originalTexts[currentLang] || heroH1.textContent;

            if (width < 1024) {
                // Mobile/Tablet: Add controlled break after comma
                if (currentLang === 'he') {
                    // Hebrew: "יפית שמעון טואטי," + break + "משרד עורכי דין"
                    heroH1.innerHTML = 'יפית שמעון טואטי,<br>משרד עורכי דין';
                } else if (currentLang === 'en') {
                    // English: "Yafit Shimon-Touati," + break + "Law Office"
                    heroH1.innerHTML = 'Yafit Shimon-Touati,<br>Law Office';
                } else if (currentLang === 'fr') {
                    // French: "Yafit Shimon Touati," + break + "Cabinet d'Avocats"
                    heroH1.innerHTML = 'Yafit Shimon Touati,<br>Cabinet d\'Avocats';
                }
            } else {
                // Desktop: Single line (no break)
                heroH1.textContent = text;
            }
        }

        // Apply on load
        // applyLineBreaks(); // DISABLED: Letting CSS handle this naturally

        /* 
        // Reapply on resize (debounced)
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(applyLineBreaks, 150);
        });

        // Watch for language changes
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    applyLineBreaks();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });
        */
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
