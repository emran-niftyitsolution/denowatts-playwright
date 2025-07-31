import { test } from "@playwright/test";

test("Update Quote:", async ({ page }) => {
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

  // Find the first row with "Test Site 001" and click its edit button
  await page
    .getByRole("row")
    .filter({ hasText: "Test Site 001" })
    .first()
    .getByRole("button", { name: "edit" })
    .click();
  await page.getByRole("textbox", { name: "* Project Name" }).click();
  await page
    .getByRole("textbox", { name: "* Project Name" })
    .fill("Test Site 0011");
  await page.getByRole("textbox", { name: "* Project Owner" }).click();
  await page
    .getByRole("textbox", { name: "* Project Owner" })
    .fill("Test Company 0011");
  await page.getByRole("textbox", { name: "* Project Address" }).click();
  await page
    .getByRole("textbox", { name: "* Project Address" })
    .fill("Test Address 0011");
  await page.getByRole("textbox", { name: "* Town" }).click();
  await page.getByRole("textbox", { name: "* Town" }).fill("Test Town 0011");

  // Skip state change since it's already California
  // If you need to change state, uncomment the following:
  // await page.getByRole("combobox", { name: "* State" }).click();
  // await page.waitForSelector('div.ant-select-item-option-content:has-text("California")');
  // await page.locator('div.ant-select-item-option-content:has-text("California")').click();
  await page.getByRole("textbox", { name: "* Zip Code" }).click();
  await page.getByRole("textbox", { name: "* Zip Code" }).fill("12121");
  await page
    .getByRole("spinbutton", { name: "* AC Nameplate (Please use MW)" })
    .click();
  await page
    .getByRole("spinbutton", { name: "* AC Nameplate (Please use MW)" })
    .fill("111");
  await page
    .getByRole("textbox", { name: "* Commercial Operation Year" })
    .click();
  await page.getByText("2026").click();
  await page.getByRole("radio", { name: "Retrofit" }).check();

  // Handle checkboxes - use click() for Ant Design checkboxes
  const groundFixedCheckbox = page.getByRole("checkbox", {
    name: "Ground (Fixed)",
  });
  const groundTrackerCheckbox = page.getByRole("checkbox", {
    name: "Ground (Tracker)",
  });

  // Click to toggle checkboxes - this works better with Ant Design
  await groundFixedCheckbox.click();
  await groundTrackerCheckbox.click();
  await page.getByText("Bifacial").click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("checkbox", { name: "Opc Client Setup" }).uncheck();
  await page.getByRole("checkbox", { name: "Outdoor Enclosure" }).uncheck();
  await page
    .getByRole("textbox", { name: "* Denowatts equipment needed" })
    .click();
  // Skip date selection since it's already set to 2025-10-10
  // If you need to change the date, uncomment the following:
  // await page.getByRole("button", { name: "prev-year", exact: true }).click(); // Go back to October
  // await page.locator('td[title="2025-10-10"]').click();
  await page.getByRole("button", { name: "Update Quote" }).click();
  await page.pause();
});
