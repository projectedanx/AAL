import math
import json

class Node:
    def __init__(self, id, aesthetic_params):
        self.id = id
        self.aesthetic_params = aesthetic_params
        self.z_dimension = 0.0

class ZAxisInference:
    def __init__(self):
        self.nodes = {}
        self.edges = []
        self.scars = []

    def add_node(self, node):
        self.nodes[node.id] = node

    def synthesize(self, node1_id, node2_id):
        node1 = self.nodes[node1_id]
        node2 = self.nodes[node2_id]

        # Calculate Euclidean distance in aesthetic parameter space
        distance = math.sqrt(
            sum((node1.aesthetic_params.get(k, 0) - node2.aesthetic_params.get(k, 0)) ** 2
                for k in set(node1.aesthetic_params) | set(node2.aesthetic_params))
        )

        # Identify partially overlapping (PO) contradiction in RCC-8 terms
        if distance > 0.5:
            # Promote to Z-axis
            node1.z_dimension += distance * 0.5
            node2.z_dimension += distance * 0.5
            synthesis_z = max(node1.z_dimension, node2.z_dimension) + 1.0
        else:
            synthesis_z = 0.0

        synthesis_params = {}
        for k in set(node1.aesthetic_params) | set(node2.aesthetic_params):
            val1 = node1.aesthetic_params.get(k, 0)
            val2 = node2.aesthetic_params.get(k, 0)
            synthesis_params[k] = (val1 + val2) / 2.0

        synthesis_node = Node(f"Synth_{node1_id}_{node2_id}", synthesis_params)
        synthesis_node.z_dimension = synthesis_z
        self.add_node(synthesis_node)
        self.edges.append((node1_id, synthesis_node.id))
        self.edges.append((node2_id, synthesis_node.id))

        return synthesis_node

if __name__ == "__main__":
    print("Initiating Z-Axis Inference Simulation (RCC-8 Topological Blending)")
    sim = ZAxisInference()

    # Base prompt node
    n1 = Node("n1", {"cyberpunk": 0.9, "minimalist": 0.1})
    # Another node that contradicts
    n2 = Node("n2", {"cyberpunk": 0.1, "minimalist": 0.9})

    sim.add_node(n1)
    sim.add_node(n2)

    print(f"Node n1: {n1.aesthetic_params}, z={n1.z_dimension}")
    print(f"Node n2: {n2.aesthetic_params}, z={n2.z_dimension}")

    synth = sim.synthesize("n1", "n2")

    print(f"Synthesized Node: {synth.aesthetic_params}, z={synth.z_dimension}")

    # Assert that Z-axis was utilized for contradictions
    assert synth.z_dimension > 0, "Z-axis inference failed to promote contradictory dimensions"
    print("Z-Axis validation passed. Paraconsistent synthesis achieved.")
