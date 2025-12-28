
import os

file_path = './assets/index-MeVdLpLX-v7.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The error pattern
error_pattern = '}}, Zv ='
# The correction
correction = '}, Zv ='

# Check if error exists
if error_pattern not in content:
    print('Error pattern not found. Maybe already fixed?')
    exit(0)

# Replace
new_content = content.replace(error_pattern, correction)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Successfully fixed syntax error in v7.js')
