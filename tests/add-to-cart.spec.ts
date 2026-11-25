import { test } from '@playwright/test';
import { ProductPage } from '../pages/product.page';

test('adding 3 Combination Pliers puts them in the cart with the right total', async ({ page }) => {
  const product = new ProductPage(page);

  await product.open('Combination Pliers');
  await product.setQuantity(3);
  await product.addToCart();
});