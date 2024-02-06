import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Cookies', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/cookies");
  });


  test('cookies() - get a browser cookies', async({ page }) => {
    await page.locator("#getCookie .set-a-cookie").click()
    assert.equal((await page.context().cookies())[0]['name'], "token")
    assert.equal((await page.context().cookies())[0]['value'], "123ABC")
  });


  test('cookies() - get browser cookies for the current domain', async({ page }) => {
    assert.equal((await page.context().cookies()).length, 0);
    await page.locator("#getCookie .set-a-cookie").click();
    assert.equal((await page.context().cookies()).length, 1);
    assert.equal((await page.context().cookies())[0]['name'], "token");
    assert.equal((await page.context().cookies())[0]['value'], "123ABC");
    assert.equal((await page.context().cookies())[0]['httpOnly'], false);
    assert.equal((await page.context().cookies())[0]['secure'], false);
    assert((await page.context().cookies())[0].hasOwnProperty('domain'));
    assert((await page.context().cookies())[0].hasOwnProperty('path'));
  });


  test('cookies() - get all browser cookies', async({ page }) => {
    assert.equal((await page.context().cookies()).length, 0)
    await page.context().addCookies([
        {
            "name": "key",
            "value": "value",
            "url": page.url(),
        },
        {
            "name": "key",
            "value": "value",
            "domain": ".example.com",
            "path": "/",
        }
    ]);
    assert.equal((await page.context().cookies()).length, 2);
    assert.equal((await page.context().cookies())[0]['name'], 'key');
    assert.equal((await page.context().cookies())[0]['value'], 'value');
    assert.equal((await page.context().cookies())[0]['httpOnly'], false);
    assert.equal((await page.context().cookies())[0]['secure'], true);
    assert((await page.context().cookies())[0].hasOwnProperty('domain'));
    assert((await page.context().cookies())[0].hasOwnProperty('path'));

    assert.equal((await page.context().cookies())[1]['name'], 'key');
    assert.equal((await page.context().cookies())[1]['value'], 'value');
    assert.equal((await page.context().cookies())[1]['httpOnly'], false);
    assert.equal((await page.context().cookies())[1]['secure'], false);
    assert.equal((await page.context().cookies())[1]['domain'], ".example.com");
    assert((await page.context().cookies())[1].hasOwnProperty('path'));
  });


  test('add_cookies() - set a browser cookie', async({ page }) => {
    assert.equal((await page.context().cookies()).length, 0);
    await page.context().addCookies([
        {
            "name": "foo",
            "value": "bar",
            "url": page.url(),
        },
    ]);
    assert.equal((await page.context().cookies())[0]['name'], "foo");
  });


  test('clear_cookies() - clear a browser cookie by name', async({ page }) => {
    console.log("Playwright doesn't allow cookie deletion by cookie name");
  });


  test('clear_cookies() - clear browser cookies for the current domain', async({ page }) => {
    assert.equal((await page.context().cookies()).length, 0);
    await page.locator("#getCookie .set-a-cookie").click();
    assert.equal((await page.context().cookies()).length, 1);
    await page.context().clearCookies();
    assert.equal((await page.context().cookies()).length, 0);
  });


  test('clear_cookies() - clear all browser cookies', async({ page }) => {
    assert.equal((await page.context().cookies()).length, 0);
    await page.context().addCookies([
        {
            "name": "key",
            "value": "value",
            "url": page.url(),
        },
        {
            "name": "key",
            "value": "value",
            "domain": ".example.com",
            "path": "/",
        }
    ]);
    assert.equal((await page.context().cookies()).length, 2);
    await page.context().clearCookies();
    assert.equal((await page.context().cookies()).length, 0);
  });

});
