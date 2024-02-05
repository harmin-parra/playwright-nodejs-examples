import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Querying', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/querying");
  });


  test('query DOM elements', async({ page }) => {
    await expect(page.locator("#query-btn")).toContainText("Button");
    await expect(page.locator(".query-btn")).toContainText("Button");
    await expect(page.locator("#querying .well>button").first()).toContainText("Button");

    await expect(page.locator("[data-test-id='test-example']")).toHaveClass("example");
    await expect(page.locator("[data-test-id='test-example']")).toHaveAttribute("data-test-id", "test-example");
    assert.equal(await page.locator("[data-test-id='test-example']").getAttribute("data-test-id"), "test-example");
    await expect(page.locator("[data-test-id='test-example']")).toHaveCSS('position', 'static');
  });


  test('query DOM elements with matching content', async({ page }) => {
    await expect(page.locator(".query-list").getByText("bananas")).toContainText("bananas");
    await expect(page.locator(".query-list").getByText("bananas")).toHaveClass("third");
    await expect(page.locator(".query-list").getByText(new RegExp("^b\\w+"))).toHaveClass("third");
    await expect(page.locator(".query-list").getByText("apples", { exact: true })).toHaveClass("first");

    await expect(page.locator("#querying ul").first()).toContainText("oranges");
    await expect(page.locator("#querying ul").first()).toHaveClass("query-list");

    await expect(page.locator(".query-button").getByRole("button", { name: "Save Form" })).toHaveClass(new RegExp("\\bbtn\\b"));
  });


  test('query DOM elements within a specific element', async({ page }) => {
    var elem = page.locator(".query-form");
    await expect(elem.locator("input").first()).toHaveAttribute("placeholder", "Email");
    await expect(elem.locator("input").last()).toHaveAttribute("placeholder", "Password");
  });


  test('query the root DOM element', async({ page }) => {
    console.log("Playwright doesn't have a 'root' locator");
  });

});
