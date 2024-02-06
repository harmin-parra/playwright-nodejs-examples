import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Waiting', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/waiting");
  });


  test('wait for a specific amount of time or resource to resolve', async({ page }) => {
    await page.locator(".wait-input1").fill("Wait 1000ms after typing")
    await new Promise(r => setTimeout(r, 1000));
    await page.locator(".wait-input2").fill("Wait 1000ms after typing")
    await new Promise(r => setTimeout(r, 1000));
    await page.locator(".wait-input3").fill("Wait 1000ms after typing")
    await new Promise(r => setTimeout(r, 1000));

    const responsePromise = page.waitForResponse("**/comments/**");
    await page.locator('.network-btn').click();
    const response = await responsePromise;
    assert(response.status() == 200 || response.status() == 304);
    await expect(page.locator(".network-comment")).toContainText("laudantium enim quasi");
  });

});
