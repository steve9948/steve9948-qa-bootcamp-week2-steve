/**
 * Toolshop API test: products (Playwright `request` fixture, no browser).
 *
 * Checks that the product list responds and reports a total.
 * Cart tests live in cart-api.spec.ts.
 *
 * Rules:
 *   - Uses the full API address, because the base URL in playwright.config.ts
 *     points at the UI site, so a bare "/products" would go to the wrong place.
 *   - Sends "Accept: application/json", as learned in the Monday Postman work.
 *   - Only reads data, so it creates nothing and needs no cleanup.
 */
import { test, expect } from '@playwright/test';

/** Base address of the Toolshop API. */
const API = 'https://api.practicesoftwaretesting.com';

/** Headers sent with every request. */
const headers = { Accept: 'application/json' };

test('GET /products returns 200 and a total', async ({ request }) => {
  const response = await request.get(`${API}/products`, { headers });

  // Status check
  expect(response.status()).toBe(200);

  // Field check: "total" is the count across all pages, not just this page.
  // Checked as "more than 0" rather than an exact number, so the test does not
  // fail when the catalogue size changes and nothing is actually broken.
  const body = await response.json();
  expect(body.total).toBeGreaterThan(0);
});