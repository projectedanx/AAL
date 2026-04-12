const fs = require('fs');

let content = fs.readFileSync('src/mcp_server.ts', 'utf8');

// Fix imports
content = content.replace(
  'import { executeGraph } from "../services/graphExecutor";',
  'import { executeGraph } from "../services/graphExecutor.js";'
);
content = content.replace(
  'import { PipelineNode, PipelineEdge } from "../types";',
  'import { PipelineNode, PipelineEdge } from "../types.js";'
);

// Fix .strict()
content = content.replace(
  'inputSchema: z.object({',
  'inputSchema: z.object({'
);
// Doing it selectively using regex to append .strict() where appropriate:
content = content.replace(/z\.object\({([\s\S]*?)}\)/g, "z.object({$1}).strict()");

fs.writeFileSync('src/mcp_server.ts', content);
