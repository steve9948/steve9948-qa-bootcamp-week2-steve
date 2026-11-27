/**
 * Toolshop API tests: carts (Playwright `request` fixture, no browser).
 *
 * Tests in this file (rewritten from the Monday Postman requests):
 *   1. Create a cart, add a product, read it back and check the fields.
 *   2. Request a cart id that does not exist and check for a 404.
 *
 * Rules:
 *   - Uses the full API address, because the base URL in playwright.config.ts
 *     points at the UI site.
 *   - Sends "Accept: application/json". Without it, validation errors can come
 *     back as 404 instead of 422 (found in the Monday Postman work).
 *   - Any test that creates a cart deletes it, even when a check fails, and
 *     takes its own product from the list, so no test depends on another.
 */
import { test, expect } from '@playwright/test';

/** Base address of the Toolshop API. */
const API = 'https://api.practicesoftwaretesting.com';

/** Headers sent with every request. */
const headers = { Accept: 'application/json' };

// ---------------------------------------------------------------------------
// Test 1: create a cart, add a product, check the response fields
// ---------------------------------------------------------------------------
test('create a cart, add a product, and check the fields', async ({ request }) => {
  // Declared outside the try block so the finally block can see it.
  let cartId: string | undefined;

  try {
    // Step 1: take a real product from the list instead of hard-coding one,
    // because a fixed id can change if the data is reseeded.
    const productsResponse = await request.get(`${API}/products`, { headers });
    expect(productsResponse.status()).toBe(200);
    const products = await productsResponse.json();
    // Fails with a clear message if the list is empty, instead of a TypeError.
    expect(products.data.length, 'GET /products returned no products').toBeGreaterThan(0);
    const productId: string = products.data[0].id;
    const productName: string = products.data[0].name;

    // Step 2: create an empty cart. Expected: 201 Created and a new cart id.
    const createResponse = await request.post(`${API}/carts`, { headers });
    expect(createResponse.status()).toBe(201);
    cartId = (await createResponse.json()).id;
    expect(cartId).toBeTruthy();

    // Step 3: add the product. Only "ok" is checked, because Monday's Postman
    // run showed the success code can be 200 or 201.
    const addResponse = await request.post(`${API}/carts/${cartId}`, {
      headers,
      data: { product_id: productId, quantity: 2 },
    });
    expect(addResponse.ok()).toBeTruthy();

    // Step 4: read the cart back and check the fields.
    const cartResponse = await request.get(`${API}/carts/${cartId}`, { headers });
    expect(cartResponse.status()).toBe(200);
    const cart = await cartResponse.json();
    expect(cart.id).toBe(cartId);
    expect(cart.cart_items).toHaveLength(1);
    expect(cart.cart_items[0].quantity).toBe(2);
    // The line is for the product that was added, not just any product.
    expect(cart.cart_items[0].product_id).toBe(productId);
    expect(cart.cart_items[0].product.name).toBe(productName);
  } finally {
    // Cleanup: runs whether the checks above passed or failed.
    // The delete has no expect(), so a cleanup problem cannot hide the real
    // failure, and it is skipped if the cart was never created.
    if (cartId) {
      await request.delete(`${API}/carts/${cartId}`, { headers });
    }
  }
});

// ---------------------------------------------------------------------------
// Test 2: an unknown cart returns 404
// ---------------------------------------------------------------------------
test('requesting a cart id that does not exist returns 404', async ({ request }) => {
  // This id cannot exist. The test creates nothing, so it has nothing to clean up.
  const response = await request.get(`${API}/carts/does-not-exist-123`, { headers });

  expect(response.status()).toBe(404);

  // The message matches what was recorded in the Monday negative cases table.
  const body = await response.json();
  expect(body.message).toBe('Requested item not found');
});