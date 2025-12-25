from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Get the absolute path to the file
    cwd = os.getcwd()
    file_path = f"file://{cwd}/index.html"

    print(f"Navigating to {file_path}")
    page.goto(file_path)

    # Verify title
    expect(page).to_have_title("Order System")
    print("Title verified")

    # Verify slider navigation
    # Initially active: First slider (Starter)
    expect(page.locator("#first-opt")).to_be_visible()
    expect(page.locator("#second-opt")).not_to_be_visible()

    # Click forward
    page.click(".forward")
    # Now active: Second slider (Dish)
    expect(page.locator("#second-opt")).to_be_visible()
    expect(page.locator("#first-opt")).not_to_be_visible()
    print("Slider forward navigation verified")

    # Enter details for Dish
    page.select_option("#second-opt", label="Fried Fish")
    page.fill("#prix-second", "20")
    page.fill("#person-second", "2")

    # Add Order
    page.click(".action-btn")

    # Verify table row added
    # Row 0 is header, Row 1 should be the new order
    rows = page.locator(".order-table tr")
    expect(rows).to_have_count(2)

    first_row_cells = rows.nth(1).locator("td")
    expect(first_row_cells.nth(1)).to_have_text("Fried Fish")
    expect(first_row_cells.nth(2)).to_have_text("2")
    expect(first_row_cells.nth(3)).to_have_text("20")
    print("Order added verified")

    # Calculate Sum
    page.click(".sum")
    expect(page.locator(".sum-lab")).to_have_text("Sum = 20")
    print("Sum calculation verified")

    # Clear
    page.click(".clear")
    expect(rows).to_have_count(1) # Only header remaining
    expect(page.locator(".sum-lab")).to_have_text("")
    print("Clear functionality verified")

    # Take screenshot
    page.screenshot(path="verification/verification.png")
    print("Screenshot taken")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
