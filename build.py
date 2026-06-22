import os
import shutil
import re
import sys
import zipfile

# Configuration
SOURCE_DIR = os.getcwd()
DIST_DIR = os.path.join(SOURCE_DIR, 'dist')
ASSETS_DIR = os.path.join(SOURCE_DIR, 'assets')
DIST_ASSETS_DIR = os.path.join(DIST_DIR, 'assets')
ZIP_FILENAME = 'CLEAN_FINAL_SITE_v12.zip'

# Files to copy/process
HTML_FILES = [f for f in os.listdir(SOURCE_DIR) if f.endswith('.html')]
ASSET_FILES = [f for f in os.listdir(ASSETS_DIR) if os.path.isfile(os.path.join(ASSETS_DIR, f))]

def clean_dist():
    """Removes the dist directory if it exists."""
    if os.path.exists(DIST_DIR):
        print(f"Cleaning {DIST_DIR}...")
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR)
    os.makedirs(DIST_ASSETS_DIR)

def minify_html(content):
    """
    Minifies HTML content safely.
    - Removes comments
    - Collapses multiple whitespace to single space
    """
    try:
        # Remove comments <!-- ... -->
        content = re.sub(r'<!--(.*?)-->', '', content, flags=re.DOTALL)
        
        # Collapse whitespace (keep newlines/spaces reasonable)
        # We don't want to be too aggressive to avoid breaking layout where space matters
        # But for general HTML structure, collapsing > \s+ < is usually okay if we are careful.
        # SAFE APPROACH: Just collapse multiple spaces to one, keep newlines or replace with space.
        # Actually, for this user, "safer" means don't break functionality.
        # Let's just remove empty lines and trim.
        
        # Simple whitespace collapse:
        # content = re.sub(r'\s+', ' ', content) # This effectively puts everything on one line.
        
        # Let's match the previous logic but slightly less aggressive if needed.
        # Previous: content = re.sub(r'>\s+<', '><', content)
        # This is standard minification but can break inline-block elements if space was intended.
        # We will trust that standard minification is desired but will monitor.
        
        # Re-implementing the "remove whitespace between tags" but preserving intentional text spaces
        # content = re.sub(r'>\s+<', '><', content) 
        
        # For now, let's stick to comment removal and basic clean up to ensure we don't break anything.
        lines = [line.strip() for line in content.splitlines() if line.strip()]
        return '\n'.join(lines)
    except Exception as e:
        print(f"Warning: HTML minification failed, using original. Error: {e}")
        return content

def minify_css(content):
    """Minifies CSS content."""
    try:
        # Remove comments
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        # Remove whitespace
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r'\s*([{:;}])\s*', r'\1', content)
        content = content.replace('; }', '}')
        return content
    except Exception as e:
         print(f"Warning: CSS minification failed, using original. Error: {e}")
         return content

def minify_js(content):
    """
    Minifies JS content (basic).
    """
    try:
        # Remove single line comments - CAREFUL using regex for this is prone to errors with URLs etc.
        # Safe bet: skip comment removal for JS unless we have a parser.
        # Or just do basic whitespace trimming.
        
        # Let's reuse the simple line-stripping approach which is safe enough for pre-bundled assets usually.
        lines = [line.strip() for line in content.splitlines() if line.strip()]
        return '\n'.join(lines)
    except Exception as e:
        print(f"Warning: JS minification failed, using original. Error: {e}")
        return content

def fix_paths(content):
    """
    Ensures that assets references are strictly relative (./assets/).
    Replaces "assets/" and "/assets/" with "./assets/".
    """
    # Pattern: src="assets/..." or href="assets/..." (and single quotes)
    # capturing group 1: src=" or href="
    # matching literal assets/
    
    # We want to normalize:
    # href="assets/..." -> href="./assets/..."
    # src="assets/..." -> src="./assets/..."
    # href="/assets/..." -> href="./assets/..."
    
    # Regex look:
    # (src|href)=["']/?assets/
    
    # We'll do it in two passes or a smart sub.
    
    def replacer(match):
        prefix = match.group(1) # src= or href=
        quote = match.group(2)  # " or '
        # The rest is the asset path start. We force it to ./assets/
        return f'{prefix}{quote}./assets/'

    # Regex explanation:
    # (src|href)   : Group 1, matches src or href
    # \s*=\s*      : matches = with optional whitespace
    # (["\'])      : Group 2, matches " or '
    # /?           : matches optional leading slash
    # assets/      : matches literal assets/
    
    pattern = r'(src|href)\s*=\s*(["\'])/?assets/'
    return re.sub(pattern, replacer, content, flags=re.IGNORECASE)

def process_html_files():
    """Processes, fixes paths, and minifies HTML files."""
    for filename in HTML_FILES:
        src_path = os.path.join(SOURCE_DIR, filename)
        dest_path = os.path.join(DIST_DIR, filename)
        
        print(f"Processing HTML: {filename}...")
        try:
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 1. Fix paths first
            content = fix_paths(content)
            
            # 2. Minify
            minified_content = minify_html(content)
            
            with open(dest_path, 'w', encoding='utf-8') as f:
                f.write(minified_content)
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            sys.exit(1)

def process_assets():
    """Processes assets (CSS/JS minification, Image copying)."""
    for filename in ASSET_FILES:
        src_path = os.path.join(ASSETS_DIR, filename)
        dest_path = os.path.join(DIST_ASSETS_DIR, filename)
        
        # print(f"Processing asset {filename}...")
        
        if filename.endswith('.css'):
            try:
                with open(src_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                minified = minify_css(content)
                with open(dest_path, 'w', encoding='utf-8') as f:
                    f.write(minified)
            except Exception as e:
                print(f"Error minifying CSS {filename}: {e}")
                shutil.copy2(src_path, dest_path)
                
        elif filename.endswith('.js'):
            try:
                with open(src_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                # JS minification is risky with regex, sticking to basic trim or copy
                # If the files are already minified (vite build output), we should just copy or barely touch.
                # 'index-MeVdLpLX-v7.js' looks minified.
                minified = minify_js(content) 
                with open(dest_path, 'w', encoding='utf-8') as f:
                    f.write(minified)
            except Exception as e:
                print(f"Error minifying JS {filename}: {e}")
                shutil.copy2(src_path, dest_path)
        else:
            # Copy other assets (images, fonts, etc.)
            shutil.copy2(src_path, dest_path)

def copy_extra_files():
    """Copies favicon and other root files."""
    # Add _redirects if it exists (good for SPA/Cloudflare)
    extras = ['favicon.png', '_redirects', 'robots.txt']
    for filename in extras:
        src = os.path.join(SOURCE_DIR, filename)
        if os.path.exists(src):
             shutil.copy2(src, os.path.join(DIST_DIR, filename))

def create_zip():
    """Zips the CONTENTS of the dist folder into site.zip."""
    zip_path = os.path.join(SOURCE_DIR, ZIP_FILENAME)
    print(f"Creating {ZIP_FILENAME} from {DIST_DIR}...")
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(DIST_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                # Calculate arcname (relative to dist)
                # so that index.html is at root of zip
                arcname = os.path.relpath(file_path, DIST_DIR)
                zipf.write(file_path, arcname)
    
    print(f"Zip created: {zip_path}")

def main():
    print("Starting production build...")
    clean_dist()
    process_html_files()
    process_assets()
    copy_extra_files()
    create_zip()
    print("Build complete!")

if __name__ == '__main__':
    main()
