/**
 * Cookie Consent Manager for Yafit Shimon Touati Law Office Website
 * Compliant with Israeli Privacy Protection Law (Amendment 13) and best practices.
 */

(function () {
    const COOKIE_NAME = 'yst_cookie_consent';
    const CONSENT_EXPIRY_DAYS = 180; // 6 months

    // Dictionary for multi-language support
    const content = {
        he: {
            text: 'אתר זה משתמש בעוגיות (Cookies) לשיפור החוויה, ניתוח נתונים והתאמה אישית.',
            policyLink: './privacy-policy.html',
            policyText: 'למידע נוסף',
            acceptAll: 'אישור הכל',
            rejectNonEssential: 'דחיית עוגיות לא חיוניות',
            customize: 'התאמה אישית',
            save: 'שמירה והמשך',
            categories: {
                necessary: { title: 'חיוני (תמיד פעיל)', desc: 'נדרש לפעילות תקינה של האתר.' },
                functional: { title: 'פונקציונלי', desc: 'שמירת העדפות כמו שפה.' },
                analytics: { title: 'אנליטיקה', desc: 'ניתוח סטטיסטי אנונימי לשיפור האתר.' },
                marketing: { title: 'שיווק', desc: 'עוגיות לצרכי שיווק מותאם.' }
            }
        },
        en: {
            text: 'This site uses cookies to improve your experience, analyze usage, and personalize content.',
            policyLink: './privacy-policy-en.html',
            policyText: 'Learn more',
            acceptAll: 'Accept all',
            rejectNonEssential: 'Reject non-essential cookies',
            customize: 'Customize',
            save: 'Save & Continue',
            categories: {
                necessary: { title: 'Strictly Necessary', desc: 'Required for the site to function.' },
                functional: { title: 'Functional', desc: 'Remember choices like language.' },
                analytics: { title: 'Analytics', desc: 'Anonymous usage statistics.' },
                marketing: { title: 'Marketing', desc: 'Cookies for marketing purposes.' }
            }
        },
        fr: {
            text: 'Ce site utilise des cookies pour améliorer votre expérience, analyser les données et personnaliser le contenu.',
            policyLink: './privacy-policy-fr.html',
            policyText: 'En savoir plus',
            acceptAll: 'Tout accepter',
            rejectNonEssential: 'Refuser les cookies non essentiels',
            customize: 'Personnaliser',
            save: 'Enregistrer',
            categories: {
                necessary: { title: 'Strictement nécessaires', desc: 'Requis pour le fonctionnement du site.' },
                functional: { title: 'Fonctionnel', desc: 'Mémoriser les choix comme la langue.' },
                analytics: { title: 'Analytique', desc: 'Statistiques d\'utilisation anonymes.' },
                marketing: { title: 'Marketing', desc: 'Cookies à des fins marketing.' }
            }
        }
    };

    // Detect language using the same localStorage mechanism the site header uses
    function getLanguage() {
        const storedLang = localStorage.getItem("language");
        if (storedLang && content[storedLang]) {
            return storedLang;
        }
        return 'he';
    }

    // Function to re-render texts if language changes
    function getTranslations() {
        const lang = getLanguage();
        return {
            lang,
            t: content[lang],
            isRtl: lang === 'he'
        };
    }

    let { lang, t, isRtl } = getTranslations();

    function getConsent() {
        const stored = localStorage.getItem(COOKIE_NAME);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                if (data.timestamp) {
                    const daysSinceConsent = (new Date().getTime() - data.timestamp) / (1000 * 60 * 60 * 24);
                    if (daysSinceConsent > CONSENT_EXPIRY_DAYS) {
                        localStorage.removeItem(COOKIE_NAME);
                        return null;
                    }
                }
                return data;
            } catch (e) {
                localStorage.removeItem(COOKIE_NAME);
                return null;
            }
        }
        return null;
    }

    function setConsent(consentData) {
        const data = {
            ...consentData,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(COOKIE_NAME, JSON.stringify(data));
        applyConsent(data);
        hideBanner();
    }

    function applyConsent(data) {
        // Find all blocked scripts with type="text/plain" and data-category
        const scripts = document.querySelectorAll('script[type="text/plain"][data-category]');
        scripts.forEach(script => {
            const category = script.getAttribute('data-category');
            if (data[category]) {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }

                // Copy other attributes
                Array.from(script.attributes).forEach(attr => {
                    if (attr.name !== 'type' && attr.name !== 'data-category') {
                        newScript.setAttribute(attr.name, attr.value);
                    }
                });

                script.parentNode.replaceChild(newScript, script);
            }
        });
    }

    function updateBannerTexts() {
        // Re-fetch translations
        const trans = getTranslations();
        lang = trans.lang;
        t = trans.t;
        isRtl = trans.isRtl;

        const banner = document.getElementById('yst-cookie-banner');
        if (banner) {
            banner.style.direction = isRtl ? 'rtl' : 'ltr';

            const pText = banner.querySelector('p');
            if (pText) {
                pText.innerHTML = `
                    ${t.text}
                    <a href="${t.policyLink}" target="_blank" style="color: #D4AF37; text-decoration: underline; margin: 0 5px;">${t.policyText}</a>
                `;
            }

            const btnCustomize = document.getElementById('btn-customize');
            if (btnCustomize) btnCustomize.textContent = t.customize;

            const btnReject = document.getElementById('btn-reject');
            if (btnReject) btnReject.textContent = t.rejectNonEssential;

            const btnAccept = document.getElementById('btn-accept');
            if (btnAccept) btnAccept.textContent = t.acceptAll;
        }

        const modal = document.getElementById('yst-cookie-modal');
        if (modal) {
            modal.style.direction = isRtl ? 'rtl' : 'ltr';
            // It's easier to just close and reopen the modal if they change lang while it's open, 
            // but the typical use case is changing lang while just the banner is open.
            // If they change lang with modal open, we can close it to force re-render next time.
            modal.remove();
        }
    }

    // UI Creation
    function createBanner() {
        if (document.getElementById('yst-cookie-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'yst-cookie-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 30px);
            max-width: 1200px;
            max-height: 45vh;
            overflow-y: auto;
            background: #fff;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
            padding: 20px;
            z-index: 9999;
            font-family: 'Rubik', sans-serif;
            direction: ${isRtl ? 'rtl' : 'ltr'};
            border-top: 4px solid #D4AF37; /* Accent Gold */
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;
            box-sizing: border-box;
        `;

        // Flexbox logic for responsive layout and WCAG contrast updates
        banner.innerHTML = `
            <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;">
                <div style="flex: 1; min-width: 250px;">
                    <p style="margin: 0; color: #1e293b; font-size: 15px; line-height: 1.5;">
                        ${t.text}
                        <a href="${t.policyLink}" target="_blank" style="color: #1e293b; text-decoration: underline; text-decoration-color: #D4AF37; text-decoration-thickness: 2px; margin: 0 5px; white-space: nowrap; font-weight: 500;">${t.policyText}</a>
                    </p>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: ${isRtl ? 'flex-end' : 'flex-start'};">
                    <button id="btn-customize" style="background: none; border: 1px solid #94a3b8; padding: 8px 16px; border-radius: 6px; cursor: pointer; color: #475569; font-size: 14px;">${t.customize}</button>
                    <button id="btn-reject" style="background: white; border: 1px solid #D4AF37; padding: 8px 16px; border-radius: 6px; cursor: pointer; color: #1e293b; font-size: 14px; font-weight: 500;">${t.rejectNonEssential}</button>
                    <button id="btn-accept" style="background: #D4AF37; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; color: #0f172a; font-size: 14px; font-weight: 600; box-shadow: 0 2px 5px rgba(212, 175, 55, 0.3);">${t.acceptAll}</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('btn-accept').onclick = () => setConsent({ necessary: true, functional: true, analytics: true, marketing: true });
        document.getElementById('btn-reject').onclick = () => setConsent({ necessary: true, functional: false, analytics: false, marketing: false });
        document.getElementById('btn-customize').onclick = showModal;

        // Watch for language changes on the HTML element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    updateBannerTexts();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }

    function showModal() {
        const existingModal = document.getElementById('yst-cookie-modal');
        if (existingModal) existingModal.remove();

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'yst-cookie-modal';
        modalOverlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 10000;
            display: flex; justify-content: center; align-items: center;
            direction: ${isRtl ? 'rtl' : 'ltr'};
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white; padding: 30px; border-radius: 12px; width: 90%; max-width: 500px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-height: 90vh; overflow-y: auto;
            font-family: 'Rubik', sans-serif;
        `;

        const toggles = ['functional', 'analytics', 'marketing'].map(cat => `
            <div style="margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <label style="font-weight: 600; font-size: 16px;">${t.categories[cat].title}</label>
                    <input type="checkbox" id="chk-${cat}" checked style="width: 18px; height: 18px; cursor: pointer;">
                </div>
                <p style="margin: 0; font-size: 13px; color: #64748b;">${t.categories[cat].desc}</p>
            </div>
        `).join('');

        modalContent.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 20px; color: #0f172a;">${t.customize}</h3>
            <div style="margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <label style="font-weight: 600; font-size: 16px; color: #64748b;">${t.categories.necessary.title}</label>
                    <input type="checkbox" checked disabled style="width: 18px; height: 18px; cursor: not-allowed;">
                </div>
                <p style="margin: 0; font-size: 13px; color: #64748b;">${t.categories.necessary.desc}</p>
            </div>
            ${toggles}
            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px;">
                <button id="btn-modal-save" style="background: #D4AF37; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; color: white; font-size: 14px; font-weight: 600;">${t.save}</button>
            </div>
        `;

        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.remove();
        });

        document.getElementById('btn-modal-save').onclick = () => {
            setConsent({
                necessary: true,
                functional: document.getElementById('chk-functional').checked,
                analytics: document.getElementById('chk-analytics').checked,
                marketing: document.getElementById('chk-marketing').checked
            });
            modalOverlay.remove();
        };
    }

    function hideBanner() {
        const banner = document.getElementById('yst-cookie-banner');
        if (banner) banner.remove();
    }

    // Initialization
    function init() {
        const consent = getConsent();
        if (!consent) {
            setTimeout(createBanner, 1000); // Delay slightly for UX
        } else {
            applyConsent(consent);
        }

        // Add event listener for footer link trigger (if exists)
        document.addEventListener('click', function (e) {
            if (e.target.id === 'open-cookie-settings') {
                e.preventDefault();
                showModal();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();