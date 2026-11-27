import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.locator('[data-test="nav-cart"]').click();
  }

  async expectLine(productName: string, quantity: number): Promise<void> {
    const title = this.page.locator('[data-test="product-title"]', { hasText: productName });
    await expect(title).toHaveCount(1);

    const qtyInput = this.page.locator('[data-test="product-quantity"]');
    await expect(qtyInput).toHaveValue(String(quantity));
  }

  async expectLineTotalIsQuantityTimesUnitPrice(productName: string, quantity: number): Promise<void> {
    const row = this.page.locator('tr', { hasText: productName });
    const unitPriceText = await row.locator('[data-test="product-price"]').innerText();
    const lineTotalText = await row.locator('[data-test="line-price"]').innerText();

    const unitPrice = Number(unitPriceText.replace(/[^0-9.]/g, ''));
    const lineTotal = Number(lineTotalText.replace(/[^0-9.]/g, ''));

    expect(lineTotal).toBeCloseTo(unitPrice * quantity, 2);
  }
}