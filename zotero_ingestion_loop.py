#!/usr/bin/env python3
import os
import time
import uuid
from datetime import datetime
import yaml

# Attempt to import dependencies, mock if missing for script standalone testability
try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
    HAS_WATCHDOG = True
except ImportError:
    HAS_WATCHDOG = False
    class FileSystemEventHandler:
        pass

# Placeholder for pdfplumber extraction
def extract_pdf_metadata(file_path):
    # Simulated metadata extraction
    return {
        "title": f"Auto-extracted Title for {os.path.basename(file_path)}",
        "content_path": file_path
    }

# Placeholder for Llama-3-8B extraction
def suggest_relationships(metadata, manifest):
    # Simulated LLM relationship extraction
    suggestions = []
    # Just link to the first existing node for demonstration
    existing_nodes = manifest.get("content_nodes", [])
    if existing_nodes:
        suggestions.append({
            "edge_uuid": f"urn:uuid:{uuid.uuid4()}",
            "source_node": f"urn:uuid:{uuid.uuid4()}", # will be replaced with new node id
            "target_node": existing_nodes[0].get("node_uuid"),
            "predicate": "refines",
            "weight": 0.85,
            "created_by_agent": manifest.get("metadata", {}).get("owner_did", "unknown")
        })
    return suggestions

def process_new_pdf(file_path):
    print(f"[Zotero Ingestion] Processing new file: {file_path}")
    manifest_path = "pkc_manifest.yml"

    try:
        with open(manifest_path, 'r') as f:
            manifest = yaml.safe_load(f)

        metadata = extract_pdf_metadata(file_path)
        new_node_uuid = f"urn:uuid:{uuid.uuid4()}"

        new_node = {
            "node_uuid": new_node_uuid,
            "title": metadata["title"],
            "content_path": metadata["content_path"],
            "node_type": "PDF_Atom",
            "status": "transient",
            "version_number": 1,
            "epistemic_tag": "speculative",
            "meaning_space_anchor": {
                "prototypical_vector": [0.0, 0.0, 0.0, 0.0, 0.0], # placeholder
                "hyperspherical_radius": 0.1,
                "embedding_model": "text-embedding-3-small"
            },
            "metadata_fields": {
                "epistemic_risk_level": "Medium",
                "architectural_layer": "Ingestion_Queue"
            }
        }

        if "content_nodes" not in manifest:
            manifest["content_nodes"] = []
        manifest["content_nodes"].append(new_node)

        edges = suggest_relationships(metadata, manifest)
        for edge in edges:
            edge["source_node"] = new_node_uuid
            if "semantic_edges" not in manifest:
                manifest["semantic_edges"] = []
            manifest["semantic_edges"].append(edge)

        with open(manifest_path, 'w') as f:
            yaml.safe_dump(manifest, f, default_flow_style=False)

        print(f"[Zotero Ingestion] Successfully ingested {file_path} into PKC Manifest.")

    except Exception as e:
        print(f"[Zotero Ingestion] Error processing file: {e}")

class ZoteroAttachmentHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory and event.src_path.endswith('.pdf'):
            process_new_pdf(event.src_path)

def start_watcher(path_to_watch):
    if not HAS_WATCHDOG:
        print("Watchdog library not installed. Cannot start watcher.")
        return

    event_handler = ZoteroAttachmentHandler()
    observer = Observer()
    observer.schedule(event_handler, path_to_watch, recursive=False)
    observer.start()
    print(f"Started watching {path_to_watch} for new PDFs...")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    watch_dir = "pkm/zotero_attachments"
    os.makedirs(watch_dir, exist_ok=True)

    # In a real environment, we'd start the watcher.
    # For now, we will simulate a file creation event.
    print("[Zotero Ingestion] Simulating PDF creation...")
    test_pdf = os.path.join(watch_dir, "test_paper.pdf")
    with open(test_pdf, 'w') as f:
        f.write("%PDF-1.4\n%Fake PDF content for testing")

    process_new_pdf(test_pdf)
