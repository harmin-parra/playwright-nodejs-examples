import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
const assert = require('node:assert');
const { env } = require('node:process');
const path = require('path');


test.describe('Cypress API', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/cypress-api");
  });


  test('evaluate() - execute a custom command', async({ page }) => {
    function console(method) {
        assert(method == 'log' || method == 'info' || method == 'error' || method == 'warn' || method == 'debug');
        var func = "console.method".replace('method', method);
        return "elem => " + func + "('The subject is: ', elem)";
    }
    await page.locator("button").evaluate(console("log"));
  });


  test('.debug() - enable or disable debugging', async({ page }) => {
    console.log("Playwright cannot debug cookies");
  });


  test('Get CPU architecture', async({ page }) => {
    console.log(process.arch);
  });


  test('Get and set configuration options', async({ page }) => {
    console.log(page.url());
    console.log(test.info().timeout);
  });


  test('to_be_hidden() - determine if a DOM element is hidden', async({ page }) => {
    var hidden = page.locator(".dom-p p.hidden").first();
    var visible = page.locator(".dom-p p.visible").first();

    await expect(hidden).toBeHidden();
    await expect(hidden).not.toBeVisible();
    await expect(visible).not.toBeHidden();
    await expect(visible).toBeVisible();
  });


  test('Get environment variables', async({ page }) => {
    env.host = "veronica.dev.local";
    env.api_server = "http://localhost:8888/v1/";
    assert(typeof(env.host) != "undefined");
    assert.equal(env.host, "veronica.dev.local");
    env.api_server = "http://localhost:8888/v2/";
    assert(typeof(env.api_server) != "undefined");
    assert.equal(env.api_server, "http://localhost:8888/v2/");
  });


  test('Control what is printed to the Command Log', async({ page }) => {
    console.log("Playwright doesn't have a log API");
  });


  test('Get underlying OS name', async({ page }) => {
    console.log(process.platform);
  });


  test('Get module version', async({ page }) => {
    console.log("TODO: get playwright module version");
  });


  test('Get current spec information', async({ page }) => {
    console.log(test.info().file);
    console.log(path.basename(test.info().file));
  });

});
