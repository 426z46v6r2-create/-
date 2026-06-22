# Project Overview: Yafit Shimon Touati – Law Office

## 1. Introduction
This is a static website project for "Yafit Shimon Touati – Law Office". It is built using HTML, CSS, and JavaScript, with no build step required for deployment (files are served directly).

**Tech Stack:**
*   **Frontend**: HTML5, CSS3, Vanilla JavaScript.
*   **Styling**: Custom CSS (located in `assets/`) and potential tailwind-like utility classes observed in CSS files.
*   **Assets**: Images and icons located in `assets/`.
*   **Deployment**: Ready for static hosting (e.g., Cloudflare Pages, Netlify).

## 2. Key Entry Points
*   **`index.html`**: The main homepage (Hebrew). Contains the Hero section, About, Practice Areas, and Contact form.
*   **`firm-principles.html` / `-en.html` / `-fr.html`**: "Firm Principles" page in Hebrew, English, and French.
*   **`philosophy.html` / `-en.html` / `-fr.html`**: "Philosophy" page in Hebrew, English, and French.
*   **`privacy-policy.html`**, **`terms-of-use.html`**, **`accessibility-statement.html`**: Legal pages in multiple languages.

## 3. Directory Structure & File Descriptions

### Root Directory
| File | Description |
| :--- | :--- |
| `index.html` | **Main Entry Point**. Homepage layout and content. |
| `firm-principles*.html` | Content pages for firm values/principles. |
| `philosophy*.html` | Content pages for the firm's philosophy. |
| `privacy-policy*.html` | Privacy policy documents. |
| `terms-of-use*.html` | Terms of use documents. |
| `accessibility-statement*.html` | Accessibility compliance statements. |
| `article*.html` | Article/Blog post templates or specific articles. |
| `favicon.png` | Site favicon. |
| `wrangler.toml` | Configuration for Cloudflare Pages deployment. |

### `assets/` Directory (Key Files)
Contains all static resources, scripts, and stylesheets.

| File | Description |
| :--- | :--- |
| `mobile-perfection.css` | **Critical**. specialized CSS for mobile responsiveness and recent fixes (profile photo, logo). |
| `hero-fix.css` | CSS overrides specifically for the Hero section. |
| `index-BVrhfsOn.css` | Main compiled/bundled CSS file. |
| `index-MeVdLpLX*.js` | Main application JavaScript bundles. |
| `contact-form.js` (implied) | Logic for the contact form (handled within main JS bundles). |
| `*.jpg`, `*.png` | Images for the attorney profile (`yafit-portrait...`), practice areas icons, and hero backgrounds. |
| `fonts/` (if present) | Web font files (though Google Fonts links are in HTML). |

## 4. Configuration
*   **`wrangler.toml`**: Specifies Cloudflare Pages settings (output directory `dist` or root).
*   **`robots.txt`**: (If present) SEO crawling rules.
*   **`sitemap.xml`**: (If present) Site map for search engines.

## 5. Notes for Reviewer
*   **Mobile Fixes**: Recent work focused on `assets/mobile-perfection.css` to fix profile photo cropping (`object-position`) and logo visibility on mobile.
*   **Localization**: The site supports HE (default), EN, FR via separate HTML files.
*   **No Build Process**: This is a "what you see is what you get" static site structure.
