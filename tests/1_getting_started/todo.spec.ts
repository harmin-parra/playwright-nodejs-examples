const { test, expect, Page } = require('@playwright/test');


test.describe('todo tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/todo");
  });


  test('displays two todo items by default', async ({ page }) => {
    var tasks = page.locator(".todo-list li");
    await expect(tasks).toHaveCount(2);
    await expect(tasks.first()).toHaveText("Pay electric bill");
    await expect(tasks.last()).toHaveText("Walk the dog");
  });

 
  test('can add new todo items', async ({ page }) => {
    var item = page.locator('[data-test="new-todo"]');
    await item.fill("Feed the cat");
    await item.press("Enter");
    var tasks = page.locator(".todo-list li");
    await expect(tasks).toHaveCount(3);
    await expect(tasks.last()).toHaveText("Feed the cat");
  });


  /* Test fixture to be used by the remaining tests */
  const test2 = test.extend<{ page }>({
    page_checked_item: async ({ page }, use) => {
      await page.goto("https://example.cypress.io/todo");
      await page.locator("li").filter({ hasText: "Pay electric bill" }).getByRole("checkbox").check();
      await use(page);
    }
  });


  test2('can check off an item as completed', async ({ page_checked_item }) => {
    await expect(page_checked_item.locator("li").filter({ hasText: "Pay electric bill" })).toHaveClass("completed");
  });


  test2('can filter for uncompleted tasks', async ({ page_checked_item }) => {
    await page_checked_item.getByRole("link", { name: "Active" }).click();
    var tasks = page_checked_item.locator(".todo-list li");
    await expect(tasks).toHaveCount(1);
    await expect(tasks.first()).toHaveText("Walk the dog");
  });


  test2('can filter for completed tasks', async ({ page_checked_item }) => {
    await page_checked_item.getByRole("link", { name: "Completed" }).click();
    var tasks = page_checked_item.locator(".todo-list li");
    await expect(tasks).toHaveCount(1)
    await expect(tasks.first()).toHaveText("Pay electric bill")
  });


  test2('can delete all completed tasks', async ({ page_checked_item }) => {
    await page_checked_item.getByRole("button", { name: "Clear completed" }).click();
    var tasks = page_checked_item.locator(".todo-list li");
    await expect(tasks).toHaveCount(1)
    await expect(tasks.first()).not.toHaveText("Pay electric bill")
    await expect(tasks.first()).toHaveText("Walk the dog")
  });

});
