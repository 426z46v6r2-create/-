import re

# 1. Update index.html
INDEX_SCRIPT = """    <script>
        // Session storage scroll logic for React SPA
        window.addEventListener('load', () => {
            const targetId = sessionStorage.getItem('scrollTarget');
            if (targetId) {
                sessionStorage.removeItem('scrollTarget');
                
                const scrollToSection = (id) => {
                    const el = document.getElementById(id);
                    if (el) {
                        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({ top, behavior: "smooth" });
                        return true;
                    }
                    return false;
                };

                // Try immediately
                if (!scrollToSection(targetId)) {
                    // Set up MutationObserver to wait for the element
                    const observer = new MutationObserver((mutations, obs) => {
                        if (scrollToSection(targetId)) {
                            obs.disconnect();
                        }
                    });
                    
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                    
                    // Failsafe: stop observing after 5 seconds
                    setTimeout(() => {
                        observer.disconnect();
                    }, 5000);
                }
            }
        });
    </script>
</body>"""

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Remove the old robust script
index_content = re.sub(r'<script>\s*// (Robust )?hash scrolling.*?</script>\s*</body>', INDEX_SCRIPT, index_content, flags=re.DOTALL|re.IGNORECASE)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)

# 2. Update static HTML files
STATIC_SCRIPT = """
    <script>
        // Handle cross-page navigation with scrolling
        function navigateAndScroll(targetId) {
            sessionStorage.setItem('scrollTarget', targetId);
            window.location.href = 'index.html';
        }
    </script>
</body>"""

files = ['articles.html', 'philosophy.html', 'firm-principles.html']
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the href links with onclick
    content = content.replace('href="index.html#about"', 'href="javascript:void(0)" onclick="navigateAndScroll(\'about\')"')
    content = content.replace('href="index.html#firm-principles"', 'href="javascript:void(0)" onclick="navigateAndScroll(\'firm-principles\')"')
    content = content.replace('href="index.html#practice-areas"', 'href="javascript:void(0)" onclick="navigateAndScroll(\'practice-areas\')"')
    content = content.replace('href="index.html#contact"', 'href="javascript:void(0)" onclick="navigateAndScroll(\'contact\')"')
    
    # Add the script if it's not there
    if 'function navigateAndScroll' not in content:
        content = re.sub(r'</body>', STATIC_SCRIPT, content)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated index.html and static files to use sessionStorage navigation.")
