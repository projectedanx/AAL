import re

with open("src/components/NodeCanvas.tsx", "r") as f:
    content = f.read()

content = content.replace(
    "{(data.activeScars || []).map((scar: string, idx: number) => (",
    "{((data.activeScars as string[]) || []).map((scar: string, idx: number) => ("
)

with open("src/components/NodeCanvas.tsx", "w") as f:
    f.write(content)

print("Fixed type error in NodeCanvas.tsx")
