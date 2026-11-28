import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('C3 Sort by price', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.sortBy('Price (Low - High)');

  await expect
    .poll(async () => {
      const prices = await homePage.getDisplayedPrices();
      return prices.length > 1 && prices.every((price, i) => i === 0 || prices[i - 1] <= price);
    })
    .toBe(true);

  const prices = await homePage.getDisplayedPrices();
  expect(prices.length).toBeGreaterThan(1);

  for (let i = 0; i < prices.length - 1; i++) {
    expect(
      prices[i],
      `Expected price at index ${i} (${prices[i]}) <= index ${i + 1} (${prices[i + 1]})`,
    ).toBeLessThanOrEqual(prices[i + 1]);
  }
});