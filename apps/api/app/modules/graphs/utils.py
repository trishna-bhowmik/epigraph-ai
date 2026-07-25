import uuid


def generate_graph_filename():
    return f"{uuid.uuid4()}.gpickle"