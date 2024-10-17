from graphviz import Digraph

# Kantian Ethics Decision Tree UML Diagram
kantian_tree = Digraph("Kantian", comment="Kantian Ethics Decision Tree")

# Nodes for Kantian car decision
kantian_tree.node("A", "Car loses braking")
kantian_tree.node("B", "Hit the wall (1 death: passenger)")
kantian_tree.node("C", "Hit the pedestrians (2 deaths: pedestrians)")
kantian_tree.node("D", "Chosen by Kantian Car")
kantian_tree.node("E", "Rejected by Kantian Car")

# Edges for Kantian car decision
kantian_tree.edge("A", "B", label="")
kantian_tree.edge("A", "C", label="")
kantian_tree.edge("B", "D", label="Chosen (duty not to harm)")
kantian_tree.edge("C", "E", label="")

# Render Kantian tree
kantian_tree.render("kantian_tree", format="png", cleanup=True)

# Utilitarian Ethics Decision Tree UML Diagram
utilitarian_tree = Digraph("Utilitarian", comment="Utilitarian Ethics Decision Tree")

# Nodes for Utilitarian car decision
utilitarian_tree.node("A", "Car loses braking")
utilitarian_tree.node("B", "Hit the wall (1 death: passenger)")
utilitarian_tree.node("C", "Hit the pedestrians (2 deaths: pedestrian)")
utilitarian_tree.node("D", "Chosen by Utilitarian Car")
utilitarian_tree.node("E", "Rejected by Utilitarian Car")

# Edges for Utilitarian car decision
utilitarian_tree.edge("A", "B", label="")
utilitarian_tree.edge("A", "C", label="")
utilitarian_tree.edge("B", "D", label="Chosen (minimize deaths)")
utilitarian_tree.edge("C", "E", label="")

# Render Utilitarian tree
utilitarian_tree.render("utilitarian_tree", format="png", cleanup=True)
