import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { evaluateALA, DEFAULT_ALA_CONFIG, ActionVector, SEPAOGraph, AffordanceWatchlist } from "../services/anomalyLearningAgent.js";

export const registerALATools = (server: McpServer) => {
    // TOOL: evaluate_ala_risk
    server.registerTool(
        "evaluate_ala_risk",
        {
            title: "Evaluate ALA Risk",
            description: "Evaluates the risk of an agent action using the Anomaly Learning Agent (ALA) perception pipeline.",
            inputSchema: z.object({
                tool: z.string(),
                trace: z.array(z.string()),
                entropy: z.number(),
                bicm: z.number(),
                latencyLag: z.number(),
                diffScore: z.number(),
            }).strict()
        },
        async ({ tool, trace, entropy, bicm, latencyLag, diffScore }) => {
            const action: ActionVector = {
                tool,
                args: {},
                trace,
                state: {
                    Entropy: entropy,
                    BICM: bicm,
                    Latency_Lag: latencyLag,
                    Diff_Score: diffScore
                }
            };

            // Mock SEPAO Graph and Watchlist for now
            const graph: SEPAOGraph = { nodes: [], edges: [] };
            const watchlist: AffordanceWatchlist = { tools: ['delete_user', 'drop_database', 'extract_secrets'] };

            const result = evaluateALA(action, graph, watchlist, DEFAULT_ALA_CONFIG);

            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
    );
};
