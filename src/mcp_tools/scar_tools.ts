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

export const registerScarTools = (server: McpServer) => {
};
