import re

SCRIPT_HTML = """
    <script>
        // Fix hash scrolling on load for React SPA
        window.addEventListener('load', () => {
            if (window.location.hash) {
                // Wait for React to render the DOM
                setTimeout(() => {
                    const target = document.querySelector(window.location.hash);
                    if (target) {
                        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({ top, behavior: "smooth" });
                    }
                }, 500);
                
                // Backup attempt if rendering is slow
                setTimeout(() => {
                    const target = document.querySelector(window.location.hash);
                    if (target) {
                        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({ top, behavior: "smooth" });
                    }
                }, 1500);
            }
        });
    </script>
</body>"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

if '// Fix hash scrolling' not in content:
    content = re.sub(r'</body>', SCRIPT_HTML, content)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated index.html")
else:
    print("Already updated")
