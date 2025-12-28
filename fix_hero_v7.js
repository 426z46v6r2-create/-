
import fs from 'fs';

const filePath = './assets/index-MeVdLpLX-v7.js';
let content = fs.readFileSync(filePath, 'utf8');

// The marker for start of s2 (it was part of a const chain)
const startMarker = ', s2 = () => {';
// The marker for end of s2 (followed by Zv)
const endMarker = '}, Zv =';

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Start marker not found');
    process.exit(1);
}

const endIndex = content.indexOf(endMarker, startIndex);
if (endIndex === -1) {
    console.error('End marker not found');
    process.exit(1);
}

// The new corrected code for s2
const newS2Code = `, s2 = () => { const { t: e, dir: t } = Xt(), k = () => { const r = document.getElementById("contact"); if (r) { const s = r.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top: s, behavior: "smooth" }) } }; return c.jsx("section", { id: "hero", className: "relative min-h-[calc(100vh-80px)] md:min-h-[85vh] flex items-center bg-background overflow-hidden", dir: t, children: c.jsxs("div", { className: "container mx-auto px-6 lg:px-12 py-12 md:py-0 w-full", children: [c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center", children: [c.jsxs("div", { className: \`flex flex-col space-y-8 animate-fade-in-up order-2 \${t === "rtl" ? "md:order-1 text-right items-start" : "md:order-1 text-left items-start"}\`, children: [c.jsxs("div", { className: "space-y-4", children: [c.jsx("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-rubik text-foreground font-semibold leading-[1.1] tracking-tight", children: e("hero.name") }), c.jsx("h2", { className: "text-3xl md:text-4xl font-rubik text-muted-foreground font-normal", children: e("hero.firm") })] }), c.jsx("p", { className: "text-xl md:text-2xl font-rubik text-muted-foreground/80 font-normal max-w-lg leading-relaxed", children: e("hero.subtitle") }), c.jsx("div", { className: "pt-4", children: c.jsxs(Tt, { onClick: k, size: "lg", className: "bg-accent hover:bg-accent/90 text-white shadow-gold text-lg px-10 py-7 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_hsl(41_63%_51%/0.3)] hover:-translate-y-1", children: [e("hero.cta"), c.jsx(ub, { className: \`\${t === "rtl" ? "mr-2" : "ml-2"}\`, size: 20 })] }) })] }), c.jsx("div", { className: \`relative h-[50vh] md:h-[75vh] w-full rounded-2xl overflow-hidden order-1 \${t === "rtl" ? "md:order-2" : "md:order-2"}\`, children: c.jsx("img", { src: o2, alt: "Attorney Yafit Shimon Touati", className: "w-full h-full object-cover shadow-2xl transition-transform duration-700 hover:scale-105" }) })] })] }) }`;

// Replace the content
const newContent = content.substring(0, startIndex) + newS2Code + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully replaced s2 in v7.js');
