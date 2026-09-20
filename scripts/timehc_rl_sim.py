import random
import time

class TimeHCRLSimulator:
    """
    Simulates Temporal-Aware Hierarchical Cognitive Reinforcement Learning (TimeHC-RL).
    Demonstrates a slow-frequency System 2 Macro-Policy setting biases for a
    fast-frequency System 1 Micro-Policy during a social interaction (Negotiation).
    """
    def __init__(self):
        self.system2_bias = "Neutral"
        self.round = 1
        self.max_rounds = 5
        self.agent_score = 0
        self.opponent_score = 0

    def macro_policy_step(self, observation):
        """
        System 2: Slow, deliberative. Runs infrequently (e.g., once per day/round).
        Generates high-level desires and personality biases.
        """
        print(f"\n[System 2 Macro-Policy] Analyzing slow-frequency context...")
        print(f"  Observation: {observation}")
        time.sleep(0.5) # Simulate deliberation time

        if "opponent_aggressive" in observation:
            self.system2_bias = "Defensive_and_Firm"
        elif "opponent_cooperative" in observation:
            self.system2_bias = "Collaborative_and_Open"
        else:
             self.system2_bias = "Cautiously_Optimistic"

        print(f"  [>] Macro-Bias Set To: {self.system2_bias}")
        return self.system2_bias

    def micro_policy_step(self, immediate_prompt, current_bias):
        """
        System 1: Fast, intuitive. Runs frequently (turn-by-turn).
        Conditioned on the macro-bias.
        """
        print(f"  [System 1 Micro-Policy] Generating immediate response...")
        # Simulate fast generation conditioned on bias
        if current_bias == "Defensive_and_Firm":
            response = "I cannot accept those terms. My bottom line is firm."
            action_type = "reject"
        elif current_bias == "Collaborative_and_Open":
            response = "That sounds like a fair compromise. Let's work out the details."
            action_type = "accept"
        else:
            response = "Could you clarify your position on that?"
            action_type = "probe"

        print(f"    [>] Response: '{response}' (Type: {action_type})")
        return action_type

    def run_negotiation_simulation(self):
        print("Starting TimeHC-RL Negotiation Simulation...")

        scenarios = [
            {"obs": "initial_meeting", "prompt": "Opponent says: 'Let's start the negotiation.'"},
            {"obs": "opponent_aggressive", "prompt": "Opponent says: 'Take this deal now or I walk.'"},
            {"obs": "opponent_aggressive", "prompt": "Opponent says: 'I won't budge another inch.'"},
            {"obs": "opponent_cooperative", "prompt": "Opponent says: 'I think we can find a middle ground.'"},
            {"obs": "opponent_cooperative", "prompt": "Opponent says: 'I'll concede on price if you concede on timeline.'"}
        ]

        for i, scenario in enumerate(scenarios):
            print(f"\n================ Round {i+1} ================")

            # 1. Macro Policy runs only when significant shifts happen (simulated by updating bias every round here for visibility,
            #    but in reality it would be less frequent)
            bias = self.macro_policy_step(scenario["obs"])

            # 2. Micro Policy executes the fast turn-by-turn action
            print(f"  Prompt: {scenario['prompt']}")
            action = self.micro_policy_step(scenario['prompt'], bias)

            # 3. Environment Feedback (Reward)
            if scenario["obs"] == "opponent_aggressive" and action == "reject":
                self.agent_score += 10 # Successfully defended against aggression
                print("  [Environment] Reward: +10 (Firm defense)")
            elif scenario["obs"] == "opponent_cooperative" and action == "accept":
                self.agent_score += 15 # Successfully capitalized on cooperation
                print("  [Environment] Reward: +15 (Successful compromise)")
            else:
                 self.agent_score += 2
                 print("  [Environment] Reward: +2 (Neutral exchange)")

        print(f"\nSimulation Complete. Final Agent Score: {self.agent_score}")
        if self.agent_score > 30:
            print("[+] Success: TimeHC-RL agent successfully navigated the negotiation dynamics.")
        else:
             print("[-] Failure: Agent did not maximize utility.")

if __name__ == "__main__":
    sim = TimeHCRLSimulator()
    sim.run_negotiation_simulation()
