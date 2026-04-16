/// file: src/mcp_server.ts ///
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { executeGraph } from "../services/graphExecutor.js";
import { PipelineNode, PipelineEdge } from "../types.js";
import { promises as fs } from "fs";

const server = new McpServer({
  name: "aesthetic-alchemy-mcp",
  version: "2026.4.12",
});

// TOOL 1: retrieve_scar_archive
server.registerTool(
  "retrieve_scar_archive",
  {
    title: "Retrieve Scar Archive",
    description: [
      "PURPOSE: Retrieves the contents of the algorithmic trauma repository",
      "(scars.yaml and SymbolicScar.json) to prevent recurrent failure modes.",
      "GUIDELINES: Invoke before generating novel DAG topologies to verify",
      "against known epistemic boundaries and SCAR records.",
      "LIMITATIONS: Read-only operation. Does not modify scar history.",
      "PARAMETERS: format — either 'yaml' or 'json' (default: 'json').",
    ].join(" "),
    inputSchema: z.object({
      format: z
        .enum(["yaml", "json"])
        .default("json")
        .describe("Format of the scar archive to retrieve (yaml or json)."),
    }).strict(),
  },
  async ({ format }) => {
    try {
      const fileName = format === 'yaml' ? 'scars.yaml' : 'SymbolicScar.json';
      const data = await fs.readFile(fileName, "utf-8");
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ status: "RETRIEVED", target: fileName, data: data }),
        }],
      };
    } catch (err) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error_code: "TOOL_FAULT_GENERAL_PROGRAMMING",
            fault_category: "GENERAL_PROGRAMMING",
            structured_detail: {
              violation: "FS_READ_ERROR",
              error: String(err),
            },
            retry_viable: true,
            suggested_decomposition: "Verify file existence and permissions.",
          }),
        }],
        isError: true,
      };
    }
  }
);

// TOOL 2: execute_dag
server.registerTool(
  "execute_dag",
  {
    title: "Execute Generative DAG",
    description: [
      "PURPOSE: Submits a Pluriversal Directed Acyclic Graph (DAG) payload",
      "for synthesis. Translates Node and Edge arrays into discrete Gemini",
      "generation paths.",
      "GUIDELINES: The nodes array MUST contain at least one BASE_PROMPT",
      "and one OUTPUT node. The edges array MUST map a valid path between them.",
      "LIMITATIONS: Maximum 50 nodes per payload. No cyclic paths permitted.",
      "PARAMETERS: nodes (array of PipelineNode), edges (array of PipelineEdge).",
    ].join(" "),
    inputSchema: z.object({
      nodes: z
        .array(
          z.object({
            id: z.string().max(256),
            type: z.enum(["BasePrompt", "Parameter", "Output", "Blend"]),
            data: z.object({
              label: z.string().max(1024).optional(),
              value: z.string().max(2048).optional(),
              variations: z.array(z.string().max(2048)).optional(),
              temperature: z.number().min(0).max(1).optional(),
              seed: z.number().optional(),
              phantomZ: z.number().optional(),
            }).strict(),
            position: z.object({
              x: z.number(),
              y: z.number(),
              z: z.number().optional(),
            }).strict()
          })
        )
        .max(50)
        .describe("Array of nodes defining the generative topology."),
      edges: z
        .array(
          z.object({
            id: z.string().max(256),
            source: z.string().max(256),
            target: z.string().max(256),
          }).strict()
        )
        .max(100)
        .describe("Array of directed edges connecting the nodes."),
    }),
  },
  async ({ nodes, edges }) => {
    // Zero-Trust Boundary Validation
    const outputNodes = nodes.filter(n => n.type === "Output");
    const baseNodes = nodes.filter(n => n.type === "BasePrompt");

    if (outputNodes.length === 0 || baseNodes.length === 0) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error_code: "TOOL_FAULT_SERVER_TOOL_CONFIGURATION",
            fault_category: "SERVER_TOOL_CONFIGURATION",
            structured_detail: {
              violation: "INVALID_TOPOLOGY",
              reason: "Graph must contain at least one BasePrompt and one Output node.",
            },
            retry_viable: false,
            suggested_decomposition: "Inject missing root/leaf nodes and resubmit.",
          }),
        }],
        isError: true,
      };
    }

    // Cyclic dependency check (β₁ risk)
    const visited = new Set<string>();
    const recStack = new Set<string>();

    const isCyclic = (nodeId: string): boolean => {
      if (recStack.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;

      visited.add(nodeId);
      recStack.add(nodeId);

      const outgoingEdges = edges.filter(e => e.source === nodeId);
      for (const edge of outgoingEdges) {
        if (isCyclic(edge.target)) return true;
      }

      recStack.delete(nodeId);
      return false;
    };

    let hasCycle = false;
    for (const node of nodes) {
      if (isCyclic(node.id)) {
        hasCycle = true;
        break;
      }
    }

    if (hasCycle) {
       return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error_code: "TOOL_FAULT_GENERAL_PROGRAMMING",
            fault_category: "GENERAL_PROGRAMMING",
            structured_detail: {
              violation: "CYCLIC_DEPENDENCY_DETECTED",
              reason: "Betti-1 risk β₁ > 0. Graph contains a cycle.",
            },
            retry_viable: false,
            suggested_decomposition: "Remove cyclic edges to restore DAG properties.",
          }),
        }],
        isError: true,
      };
    }

    try {
      // Cast the zod output to the internal types and call execution logic
      const results = await executeGraph(nodes as unknown as PipelineNode[], edges as unknown as PipelineEdge[]);
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            status: "DAG_EXECUTED",
            nodeCount: nodes.length,
            edgeCount: edges.length,
            generationResults: results,
            message: "Topology mapped and synthesized.",
          }),
        }],
      };
    } catch (err) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error_code: "TOOL_FAULT_GENERAL_PROGRAMMING",
            fault_category: "GENERAL_PROGRAMMING",
            structured_detail: {
              violation: "SYNTHESIS_FAILURE",
              error: String(err),
            },
            retry_viable: true,
            suggested_decomposition: "Review gemini payload constraints.",
          }),
        }],
        isError: true,
      };
    }
  }
);


// TOOL 3: retrieve_kut_ledger
server.registerTool(
  "retrieve_kut_ledger",
  {
    title: "Retrieve KUT Scar Ledger",
    description: [
      "PURPOSE: Retrieves the contents of the KUT Scar Ledger (kut_scar_ledger.json).",
      "This is the stateful memory of a creator's structural failure patterns used by The Retention Architect.",
      "GUIDELINES: Invoke to check creator profile, past scars, and session history.",
      "LIMITATIONS: Read-only operation.",
    ].join(" "),
    inputSchema: z.object({}).strict(),
  },
  async () => {
    try {
      const data = await fs.readFile("kut_scar_ledger.json", "utf-8");
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ status: "RETRIEVED", target: "kut_scar_ledger.json", data: data }),
        }],
      };
    } catch (err) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error_code: "TOOL_FAULT_GENERAL_PROGRAMMING",
            fault_category: "GENERAL_PROGRAMMING",
            structured_detail: {
              violation: "FS_READ_ERROR",
              error: String(err),
            },
            retry_viable: true,
            suggested_decomposition: "Verify kut_scar_ledger.json exists.",
          }),
        }],
        isError: true,
      };
    }
  }
);

// TOOL 4: update_kut_ledger
server.registerTool(
  "update_kut_ledger",
  {
    title: "Update KUT Scar Ledger",
    description: [
      "PURPOSE: Updates the contents of the KUT Scar Ledger (kut_scar_ledger.json).",
      "GUIDELINES: Invoke after a session to log new scars, resolve existing ones, or update session history.",
      "PARAMETERS: data — the new ledger JSON object (must conform to KutScarLedger interface).",
    ].join(" "),
    inputSchema: z.object({
      data: z.any().describe("The updated KutScarLedger object in JSON format."),
    }).strict(),
  },
  async ({ data }) => {
    try {
      await fs.writeFile("kut_scar_ledger.json", JSON.stringify(data, null, 2), "utf-8");
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ status: "UPDATED", target: "kut_scar_ledger.json" }),
        }],
      };
    } catch (err) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error_code: "TOOL_FAULT_GENERAL_PROGRAMMING",
            fault_category: "GENERAL_PROGRAMMING",
            structured_detail: {
              violation: "FS_WRITE_ERROR",
              error: String(err),
            },
            retry_viable: true,
            suggested_decomposition: "Check file write permissions.",
          }),
        }],
        isError: true,
      };
    }
  }
);

// MCP Prompt Template

// MCP Prompt Template 2: KUT Retention Architect
server.prompt(
  "kut-retention-architect",
  "Initialize KUT: The Retention Architect, Sovereign Agent Blueprint v2.0.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fs.readFile("KUT_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load blueprint.";
    }
    return {
        messages: [{
        role: "user",
        content: {
            type: "text",
            text: blueprintText,
        },
        }],
    };
  }
);

server.prompt(
  "analyze-tool-schema",
  "Generate a KORSAKOV-style analysis of a proposed MCP tool schema.",
  {
    proposed_schema: z.string().describe("JSON string of proposed tool schema"),
    context: z.string().optional().describe("Domain context for the tool"),
  },
  ({ proposed_schema, context }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: [
          "<korsakov_analysis>",
          `Proposed schema: ${proposed_schema}`,
          `Context: ${context ?? "unspecified"}`,
          "Evaluate against 6-component rubric. Score each component 1-5.",
          "Identify fault category from 5-taxonomy. Calculate CFDI estimate.",
          "If CFDI > 0.15: output EpistemicEscrow directive.",
          "If CFDI ≤ 0.15: emit corrected schema in PHASE_3_EXECUTION.",
          "</korsakov_analysis>",
        ].join("\n"),
      },
    }],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("KORSAKOV: stdio transport active. MCP 2026.4.12. Topology locked.\n");
}

main().catch((err) => {
  process.stderr.write(`KORSAKOV: Fatal — ${err.message}\n`);
  process.exit(1);
});
