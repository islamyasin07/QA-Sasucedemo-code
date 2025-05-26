import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly addToCartButton: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(private page: Page) {
    this.addToCartButton = this.page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartIcon = this.page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  async addItemToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async sortBy(optionText: string) {
    await this.page.waitForURL('**/inventory.html', { timeout: 10000 });
    const dropdown = this.page.locator('[data-test="product-sort-container"]');
    await this.sortDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await dropdown.click();
    await dropdown.selectOption({ label: optionText });
  }

  async getItemNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const prices = await this.itemPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
}