import { type Page, type Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly increaseQuantity: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // data-test used because the "+" button has no accessible name (chosen by codegen)
    this.increaseQuantity = page.locator('[data-test="increase-quantity"]');
    this.quantityInput = page.getByRole('spinbutton');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
  }

  async open(productName: string) {
    await this.page.goto('https://practicesoftwaretesting.com/');
    // Find the card by its visible name, not by a product ID that can change
    await this.page
      .locator('[data-test^="product-"]')
      .filter({ hasText: productName })
      .first()
      .click();
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
  }

  async setQuantity(quantity: number) {
    for (let i = 1; i < quantity; i++) {
      await this.increaseQuantity.click();
    }
    await expect(this.quantityInput).toHaveValue(String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}