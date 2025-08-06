import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://dev.portal.denowatts.com/signin");
  await page
    .getByRole("textbox", { name: "* Email" })
    .fill("apps@niftyitsolution.com");
  await page
    .getByRole("textbox", { name: "* Password" })
    .fill('f@]+yN!ogbCFE"pi33');
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");

  await page.getByRole("img", { name: "Settings" }).click();
  await page.getByRole("menuitem", { name: "Quotation Management" }).click();
  await page.getByRole("button", { name: "plus Create Quote" }).click();

  await page.waitForLoadState("networkidle");
  await page.getByRole("textbox", { name: "* Project Name" }).fill("Test");
  await page
    .getByRole("textbox", { name: "* Project Owner (Name of" })
    .fill("TEST");
  await page.getByRole("textbox", { name: "* Project Address" }).fill("test");
  await page.getByRole("textbox", { name: "* Town" }).fill("test");
  await page.getByRole("combobox", { name: "* State" }).click();
  await page.getByTitle("Alabama").click();
  await page.getByRole("textbox", { name: "* Zip Code" }).fill("13213");
  await page
    .getByRole("spinbutton", { name: "* AC Nameplate (Please use MW)" })
    .fill("12321");
  await page.locator(".ant-picker-input").click();
  await page.getByRole("cell", { name: "2025" }).click();
  // Use more reliable selectors for Ant Design checkboxes
  await page.getByText("Carport").click();
  await page.getByText("Ground (Fixed)").click();
  await page.getByText("Ground (Tracker)").click();
  await page.getByText("Rooftop").click();
  await page.getByText("Monofacial").click();
  await page.getByText("Bifacial").click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.waitForLoadState("networkidle");

  await page.locator(".ant-picker-input").click();
  await page.getByRole("cell", { name: "20", exact: true }).click();
  await page.getByTitle("Basic Weather").click();
  await page.getByText("Advanced Energy Accounting").click();
  await page.waitForLoadState("networkidle");

  await page.getByText("5 Years").click();
  await page.getByText("1 Year").click();
  await page.waitForLoadState("networkidle");

  await page.getByText("EPC Startup and Capacity").click();
  await page.waitForLoadState("networkidle");

  await page.getByText("Cellular Modem and Service").click();
  await page.waitForLoadState("networkidle");

  await page.getByText("1 GB/mo", { exact: true }).click();
  await page.getByText("10 GB/mo").click();
  await page.waitForLoadState("networkidle");

  await page.getByText("Remote Access VPN").click();
  await page.waitForLoadState("networkidle");

  await page.getByText("Opc Client Setup").click();
  await page.waitForLoadState("networkidle");

  await page.getByText("Outdoor Enclosure").click();
  await page.waitForLoadState("networkidle");

  await page.getByText("Show Horizontal").click();
  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Submit Quote" }).click();
  await page.goto("https://dev.portal.denowatts.com/settings/quote-management");
});
