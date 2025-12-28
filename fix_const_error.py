
import os

file_path = './assets/index-MeVdLpLX-v8.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The pattern we created: ... }) }, Zv =
# We want to break the chain.
# Join s2's closing brace with semicolon and var Zv =
search_str = ', Zv ='
replace_str = '; var Zv ='

if search_str not in content:
    print("Could not find ', Zv =' to fix")
else:
    content = content.replace(search_str, replace_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully fixes const assignment error by using var for Zv chain.")
