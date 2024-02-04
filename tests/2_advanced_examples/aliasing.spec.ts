import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/aliasing");
  });


  test('variable for a DOM element for later use', async({ page }) => {
    var firstBtn = await page.locator(".as-table").locator("tbody>tr").first().locator("td").first().locator("button")
    await firstBtn.click()
    expect(firstBtn).toHaveClass(new RegExp("\\bbtn-success\\b"));
    expect(firstBtn).toHaveText("Changed");
  });


  test('variable for a network event for later use', async({ page }) => {
    var response_info = page.waitForResponse("**/comments/*")
    await page.locator(".network-btn").click()
    const response = await response_info;
    assert.equal(response.status(), 200);
  })

});
