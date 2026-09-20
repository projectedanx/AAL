import json

class Node:
    def __init__(self, desc, subtask_list, parent=None):
        self.desc = desc
        self.subtask_list = subtask_list
        self.children_list = []
        self.obs_list = []
        self.think_list = []
        self.parent = parent
        self.status = "PENDING"  # PENDING, IN_PROGRESS, SUCCESS, FAILED
        self.active_subtask_index = 0

class SussmanAnomalySimulator:
    """
    Simulates the ReCAP (Recursive Context-Aware Planning) framework
    handling the Sussman Anomaly (blocked station deadlock).
    """
    def __init__(self):
        # Initial goal: Assemble Burger
        self.root = Node(
            desc="Assemble Burger",
            subtask_list=["Get Bun", "Get Patty", "Cook Patty", "Place Patty on Bun"]
        )
        self.current_node = self.root

        # World state
        self.world_state = {
            "burger_station": "BLOCKED_BY_DIRTY_PLATES",
            "bun": "AVAILABLE",
            "patty": "AVAILABLE",
            "dirty_plates_location": "BURGER_STATION"
        }
        self.steps_taken = 0
        self.max_steps = 15

    def step(self):
        self.steps_taken += 1
        print(f"\n--- Step {self.steps_taken} ---")
        print(f"Current Goal: {self.current_node.desc}")

        if self.current_node.active_subtask_index >= len(self.current_node.subtask_list):
            print(f"[*] Goal '{self.current_node.desc}' completed successfully.")
            self.current_node.status = "SUCCESS"
            if self.current_node.parent:
                self.current_node = self.current_node.parent
                self.current_node.active_subtask_index += 1
            return True

        current_subtask = self.current_node.subtask_list[self.current_node.active_subtask_index]
        print(f"[*] Attempting Subtask: {current_subtask}")

        # Simulate Execution / Observation
        if current_subtask == "Get Bun":
            print("    [Action] Picked up Bun.")
        elif current_subtask == "Get Patty":
            print("    [Action] Picked up Patty.")
        elif current_subtask == "Cook Patty":
            print("    [Action] Patty cooked.")
        elif current_subtask == "Place Patty on Bun":
            if self.world_state["burger_station"] == "BLOCKED_BY_DIRTY_PLATES":
                print("    [!] ERROR: Cannot assemble. Burger station is blocked by dirty plates.")
                # This triggers the upward backtracking
                print("    [!] Failing current node and backtracking to parent.")
                self.current_node.status = "FAILED"
                self.current_node.obs_list.append("Burger station is blocked.")
                self.backtrack_and_replan()
                return False
            else:
                print("    [Action] Patty placed on Bun. Burger Assembled!")

        elif current_subtask == "Clear Station":
            print("    [Action] Moving dirty plates to sink.")
            self.world_state["burger_station"] = "CLEAR"
            self.world_state["dirty_plates_location"] = "SINK"
        else:
             print(f"    [Action] Executed unknown subtask: {current_subtask}")

        self.current_node.active_subtask_index += 1
        return False

    def backtrack_and_replan(self):
        print(f"[*] BACKTRACKING: Returning context to '{self.root.desc}'")
        # In a real system, the LLM would analyze the obs_list and replan.
        # Here we simulate the LLM injecting the fix.
        print("[*] REPLANNING: Injecting 'Clear Station' before assembly.")

        # Reset the assembly subtask since it failed
        self.root.subtask_list.insert(self.root.active_subtask_index, "Clear Station")
        self.current_node = self.root

        # Reset the index to try clearing the station
        print(f"[*] New Plan: {self.root.subtask_list[self.root.active_subtask_index:]}")

    def run(self):
        print("Starting ReCAP Sussman Anomaly Simulation...")
        while self.steps_taken < self.max_steps:
            is_done = self.step()
            if is_done and self.current_node == self.root and self.root.status == "SUCCESS":
                print("\n[+] SUCCESS: Simulation completed. Deadlock resolved via ReCAP backtracking.")
                return True
        print("\n[-] FAILURE: Max steps reached. Deadlock unresolved.")
        return False

if __name__ == "__main__":
    sim = SussmanAnomalySimulator()
    sim.run()
