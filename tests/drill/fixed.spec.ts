import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

test('flaky drill: save status after random delay (fixed)', async ({ page }) => {
  const fileUrl = pathToFileURL(path.join(__dirname, 'index.html')).href;
  await page.goto(fileUrl);

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('#status')).toHaveText('Saved');
});