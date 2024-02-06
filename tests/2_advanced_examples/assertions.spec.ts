import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/assertions");
  });


  test('expect() - make an assertion about the current subject', async({ page }) => {
    var elem = page.locator(".assertion-table tbody tr").last();
    await expect(elem).toHaveClass("success");
    elem = elem.locator("td").first();
    await expect(elem).toHaveText("Column content");
    await expect(elem).toContainText("Column content");
  });


  test('chain multiple assertions together', async({ page }) => {
    var elem = page.locator(".assertions-link")
    await expect(elem).toHaveClass(new RegExp("\\bactive\\b"));
    await expect(elem).toHaveAttribute("href", new RegExp(".*cypress.io"));
  });


  test('expect - make an assertion about a specified subject', async({ page }) => {
    assert(true == true);
    var obj = {'foo': 'bar'};
    assert(obj == obj);
    assert(JSON.stringify(obj) == JSON.stringify({'foo': 'bar'}));
    assert(RegExp("bar$", 'i').test("FooBar"));

  });


  test('pass your own callback function to expect()', async({ page }) => {
    var elms = page.locator(".assertions-p p");
    var values: any[] = [];
    for (var i=0; i != await elms.count(); i++)
      values.push(await elms.nth(i).textContent());
    assert(values.length == 3, "has 3 paragraphs");
    assert(JSON.stringify(values) == JSON.stringify(
      [
      'Some text from first p',
      'More text from second p',
      'And even more text from third p'
    ]), "has expected text in each paragraph");
  });


  test('assert element\'s class name using regex', async({ page }) => {
    var elms = page.locator(".docs-header div");
    assert(await elms.count() == 1);
    var classes = await elms.first().getAttribute("class")
    expect(elms.first()).toHaveClass(new RegExp("\\bheading-.*"));
    expect(elms.first()).toContainText("Introduction");
  });


  test('can throw any error', async({ page }) => {
    var elms = page.locator(".docs-header div")
    if (await elms.count() != 1)
        throw new Error("Did not find 1 element");

    var classes = await elms.first().getAttribute("class")
    if (classes == null || new RegExp("\\bheading-.*").test(classes) == false)
      throw new Error('Could not find class "heading-" in' + classes);
  });


  test('matches unknown text between two elements', async({ page }) => {
    var elem1 = page.locator(".first");
    var text1 = await elem1.textContent();
    if (text1 != null )
      text1 = text1.replaceAll(' ', '').toLowerCase();
    var elem2 = page.locator(".second")
    var text2 = await elem2.textContent();
    if (text2 != null )
      text2 = text2.replaceAll(' ', '').toLowerCase();
    assert.equal(text1, text2);
  });


  test('assert shape of an object', async({ page }) => {
    var person = {
        'name': 'Joe',
        'age': 20,
    };
    assert.equal(typeof(person), 'object', "value is an object");
  });


  test('retries the function callback until assertions pass', async({ page }) => {
    // Playwright and Python don't allow asynchronous callbacks in assertions
    var elem = page.locator("#random-number")
    //test.setTimeout(10000);
    //expect(await elem.textContent()).toMatch(new RegExp("[0-9]+"));
    await expect(async () => {
      expect(await elem.textContent()).toMatch(new RegExp("[0-9]+"));
    }).toPass( {timeout: 10000 });
    var value = parseInt(await elem.textContent());
    assert(1 < value && value < 10);
  });

});
