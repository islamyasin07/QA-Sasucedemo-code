import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

dotenv.config();

test.describe('Remove from Cart', () => {
  test('Add and then remove an item from cart', async ({ page }) => {
    // Step 1: Login to the website using valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

    // Step 2: Add a product to the cart
    const products = new ProductsPage(page);
    await products.addItemToCart();

    // Step 3: Open the cart page
    await products.goToCart();

    // Step 4: Count items before removing
    const cart = new CartPage(page);
    let itemsBefore = await cart.getItemCount();
    expect(itemsBefore).toBeGreaterThan(0); // Make sure item was added

    // Step 5: Remove the item
    await cart.removeItem();

    // Step 6: Count items again to confirm it's removed
    let itemsAfter = await cart.getItemCount();
    expect(itemsAfter).toBe(0); // Cart should be empty now
  });
});
