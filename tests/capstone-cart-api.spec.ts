import { test, expect, type APIRequestContext } from '@playwright/test';

const API_URL = process.env.TOOLSHOP_API_URL ?? 'https://api.practicesoftwaretesting.com';

async function getFirstProductId(request: APIRequestContext): Promise<string> {
  const res = await request.get(`${API_URL}/products`);
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);

  return body.data[0].id as string;
}

test.describe('Cart API capstone', () => {
  let cartId: string | undefined;

  test.afterEach(async ({ request }) => {
    if (!cartId) return;

    const deleteRes = await request.delete(`${API_URL}/carts/${cartId}`);
    expect([200, 204]).toContain(deleteRes.status());
    cartId = undefined;
  });

  test('C4 Add to a cart', async ({ request }) => {
    const productId = await getFirstProductId(request);
    const quantity = 2;

    // 1. Create a fresh cart
    const createRes = await request.post(`${API_URL}/carts`);
    expect([200, 201]).toContain(createRes.status());
    const createdCart = await createRes.json();
    expect(typeof createdCart.id).toBe('string');
    cartId = createdCart.id;

    // 2. Add the product to the cart
    const addRes = await request.post(`${API_URL}/carts/${cartId}`, {
      data: {
        product_id: productId,
        quantity,
      },
    });
    expect(addRes.status()).toBe(200);

    // 3. Read the cart back and confirm the product and quantity are present
    const getRes = await request.get(`${API_URL}/carts/${cartId}`);
    expect(getRes.status()).toBe(200);

    const cart = await getRes.json();
    expect(cart.id).toBe(cartId);
    expect(Array.isArray(cart.cart_items)).toBe(true);

    const addedItem = cart.cart_items.find(
      (item: { product_id: string; quantity: number }) => item.product_id === productId,
    );
    expect(addedItem).toBeDefined();
    expect(addedItem.quantity).toBe(quantity);
  });
});