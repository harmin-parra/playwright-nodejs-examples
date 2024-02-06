import { test, expect } from '@playwright/test';
const assert = require('node:assert');
const { exec } = require("child_process");
const path = require('path');


test.describe('Misc', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/misc");
  });


  test('end the command chain', async({ page }) => {
    console.log("Playwright doesn't have an end() command");
  });


  test('execute a system command', async({ page }) => {
    exec("echo 'Jane Lane'", (err, stdout, stderr) => {
      if (err) {
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      assert(stderr == '');
    });
  });


  test('get the DOM element that has focus', async({ page }) => {
    page.locator(".misc-form #name").click()
    await expect(page.locator(":focus")).toHaveAttribute("id", "name")
    await expect(page.locator("*:focus")).toHaveAttribute("id", "name")

    await page.locator(".misc-form #description").click()
    await expect(page.locator(":focus")).toHaveAttribute("id", "description")
  });


  test('screenshot()', async({ page }) => {
    await page.screenshot({ path: `screenshots${path.sep}screenshot-1.png` })
    await page.screenshot(
      { 
        path: `screenshots${path.sep}screenshot-2.png`,
        clip: {'x': 0, 'y': 0, 'width': 200, 'height': 300},
        mask: [page.locator("#end")]
    });
  });


  test('wrap an object', async({ page }) => {
    console.log("Playwright doesn't have an wrap() command")
  });

});
