import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  // Prepare login page before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login with correct username and password', async ({ page }) => {
    // Try logging in using valid credentials
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

    // Check that the user was redirected to the inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Login fails with incorrect password', async ({ page }) => {
    // Try logging in with wrong password
    await loginPage.login(process.env.SAUCE_USERNAME!, 'wrong_pass');

    // Error message should appear
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
  });
});
