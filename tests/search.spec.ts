import { test, expect } from '@playwright/test';

test('search for "pliers" returns only products with "pliers" in the name', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  const productNames = page.getByRole('heading', { level: 5 });

  // Retries the whole check until the list is filtered, or fails with the last error
  await expect(async () => {
    const names = await productNames.allTextContents();
    expect(names.length, 'search should return at least one product').toBeGreaterThan(0);
    for (const name of names) {
      expect(name.trim().toLowerCase(), `product "${name.trim()}" should contain "pliers"`).toContain('pliers');
    }
  }).toPass({ timeout: 10_000 });
});

