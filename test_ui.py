import json
import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173")
        time.sleep(2)  # Wait for React to mount and render canvas

        # Take a screenshot to verify node canvas loaded properly
        page.screenshot(path="node_canvas_verification.png")
        print("Screenshot saved to node_canvas_verification.png")

        browser.close()

if __name__ == "__main__":
    run()
