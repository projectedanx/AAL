import re

with open('types.ts', 'r') as f:
    content = f.read()

# Add to PipelineNodeType
enum_addition = """  VULCAN_BOUNDED_CONTEXT = 'VulcanBoundedContext',
  VULCAN_EVENT_BROKER = 'VulcanEventBroker',
  VULCAN_SHARED_DATABASE = 'VulcanSharedDatabase',
"""
content = re.sub(
    r'(export enum PipelineNodeType \{)',
    r'\1\n' + enum_addition,
    content
)

# Add to PipelineNode data
interface_addition = """    // VULCAN specific
    domainName?: string;
    eventName?: string;
"""
content = re.sub(
    r'(spectralTargets\?: Array<\{ target: string; wavelength: number; fwhm: number \}>; // PROJECT AURELIUS: Multispectral MSI conditioning\n  \};)',
    r'\1\n' + interface_addition,
    content
)

with open('types.ts', 'w') as f:
    f.write(content)
