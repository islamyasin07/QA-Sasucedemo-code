import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;
  readonly removeButton: Locator;

  constructor(private page: Page) {
    this.cartItems = this.page.locator('.cart_item');
    this.removeButton = this.page.locator('button[data-test="remove-sauce-labs-backpack"]');
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItem() {
    await this.removeButton.click();
  }
}
