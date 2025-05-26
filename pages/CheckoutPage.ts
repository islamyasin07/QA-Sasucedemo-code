import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly confirmationMessage: Locator;

    constructor(private page: Page) {
        this.firstNameInput = this.page.locator('input[data-test="firstName"]');
        this.lastNameInput = this.page.locator('input[data-test="lastName"]');
        this.postalCodeInput = this.page.locator('input[data-test="postalCode"]');
        this.continueButton = this.page.locator('input[data-test="continue"]');
        this.finishButton = this.page.locator('button[data-test="finish"]');
        this.confirmationMessage = this.page.locator('.complete-header');
    }

    async fillCheckoutForm(first: string, last: string, zip: string) {
        await this.firstNameInput.fill(first);
        await this.lastNameInput.fill(last);
        await this.postalCodeInput.fill(zip);
        await this.continueButton.click();
    }

    async completeCheckout() {
        await this.page.waitForSelector('.summary_info'); // Ensure checkout overview is ready
        await expect(this.finishButton).toBeVisible();
        await this.finishButton.click();
    }



    async getConfirmationText(): Promise<string> {
        const text = await this.confirmationMessage.textContent();
        if (text === null) {
            throw new Error('Confirmation message not found');
        }
        return text;
    }
}
