import json
import time
from playwright.sync_api import sync_playwright
import subprocess

def test_run():
    process = subprocess.Popen(["npm", "run", "dev"])
    time.sleep(10)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto("http://localhost:3000")
            time.sleep(2)  # Wait for React to mount and render canvas

            # Take a screenshot to verify node canvas loaded properly
            page.screenshot(path="node_canvas_verification.png")
            print("Screenshot saved to node_canvas_verification.png")

            browser.close()
    finally:
        process.terminate()

if __name__ == "__main__":
    test_run()
