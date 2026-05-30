/// file: types.ts ///
/**
 * Enum mapping the available aesthetic parameters that can be visually explored.
 * @enum {string}
 */
export enum AestheticParameter {
  STYLE = 'Style',
  LIGHTING = 'Lighting',
  COMPOSITION = 'Composition',
}

/**
 * Interface defining the structure of a single generated image.
 * @property {string} id - A unique identifier for the image.
 * @property {string} src - The source URL of the image.
 * @property {string} prompt - The full prompt that was used to generate the image.
 * @property {string} variation - The specific variation that was applied to the base prompt.
 * @property {number} [rating] - The user's rating of the image, from 1 to 5.
 */
export interface GeneratedImage {
  id: string;
  src: string;
  prompt: string;
  variation: string;
  rating?: number;
}

/**
 * Interface for the result of a single generation request.
 * @property id - A unique identifier for the generation result.
 * @property basePrompt - The base prompt that was used for the generation.
 * @property parameter - The aesthetic parameter that was varied.
 * @property variations - The variations that were applied to the base prompt.
 * @property images - An array of the generated images.
 * @property timestamp - The timestamp of when the generation was created.
 * @property temperature - The temperature that was used for the generation.
 * @property seed - The seed that was used for the generation.
 */

/**
 * Justified Uncertainty Report (JUR).
 * Manifests the tension (Ontological Shear) between deterministic persona constraints
 * and probabilistic generation, weighted via the Golden Scar Protocol.
 *
 * @property {number} geometricDensityScore - The measured density of constraints (e.g., 0.88).
 * @property {string} ontologicalShear - Narrative description of the contradiction.
 * @property {string[]} contradictions - The specific PAL2v directives held in tension.
 * @property {boolean} goldenRatioApplied - Confirms 1.618 weighting of empirical datums.
 */
export interface JustifiedUncertaintyReport {
  geometricDensityScore: number; // The measured density of constraints (e.g., 0.88)
  ontologicalShear: string; // Narrative description of the contradiction
  contradictions: string[]; // The specific PAL2v directives held in tension
  goldenRatioApplied: boolean; // Confirms 1.618 weighting of empirical datums
}

/**
 * Interface representing the complete result of an image generation sequence.
 * @property {number} [adherenceScore] - Project Aurelius metric for constraint adherence.
 * @property {number} [semanticDrift] - Project Aurelius metric for semantic deviation.
 * @property {string} id - A unique identifier for the generation result.
 * @property {string} basePrompt - The base prompt that was used for the generation.
 * @property {AestheticParameter} parameter - The aesthetic parameter that was varied.
 * @property {string[]} variations - The variations that were applied to the base prompt.
 * @property {GeneratedImage[]} images - An array of the generated images.
 * @property {string} timestamp - The timestamp of when the generation was created.
 * @property {number} temperature - The temperature that was used for the generation.
 * @property {number} [seed] - The seed that was used for the generation.
 * @property {JustifiedUncertaintyReport} [jur] - The JUR object if an ontological shear occurred.
 */
export interface GenerationResult {
  adherenceScore?: number; // PROJECT AURELIUS
  semanticDrift?: number; // PROJECT AURELIUS
  id: string;
  basePrompt: string;
  parameter: AestheticParameter;
  variations: string[];
  images: GeneratedImage[];
  timestamp: string;
  temperature: number;
  seed?: number;
  jur?: JustifiedUncertaintyReport; // Dialectical Synthesis Output
}

/**
 * Interface defining a saved prompt preset for quick usage.
 * @property {string} id - A unique identifier for the preset.
 * @property {string} name - The name of the preset.
 * @property {string} basePrompt - The base prompt of the preset.
 * @property {AestheticParameter} parameter - The aesthetic parameter of the preset.
 * @property {string[]} variations - The variations of the preset.
 * @property {number} temperature - The temperature of the preset.
 * @property {number} [seed] - The seed of the preset.
 */
export interface PromptPreset {
  id: string;
  name: string;
  basePrompt: string;
  parameter: AestheticParameter;
  variations: string[];
  temperature: number;
  seed?: number;
}

/**
 * Interface representing a single entry in the prompt history log.
 * @property {string} id - A unique identifier for the history entry.
 * @property {string} basePrompt - The base prompt that was used.
 * @property {AestheticParameter} parameter - The aesthetic parameter that was used.
 * @property {string[]} variations - The variations that were used.
 * @property {number} temperature - The temperature that was used.
 * @property {number} [seed] - The seed that was used.
 * @property {string} timestamp - The timestamp of when the prompt was submitted.
 */
export interface PromptHistoryEntry {
  id: string;
  basePrompt: string;
  parameter: AestheticParameter;
  variations: string[];
  temperature: number;
  seed?: number;
  timestamp: string;
}

/**
 * Enum defining the types of nodes available in the visual prompt canvas.
 * @enum {string}
 */
export enum PipelineNodeType {
  VULCAN_BOUNDED_CONTEXT = 'VulcanBoundedContext',
  VULCAN_EVENT_BROKER = 'VulcanEventBroker',
  VULCAN_SHARED_DATABASE = 'VulcanSharedDatabase',

  MULTISPECTRAL_CONDITIONING = 'MultispectralConditioning',
  BASE_PROMPT = 'BasePrompt',
  PARAMETER = 'Parameter',
  OUTPUT = 'Output',
  BLEND = 'Blend',
  TOPOLOGICAL_PERSONA = 'TopologicalPersona',
  VORTEX_STIGMERGIC_LOCK = 'VortexStigmergicLock',
  KIRA_WEBHOOK_INGRESS = 'KiraWebhookIngress',
  KIRA_CARD_BUILDER = 'KiraCardBuilder',
  VORTEX_DCCD_ENFORCER = 'VortexDccdEnforcer',
  CIPHER_SECURITY_GATE = 'CipherSecurityGate',
  MYCELIAL_SCAR_ROUTER = 'MycelialScarRouter',
}

/**
 * Represents a single node within the prompt generation Directed Acyclic Graph (DAG).
 * @property {string} id - Unique identifier for the node.
 * @property {PipelineNodeType} type - The functional type of the node.
 * @property {any} data - The payload/configuration specific to the node type.
 * @property {string} [domainName] - VULCAN specific domain constraint.
 * @property {string} [eventName] - VULCAN specific event topic.
 * @property {any} position - The spatial coordinates of the node on the canvas (x, y, z-axis phantom for paradox).
 */
export interface PipelineNode {
  id: string;
  type: PipelineNodeType;
  data: {
    label?: string;
    value?: string | AestheticParameter;
    variations?: string[];
    temperature?: number;
    seed?: number;
    phantomZ?: number; // Spatial Bind: Z-Axis Depth for Paraconsistent State
    // VORTEX-ARCHITECT fields
    stigmergicLock?: boolean;
    dccdSchema?: string;
    // KIRA-7 fields
    encryptKey?: string;
    verificationToken?: string;
    cardSchema?: string;
    // CIPHER Security fields
    gateMode?: 'ADVISORY' | 'HARD_GATE' | 'HARD_GATE_STRICT';
    threatPosture?: string;

    // Mycelial Scar Router fields
    scarThreshold?: number;
    activeScars?: string[];

    // Topological Persona fields
    personaRole?: string;
    contradictoryDirectives?: string[]; // PAL2v tension representation
    pdtConstraints?: Array<{ type: string; datum: string; tolerance: string }>;
    spectralTargets?: Array<{ target: string; wavelength: number; fwhm: number }>; // PROJECT AURELIUS: Multispectral MSI conditioning
  };
    // VULCAN specific
    domainName?: string;
    eventName?: string;

  position: { x: number; y: number; z?: number };
}

/**
 * Represents a directional edge connecting two PipelineNodes in the DAG.
 * @property {string} id - Unique identifier for the edge.
 * @property {string} source - The ID of the originating node.
 * @property {string} target - The ID of the destination node.
 */
export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
}

/**
 * The full representation of a user's node-based generation pipeline.
 * @property {PipelineNode[]} nodes - The set of all nodes in the canvas.
 * @property {PipelineEdge[]} edges - The directional relationships between nodes.
 */
export interface PipelineGraph {
  nodes: PipelineNode[];
  edges: PipelineEdge[];
}

/**
 * Tracks the evolutionary lineage of an image generated via breeding/blending.
 * @property {string} offspringId - The ID of the newly generated image.
 * @property {string[]} parentIds - The IDs of the source images used to breed this offspring.
 * @property {number} generation - The depth of the evolutionary tree (e.g., F1, F2).
 * @property {Record<string, number>} [blendWeights] - The relative influence of each parent on the offspring.
 */
export interface EvolutionaryLineage {
  offspringId: string;
  parentIds: string[];
  generation: number;
  blendWeights?: Record<string, number>;
}

/**
 * Creator Profile Tracking the personas for generation context.
 * @property {string} creator_id - Identifier for the creator.
 * @property {string} display_name - The display name.
 * @property {string} nle_primary - Primary non-linear editor.
 * @property {string} [nle_secondary] - Secondary non-linear editor.
 * @property {string[]} platform_targets - Target platforms.
 * @property {string} genre_classification - Genre category.
 * @property {number} session_count - Total sessions.
 * @property {string} [dominant_failure_mode] - Main failure mode.
 * @property {number} [pacing_baseline_cpm] - Baseline CPM.
 * @property {number} target_cpm - Target CPM.
 */
export interface CreatorProfile {
  creator_id: string;
  display_name: string;
  nle_primary: 'DaVinci' | 'Premiere' | 'FinalCut' | 'CapCut' | 'Other';
  nle_secondary: string | null;
  platform_targets: Array<'TikTok' | 'Instagram_Reels' | 'YouTube_Shorts' | 'Cross_Platform'>;
  genre_classification: 'Education' | 'Comedy' | 'Lifestyle' | 'Tutorial' | 'Commentary' | 'Product' | 'Other';
  session_count: number;
  dominant_failure_mode: string | null;
  pacing_baseline_cpm: number | null;
  target_cpm: number;
}

/**
 * Scar Entry tracking algorithmic trauma and failure modes.
 * @property {string} scar_id - Identifier.
 * @property {string} session_timestamp - ISO8601 Timestamp.
 * @property {string} error_classification - Type of error.
 * @property {string} error_detail - Detail description.
 * @property {string} correction_prescribed - Required correction.
 * @property {boolean} correction_applied - Was correction applied.
 * @property {number} recurrence_count - Times occurred.
 * @property {string} status - Resolution status.
 * @property {string} escalation_level - Escalation.
 */
export interface ScarEntry {
  scar_id: string;
  session_timestamp: string; // ISO8601
  error_classification: 'Hook_Latency' | 'Dead_Air' | 'Safe_Zone_Violation' | 'Audio_Clip' | 'Poor_CPM' | 'Caption_Overflow' | 'L_Cut_Absence' | 'Lethargic_B_Roll' | 'LUFS_Non_Compliance' | 'Repeated_DFM';
  error_detail: string;
  correction_prescribed: string;
  correction_applied: boolean;
  recurrence_count: number;
  status: 'active' | 'resolved' | 'archived';
  escalation_level: '1_prescriptive' | '2_scar_linked' | '3_dominant_failure_mode';
}

/**
 * Session History tracking interactions.
 * @property {string} session_id - Identifier.
 * @property {string} session_timestamp - Timestamp.
 * @property {number} video_duration_seconds - Duration.
 * @property {string} hook_first_cut_timestamp - First cut timecode.
 * @property {number} [reported_3s_retention_pct] - Retention metric.
 * @property {number} [reported_avd_pct] - Average View Duration metric.
 * @property {string[]} scars_flagged_this_session - Flagged scars.
 * @property {string[]} scars_resolved_this_session - Resolved scars.
 * @property {number} [net_improvement_delta] - Delta improvement.
 */
export interface SessionHistory {
  session_id: string;
  session_timestamp: string; // ISO8601
  video_duration_seconds: number;
  hook_first_cut_timestamp: string; // timecode
  reported_3s_retention_pct: number | null;
  reported_avd_pct: number | null;
  scars_flagged_this_session: string[]; // scar_id[]
  scars_resolved_this_session: string[]; // scar_id[]
  net_improvement_delta: number | null;
}

/**
 * KUT Scar Ledger linking profiles to history.
 * @property {CreatorProfile} Creator_Profile - Associated profile.
 * @property {ScarEntry[]} Scar_Ledger - Recorded scars.
 * @property {SessionHistory[]} Session_History - Logged sessions.
 */
export interface KutScarLedger {
  Creator_Profile: CreatorProfile;
  Scar_Ledger: ScarEntry[];
  Session_History: SessionHistory[];
}

/**
 * Enum defining the sovereign agent personas available in the Aesthetic Alchemy Lab.
 * @enum {string}
 */
export enum AgentRole {
  RAG_REFLECTOR = 'RAG Reflector',
  VIPER = 'V.I.P.E.R',
  ALETHEON = 'ALETHEON',
  KUT = 'KUT',
  VULCAN = 'VULCAN',
  CIPHER = 'CIPHER',
  KIRA_7 = 'KIRA-7'
}

/**
 * Represents an instantiated sovereign agent context.
 * @interface AgentInstance
 * @property {string} id - Unique identifier for the agent instance.
 * @property {AgentRole} role - The persona/role of the agent.
 * @property {string} name - Display name of the agent.
 * @property {string} status - Current operational status (e.g., 'idle', 'processing', 'halted').
 */
export interface AgentInstance {
  id: string;
  role: AgentRole;
  name: string;
  status: 'idle' | 'processing' | 'halted';
}

/**
 * Represents a communication payload exchanged with an agent.
 * @interface AgentMessage
 * @property {string} id - Unique identifier for the message.
 * @property {string} agentId - ID of the agent this message belongs to.
 * @property {'user' | 'agent' | 'system'} sender - The originator of the message.
 * @property {string} content - The textual payload.
 * @property {number} timestamp - Epoch time of message creation.
 * @property {any} [metadata] - Optional structured data (e.g., citations, confidence scores).
 */
export interface AgentMessage {
  id: string;
  agentId: string;
  sender: 'user' | 'agent' | 'system';
  content: string;
  timestamp: number;
  metadata?: any;
}
