import { expect, test } from "@playwright/test";

test("Login demo test 1", async ({ page }) => {
  // Navigate to login page
  await page.goto("https://dev.portal.denowatts.com/signin");
  await page.waitForLoadState("networkidle");

  // Login
  await page
    .getByRole("textbox", { name: "* Email" })
    .fill("apps@niftyitsolution.com");
  await page
    .getByRole("textbox", { name: "* Password" })
    .fill('f@]+yN!ogbCFE"pi33');
  await page.getByRole("button", { name: "Login" }).click();

  // Wait for login to complete
  await page.waitForLoadState("networkidle");

  // Navigate to Quotation Management
  await page.getByRole("img", { name: "Settings" }).click();
  await page.getByRole("menuitem", { name: "Quotation Management" }).click();
  await page.getByRole("button", { name: "plus Create Quote" }).click();

  // Fill project details
  await page
    .getByRole("textbox", { name: "* Project Name" })
    .fill("Test Site 001");
  await page
    .getByRole("textbox", { name: "* Project Owner" })
    .fill("Test Company 001");
  await page
    .getByRole("textbox", { name: "* Project Address" })
    .fill("Test Address 001");
  await page.getByRole("textbox", { name: "* Town" }).fill("Test Town 001");

  // Handle State dropdown
  await page.getByRole("combobox", { name: "* State" }).click();
  await page.waitForSelector(
    'div.ant-select-item-option-content:has-text("Alabama")'
  );
  await page
    .locator('div.ant-select-item-option-content:has-text("Alabama")')
    .click();

  await page.getByRole("textbox", { name: "* Zip Code" }).fill("1212");
  await page
    .getByRole("spinbutton", { name: "* AC Nameplate (Please use MW)" })
    .fill("11");

  // Handle date picker
  await page
    .locator('input[placeholder*="year"], input[placeholder*="Year"]')
    .first()
    .fill("2025");

  // Handle checkboxes - use proper waits instead of manual timeouts
  const checkboxes = [
    "Carport",
    "Ground (Fixed)",
    "Ground (Tracker)",
    "Rooftop",
    "Monofacial",
    "Bifacial",
  ];

  for (const checkboxName of checkboxes) {
    const checkbox = page.getByRole("checkbox", { name: checkboxName });
    await checkbox.waitFor({ state: "visible" });
    await checkbox.click();
  }

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.waitForLoadState("networkidle");

  // Handle second date picker
  await page.waitForSelector(
    'input[placeholder*="date"], input[placeholder*="Date"]'
  );
  await page
    .locator('input[placeholder*="date"], input[placeholder*="Date"]')
    .first()
    .fill("2025-07-31");

  // Handle radio buttons and selections
  await page.getByTitle("Basic Weather").click();
  await page.getByText("Advanced Energy Accounting").click();

  // Handle remaining checkboxes
  const remainingCheckboxes = [
    "EPC and Capacity Test",
    "Cellular Modem and Service",
    "Remote Access VPN",
    "Opc Client Setup",
    "Outdoor Enclosure",
    "Show Horizontal",
  ];

  for (const checkboxName of remainingCheckboxes) {
    const checkbox = page.getByRole("checkbox", { name: checkboxName });
    await checkbox.waitFor({ state: "visible" });
    await checkbox.click();
  }

  // Handle dropdown selections
  await page.getByText("GB/mo").click();
  await page.getByText("5 GB/mo").click();

  await page.getByRole("button", { name: "Submit Quote" }).click();
  await page.waitForLoadState("networkidle");

  // Verify successful submission
  await expect(page.locator("body")).not.toContainText("Error");

  await page.pause();
});
