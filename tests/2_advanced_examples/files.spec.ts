import { test, expect, request, APIRequestContext } from '@playwright/test';
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('path');
var lodash = require('lodash');


test.describe('Files', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/files");
  });


  test('load a fixture', async({ page }) => {
    await page.route("**/comments/*", async route => {
      try {
        var data = fs.readFileSync(`tests${path.sep}fixtures${path.sep}example.json`, 'utf8');
        data = JSON.parse(data);
        route.fulfill({ json: data });
      } catch (err) {
        console.error(err);
      }
    })
    const responsePromise = page.waitForResponse("**/comments/*")
    await page.locator(".fixture-btn").click();
    var response = await responsePromise;
    var res = JSON.parse((await response.body()).toString());
    assert(res.hasOwnProperty('name'));
    assert(res['name'].indexOf("Using fixtures to represent data") != -1);
  });


  test('read file contents', async({ page }) => {
    var example1;
    try {
      example1 = fs.readFileSync(`tests${path.sep}fixtures${path.sep}example.json`, { encoding: 'utf8' });
      example1 = JSON.parse(example1);
    } catch (err) {
        console.error(err);
    }
    var example2 = {
      "body": "Fixtures are a great way to mock data for responses to routes",
      "email": "hello@cypress.io",
      "name": "Using fixtures to represent data"
    };
    assert(lodash.isEqual(example1, example2));
  });


  test('write to a file', async({ page }) => {
    var context = await request.newContext({ baseURL: 'https://jsonplaceholder.cypress.io' });
    var response = await context.get('/users');
    try {
      fs.writeFileSync(`tests${path.sep}fixtures${path.sep}users.json`, await response.text());
    } catch (err) {
      console.error(err);
    }
    try {
      var users = fs.readFileSync(`tests${path.sep}fixtures${path.sep}users.json`, { encoding: 'utf8' });
      users = JSON.parse(users);
      assert(users[0].hasOwnProperty('name'));
    } catch (err) {
        console.error(err);
    }
  });

/*
  test('upload a file', async({ page }) => {

  });


  test('download a file', async({ page }) => {

  });
*/
});
