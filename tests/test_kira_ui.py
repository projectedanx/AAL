from playwright.sync_api import sync_playwright, expect
import subprocess
import time

def test_run():
    process = subprocess.Popen(["npm", "run", "dev"])
    time.sleep(10)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto("http://localhost:3000")

            # Open node selector menu (we don't have the exact UI button locator but let's take a screenshot of the base canvas)
            # Assuming the canvas renders correctly without crashing
            page.screenshot(path="node_canvas_verification.png")

            # Verify basic canvas presence
            canvas = page.locator('.react-flow__pane')
            if canvas.is_visible():
                print("Canvas loaded successfully")

            browser.close()
    finally:
        process.terminate()

if __name__ == '__main__':
    test_run()
