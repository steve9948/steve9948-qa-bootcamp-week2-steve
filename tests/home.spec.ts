import { test, expect } from '@playwright/test';

test('home page has the expected title', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await expect(page).toHaveTitle(/Practice Software Testing/);
});