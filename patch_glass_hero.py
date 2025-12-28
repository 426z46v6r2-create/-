
import os
import re

input_file = './assets/index-MeVdLpLX-v7.js'
output_file = './assets/index-MeVdLpLX-v8.js'

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update e2 (Translations)
# We will match the whole e2 object and replace it with the new definition
# Current start: e2 = { he: { "nav.home":
# Current end: }, t2 =
# This pattern matches e2 = { ... }, t2 =
# We need to construct the new e2 string carefully.

new_e2_content = """e2 = { he: { "nav.home": "בית", "nav.about": "אודות", "nav.philosophy": "אני מאמין", "nav.firmPrinciples": "עקרונות המשרד", "nav.practice": "תחומי התמחות", "nav.contact": "צור קשר", "hero.name": "יפית שמעון טואטי", "hero.firm": "משרד עורכי דין", "hero.subtitle": "מעל 16 שנות ניסיון בדיני חוזים, נדל״ן וירושה", "hero.cta": "צור קשר", "hero.location": "נתניה / הרצליה", "about.preview": "משרד עורכי דין בוטיק המתמחה במתן ייעוץ משפטי אישי ומקצועי בתחומי המשפט האזרחי והמסחרי.", "about.readMore": "קרא/י עוד", "practice.title": "תחומי התמחות", "practice.subtitle": "שירותים משפטיים מקיפים המותאמים לצרכיך", "philosophy.title": "אני מאמין", "philosophy.subtitle": "הגישה שלי: מקצועיות, אנושיות ונחישות להגעה לפתרון מיטבי", "testimonials.title": "המלצות", "contact.title": "צור קשר", "contact.subtitle": "אשמח לעמוד לשירותך", "contact.name": "שם מלא", "contact.email": "דוא״ל", "contact.phone": "טלפון", "contact.message": "הודעה", "contact.urgency": "רמת דחיפות", "contact.urgency.low": "רגיל", "contact.urgency.medium": "דחוף", "contact.urgency.high": "דחוף מאוד", "contact.submit": "שלח", "contact.whatsapp": "שלח הודעה בוואטסאפ", "footer.hours": "שעות פתיחה: א׳-ה׳ 9:00-18:00", "footer.copyright": "© 2025 יפית שמעון טואטי. כל הזכויות שמורות." }, en: { "nav.home": "Home", "nav.about": "About", "nav.philosophy": "Our Philosophy", "nav.firmPrinciples": "Firm Principles", "nav.practice": "Practice Areas", "nav.contact": "Contact", "hero.name": "Yafit Shimon Touati", "hero.firm": "Law Firm", "hero.subtitle": "Over 16 years of experience in contract law, real estate and inheritance", "hero.cta": "Contact Us", "hero.location": "Netanya / Herzliya", "about.preview": "A boutique law office specializing in personalized and professional legal counsel in civil and commercial law.", "about.readMore": "Read More", "practice.title": "Practice Areas", "practice.subtitle": "Comprehensive legal services tailored to your needs", "philosophy.title": "Our Philosophy", "philosophy.subtitle": "Professionalism, Compassion, and Resolution", "testimonials.title": "Testimonials", "contact.title": "Contact Us", "contact.subtitle": "We're here to help", "contact.name": "Full Name", "contact.email": "Email", "contact.phone": "Phone (optional)", "contact.message": "Message", "contact.urgency": "Urgency Level", "contact.urgency.low": "Normal", "contact.urgency.medium": "Urgent", "contact.urgency.high": "Very Urgent", "contact.submit": "Submit", "contact.whatsapp": "Send WhatsApp Message", "footer.hours": "Hours: Sun-Thu 9:00-18:00", "footer.copyright": "© 2025 Yafit Shimon Touati. All rights reserved." }, fr: { "nav.home": "Accueil", "nav.about": "À propos", "nav.philosophy": "Notre Philosophie", "nav.firmPrinciples": "Principes du Cabinet", "nav.practice": "Domaines", "nav.contact": "Contact", "hero.name": "Yafit Shimon Touati", "hero.firm": "Cabinet d'Avocats", "hero.subtitle": "Plus de 16 ans d'expérience en droit des contrats, immobilier et successions", "hero.cta": "Nous Contacter", "hero.location": "Netanya / Herzliya", "about.preview": "Un cabinet d'avocats boutique spécialisé dans les conseils juridiques personnalisés.", "about.readMore": "En savoir plus", "practice.title": "Domaines de pratique", "practice.subtitle": "Services juridiques complets adaptés à vos besoins", "philosophy.title": "Notre philosophie", "philosophy.subtitle": "Professionnalisme, Compassion et Résolution", "testimonials.title": "Témoignages", "contact.title": "Contactez-nous", "contact.subtitle": "Nous sommes là pour vous aider", "contact.name": "Nom complet", "contact.email": "Email", "contact.phone": "Téléphone (optionnel)", "contact.message": "Message", "contact.urgency": "Niveau d'urgence", "contact.urgency.low": "Normal", "contact.urgency.medium": "Urgent", "contact.urgency.high": "Très urgent", "contact.submit": "Envoyer", "contact.whatsapp": "Envoyer un message WhatsApp", "footer.hours": "Horaires: Dim-Jeu 9:00-18:00", "footer.copyright": "© 2025 Yafit Shimon Touati. Tous droits réservés." } }"""

# Regex for e2 replacement
e2_pattern = re.compile(r'e2\s*=\s*\{.*?\}(?=\s*,\s*t2)', re.DOTALL)
content = e2_pattern.sub(new_e2_content, content)


# 2. Update s2 (Hero Component) with Glassmorphism
# We replace the entire s2 definition.
# Logic:
#   - Background image: o2
#   - Layout: flex, centering vertically.
#   - Content box alignment: 
#       rtl -> justify-start (right aligned in flex rtl context? No, wait. Flexbox depends on 'dir'.
#       If dir=rtl: flex-start is right? Yes.
#       Let's use absolute positioning or simple flex alignment?
#       User wants: RIGHT side for RTL, LEFT side for LTR.
#       If dir=rtl, justify-start is RIGHT? No, justify-start follows opacity. 
#       Wait, dir=rtl means start is Right. So `justify-start` puts content on Right.
#       If dir=ltr, start is Left. So `justify-start` puts content on Left.
#       The User request: Right for HE (RTL) -> Start. Left for EN (LTR) -> Start.
#       So `justify-start` works for BOTH if we rely on proper `dir` handling!
#       However, let's verify.
#       LTR: Start = Left. Correct.
#       RTL: Start = Right. Correct.
#       So simple `container flex items-center` with `justify-start` (default) is enough?
#       Wait, standard Tailwind container centers itself `mx-auto`. Inside it, we want alignment.
#       I'll use `justify-start` explicitly.
#   - Fonts: 
#       HE: 'Heebo' (font-heebo class).
#       EN/FR: 'Inter' (font-inter class).
#       We check `t === 'he'` for class assignment.

new_s2_content = """, s2 = () => { 
    const { t: e, dir: t, language: lg } = Xt(), 
    k = () => { 
        const r = document.getElementById("contact"); 
        if (r) { 
            const s = r.getBoundingClientRect().top + window.pageYOffset - 80; 
            window.scrollTo({ top: s, behavior: "smooth" }) 
        } 
    }; 
    
    // Determine font family based on language
    const fontClass = lg === 'he' ? 'font-heebo' : 'font-inter';
    
    return c.jsx("section", { 
        id: "hero", 
        className: "hero-glass-section relative min-h-[100vh] flex items-center", 
        dir: t, 
        style: { backgroundImage: `url(${o2})` },
        children: c.jsx("div", { 
            className: "container mx-auto px-6 lg:px-12 w-full h-full flex items-center",
            children: c.jsxs("div", { 
                className: `glass-card animate-fade-in-up ${fontClass}`, 
                children: [
                    c.jsx("h1", { 
                        className: "hero-title-name font-medium tracking-tight", 
                        children: e("hero.name") 
                    }), 
                    c.jsx("h2", { 
                        className: "hero-subtitle-firm font-light", 
                        children: e("hero.firm") 
                    }),
                    c.jsx("p", { 
                        className: "hero-desc-experience font-light", 
                        children: e("hero.subtitle") 
                    }), 
                    c.jsxs("button", { 
                        onClick: k, 
                        className: "glass-cta-btn", 
                        children: [
                            e("hero.cta"), 
                            c.jsx(ub, { className: `${t === "rtl" ? "mr-2" : "ml-2"}`, size: 20 })
                        ] 
                    })
                ] 
            }) 
        }) 
    }) 
}"""

# Flatten for JS file
new_s2_content = ' '.join(new_s2_content.split())
# Replace s2
s2_pattern = re.compile(r', s2 = \(\) => \{.+?\}, Zv =', re.DOTALL)
content = s2_pattern.sub(new_s2_content + ', Zv =', content)


# 3. Update xd (Logo Height)
# Pattern: className: `object-contain transition-all duration-300 ${n ? "h-14 md:h-[4.5rem]" : "h-[4.5rem] md:h-[5.5rem]"}`
# New:     className: `object-contain transition-all duration-300 ${n ? "h-16 md:h-[5.2rem]" : "h-[5.2rem] md:h-[6.3rem]"}`

# We'll use a specific replacement to avoid messing other things up.
logo_original = 'h-14 md:h-[4.5rem]" : "h-[4.5rem] md:h-[5.5rem]'
logo_new =      'h-16 md:h-[5.2rem]" : "h-[5.2rem] md:h-[6.3rem]'

if logo_original in content:
    content = content.replace(logo_original, logo_new)
else:
    print("Warning: Logo class pattern not found exactly as expected. Skipping logo update.")

# Write output
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully patched v7 to v8")
