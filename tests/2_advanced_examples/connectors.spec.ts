import { test, expect } from '@playwright/test';
const assert = require('node:assert');

test.describe('Connectors', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/connectors");
  });


  test('each() - iterate over an array of elements', async({ page }) => {
    var elms = page.locator(".connectors-its-ul>li");
    for (var i = 0; i != await elms.count(); i++)
      console.log(await elms.nth(i).textContent());
  });


  test('get properties on the current subject', async({ page }) => {
    assert(await page.locator(".connectors-its-ul>li").count() > 2);
  });


  test('evaluate() - invoke a function on the current subject', async({ page }) => {
    var elem = page.locator(".connectors-div")
    await expect(elem).not.toBeVisible();
    await elem.evaluate(elem => elem.style.display = 'initial');
    await expect(elem).toBeVisible();
  });


  test('', async({ page }) => {
    var arr: string[] = ['foo', 'bar', 'baz'];

    function func(foo, bar, baz) {
        assert(foo == 'foo');
        assert(bar == 'bar');
        assert(baz == 'baz');
    }
    func(...arr);
  });


  test('invokes a callback function with the current subject', async({ page }) => {
    var elms = page.locator(".connectors-list > li");
    assert(await elms.count() == 3, "3 items");
    await expect(elms).toHaveCount(3);
    await expect(elms.nth(0)).toContainText("Walk the dog");
    await expect(elms.nth(1)).toContainText("Feed the cat");
    await expect(elms.nth(2)).toContainText("Write JavaScript");
  });


  test('yields the returned value to the next command', async({ page }) => {
    function num(x: number) {
      assert(x == 1);
      return 2;
    }
    assert(num(1) == 2);
  });


  test('yields the original subject without return', async({ page }) => {
    function num(x: number) {
      assert(x == 1);
    }
    num(1);
  });


  test('yields the value yielded by the last Cypress command inside', async({ page }) => {
    function num(x: number) {
      assert(x == 1);
      return 2;
    }
    assert(num(1) == 2);
  });

});
