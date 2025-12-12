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
            .nth(0)
            .click();

        await this.page.getByRole('textbox', { name: 'Rule Name' }).fill(uniqueRuleName);
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(
            this.page.getByText('Tax rule updated successfully')
        ).toBeVisible({ timeout: 10000 });
    }

    async updateFirstDiscountRule() {
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
        
        await this.page.getByRole('tab', { name: 'Discount' }).click();
        await this.page
            .getByRole('row', { name: '1', exact: true })
            .getByRole('button')
            .nth(0)
            .click();

        await this.page.locator('.relative.w-full.inline-flex.tap-highlight-transparent.flex-row.items-center.shadow-xs.px-3 > .inline-flex').first().click();
        await this.page.getByRole('textbox', { name: 'Rule Name' }).fill(uniqueRuleName);
        await this.page.getByRole('radio', { name: 'Fixed Amount' }).check();
        await this.page.getByRole('radio', { name: 'Percentage' }).check();
        await this.page.getByRole('textbox', { name: 'Rate Amount' }).click();
        await this.page.getByRole('textbox', { name: 'Rate Amount' }).fill('100');
        await this.page.getByRole('radio', { name: 'Inactive' }).check();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).check();
        await this.page.getByRole('button', { name: 'Save' }).click();
        
        await expect(this.page.getByText('Discount rule created successfully')).toBeVisible({ timeout: 10000 });
    }
        
    async createDiscountRule() {
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

        await this.page.getByRole('tab', { name: 'Discount' }).click();
        await this.page.getByRole('button', { name: 'Add Discount Rule' }).click();
        await this.page.locator('.relative.w-full.inline-flex.tap-highlight-transparent.flex-row.items-center.shadow-xs.px-3 > .inline-flex').first().click();
        await this.page.getByRole('textbox', { name: 'Rule Name' }).fill(uniqueRuleName + 'Updated');
        await this.page.getByRole('radio', { name: 'Fixed Amount' }).check();
        await this.page.getByRole('radio', { name: 'Percentage' }).check();
        await this.page.getByRole('textbox', { name: 'Rate Amount' }).click();
        await this.page.getByRole('textbox', { name: 'Rate Amount' }).fill('100');
        await this.page.getByRole('radio', { name: 'Inactive' }).check();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).check();
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByText('Discount rule updated successfully')).toBeVisible({ timeout: 10000 });
    }
    
    async createTemplate() {
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
        
        await this.page.getByRole('tab', { name: 'Templates' }).click();
        await this.page.getByRole('button', { name: 'Add Template' }).click();
        await this.page.getByRole('button', { name: 'SMS' }).click();
        await this.page.getByRole('button', { name: 'Email' }).click();
        await this.page.getByRole('textbox', { name: 'Template Name' }).click();
        await this.page.getByRole('textbox', { name: 'Template Name' }).fill(uniqueRuleName);
        await this.page.getByRole('textbox', { name: 'Subject' }).click();
        await this.page.getByRole('textbox', { name: 'Subject' }).fill('test');
        await this.page.getByRole('textbox', { name: 'Body' }).click();
        await this.page.getByRole('textbox', { name: 'Body' }).fill('test123456');
        await this.page.getByRole('radio', { name: 'Inactive' }).check();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).check();
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByText('Template created successfully')).toBeVisible({ timeout: 10000 });

    }

    async updateFirstTemplate() {
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

        await this.page.getByRole('tab', { name: 'Templates' }).click();
        await this.page
            .getByRole('row', { name: '1', exact: true })
            .getByRole('button')
            .nth(0)
            .click();
        await this.page.getByRole('button', { name: 'SMS' }).click();
        await this.page.getByRole('button', { name: 'Email' }).click();
        await this.page.getByRole('textbox', { name: 'Template Name' }).click();
        await this.page.getByRole('textbox', { name: 'Template Name' }).fill(uniqueRuleName);
        await this.page.getByRole('textbox', { name: 'Subject' }).click();
        await this.page.getByRole('textbox', { name: 'Subject' }).fill('test');
        await this.page.getByRole('textbox', { name: 'Body' }).click();
        await this.page.getByRole('textbox', { name: 'Body' }).fill('test123456');
        await this.page.getByRole('radio', { name: 'Inactive' }).check();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).check();
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByText('Template updated successfully')).toBeVisible({ timeout: 10000 });

    }

    async SystemWide() {

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

        await this.page.getByRole('tab', { name: 'System-Wide' }).click();
       
        await this.page.locator('button[aria-haspopup="listbox"]').nth(0).click();
        await this.page.getByRole('option').nth(1).click();
        await this.page.locator('button[aria-haspopup="listbox"]').nth(1).click();
        await this.page.getByRole('option').nth(1).click();
        await this.page.locator('button[aria-haspopup="listbox"]').nth(2).click();
        await this.page.getByRole('option').nth(1).click();

        await this.page.locator('button[aria-haspopup="listbox"]').nth(0).click();
        await this.page.getByRole('option').nth(0).click();
        await this.page.locator('button[aria-haspopup="listbox"]').nth(1).click();
        await this.page.getByRole('option').nth(0).click();
        await this.page.locator('button[aria-haspopup="listbox"]').nth(2).click();
        await this.page.getByRole('option').nth(0).click();

        await this.page.getByLabel('', { exact: true }).nth(0).click();
        await this.page.getByLabel('', { exact: true }).nth(1).click();
        await this.page.getByLabel('', { exact: true }).nth(2).click();

        await this.page.getByLabel('', { exact: true }).nth(0).click();
        await this.page.getByLabel('', { exact: true }).nth(1).click();
        await this.page.getByLabel('', { exact: true }).nth(2).click();

        await expect(this.page.getByRole('alertdialog', { name: 'System configuration updated successfully' })).toBeVisible({ timeout: 10000 });

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
        await this.page.getByRole('button', { name: /select module/i }).click();  
        await this.page.locator('li[role="option"][data-react-aria-pressable="true"]').nth(1).click();

        await this.page.getByRole('spinbutton', { name: 'Price*' }).fill('10');
        await this.page.getByRole('spinbutton', { name: 'Devices*' }).fill('10');
        await this.page.getByRole('radio', { name: 'Inactive' }).check();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).check();
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByText('Module price created')).toBeVisible();
    }

    async updateFirstModulePrice() {
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

        await this.page.locator('button[data-react-aria-pressable="true"].action-btn').nth(0).click();
        await this.page.getByRole('button', { name: /select module/i }).click();
        await this.page.locator('li[role="option"][data-react-aria-pressable="true"]').nth(1).click();

        await this.page.getByRole('spinbutton', { name: 'Price*' }).fill('90');
        await this.page.getByRole('spinbutton', { name: 'Devices*' }).fill('50');
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByText('Module price updated successfully')).toBeVisible();
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
