/// file: types.ts ///
/**
 * Enum for the different aesthetic parameters that can be varied.
 * @enum {string}
 */
export enum AestheticParameter {
  STYLE = 'Style',
  LIGHTING = 'Lighting',
  COMPOSITION = 'Composition',
}

/**
 * Interface for a single generated image.
 * @property id - A unique identifier for the image.
 * @property src - The source URL of the image.
 * @property prompt - The full prompt that was used to generate the image.
 * @property variation - The specific variation that was applied to the base prompt.
 * @property rating - The user's rating of the image, from 1 to 5.
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
export interface GenerationResult {
  id: string;
  basePrompt: string;
  parameter: AestheticParameter;
  variations: string[];
  images: GeneratedImage[];
  timestamp: string;
  temperature: number;
  seed?: number;
}

/**
 * Interface for a saved prompt preset.
 * @property id - A unique identifier for the preset.
 * @property name - The name of the preset.
 * @property basePrompt - The base prompt of the preset.
 * @property parameter - The aesthetic parameter of the preset.
 * @property variations - The variations of the preset.
 * @property temperature - The temperature of the preset.
 * @property seed - The seed of the preset.
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
 * Interface for a single entry in the prompt history.
 * @property id - A unique identifier for the history entry.
 * @property basePrompt - The base prompt that was used.
 * @property parameter - The aesthetic parameter that was used.
 * @property variations - The variations that were used.
 * @property temperature - The temperature that was used.
 * @property seed - The seed that was used.
 * @property timestamp - The timestamp of when the prompt was submitted.
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
 * Defines the types of nodes available in the visual prompt canvas.
 * @enum {string}
 */
export enum PipelineNodeType {
  BASE_PROMPT = 'BasePrompt',
  PARAMETER = 'Parameter',
  OUTPUT = 'Output',
  BLEND = 'Blend',
  TOPOLOGICAL_PERSONA = 'TopologicalPersona',
}

/**
 * Represents a single node within the prompt generation Directed Acyclic Graph (DAG).
 * @property id - Unique identifier for the node.
 * @property type - The functional type of the node.
 * @property data - The payload/configuration specific to the node type.
 * @property position - The spatial coordinates of the node on the canvas (x, y, z-axis phantom for paradox).
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
    // Topological Persona fields
    personaRole?: string;
    contradictoryDirectives?: string[]; // PAL2v tension representation
    pdtConstraints?: Array<{ type: string; datum: string; tolerance: string }>;
  };
  position: { x: number; y: number; z?: number };
}

/**
 * Represents a directional edge connecting two PipelineNodes in the DAG.
 * @property id - Unique identifier for the edge.
 * @property source - The ID of the originating node.
 * @property target - The ID of the destination node.
 */
export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
}

/**
 * The full representation of a user's node-based generation pipeline.
 * @property nodes - The set of all nodes in the canvas.
 * @property edges - The directional relationships between nodes.
 */
export interface PipelineGraph {
  nodes: PipelineNode[];
  edges: PipelineEdge[];
}

/**
 * Tracks the evolutionary lineage of an image generated via breeding/blending.
 * @property offspringId - The ID of the newly generated image.
 * @property parentIds - The IDs of the source images used to breed this offspring.
 * @property generation - The depth of the evolutionary tree (e.g., F1, F2).
 * @property blendWeights - The relative influence of each parent on the offspring.
 */
export interface EvolutionaryLineage {
  offspringId: string;
  parentIds: string[];
  generation: number;
  blendWeights?: Record<string, number>;
}

/**
 * Interfaces for the KUT Scar Ledger (The Retention Architect)
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

export interface KutScarLedger {
  Creator_Profile: CreatorProfile;
  Scar_Ledger: ScarEntry[];
  Session_History: SessionHistory[];
}
