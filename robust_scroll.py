import re

ROBUST_SCRIPT = """    <script>
        // Robust hash scrolling for React SPA
        window.addEventListener('load', () => {
            if (window.location.hash) {
                const targetId = window.location.hash;
                
                // Try immediate scroll
                setTimeout(() => {
                    const el = document.querySelector(targetId);
                    if (el) {
                        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({ top, behavior: "smooth" });
                    }
                }, 100);

                // Setup MutationObserver to watch for React rendering the element
                const observer = new MutationObserver((mutations, obs) => {
                    const el = document.querySelector(targetId);
                    if (el) {
                        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({ top, behavior: "smooth" });
                        obs.disconnect(); // Stop watching once found
                    }
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                
                // Stop observing after 3 seconds to avoid memory leaks
                setTimeout(() => {
                    observer.disconnect();
                }, 3000);
            }
        });
    </script>"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the previous script and add the robust one
content = re.sub(r'<script>\s*// Fix hash scrolling on load.*?<\/script>', ROBUST_SCRIPT, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html with robust scroll")
