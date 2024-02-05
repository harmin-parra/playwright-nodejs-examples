import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Location', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/location");
  });


  test('get the current URL hash', async({ page }) => {
    var res = new URL(page.url());
    assert.equal(res.hash, '');
  });


  test('get window.location', async({ page }) => {
    var res = new URL(page.url());
    assert(res.hash == '');
    assert.equal(res.href, "https://example.cypress.io/commands/location");
    assert.equal(res.hostname, "example.cypress.io");
    assert.equal(res.pathname, "/commands/location");
    assert.equal(res.port, '');
    assert.equal(res.protocol, "https:");
  });


  test('get the current URL', async({ page }) => {
    var res = new URL(page.url());
    assert.equal(res.href, "https://example.cypress.io/commands/location");
  });

});
