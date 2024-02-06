import { test, expect, Page, request, APIRequestContext } from '@playwright/test';
const assert = require('node:assert');


async function api_request_context(): Promise<APIRequestContext> {
  var context = await request.newContext({ baseURL: 'https://jsonplaceholder.cypress.io' });
  return context;
}


test.describe('Network', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.cypress.io/commands/network-requests");
  });


  test('make an XHR request', async({ page }) => {
    var context = await api_request_context();
    var response = await context.get("/comments");
    assert(response.ok());
    assert(response.headersArray().length > 0);
    assert((await response.body()).length > 500);
  });


  test('requests - pass result to the second request', async({ page }) => {
    var context = await api_request_context();
    var response = await context.get("/users?_limit=1");
    assert(response.ok());
    var user = JSON.parse((await response.body()).toString())[0];
    assert.equal(typeof(user['id']), 'number' );
    response = await context.post("/posts", 
      {
        data: {
          'userId': user['id'],
          'title': 'Cypress Test Runner',
          'body': 'Fast, easy and reliable testing for anything that runs in a browser.',
        }
      });
    assert(response.ok());
    var posts = JSON.parse((await response.body()).toString());
    assert(posts.hasOwnProperty('title'));
    assert.equal(posts['title'], 'Cypress Test Runner');
    assert.equal(typeof(posts['id']), 'number' );
    assert(posts['id'] > 100);
  });


  test('route responses to matching requests', async({ page }) => {
    var responsePromise = page.waitForResponse("**/comments/*");
    await page.locator(".network-btn").click();
    var response = await responsePromise;
    assert(response.status() == 200 || response.status() == 304);

    responsePromise = page.waitForResponse("**/comments");
    await page.locator(".network-post").click();
    response = await responsePromise;
    assert(response.headerValue('content-type') != null);
    var body = JSON.parse((await response.body()).toString());
    assert(body.hasOwnProperty('email'));
    assert.equal(body['name'], "Using POST in cy.intercept()");

    const message = "whoa, this comment does not exist";
    await page.route("**/comments/*", async route => {
      route.fulfill({
        status: 404,
        json: {"error": message},
        // body=json.dumps({"error": message}),
        headers: {"access-control-allow-origin": "*", "content-type": "application/json"},
      });
    });
    await page.locator(".network-put").click();
    expect(page.locator(".network-put-comment")).toHaveText(message);
  });


  test('request with query parameters', async({ page }) => {
    var context = await api_request_context()
    var response = await context.get("/comments", {
      params: {'postId': 1, 'id': 3}
    });
    var comment = JSON.parse(await response.text())[0];
    assert(comment.hasOwnProperty('postId'));
    assert.equal(comment['postId'], 1);
    assert(comment.hasOwnProperty('id'));
    assert.equal(comment['id'], 3);
  });

});
