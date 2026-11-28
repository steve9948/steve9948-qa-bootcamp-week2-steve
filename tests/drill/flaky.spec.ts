import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

test('flaky drill: save status after random delay (unfixed)', async ({ page }) => {
  const fileUrl = pathToFileURL(path.join(__dirname, 'index.html')).href;
  await page.goto(fileUrl);

  await page.getByRole('button', { name: 'Save' }).click();

  // Fixed wait shorter than the full 0–1000ms random delay window
  await page.waitForTimeout(400);
  const statusText = await page.locator('#status').textContent();

  expect(statusText).toBe('Saved');
});