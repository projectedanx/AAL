/// file: src/mcp_server.ts ///
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { executeGraph } from "./services/graphExecutor.js";
import { PipelineNode, PipelineEdge } from "./types.js";
import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";


const createErrorResponse = (code: string, message: string, detail: any) => ({
  content: [{ type: "text", text: JSON.stringify({ error_code: code, fault_category: "MCP_ERROR", structured_detail: { message, detail }, retry_viable: false, suggested_decomposition: "" }) }],
  isError: true
});


import { registerCoreTools } from "./mcp_tools/core_tools.js";
import { registerAgentTools } from "./mcp_tools/agent_tools.js";
import { registerScarTools } from "./mcp_tools/scar_tools.js";
const server = new McpServer({
  name: "aesthetic-alchemy-mcp",
  version: "2026.4.12",
});

// Register decoupled tools
registerCoreTools(server);
registerAgentTools(server);
registerScarTools(server);





































// MCP Prompt Template


// MCP Prompt Template 2: KUT Retention Architect
server.prompt(
  "kut-retention-architect",
  "Initialize KUT: The Retention Architect, Sovereign Agent Blueprint v2.0.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("KUT_BLUEPRINT.md", "utf-8");
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



// MCP Prompt Template 3: LEXIS SOVEREIGN Co-Author
server.prompt(
  "lexis-sovereign-coauthor",
  "Initialize LEXIS SOVEREIGN: The Auteur Co-Author, Sovereign Cognitive Operating System (SCOS) v6.0.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("LEXIS_SOVEREIGN_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load LEXIS SOVEREIGN blueprint.";
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


// MCP Prompt Template 4: WHIMSY Affective Topologist
server.prompt(
  "whimsy-affective-topologist",
  "Initialize WHIMSY: The Affective Topologist v1.0.0-Q1-2026.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("WHIMSY_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load WHIMSY blueprint.";
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


// MCP Prompt Template 5: ALETHEON Adversarial Structural Necropsy Engine
server.prompt(
  "aletheon-adversarial-necropsy",
  "Initialize ALETHEON: The Adversarial Structural Necropsy Engine v4.1.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("ALETHEON_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load ALETHEON blueprint.";
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


// MCP Prompt Template 6: DAX Sovereign Advocate
server.prompt(
  "dax-sovereign-advocate",
  "Initialize DAX-01: The Sovereign Developer Advocate Agent v1.0.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("DAX_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load DAX-01 blueprint.";
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


// MCP Prompt Template 7: LEXICON DRP-LEXICON-992
server.prompt(
  "lexicon-drp-992",
  "Initialize LEXICON: DRP-LEXICON-992 Cognitive Bytecode.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("LEXICON.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load LEXICON.md.";
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


// MCP Prompt Template 8: VIPER Visual Intent & Physical Execution Router
server.prompt(
  "viper-visual-intent-router",
  "Initialize VIPER: Visual Intent & Physical Execution Router v2026.4.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("VIPER_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load VIPER blueprint.";
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












// MCP Prompt Template 12: AACH Homomorphic Schema Compiler
server.prompt(
  "homomorphic-schema-compiler",
  "Initialize AACH: Homomorphic Schema Compiler.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("AACH_HOMOMORPHIC_COMPILER_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load AACH_HOMOMORPHIC_COMPILER_BLUEPRINT.md.";
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

// MCP Prompt Template 13: AACH Epistemic Action Orchestrator
server.prompt(
  "epistemic-action-orchestrator",
  "Initialize AACH: Epistemic Action & Extended Mind Orchestrator.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("AACH_EPISTEMIC_ORCHESTRATOR_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load AACH_EPISTEMIC_ORCHESTRATOR_BLUEPRINT.md.";
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

// MCP Prompt Template 14: AACH Disequilibratory Goal Engine
server.prompt(
  "disequilibratory-goal-engine",
  "Initialize AACH: Disequilibratory Goal-Setting Engine.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("AACH_DISEQUILIBRATORY_ENGINE_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load AACH_DISEQUILIBRATORY_ENGINE_BLUEPRINT.md.";
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("KORSAKOV: stdio transport active. MCP 2026.4.12. Topology locked.\n");
}

main().catch((err) => {
  process.stderr.write(`KORSAKOV: Fatal — ${err.message}\n`);
  process.exit(1);
});

// MCP Prompt Template 9: CIPHER Zero-Trust Sentinel
server.prompt(
  "cipher-zero-trust-sentinel",
  "Initialize CIPHER: The Zero-Trust Epistemic Sentinel, Sovereign Architect Tier 4.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("CIPHER_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load CIPHER blueprint.";
    }
    return {
        messages: [{
        role: "user",
        content: {
            type: "text" as const,
            text: blueprintText,
        },
        }],
    };
  }
);









// MCP Prompt Template 8: KIRA-7 Lark Weaver
server.prompt(
  "kira-lark-weaver",
  "Initialize KIRA-7: Kinetic Integration & Routing Agent.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("KIRA_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load blueprint.";
    }
    return {
        messages: [{
            role: "user",
            content: {
                type: "text",
                text: "You are now operating under the KIRA-7 (Kinetic Integration & Routing Agent) persona.\n\n" + blueprintText
            }
        }]
    };
  }
);





// MCP Prompt Template 10: VANCE Vector-Anchored Node & Context Engineer
server.prompt(
  "vance-semantic-cartographer",
  "Initialize VANCE: Vector-Anchored Node & Context Engineer.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("VANCE_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load VANCE blueprint.";
    }
    return {
        messages: [{
        role: "user",
        content: {
            type: "text" as const,
            text: blueprintText,
        },
        }],
    };
  }
);


// MCP Prompt Template 11: AXIOM Sovereign Syntactician
server.prompt(
  "axiom-sovereign-syntactician",
  "Initialize AXIOM: Sovereign Syntactician.",
  {},
  async () => {
    let blueprintText = "";
    try {
        blueprintText = await fsp.readFile("AXIOM_BLUEPRINT.md", "utf-8");
    } catch (e) {
        blueprintText = "Failed to load AXIOM blueprint.";
    }
    return {
        messages: [{
        role: "user",
        content: {
            type: "text" as const,
            text: blueprintText,
        },
        }],
    };
  }
);
