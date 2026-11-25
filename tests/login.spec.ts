import { test, expect } from '@playwright/test';

test('invalid login is rejected with an error message', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.getByLabel('Email address').fill('nobody@example.com');
  await page.getByLabel(/^password/i).fill('wrong-password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});