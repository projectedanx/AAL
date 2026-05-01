import re

with open('components/ImageGrid.tsx', 'r') as f:
    content = f.read()

content = content.replace("  jur?: JustifiedUncertaintyReport;\n  jur?: JustifiedUncertaintyReport;", "  jur?: JustifiedUncertaintyReport;")

with open('components/ImageGrid.tsx', 'w') as f:
    f.write(content)
