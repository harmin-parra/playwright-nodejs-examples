import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/actions");
  });


  test('fill()/press() - type into a DOM element', async({ page }) => {
    var email = page.locator(".action-email");
    await email.fill("fake@email.com");
    await expect(email).toHaveValue("fake@email.com");
    await expect(await email.evaluate(elem => elem.value)).toBe("fake@email.com");
    // Special characters
    await email.press("ArrowLeft");
    await email.press("ArrowRight");
    await email.press("ArrowUp");
    await email.press("ArrowDown");
    // Key modifiers
    await email.press("Alt+a");
    await email.press("Shift+A");
    await email.press("Control+a");
    await email.press("Delete");
    await email.pressSequentially("slow.typing@email.com");
    await expect(email).toHaveValue("slow.typing@email.com");
  })


  test('focus() - focus on a DOM element', async({ page }) => {
    await page.locator(".action-focus").focus()
    await expect(page.locator(".action-focus")).toBeFocused()
    // Playwright doesn't have prev() locator
    await expect(page.getByText("Password")).toHaveAttribute("style", "color: orange;")
  });


  test('blur() - blur off a DOM element', async({ page }) => {
    var elem = page.locator(".action-blur")
    await elem.type("About to blur")
    await elem.blur()
    await expect(elem).toHaveClass(new RegExp(/(^|\s)error/))
    // Playwright doesn't have prev() locator
    await expect(page.getByText("Full Name")).toHaveAttribute("style", "color: red;")
  });


  test('clear() - clears an input or textarea element', async({ page }) => {
    var elem = page.locator(".action-clear")
    await elem.fill("Clear this text")
    await expect(elem).toHaveValue("Clear this text")
    await elem.clear()
    await expect(elem).toHaveValue('')
  });


  test('click() - submit a form', async({ page }) => {
    await page.locator(".action-form").locator("[type='text']").fill("HALFOFF")
    await page.getByRole("button", { name: "Submit" }).click()
    // Playwright doesn't have next() locator
    await expect(page.getByText("Your form has been submitted!", { exact: true })).toBeVisible()
  });


  test('click() - click on a DOM element', async({ page }) => {
    await page.locator(".action-btn").click();
    var canvas = await page.locator("#action-canvas");
    // Playwright doesn't have keyword positions: 'topLeft', 'top', 'topRight', 'left', etc.
    canvas.click({ position: {'x': 80, 'y': 75} });
    canvas.click({ position: {'x': 175, 'y': 75} });
    canvas.click({ position: {'x': 80, 'y': 165} });
    canvas.click({ position: {'x': 100, 'y': 185} });
    canvas.click({ position: {'x': 125, 'y': 190} });
    canvas.click({ position: {'x': 150, 'y': 185} });
    canvas.click({ position: {'x': 170, 'y': 165} });
    var buttons = await page.locator('.action-labels>.label');
    for( var i = 0; i != await buttons.count(); i++) {
      await buttons.nth(i).click();
    }
    await page.locator(".action-opacity>.btn").click({ force: true });
  });


  test('dblclick() - double click on a DOM element', async({ page }) => {
    await page.locator(".action-div").dblclick()
    await expect(page.locator(".action-div")).not.toBeVisible()
    await expect(page.locator(".action-input-hidden")).toBeVisible()
  });


  test('rightclick() - right click on a DOM element', async({ page }) => {
    await page.locator(".rightclick-action-div").click({ button: "right" })
    await expect(page.locator(".rightclick-action-div")).not.toBeVisible()
    await expect(page.locator(".rightclick-action-input-hidden")).toBeVisible()
  });

});
