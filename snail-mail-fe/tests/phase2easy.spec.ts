import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Navigate to the application before each test.
  await page.goto("http://localhost:5173");
});

test("01. Should load the inbox mails", async ({ page }) => {
  await expect(page.locator(".table-hover")).toBeVisible();
  await expect(page).toHaveTitle("Vite + React + TS");
});

test("02. Load the inbox mails from the API", async ({ request }) => {
  const response = await request.get("http://localhost:8080/mail");
  expect(response.status()).toBe(200);
  const mails = await response.json();
  console.log(mails);
  expect(mails.length).toBe(4);
});

test("03. Negative test: Try to load the inbox mails from the invalid API endpoint", async ({
  request,
}) => {
  const response = await request.get("http://localhost:8080/mails");
  expect(response.status()).toBe(404);
  const error = await response.json();
  console.log(error);
  expect(error.error).toBe("Not Found");
});

test("04. Negative test: Check the error message when the API is down", async ({
  page,
}) => {
  // Modyfy API response empty array
  await page.route("http://localhost:8080/mail", (route) => {
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Internal Server Error" }),
    });
  });
  await page.reload();
  await expect(page.getByText("No Mail! You're all caught up!")).toBeVisible();
});

test("05. Check Compose component when the button is clicked", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Compose Email" }).click();
  await expect(
    page.getByRole("heading", { name: "Compose Email" })
  ).toBeVisible();
});
