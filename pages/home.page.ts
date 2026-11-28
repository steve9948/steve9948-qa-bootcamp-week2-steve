import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="sort"]');
    this.productPrices = page.locator('[data-test="product-price"]');
  }

  async goto(): Promise<void> {
    const url = process.env.TOOLSHOP_URL ?? 'https://practicesoftwaretesting.com';
    await this.page.goto(url);
    await expect(this.productPrices.first()).toBeVisible();
  }

  async sortBy(label: string): Promise<void> {
    await this.sortDropdown.selectOption({ label });
  }

  async getDisplayedPrices(): Promise<number[]> {
    const rawTexts = await this.productPrices.allInnerTexts();
    return rawTexts.map((text) => Number(text.replace(/[^0-9.]/g, '')));
  }
}