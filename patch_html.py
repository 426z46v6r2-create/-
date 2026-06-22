import os
import glob
import re

html_files = glob.glob('*.html')
css_link = '<link rel="stylesheet" href="./assets/mobile-perfection.css?v=6">'

for f in html_files:
    if f == 'index.html':
        continue
    with open(f, 'r') as file:
        content = file.read()
    
    if 'mobile-perfection.css' not in content:
        # Find </head> and insert before
        content = content.replace('</head>', f'    {css_link}\n</head>')
        with open(f, 'w') as file:
            file.write(content)
        print(f"Patched {f}")
