import { expect, test } from "@playwright/test";

// Test data
const TEST_DATA = {
  login: {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
    url: "https://dev.portal.denowatts.com/signin",
  },
  project: {
    name: "Test Project",
    owner: "Test Company",
    address: "Test Address",
    town: "Test Town",
    state: "Alabama",
    zipCode: "13213",
    acNameplate: "12321",
    commercialYear: "2025",
  },
  installationTypes: [
    "Carport",
    "Ground (Fixed)",
    "Ground (Tracker)",
    "Rooftop",
  ],
  panelTypes: ["Monofacial", "Bifacial"],
  epcServices: [
    "EPC Startup and Capacity",
    "Cellular Modem and Service",
    "Remote Access VPN",
    "Opc Client Setup",
    "Outdoor Enclosure",
    "Show Horizontal",
  ],
};

test.describe("Quote Creation", () => {
  test("should create a new quote successfully", async ({ page }) => {
    // Step 1: Login
    await login(page);

    // Step 2: Navigate to quote creation
    await navigateToQuoteCreation(page);

    // Step 3: Fill project details
    await fillProjectDetails(page);

    // Step 4: Select installation and panel types
    await selectInstallationTypes(page);
    await selectPanelTypes(page);

    // Step 5: Proceed to next step
    await proceedToNextStep(page);

    // Step 6: Configure quote settings
    await configureQuoteSettings(page);

    // Step 7: Submit quote
    await submitQuote(page);

    // Step 8: Verify navigation to quote management
    await expect(page).toHaveURL(/.*quote-management/);
  });
});

// Helper functions
async function login(page: any) {
  await page.goto(TEST_DATA.login.url);
  await page
    .getByRole("textbox", { name: "* Email" })
    .fill(TEST_DATA.login.email);
  await page
    .getByRole("textbox", { name: "* Password" })
    .fill(TEST_DATA.login.password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
}

async function navigateToQuoteCreation(page: any) {
  await page.getByRole("img", { name: "Settings" }).click();
  await page.getByRole("menuitem", { name: "Quotation Management" }).click();
  await page.getByRole("button", { name: "plus Create Quote" }).click();
  await page.waitForLoadState("networkidle");
}

async function fillProjectDetails(page: any) {
  const { project } = TEST_DATA;

  await page
    .getByRole("textbox", { name: "* Project Name" })
    .fill(project.name);
  await page
    .getByRole("textbox", { name: "* Project Owner (Name of" })
    .fill(project.owner);
  await page
    .getByRole("textbox", { name: "* Project Address" })
    .fill(project.address);
  await page.getByRole("textbox", { name: "* Town" }).fill(project.town);

  // Select state
  await page.getByRole("combobox", { name: "* State" }).click();
  await page.getByTitle(project.state).click();

  await page.getByRole("textbox", { name: "* Zip Code" }).fill(project.zipCode);
  await page
    .getByRole("spinbutton", { name: "* AC Nameplate (Please use MW)" })
    .fill(project.acNameplate);

  // Select commercial operation year
  await page.locator(".ant-picker-input").click();
  await page.getByRole("cell", { name: project.commercialYear }).click();
}

async function selectInstallationTypes(page: any) {
  for (const installationType of TEST_DATA.installationTypes) {
    await page.getByText(installationType).click();
  }
}

async function selectPanelTypes(page: any) {
  for (const panelType of TEST_DATA.panelTypes) {
    await page.getByText(panelType).click();
  }
}

async function proceedToNextStep(page: any) {
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.waitForLoadState("networkidle");
}

async function configureQuoteSettings(page: any) {
  // Select date
  await page.locator(".ant-picker-input").click();
  await page.getByRole("cell", { name: "20", exact: true }).click();

  // Select weather and energy options
  await page.getByTitle("Basic Weather").click();
  await page.getByText("Advanced Energy Accounting").click();
  await page.waitForLoadState("networkidle");

  // Select service duration
  await page.getByText("5 Years").click();
  await page.getByText("1 Year").click();
  await page.waitForLoadState("networkidle");

  // Select EPC services
  for (const service of TEST_DATA.epcServices) {
    await page.getByText(service).click();
    await page.waitForLoadState("networkidle");
  }

  // Configure data plan
  await page.getByText("1 GB/mo", { exact: true }).click();
  await page.getByText("10 GB/mo").click();
  await page.waitForLoadState("networkidle");
}

async function submitQuote(page: any) {
  await page.getByRole("button", { name: "Submit Quote" }).click();
  await page.waitForLoadState("networkidle");
  await page.goto("https://dev.portal.denowatts.com/settings/quote-management");
}
