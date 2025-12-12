// pages/SettingsPage.js
import { expect } from '@playwright/test';
import { LoginPage } from './loginpage';

function generateUniqueRuleName() {
    const timestamp = Date.now();
    return `Tax Rule ${timestamp}`;
}

export class SettingsPage {
    constructor(page) {
        this.page = page;
    }

    async loginAndOpenSettingsHome() {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.loginAsValidAdmin();
        await this.page.waitForLoadState('networkidle');
        await this.page.goto('/');
        await this.page
            .locator('div')
            .filter({ hasText: /^settings$/ })
            .nth(1)
            .click();
    }

    async createTaxRule() {
        const uniqueRuleName = generateUniqueRuleName();

        await this.loginAndOpenSettingsHome();

        await this.page
            .locator('.w-12.h-12.text-primary-300')
            .first()
            .click();
        await this.page.getByRole('button', { name: 'Add Tax Rule' }).click();

        await this.page.getByRole('textbox', { name: 'Rule Name' }).fill(uniqueRuleName);
        await this.page.getByRole('textbox', { name: 'Percentage (%)' }).fill('100');
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(
            this.page.getByText('Tax rule created successfully')
        ).toBeVisible({ timeout: 10000 });
    }

    async updateFirstTaxRule() {
        const uniqueRuleName = generateUniqueRuleName();

        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.loginAsValidAdmin();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('settings').click();
        await this.page
            .locator('div')
            .filter({ hasText: /^System Settings$/ })
            .first()
            .click();

        await this.page
            .getByRole('row', { name: '1', exact: true })
            .getByRole('button')
            .first()
            .click();

        await this.page.getByRole('textbox', { name: 'Rule Name' }).fill(uniqueRuleName);
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(
            this.page.getByText('Tax rule updated successfully')
        ).toBeVisible({ timeout: 10000 });
    }

    async createModulePrice() {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.loginAsValidAdmin();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('settings').click();
        await this.page
            .locator('div')
            .filter({ hasText: /^Modules Settings$/ })
            .nth(1)
            .click();

        await this.page.getByRole('button', { name: 'Add Module' }).click();
        await this.page
            .getByRole('button', { name: 'Select Module Module Name*' })
            .click();
        await this.page
            .getByLabel('Bookings', { exact: true })
            .getByText('Bookings')
            .click();

        await this.page.getByRole('spinbutton', { name: 'Price*' }).fill('10');
        await this.page.getByRole('spinbutton', { name: 'Devices*' }).fill('10');
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByText('Module price created')).toBeVisible();
    }

    async deleteFirstModulePrice() {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.loginAsValidAdmin();
        await this.page.waitForLoadState('networkidle');

        await this.page
            .locator('div')
            .filter({ hasText: /^settings$/ })
            .nth(2)
            .click();

        await this.page
            .locator('div')
            .filter({ hasText: /^Modules Settings$/ })
            .first()
            .click();

        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .nth(1)
            .click();

        await this.page.getByRole('button', { name: 'Confirm' }).click();

        await expect(
            this.page.getByRole('region', { name: 'notification.' }).getByRole('alert')
        ).toBeVisible();
    }
}
