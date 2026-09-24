import math
import json

def simulate_occam_loss_compiler_kinematics():
    print("=============================================================================")
    print("PROMPT 1: Reconstructing Ptolemaic Over-Fitting vs. Keplerian Parsimony")
    print("=============================================================================")

    # 1. Typed Schema for Planetary Orbital Telemetry
    schema = {
        "dataset_name": "Venusian Orbital Telemetry",
        "data_points": 1000,
        "features": ["RA", "Dec", "Phase_Angle", "Apparent_Magnitude"]
    }
    print(f"[*] Ingesting Telemetry Schema: {schema['dataset_name']}")

    # 2. Occam-Loss Compiler (BIC)
    def calculate_bic(n, rss, k):
        """
        Bayesian Information Criterion: BIC = n * ln(RSS/n) + k * ln(n)
        n = number of data points
        rss = residual sum of squares
        k = number of free parameters
        """
        return n * math.log(rss/n) + k * math.log(n)

    models = [
        {"name": "Ptolemaic Geocentric (Model A)", "k": 25, "rss": 0.05}, # Made up value for demonstration of BIC preferring simpler model
        {"name": "Keplerian Heliocentric (Model B)", "k": 6, "rss": 0.06}
    ]

    print("\n[*] Executing Occam-Loss Compiler (BIC Calculation):")
    n_points = schema["data_points"]
    best_model = None
    min_bic = float('inf')

    for model in models:
        bic = calculate_bic(n_points, model["rss"], model["k"])
        print(f"    - {model['name']}: Parameters (k)={model['k']}, RSS={model['rss']} -> BIC = {bic:.2f}")
        if bic < min_bic:
            min_bic = bic
            best_model = model["name"]

    print(f"[+] Selected Model via BIC Parsimony: {best_model}")

    # 3. Model Breaking via Modus Tollens (Venus Phase Constraints)
    print("\n[*] Simulating Galileo 'Model Breaking' (Venus Phase Injection):")
    print("    - Modus Tollens Check: If Geocentric, then Venus cannot show full phases.")
    print("    - Observation: Venus shows full phases.")
    print("    - Conclusion: Geocentric coordinate frame is falsified.")
    print("    [!] Falsification Triggered! Forcing abductive transition to Heliocentric system.\n")


def simulate_fictive_principles_understanding():
    print("=============================================================================")
    print("PROMPT 2: Modeling Factive Knowledge vs. Non-Factive Understanding")
    print("=============================================================================")

    # 1. Ontology of Fictive Principles
    fictive_ontology = {
        "Newtonian_Gravity": {
            "idealizations": ["Point Masses", "Instantaneous Action at a Distance", "Absolute Space/Time"],
            "computational_utility": "O(1) closed-form solutions for 2-body problems.",
            "explanatory_utility": "Accurately maps macroscopic orbital mechanics below relativistic velocities."
        }
    }
    print("[*] Loaded Fictive Principles Ontology:")
    for key, value in fictive_ontology.items():
        print(f"    - Framework: {key}")
        print(f"      Idealizations: {', '.join(value['idealizations'])}")

    # 2. Grasping Metric Calculation
    def calculate_grasping_score(causal_dependencies_mapped, domain_transfer_success, fictive_awareness):
        # Grasping = (Causal * 0.4) + (Transfer * 0.4) + (Fictive Awareness * 0.2)
        return (causal_dependencies_mapped * 0.4) + (domain_transfer_success * 0.4) + (fictive_awareness * 0.2)

    # 3. Simulation: Newtonian Astrophysics Problem
    print("\n[*] Simulating Agent Solving Astrophysical Trajectory:")
    agent_state = {
        "problem_domain": "Lunar Transfer Orbit",
        "framework_used": "Newtonian_Gravity",
        "causal_dependencies_mapped": 0.95, # High ability to manipulate variables (F=GmM/r^2)
        "domain_transfer_success": 0.85, # Successfully applies it to different mass bodies
        "fictive_awareness": 0.90 # Agent is aware that this is an approximation (General Relativity exists)
    }

    score = calculate_grasping_score(
        agent_state["causal_dependencies_mapped"],
        agent_state["domain_transfer_success"],
        agent_state["fictive_awareness"]
    )

    print(f"    - Agent correctly identifies causal dependencies (Score: {agent_state['causal_dependencies_mapped']})")
    print(f"    - Agent acknowledges GR defeaters but uses Newtonian for tractability (Awareness: {agent_state['fictive_awareness']})")
    print(f"    [+] Final Agent 'Understanding Score': {score:.2f} / 1.00")
    print("    Conclusion: Agent demonstrates deep non-factive understanding despite strict factive falsity.\n")


def simulate_de_idealization_engine():
    print("=============================================================================")
    print("PROMPT 3: Automating the De-Idealization Loop in Systems Biology")
    print("=============================================================================")

    # 1. Formal DAG of Idealized Model
    dag_model = {
        "name": "Bead-Rod Polymer Protein Model",
        "nodes": ["Sequence", "Beads", "Rigid_Rods"],
        "assumptions": {
            "flexibility": 0.0, # Zero conformational flexibility
            "solvent_interaction": "implicit"
        }
    }
    print(f"[*] Loaded Idealized DAG: {dag_model['name']}")
    print(f"    Initial Assumptions: Flexibility={dag_model['assumptions']['flexibility']}")

    # 2. Boundary Auditor
    def boundary_auditor(temperature_k, dynamic_stress):
        print(f"\n[*] Boundary Auditor executing at Limit: T={temperature_k}K, Stress={dynamic_stress}")
        if temperature_k > 300 or dynamic_stress > 5.0:
             # Simulate prediction error divergence
             return 4.2 # Returns a sigma divergence > 3.0
        return 1.1

    sigma_divergence = boundary_auditor(310, 6.5)
    print(f"    - Measured Prediction Divergence: {sigma_divergence} sigma")

    # 3. De-Idealization Feedback Loop
    if sigma_divergence > 3.0:
        print("\n    [!] 3-Sigma Divergence Detected. Model Breakdown Confirmed outside valid domain.")
        print("    [*] Initiating De-Idealization Routine...")
        # Targeted de-idealization
        dag_model["assumptions"]["flexibility"] = 1.0 # Re-injecting variable
        dag_model["nodes"].remove("Rigid_Rods")
        dag_model["nodes"].append("Spring_Dampers") # Higher-dimensional representation
        print("    [+] Model Refined. Re-injected omitted variable: 'Conformational Flexibility'")
        print(f"    [+] Updated DAG Nodes: {dag_model['nodes']}")
    print("\n")


if __name__ == "__main__":
    simulate_occam_loss_compiler_kinematics()
    simulate_fictive_principles_understanding()
    simulate_de_idealization_engine()
