import { Given, When, Then } from '@cucumber/cucumber';
import type { PlaywrightWorld } from '../support/world';
import { ProductPage } from '../../pages/product.page';
import { CartPage } from '../../pages/cart.page';

// Background
Given('the shopper is on the Toolshop home page', async function (this: PlaywrightWorld) {
  await this.page.goto('https://practicesoftwaretesting.com/');
});

// Scenario 1
When('the shopper opens the {string} product', async function (this: PlaywrightWorld, productName: string) {
  this.productName = productName;
  await new ProductPage(this.page).open(productName);
});

When('the shopper adds {int} of it to the cart', async function (this: PlaywrightWorld, quantity: number) {
  this.quantity = quantity;
  const productPage = new ProductPage(this.page);
  await productPage.setQuantity(quantity);
  await productPage.addToCart();
});

When('the shopper opens the cart', async function (this: PlaywrightWorld) {
  await new CartPage(this.page).open();
});

Then(
  'the cart lists {string} with quantity {int}',
  async function (this: PlaywrightWorld, productName: string, quantity: number) {
    await new CartPage(this.page).expectLine(productName, quantity);
  },
);

Then('the cart total equals the product price', async function (this: PlaywrightWorld) {
  await new CartPage(this.page).expectLineTotalIsQuantityTimesUnitPrice(this.productName, this.quantity);
});