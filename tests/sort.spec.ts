import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

dotenv.config();

test.describe('Sort Feature', () => {
  // Before each test, log in to the system
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Sort by Name: Z to A', async ({ page }) => {
    const products = new ProductsPage(page);

    // Sort items by name descending
    await products.sortBy('Name (Z to A)');

    // Get the product names and check if sorted correctly
    const names = await products.getItemNames();
    const expected = [...names].sort().reverse();
    expect(names).toEqual(expected);
  });

  test('Sort by Price: High to Low', async ({ page }) => {
    const products = new ProductsPage(page);

    // Wait for the first item to appear before sorting
    await expect(products.itemNames.first()).toBeVisible({ timeout: 10000 });

    // Apply sorting by price
    await products.sortBy('Price (high to low)');

    // Get prices and verify sorting order
    const prices = await products.getItemPrices();
    const expected = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(expected);
  });
});
