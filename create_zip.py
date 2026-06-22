
import os
import zipfile
import fnmatch
import sys

# Get the directory where this script is located
workspace_path = os.path.dirname(os.path.abspath(__file__))
zip_name = "PRODUCTION_v33.zip"
zip_path = os.path.join(workspace_path, zip_name)

print(f"Preparing to zip: {workspace_path}")
print(f"Output: {zip_path}")

excludes = [
    "*.zip", 
    ".git", ".git/*", 
    ".agent", ".agent/*", 
    ".DS_Store", 
    "dist", "dist/*", 
    "*.py", 
    "*.bak", 
    ".idea", ".idea/*",
    "create_zip.py" # Exclude self
]

def is_excluded(path, base_path):
    rel_path = os.path.relpath(path, base_path)
    if rel_path == ".": return False
    
    parts = rel_path.split(os.sep)
    for part in parts:
        if part in [".git", ".agent", ".idea", "dist", ".gemini"]:
            return True
            
    for pattern in excludes:
        if fnmatch.fnmatch(rel_path, pattern) or fnmatch.fnmatch(os.path.basename(path), pattern):
            return True
    return False

try:
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(workspace_path):
            dirs[:] = [d for d in dirs if not is_excluded(os.path.join(root, d), workspace_path)]
            
            for file in files:
                file_path = os.path.join(root, file)
                if not is_excluded(file_path, workspace_path):
                    arcname = os.path.relpath(file_path, workspace_path)
                    try:
                        # Ensure filename is decodable for printing, safe fallback
                        safe_name = arcname.encode('utf-8', 'replace').decode('utf-8')
                        print(f"Adding {safe_name}")
                    except:
                        pass
                    # ZipFile handles unicode filenames correctly on modern python
                    zipf.write(file_path, arcname)
    print("SUCCESS: Zip created successfully.")
except Exception as e:
    print(f"ERROR: {e}")
