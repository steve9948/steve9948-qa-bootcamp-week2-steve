import { test, expect } from '@playwright/test';

test('GET /products returns 200 and a total', async ({ request }) => {
  const response = await request.get('https://api.practicesoftwaretesting.com/products', {
    headers: { Accept: 'application/json' },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.total).toBeGreaterThan(0);
});