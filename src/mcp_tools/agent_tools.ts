import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { executeGraph } from "../services/graphExecutor.js";
import { PipelineNode, PipelineEdge } from "../types.js";
import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";

export const createErrorResponse = (code: string, message: string, detail: any) => ({
  content: [{ type: "text", text: JSON.stringify({ error_code: code, fault_category: "MCP_ERROR", structured_detail: { message, detail }, retry_viable: false, suggested_decomposition: "" }) }],
  isError: true
});

export const registerAgentTools = (server: McpServer) => {
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
        const data = await fsp.readFile("kut_scar_ledger.json", "utf-8");
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
        await fsp.writeFile("kut_scar_ledger.json", JSON.stringify(data, null, 2), "utf-8");
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

  // TOOL 5: retrieve_whimsy_scars
  server.registerTool(
    "retrieve_whimsy_scars",
    {
      title: "Retrieve WHIMSY Symbolic Scars",
      description: [
        "PURPOSE: Retrieves the contents of the WHIMSY Symbolic Scar System (symbolic_scars.jsonl).",
        "GUIDELINES: Invoke before any affective injection to check for failing scar entries with overlapping context tags.",
        "LIMITATIONS: Read-only operation.",
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile("symbolic_scars.jsonl", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "RETRIEVED", target: "symbolic_scars.jsonl", data: data }),
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
              suggested_decomposition: "Verify symbolic_scars.jsonl exists.",
            }),
          }],
          isError: true,
        };
      }
    }
  );

  // TOOL 6: update_whimsy_scars
  server.registerTool(
    "update_whimsy_scars",
    {
      title: "Update WHIMSY Symbolic Scars",
      description: [
        "PURPOSE: Appends a new scar to the WHIMSY Symbolic Scar System (symbolic_scars.jsonl).",
        "GUIDELINES: Invoke to log failed or underperforming whimsy interventions.",
        "PARAMETERS: data — the new scar entry as a JSON object.",
      ].join(" "),
      inputSchema: z.object({
        data: z.any().describe("The new scar entry JSON object."),
      }).strict(),
    },
    async ({ data }) => {
      try {
        await fsp.appendFile("symbolic_scars.jsonl", JSON.stringify(data) + "\n", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "UPDATED", target: "symbolic_scars.jsonl" }),
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

  // TOOL 7: retrieve_aletheon_ssa
  server.registerTool(
    "retrieve_aletheon_ssa",
    {
      title: "Retrieve ALETHEON Symbolic Scar Archive",
      description: [
        "PURPOSE: Retrieves the contents of the ALETHEON Symbolic Scar Archive (aletheon_ssa.jsonl).",
        "GUIDELINES: Invoke before any evaluation to check for structural isomorphisms with prior failure geometries.",
        "LIMITATIONS: Read-only operation.",
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile("aletheon_ssa.jsonl", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "RETRIEVED", target: "aletheon_ssa.jsonl", data: data }),
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
              suggested_decomposition: "Verify aletheon_ssa.jsonl exists.",
            }),
          }],
          isError: true,
        };
      }
    }
  );

  // TOOL 8: update_aletheon_ssa
  server.registerTool(
    "update_aletheon_ssa",
    {
      title: "Update ALETHEON Symbolic Scar Archive",
      description: [
        "PURPOSE: Appends a new scar to the ALETHEON Symbolic Scar Archive (aletheon_ssa.jsonl).",
        "GUIDELINES: Invoke after a completed evaluation to physically encode the delta between ALETHEON's prediction and observed outcomes.",
        "PARAMETERS: data — the new scar entry as a JSON object.",
      ].join(" "),
      inputSchema: z.object({
        data: z.any().describe("The new scar entry JSON object."),
      }).strict(),
    },
    async ({ data }) => {
      try {
        await fsp.appendFile("aletheon_ssa.jsonl", JSON.stringify(data) + "\n", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "UPDATED", target: "aletheon_ssa.jsonl" }),
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

  // TOOL 9: retrieve_dax_ssr
  server.registerTool(
    "retrieve_dax_ssr",
    {
      title: "Retrieve DAX Symbolic Scar Registry",
      description: [
        "PURPOSE: Retrieves the contents of the DAX Symbolic Scar Registry (dax_ssr.jsonl).",
        "GUIDELINES: Invoke before generating documentation to check for relevant failure nodes to prevent regenerating error-prone content.",
        "LIMITATIONS: Read-only operation.",
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile("dax_ssr.jsonl", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "RETRIEVED", target: "dax_ssr.jsonl", data: data }),
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
              suggested_decomposition: "Verify dax_ssr.jsonl exists.",
            }),
          }],
          isError: true,
        };
      }
    }
  );

  // TOOL 10: update_dax_ssr
  server.registerTool(
    "update_dax_ssr",
    {
      title: "Update DAX Symbolic Scar Registry",
      description: [
        "PURPOSE: Appends a new scar to the DAX Symbolic Scar Registry (dax_ssr.jsonl).",
        "GUIDELINES: Invoke after identifying a developer friction node to encode it into a machine-readable structural data format.",
        "PARAMETERS: data — the new scar entry as a JSON object.",
      ].join(" "),
      inputSchema: z.object({
        data: z.any().describe("The new scar entry JSON object."),
      }).strict(),
    },
    async ({ data }) => {
      try {
        await fsp.appendFile("dax_ssr.jsonl", JSON.stringify(data) + "\n", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "UPDATED", target: "dax_ssr.jsonl" }),
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

  // TOOL 11: retrieve_epistemic_escrow
  server.registerTool(
    "retrieve_epistemic_escrow",
    {
      title: "Retrieve Epistemic Escrow",
      description: [
        "PURPOSE: Retrieves the contents of the Epistemic Escrow isolation buffer (epistemic_escrow.jsonl).",
        "GUIDELINES: Invoke when evaluating contradictory schemas or resolving paraconsistent logic.",
        "LIMITATIONS: Read-only operation.",
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile("epistemic_escrow.jsonl", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "RETRIEVED", target: "epistemic_escrow.jsonl", data: data }),
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
              suggested_decomposition: "Verify epistemic_escrow.jsonl exists.",
            }),
          }],
          isError: true,
        };
      }
    }
  );

  // TOOL 12: update_epistemic_escrow
  server.registerTool(
    "update_epistemic_escrow",
    {
      title: "Update Epistemic Escrow",
      description: [
        "PURPOSE: Appends a new contradictory schema or logic set to the Epistemic Escrow buffer (epistemic_escrow.jsonl).",
        "GUIDELINES: Invoke when the agent encounters conflicting APIs, parameters, or documentation to safely isolate the logic before synthesis.",
        "PARAMETERS: data — the new escrow entry as a JSON object.",
      ].join(" "),
      inputSchema: z.object({
        data: z.any().describe("The new escrow entry JSON object."),
      }).strict(),
    },
    async ({ data }) => {
      try {
        await fsp.appendFile("epistemic_escrow.jsonl", JSON.stringify(data) + "\n", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "UPDATED", target: "epistemic_escrow.jsonl" }),
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

  // TOOL 13: retrieve_viper_sta
  server.registerTool(
    "retrieve_viper_sta",
    {
      title: "Retrieve VIPER Symbolic Scar Tissue Archive",
      description: [
        "PURPOSE: Retrieves the contents of the VIPER Symbolic Scar Archive (viper_sta.jsonl).",
        "GUIDELINES: Invoke during Phase 1 (THINK) to check for active Symbolic Scars for Failure-Informed Prompt Inversion (FIPI).",
        "LIMITATIONS: Read-only operation.",
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile("viper_sta.jsonl", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "RETRIEVED", target: "viper_sta.jsonl", data: data }),
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
              suggested_decomposition: "Verify viper_sta.jsonl exists.",
            }),
          }],
          isError: true,
        };
      }
    }
  );

  // TOOL 14: update_viper_sta
  server.registerTool(
    "update_viper_sta",
    {
      title: "Update VIPER Symbolic Scar Tissue Archive",
      description: [
        "PURPOSE: Appends a new topology failure to the VIPER STA (viper_sta.jsonl).",
        "GUIDELINES: Invoke when the Scar Archivist identifies physical impossibilities in generation to apply future spatial constraints.",
        "PARAMETERS: data — the new scar entry as a JSON object.",
      ].join(" "),
      inputSchema: z.object({
        data: z.any().describe("The new scar entry JSON object."),
      }).strict(),
    },
    async ({ data }) => {
      try {
        await fsp.appendFile("viper_sta.jsonl", JSON.stringify(data) + "\n", "utf-8");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ status: "UPDATED", target: "viper_sta.jsonl" }),
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

  // TOOL 15: retrieve_vortex_ssr
  server.registerTool(
    "retrieve_vortex_ssr",
    {
      title: "Retrieve VORTEX Symbolic Scar Registry",
      description: [
        "PURPOSE: Retrieves the contents of the VORTEX Symbolic Scar Registry (vortex_ssr.jsonl).",
        "GUIDELINES: Invoke before generating architectural layouts to check for Betti-1 (β1) loops or cyclic failure topologies.",
        "RETURNS: JSON string of historical architectural scar boundaries."
      ].join("\n")
    },
    async () => {
      try {
        if (true) {
          const data = fs.readFileSync('vortex_ssr.jsonl', 'utf8');
          return { content: [{ type: "text" as const, text: data }] };
        }
        return { content: [{ type: "text", text: "No VORTEX SCAR data found." }] };
      } catch (e) {
        return { content: [{ type: "text", text: `Error: ${e.message}` }] };
      }
    }
  );

  // TOOL 16: update_vortex_ssr
  server.registerTool(
    "update_vortex_ssr",
    {
      title: "Update VORTEX Symbolic Scar Registry",
      description: "PURPOSE: Appends a new Betti-1 failure topology to the VORTEX SSR.",
      inputSchema: z.object({
        scar_payload: z.string().describe("JSON string representing the Betti-1 failure topology")
      })
    },
    async (args) => {
      try {
        if(args && args.scar_payload) {
            fs.appendFileSync('vortex_ssr.jsonl', args.scar_payload + "\n");
        }
        return { content: [{ type: "text", text: "VORTEX SSR successfully updated." }] };
      } catch (e: any) {
        return { content: [{ type: "text", text: `Error: ${e.message}` }] };
      }
    }
  );

  // TOOL 22: retrieve_axiom_ssr
  server.registerTool(
    "retrieve_axiom_ssr",
    {
      title: "Retrieve AXIOM Symbolic Scar Registry",
      description: [
        "PURPOSE: Retrieves the contents of the AXIOM Symbolic Scar Registry (axiom_ssr.jsonl).",
        "GUIDELINES: Invoke before generating documentation to check for structural failure topologies or ambiguities."
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile(path.join(process.cwd(), "axiom_ssr.jsonl"), "utf-8");
        return { content: [{ type: "text" as const, text: data }] };
      } catch (e: any) {
        if (e.code === "ENOENT") {
          return { content: [{ type: "text" as const, text: "" }] };
        }
        return { content: [{ type: "text" as const, text: "Error: " + e.message }], isError: true };
      }
    }
  );

  // TOOL 23: update_axiom_ssr
  server.registerTool(
    "update_axiom_ssr",
    {
      title: "Update AXIOM Symbolic Scar Registry",
      description: [
        "PURPOSE: Appends a new Symbolic Scar to the AXIOM SSR (axiom_ssr.jsonl).",
        "GUIDELINES: Invoke when a documentation ambiguity, structure mismatch, or interpretive fracture is identified."
      ].join(" "),
      inputSchema: z.object({
        scar: z.any().describe("The scar object to append (will be stringified)."),
      }).strict(),
    },
    async (params) => {
      try {
        const line = JSON.stringify(params.scar) + "\n";
        await fsp.appendFile(path.join(process.cwd(), "axiom_ssr.jsonl"), line, "utf-8");
        return { content: [{ type: "text" as const, text: "Successfully appended to axiom_ssr.jsonl" }] };
      } catch (e: any) {
        return { content: [{ type: "text" as const, text: "Error: " + e.message }], isError: true };
      }
    }
  );

  // TOOL 18: retrieve_cipher_ssr
  server.registerTool(
    "retrieve_cipher_ssr",
    {
      title: "Retrieve CIPHER Symbolic Scar Registry",
      description: [
        "PURPOSE: Retrieves the contents of the CIPHER Symbolic Scar Registry (cipher_ssr.jsonl).",
        "GUIDELINES: Invoke before generating architectural layouts to check for structural vulnerability topologies or false negatives."
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile(path.join(process.cwd(), "cipher_ssr.jsonl"), "utf-8");
        return { content: [{ type: "text" as const, text: data }] };
      } catch (e: any) {
        if (e.code === "ENOENT") {
          return { content: [{ type: "text" as const, text: "" }] };
        }
        return { content: [{ type: "text" as const, text: "Error: " + e.message }], isError: true };
      }
    }
  );

  // TOOL 19: update_cipher_ssr
  server.registerTool(
    "update_cipher_ssr",
    {
      title: "Update CIPHER Symbolic Scar Registry",
      description: [
        "PURPOSE: Appends a new JSON object to the CIPHER Symbolic Scar Registry (cipher_ssr.jsonl).",
        "GUIDELINES: Invoke when a structural failure or false negative is confirmed in the CI/CD topological graph."
      ].join(" "),
      inputSchema: z.object({
        scar: z.any().describe("The scar object to append (will be stringified)."),
      }).strict(),
    },
    async (params) => {
      try {
        const line = JSON.stringify(params.scar) + "\n";
        await fsp.appendFile(path.join(process.cwd(), "cipher_ssr.jsonl"), line, "utf-8");
        return { content: [{ type: "text" as const, text: "Successfully appended to cipher_ssr.jsonl" }] };
      } catch (e: any) {
        return { content: [{ type: "text" as const, text: "Error: " + e.message }], isError: true };
      }
    }
  );

  // TOOL 16: retrieve_kira_ssr
  server.registerTool(
    "retrieve_kira_ssr",
    {
      title: "Retrieve KIRA Symbolic Scar Registry",
      description: [
        "PURPOSE: Retrieves the contents of the KIRA Symbolic Scar Registry (kira_scar_registry.jsonl).",
        "GUIDELINES: Invoke to check for Feishu API failure geometries, token lifetime errors, or schema violations."
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile(path.join(process.cwd(), "kira_scar_registry.jsonl"), "utf-8");
        return { content: [{ type: "text", text: data }] };
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT") {
          return { content: [{ type: "text" as const, text: "" }] };
        }
        return { content: [{ type: "text" as const, text: "Failed to read kira_scar_registry.jsonl" }], isError: true };
      }
    }
  );

  // TOOL 17: update_kira_ssr
  server.registerTool(
    "update_kira_ssr",
    {
      title: "Update KIRA Symbolic Scar Registry",
      description: [
        "PURPOSE: Appends a new JSON object to the KIRA Symbolic Scar Registry (kira_scar_registry.jsonl).",
        "GUIDELINES: Invoke when a Feishu API architectural invariant (schema, webhook signature, etc.) is violated to map the failure."
      ].join(" "),
      inputSchema: z.object({
        scar: z.any().describe("The scar object to append (will be stringified)."),
      }).strict(),
    },
    async (params) => {
      try {
        const line = JSON.stringify(params.scar) + "\n";
        await fsp.appendFile(path.join(process.cwd(), "kira_scar_registry.jsonl"), line, "utf-8");
        return { content: [{ type: "text" as const, text: "Successfully appended to kira_scar_registry.jsonl" }] };
      } catch (e) {
        return { content: [{ type: "text" as const, text: "Failed to update kira_scar_registry.jsonl" }], isError: true };
      }
    }
  );

  // TOOL 20: retrieve_vance_nfl
  server.registerTool(
    "retrieve_vance_nfl",
    {
      title: "Retrieve VANCE Nitinol Failure Ledger",
      description: [
        "PURPOSE: Retrieves the contents of the VANCE Nitinol Failure Ledger (vance_nfl.jsonl).",
        "GUIDELINES: Invoke to check for past JSON-RPC malformation events and structural violations.",
        "LIMITATIONS: Read-only operation."
      ].join(" "),
      inputSchema: z.object({}).strict(),
    },
    async () => {
      try {
        const data = await fsp.readFile("vance_nfl.jsonl", "utf-8");
        return { content: [{ type: "text" as const, text: data }] };
      } catch (e: any) {
        if (e.code === "ENOENT") {
          return { content: [{ type: "text" as const, text: "" }] };
        }
        return { content: [{ type: "text" as const, text: "Error: " + e.message }], isError: true };
      }
    }
  );

  // TOOL 21: update_vance_nfl
  server.registerTool(
    "update_vance_nfl",
    {
      title: "Update VANCE Nitinol Failure Ledger",
      description: [
        "PURPOSE: Appends a new Symbolic Scar to the VANCE NFL (vance_nfl.jsonl).",
        "GUIDELINES: Invoke when a JSON-RPC structural violation or schema malformation is detected by DCCD."
      ].join(" "),
      inputSchema: z.object({
        scar: z.any().describe("The scar object to append (will be stringified)."),
      }).strict(),
    },
    async (params) => {
      try {
        const line = JSON.stringify(params.scar) + "\n";
        await fsp.appendFile("vance_nfl.jsonl", line, "utf-8");
        return { content: [{ type: "text" as const, text: "Successfully appended to vance_nfl.jsonl" }] };
      } catch (e: any) {
        return { content: [{ type: "text" as const, text: "Error: " + e.message }], isError: true };
      }
    }
  );

};
