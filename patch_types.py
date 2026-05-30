import re

with open("src/types.ts", "r") as f:
    content = f.read()

# Add MYCELIAL_SCAR_ROUTER to PipelineNodeType
if "MYCELIAL_SCAR_ROUTER = 'MycelialScarRouter'" not in content:
    content = content.replace(
        "CIPHER_SECURITY_GATE = 'CipherSecurityGate',",
        "CIPHER_SECURITY_GATE = 'CipherSecurityGate',\n  MYCELIAL_SCAR_ROUTER = 'MycelialScarRouter',"
    )

# Add properties to PipelineNode data
if "scarThreshold" not in content:
    content = content.replace(
        "threatPosture?: string;",
        "threatPosture?: string;\n\n    // Mycelial Scar Router fields\n    scarThreshold?: number;\n    activeScars?: string[];"
    )

with open("src/types.ts", "w") as f:
    f.write(content)

print("src/types.ts updated")
