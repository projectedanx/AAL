import re

with open('services/graphExecutor.ts', 'r') as f:
    content = f.read()

content = re.sub(
    r'(import \{ PipelineNodeType, GenerationResult, JustifiedUncertaintyReport \})',
    r'import { PipelineNodeType, GenerationResult, JustifiedUncertaintyReport, AestheticParameter }',
    content
)

with open('services/graphExecutor.ts', 'w') as f:
    f.write(content)
