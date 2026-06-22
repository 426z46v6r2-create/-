import os

replacements = {
    "במסגרת תוכנית מצטייני רקטור": "במסגרת תוכנית מצטייני דיקאן ורקטור",
    "עם מלגת מצוינות": "עם מלגת הצטיינות",
    "במחלוקות משפטיות": "בסכסוכים משפטיים",
    "והבנה עמוקה של אינטרסים": "והבנה עמוקה של האינטרסים"
}

directories = [
    "assets",
    "dist/assets",
    "dist",
    "cloudflare_ready/assets",
    "cloudflare_ready",
    "."
]

for directory in directories:
    if not os.path.exists(directory):
        continue
    for filename in os.listdir(directory):
        if filename.endswith(".js") or filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            if not os.path.isfile(filepath): continue
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception as e:
                continue
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
