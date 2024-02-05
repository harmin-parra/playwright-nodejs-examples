import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io");
    await page.locator(".navbar-nav").getByText("Commands").click()
    await page.locator(".dropdown-menu").getByText("Navigation").click()
  });


  test('go back or forward in the browser\'s history', async({ page }) => {
    console.log(page.url().indexOf("navigation"));
    assert(page.url().indexOf("navigation") != -1);
    await page.goBack();
    assert(page.url().indexOf("navigation") == -1);
    await page.goForward();
    assert(page.url().indexOf("navigation") != -1);
  });


  test('reload() - reload the page', async({ page }) => {
    await page.reload();
  });


  test('visit a remote page', async({ page }) => {
    await page.goto("https://example.cypress.io/commands/navigation")
  });

});
