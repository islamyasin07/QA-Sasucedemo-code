import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

dotenv.config();

test.describe('Checkout Flow', () => {
  test('Complete checkout successfully', async ({ page }) => {
    // Step 1: Log in to the system
    const login = new LoginPage(page);
    await login.goto();
    await login.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

    // Step 2: Add item to cart
    const shop = new ProductsPage(page);
    await shop.addItemToCart();

    // Step 3: Navigate to cart
    await shop.goToCart();

    // Step 4: Start checkout
    const cart = new CartPage(page);
    await page.locator('[data-test="checkout"]').click();

    // Step 5: Fill out checkout form
    const checkout = new CheckoutPage(page);
    await checkout.fillCheckoutForm('Islam', 'Yaseen', '9421');

    // Step 6: Complete the order
    await checkout.completeCheckout();

    // Step 7: Verify confirmation message
    const confirmation = await checkout.getConfirmationText();
    expect(confirmation?.trim()).toBe('Thank you for your order!');
  });
});
