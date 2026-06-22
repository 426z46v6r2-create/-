import sys

def replace_in_file(filepath, old_text, new_text):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old_text in content:
            content = content.replace(old_text, new_text)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Successfully updated {filepath}")
        else:
            print(f"Text not found in {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

replace_in_file('assets/index-MeVdLpLX-v7.js', 'לייעוץ ועריכת צוואות', 'ייעוץ ועריכת צוואות')
