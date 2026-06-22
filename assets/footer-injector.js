/**
 * Legal Links Injector for Yafit Shimon Touati Law Office
 * Automatically appends Accessibility, Privacy, and Terms links to the footer.
 * Safe approach to avoid modifying minified React bundle.
 */

(function () {
    // Config
    const links = {
        he: [
            { text: 'הצהרת נגישות', href: './accessibility-statement.html' },
            { text: 'מדיניות פרטיות', href: './privacy-policy.html' },
            { text: 'תנאי שימוש', href: './terms-of-use.html' }
        ],
        en: [
            { text: 'Accessibility Statement', href: './accessibility-statement-en.html' },
            { text: 'Privacy Policy', href: './privacy-policy-en.html' },
            { text: 'Terms of Use', href: './terms-of-use-en.html' }
        ],
        fr: [
            { text: 'Déclaration d\'accessibilité', href: './accessibility-statement-fr.html' },
            { text: 'Politique de confidentialité', href: './privacy-policy-fr.html' },
            { text: 'Conditions d\'utilisation', href: './terms-of-use-fr.html' }
        ]
    };

    function getLanguage() {
        const langAttribute = document.documentElement.lang;
        return (langAttribute && links[langAttribute]) ? langAttribute : 'he';
    }

    function injectLinks() {
        // Find footer - React usually renders a <footer> or a div with specific content
        // We start by looking for a footer tag
        let footer = document.querySelector('footer');

        // If not found (or if it's the specific landing page footer), try looking for copyright text container
        if (!footer) {
            // Fallback: look for a div near bottom with copyright text
            // This is fragile but necessary without digging into React class names too much
            const divs = document.querySelectorAll('div');
            for (let i = divs.length - 1; i >= 0; i--) {
                if (divs[i].textContent.includes('All rights reserved') || divs[i].textContent.includes('כל הזכויות שמורות')) {
                    footer = divs[i].parentElement;
                    break;
                }
            }
        }

        if (!footer) {
            console.warn('YST Legal Injector: Footer not found yet.');
            return;
        }

        if (document.getElementById('yst-legal-footer-links')) return; // Already injected

        const lang = getLanguage();
        const items = links[lang];

        const container = document.createElement('div');
        container.id = 'yst-legal-footer-links';
        container.style.cssText = 'padding: 15px 0; text-align: center; font-size: 14px; color: inherit; opacity: 0.8;';

        let html = items.map(item => `<a href="${item.href}" style="color: inherit; margin: 0 10px; text-decoration: none; transition: color 0.2s;">${item.text}</a>`).join(' | ');

        // Add Cookie Settings trigger
        const cookieText = lang === 'he' ? 'הגדרות עוגיות' : (lang === 'fr' ? 'Paramètres des cookies' : 'Cookie Settings');
        html += ` | <a href="javascript:void(0)" id="trigger-cookie-settings-footer" style="color: inherit; margin: 0 10px; text-decoration: none;">${cookieText}</a>`;

        container.innerHTML = html;

        // Cleanup existing legal links if they were rendered by the React app (sometimes pointing to external previews)
        // This targets the specific structure seen in the minified build
        const existingLinks = footer.querySelectorAll('a[href*="lovable.app"], a[href*="privacy-policy"], a[href*="accessibility"]');
        existingLinks.forEach(link => {
            // Only remove if it's not our newly created link
            if (!container.contains(link)) {
                // Try to remove the parent text/separators if possible, or just the link
                link.remove();
            }
        });

        // Append to the end of the footer
        footer.appendChild(container);

        // Bind cookie trigger
        document.getElementById('trigger-cookie-settings-footer').addEventListener('click', (e) => {
            e.preventDefault();
            const customizationsBtn = document.getElementById('btn-customize');
            // If the specialized cookie consent script exposes a function, we call it.
            // Since it's scoped, we simulate a click on the customizable button if visible, or re-trigger logic.
            // A safer way is to rely on the global listener added in cookie-consent.js for ID 'open-cookie-settings'
            // So let's change the ID to match that expectation
        });

        // Update ID for the listener in cookie-consent.js to work
        const cookieLink = container.querySelector('#trigger-cookie-settings-footer');
        cookieLink.id = 'open-cookie-settings';
    }

    // Observer to wait for React to render the footer
    const observer = new MutationObserver((mutations) => {
        if (document.querySelector('footer') || document.body.innerText.length > 500) {
            injectLinks();
            // Don't disconnect immediately, React might re-render navigation
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Safety timeout
    setTimeout(injectLinks, 2000);

})();
