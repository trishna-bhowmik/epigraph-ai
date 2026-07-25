import os

GRAPH_DIRECTORY = "storage/graphs"
GRAPH_HTML_DIRECTORY = "storage/graphs/html"

os.makedirs(GRAPH_DIRECTORY, exist_ok=True)
os.makedirs(GRAPH_HTML_DIRECTORY, exist_ok=True)