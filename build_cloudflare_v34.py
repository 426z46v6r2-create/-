import os
import shutil
import re
import zipfile

SOURCE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(SOURCE_DIR, 'dist_v34')
ASSETS_DIR = os.path.join(SOURCE_DIR, 'assets')
DIST_ASSETS_DIR = os.path.join(DIST_DIR, 'assets')
ZIP_FILENAME = 'PRODUCTION_v34.zip'

# HTML files at root
HTML_FILES = [f for f in os.listdir(SOURCE_DIR) if f.endswith('.html') and os.path.isfile(os.path.join(SOURCE_DIR, f))]
ASSET_FILES = [f for f in os.listdir(ASSETS_DIR) if os.path.isfile(os.path.join(ASSETS_DIR, f))]

def clean_dist():
    if os.path.exists(DIST_DIR):
        print(f"Cleaning {DIST_DIR}...")
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR)
    os.makedirs(DIST_ASSETS_DIR)
    print("Dist directory ready.")

def process_html(content):
    # Remove HTML comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    # Remove empty lines and trim
    lines = [line.strip() for line in content.splitlines() if line.strip()]
    return '\n'.join(lines)

def process_html_files():
    for filename in HTML_FILES:
        src = os.path.join(SOURCE_DIR, filename)
        dst = os.path.join(DIST_DIR, filename)
        print(f"  HTML: {filename}")
        with open(src, 'r', encoding='utf-8') as f:
            content = f.read()
        content = process_html(content)
        with open(dst, 'w', encoding='utf-8') as f:
            f.write(content)

def process_assets():
    for filename in ASSET_FILES:
        src = os.path.join(ASSETS_DIR, filename)
        dst = os.path.join(DIST_ASSETS_DIR, filename)

        if filename.endswith('.css'):
            print(f"  CSS: {filename}")
            with open(src, 'r', encoding='utf-8') as f:
                content = f.read()
            # Basic CSS minify: remove comments, collapse whitespace
            content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
            content = re.sub(r'\s+', ' ', content)
            content = re.sub(r'\s*([{:;}])\s*', r'\1', content)
            with open(dst, 'w', encoding='utf-8') as f:
                f.write(content)
        elif filename.endswith('.js'):
            print(f"  JS:  {filename}")
            # JS is already minified (vite output) — just copy
            shutil.copy2(src, dst)
        else:
            # Images, fonts, etc.
            shutil.copy2(src, dst)

def copy_extras():
    extras = ['favicon.png', '_redirects', 'robots.txt', 'wrangler.toml']
    for filename in extras:
        src = os.path.join(SOURCE_DIR, filename)
        if os.path.exists(src):
            print(f"  Extra: {filename}")
            shutil.copy2(src, os.path.join(DIST_DIR, filename))

def create_zip():
    zip_path = os.path.join(SOURCE_DIR, ZIP_FILENAME)
    print(f"\nCreating {ZIP_FILENAME}...")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(DIST_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, DIST_DIR)
                zipf.write(file_path, arcname)
    size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"Done! {ZIP_FILENAME} ({size_mb:.1f} MB) → {zip_path}")

def main():
    print("=== Building Cloudflare v34 ===\n")
    clean_dist()
    print("\nProcessing HTML files...")
    process_html_files()
    print("\nProcessing assets...")
    process_assets()
    print("\nCopying extras...")
    copy_extras()
    create_zip()
    # Cleanup temp dist dir
    shutil.rmtree(DIST_DIR)
    print("\n=== Build complete! Ready for Cloudflare upload. ===")

if __name__ == '__main__':
    main()
