import re

HEADER_HTML = """    <header class="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-elegant">
        <div class="container mx-auto px-4 h-20 flex items-center justify-between" dir="rtl">
            <a href="index.html" class="flex items-center gap-3 hover:opacity-80 transition-all duration-300 cursor-pointer border-none bg-transparent pt-3 pb-1" aria-label="Yafit Shimon Touati Law Office - Home">
                <img src="./assets/logo-header-NlSIZIjz.png" alt="Yafit Shimon Touati Law Office Logo" class="object-contain transition-all duration-300 h-[3.5rem] md:h-[4.5rem]">
            </a>
            
            <nav class="hidden md:flex items-center gap-8">
                <a href="index.html" class="text-sm font-medium transition-colors border-none bg-transparent cursor-pointer text-foreground hover:text-accent">בית</a>
                <a href="index.html#about" class="text-sm font-medium transition-colors border-none bg-transparent cursor-pointer text-foreground hover:text-accent">אודות</a>
                <a href="philosophy.html" class="text-sm font-medium transition-colors border-none bg-transparent cursor-pointer text-foreground hover:text-accent">אני מאמין</a>
                <a href="index.html#firm-principles" class="text-sm font-medium transition-colors border-none bg-transparent cursor-pointer text-foreground hover:text-accent">עקרונות המשרד</a>
                <a href="index.html#practice-areas" class="text-sm font-medium transition-colors border-none bg-transparent cursor-pointer text-foreground hover:text-accent">תחומי התמחות</a>
                <a href="articles.html" class="text-sm font-medium transition-colors border-none bg-transparent cursor-pointer text-foreground hover:text-accent">מאמרים ופרסומים</a>
                <a href="index.html#contact" class="text-sm font-medium transition-colors border-none bg-transparent cursor-pointer text-foreground hover:text-accent">צור קשר</a>
            </nav>
            
            <div class="hidden md:flex items-center gap-4">
                <div class="flex items-center gap-1 bg-secondary rounded-lg p-1">
                    <button class="px-3 py-1.5 text-xs font-medium rounded transition-all bg-accent text-white shadow-sm" aria-label="Switch to עב">עב</button>
                    <button class="px-3 py-1.5 text-xs font-medium rounded transition-all text-muted-foreground hover:text-foreground" aria-label="Switch to EN">EN</button>
                    <button class="px-3 py-1.5 text-xs font-medium rounded transition-all text-muted-foreground hover:text-foreground" aria-label="Switch to FR">FR</button>
                </div>
            </div>
            
            <button class="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors" aria-label="Toggle menu" id="mobileMenuBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
            </button>
        </div>

        <!-- Mobile Menu (Hidden by default) -->
        <div class="md:hidden hidden bg-white border-t border-border p-4 shadow-lg absolute w-full" id="mobileMenu">
            <nav class="flex flex-col gap-4 text-right">
                <a href="index.html" class="block w-full py-2 px-4 rounded-lg transition-colors border-none bg-transparent cursor-pointer text-right hover:bg-secondary">בית</a>
                <a href="index.html#about" class="block w-full py-2 px-4 rounded-lg transition-colors border-none bg-transparent cursor-pointer text-right hover:bg-secondary">אודות</a>
                <a href="philosophy.html" class="block w-full py-2 px-4 rounded-lg transition-colors border-none bg-transparent cursor-pointer text-right hover:bg-secondary">אני מאמין</a>
                <a href="index.html#firm-principles" class="block w-full py-2 px-4 rounded-lg transition-colors border-none bg-transparent cursor-pointer text-right hover:bg-secondary">עקרונות המשרד</a>
                <a href="index.html#practice-areas" class="block w-full py-2 px-4 rounded-lg transition-colors border-none bg-transparent cursor-pointer text-right hover:bg-secondary">תחומי התמחות</a>
                <a href="articles.html" class="block w-full py-2 px-4 rounded-lg transition-colors border-none bg-transparent cursor-pointer text-right hover:bg-secondary">מאמרים ופרסומים</a>
                <a href="index.html#contact" class="block w-full py-2 px-4 rounded-lg transition-colors border-none bg-transparent cursor-pointer text-right hover:bg-secondary">צור קשר</a>
                <div class="pt-3 border-t border-border">
                    <div class="flex items-center gap-1 bg-secondary rounded-lg p-1 w-fit mx-auto">
                        <button class="px-3 py-1.5 text-xs font-medium rounded transition-all bg-accent text-white shadow-sm" aria-label="Switch to עב">עב</button>
                        <button class="px-3 py-1.5 text-xs font-medium rounded transition-all text-muted-foreground hover:text-foreground" aria-label="Switch to EN">EN</button>
                        <button class="px-3 py-1.5 text-xs font-medium rounded transition-all text-muted-foreground hover:text-foreground" aria-label="Switch to FR">FR</button>
                    </div>
                </div>
            </nav>
        </div>
    </header>"""

SCRIPT_JS = """    <script>
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    </script>
</body>"""

files = ['articles.html', 'philosophy.html', 'firm-principles.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the <header> block
    content = re.sub(r'\s*<header.*?</header>', '\n' + HEADER_HTML, content, flags=re.DOTALL)
    
    # Make sure we have the mobile menu script before </body>
    if 'mobileMenuBtn' not in content[content.rfind('<script'):] or 'mobileMenu.classList.toggle' not in content:
        # replace closing body with script + closing body
        content = re.sub(r'\s*</body>', '\n' + SCRIPT_JS, content)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file}")
