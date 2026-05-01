import re

with open('App.tsx', 'r') as f:
    content = f.read()

content = content.replace("jur={currentGeneration?.jur}", "jur={displayedGeneration?.jur}")

with open('App.tsx', 'w') as f:
    f.write(content)
