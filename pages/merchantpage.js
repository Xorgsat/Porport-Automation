// pages/MerchantPage.js
import { expect } from '@playwright/test';
import { LoginPage } from './loginpage';

export class MerchantPage {
    constructor(page) {
        this.page = page;
        this.merchantsMenu = page.getByText('merchants');
    }

    async loginAndOpenList() {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.loginAsValidAdmin();
        await this.page.waitForLoadState('networkidle');
        await this.merchantsMenu.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openFirstMerchantRow() {
        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .first()
            .click();
    }

    async createMerchant(testData) {
        await this.page.getByRole('button', { name: 'Add Merchant' }).click();

        await this.page.getByRole('textbox', { name: 'First Name*' }).fill('Hannibal');
        await this.page.getByRole('textbox', { name: 'Last Name*' }).fill('Barca');
        await this.page.getByRole('textbox', { name: 'Email Id*' }).fill(testData.email);
        await this.page
            .getByRole('textbox', { name: 'Company Identification Number*' })
            .fill('25879456123');
        await this.page
            .getByRole('textbox', { name: 'Company Name*' })
            .fill(testData.companyName);

        await this.page
            .getByRole('button', { name: 'Select industry type Industry' })
            .click();
        await this.page.getByRole('option', { name: 'Automotive' }).click();

        await this.page.getByRole('button', { name: 'Sub Domain Domain Type*' }).click();
        await this.page.getByRole('textbox', { name: 'Sub Domain*' }).fill('www.AC');
        await this.page.getByRole('textbox', { name: 'Phone No.*' }).fill('9099216153');

        await this.page.getByRole('button', { name: 'Save & Continue' }).click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByRole('textbox', { name: 'Address' }).fill('Surat');
        await this.page.getByRole('textbox', { name: 'City' }).fill('Surat');
        await this.page.getByRole('button', { name: 'Select State State' }).click();
        await this.page.getByLabel('Queensland', { exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Pin Code' }).fill('395004');

        await this.page.click('text=Browse Files');
        await this.page.setInputFiles('input[type="file"]', 'C:/Users/SatyamTiwari/Downloads/image (1).jpg');

        await this.page.getByRole('button', { name: 'Save & Continue' }).click();
        await this.page.waitForTimeout(10000);
        await expect(this.page.getByText('Merchant saved successfully')).toBeVisible();
    }

    async editFirstMerchant(testData) {
        await this.openFirstMerchantRow();

        await this.page.getByRole('textbox', { name: 'First Name*' }).fill('Updated');
        await this.page.getByRole('textbox', { name: 'Last Name*' }).fill('Merchant');
        await this.page
            .getByRole('textbox', { name: 'Company Name*' })
            .fill(`${testData.companyName} Edited`);
        await this.page.getByRole('textbox', { name: 'Phone No.*' }).fill('9876543210');
        await this.page.getByRole('button', { name: 'Save & Continue' }).click();

        await expect(this.page.getByText('Merchant saved successfully')).toBeVisible({
            timeout: 10000,
        });
    }

    async addProductsToFirstMerchant() {
        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .first()
            .click();

        await this.page.getByRole('tab', { name: 'Products' }).click();

        await this.page.locator('input[type="checkbox"]').nth(4).check();
        await this.page.locator('input[type="checkbox"]').nth(5).check();
        await this.page
            .locator('input[type="checkbox"]', { exact: true })
            .nth(2)
            .check();
        await this.page
            .locator('input[type="checkbox"]', { exact: true })
            .nth(3)
            .check();
        await this.page
            .locator('input[type="checkbox"]', { exact: true })
            .nth(4)
            .check();
        await this.page
            .locator('input[type="checkbox"]', { exact: true })
            .nth(5)
            .check();

        await this.page.getByRole('button', { name: 'Save & Continue' }).click();

        await expect(
            this.page.getByText('Product saved successfully')
        ).toBeVisible({ timeout: 10000 });
    }

    async addContactToFirstMerchant() {
        const testData = generateUniqueMerchantData();

        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('tr, .merchant-item', { timeout: 10000 });

        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .first()
            .click();

        await this.page.getByRole('tab', { name: 'Products' }).click();
        await this.page.getByRole('tab', { name: 'Contacts' }).click();
        await this.page.getByRole('button', { name: 'Add Contact' }).click();

        await this.page.getByRole('textbox', { name: 'First Name*' }).click();
        await this.page.getByRole('textbox', { name: 'First Name*' }).fill('Crest');
        await this.page.getByRole('textbox', { name: 'First Name*' }).press('Tab');

        await this.page.getByRole('textbox', { name: 'Last Name*' }).fill('2025');
        await this.page.getByRole('textbox', { name: 'Last Name*' }).press('Tab');

        await this.page.getByRole('textbox', { name: 'Email*' }).fill(testData.email);
        await this.page.getByRole('textbox', { name: 'Email*' }).press('Tab');

        await this.page
            .getByRole('textbox', { name: 'Phone Number*' })
            .fill(testData.phone);

        await this.page.getByRole('button', { name: 'Save & Continue' }).click();

        await this.page.waitForTimeout(2000);

        await expect(
            this.page.getByText('Contact saved successfully')
        ).toBeVisible({ timeout: 10000 });

        await this.page.waitForLoadState('networkidle');
    }

    async createStoreForFirstMerchant() {
        await this.page
            .locator('div')
            .filter({ hasText: /^merchants$/ })
            .nth(1)
            .click();

        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .first()
            .click();

        await this.page.getByRole('tab', { name: 'Stores' }).click();
        await this.page.getByRole('button', { name: 'Add Store' }).click();

        await this.page
            .locator(
                '.relative.w-full.inline-flex.tap-highlight-transparent.flex-row.items-center.shadow-xs.px-3 > .inline-flex'
            )
            .first()
            .click();

        await this.page.getByRole('textbox', { name: 'Store Name*' }).fill('Stores 3');
        await this.page.getByRole('textbox', { name: 'Store Name*' }).press('Tab');

        await this.page.getByRole('textbox', { name: 'Store Pin*' }).fill('395004');
        await this.page.getByRole('textbox', { name: 'Store Pin*' }).press('Tab');

        await this.page
            .getByRole('button', { name: 'Select Contact Select Contact*' })
            .click();
        await this.page.locator('[role="option"]').nth(1).click();

        await this.page
            .getByRole('button', { name: 'toggle password visibility' })
            .click();

        await this.page
            .getByRole('button', { name: 'Select Address Select Address*' })
            .click();
        await this.page.locator('[role="option"]').nth(0).click();

        await this.page.getByRole('button', { name: 'Save & Continue' }).click();

        await expect(
            this.page.locator('text=Store created successfully')
        ).toBeVisible({ timeout: 10000 });

        await this.page.waitForLoadState('networkidle');
    }


    async changeStatusOfFirstMerchantToInactive() {
        await this.page.waitForLoadState('networkidle');

        await this.page.waitForSelector(
            'tr, .merchant-item, [data-testid*="merchant"]',
            { timeout: 15000 }
        );

        const checkbox = this.page.locator('tr input[type="checkbox"]').first();
        await checkbox.waitFor({ timeout: 50000 });
        await checkbox.check();

        await this.page.waitForTimeout(1000);

        const changeStatusButton = this.page
            .locator(
                'button:has-text("Change status"), button:has-text("Change Status"), button:has-text("Status"), [data-testid*="status"], [aria-label*="status"]'
            )
            .first();

        await changeStatusButton.click();
        await this.page.waitForTimeout(1000);

        const statusOption = this.page
            .locator(
                'option:has-text("Inactive"), [role="option"]:has-text("Inactive"), button:has-text("Inactive")'
            )
            .first();

        await statusOption.click();

        const confirmButton = this.page
            .locator(
                'button:has-text("Confirm"), button:has-text("Save"), button:has-text("Update")'
            )
            .first();

        await confirmButton.click();

        await expect(
            this.page.locator('text=Status updated, text=Success, text=Updated')
        ).toBeVisible({ timeout: 5000 });
    }
}
