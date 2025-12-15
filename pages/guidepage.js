import { expect } from '@playwright/test';
import { LoginPage } from './loginpage';
import { generateUniqueGuideData } from '../util/testdata';

export class GuidePage {
    constructor(page) {
        this.page = page;
        this.guidesMenu = page.getByText('guides');
    } 

    async openFirstGuideRow() {
        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .nth(1)
            .click();
    }
    

  
  async loginAndOpenList() {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.loginAsValidAdmin();
    await this.page.waitForLoadState('networkidle');
    await this.guidesMenu.click();
    await this.page.locator('div').filter({ hasText: /^guides$/ }).nth(1).click();
}

    async createguide() {
        const testData = generateUniqueGuideData();


        await this.page.getByRole('button', { name: 'Add Guide' }).click();
        await this.page.getByRole('button', { name: /select panel/i }).click();
        await this.page.getByRole('option').nth(0).click();
        await this.page.locator('button[aria-haspopup="listbox"]').nth(1).click();
        await this.page.getByRole('option').nth(1).click();
        await this.page.getByRole('textbox', { name: 'Section Title*' }).click();
        await this.page.getByRole('textbox', { name: 'Section Title*' }).fill(testData.selectionTitle);
        await this.page.getByRole('textbox', { name: 'Guide Title*' }).click();
        await this.page.getByRole('textbox', { name: 'Guide Title*' }).fill(testData.guideTitle);
        await this.page.getByRole('radio', { name: 'Inactive' }).click();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).click();
        await this.page.locator('.ql-editor').click();
        await this.page.locator('.ql-editor').fill(testData.description);
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByText('Guide created successfully')).toBeVisible({timeout : 5000});

    }

    async editguide() {
        const testData = generateUniqueGuideData();


        await this.openFirstGuideRow();
        await this.page.getByRole('button', { name: /super admin panel/i }).click();
        await this.page.getByRole('option').nth(1).click();
        await this.page.locator('button[aria-haspopup="listbox"]').nth(1).click();
        await this.page.getByRole('option').nth(0).click();
        await this.page.getByRole('textbox', { name: 'Section Title*' }).click();
        await this.page.getByRole('textbox', { name: 'Section Title*' }).fill(testData.selectionTitle);
        await this.page.getByRole('textbox', { name: 'Guide Title*' }).click();
        await this.page.getByRole('textbox', { name: 'Guide Title*' }).fill(testData.guideTitle);
        await this.page.getByRole('radio', { name: 'Inactive' }).click();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).click();
        await this.page.locator('.ql-editor').click();
        await this.page.locator('.ql-editor').fill(testData.description);
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.getByText('Guide updated successfully')).toBeVisible({ timeout: 5000 });

    }

    async viewguide() {

        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .nth(0)
            .click();
        await this.page.locator('.h-6.w-6.cursor-pointer').click();
    
    }

    async deleteguide() {

        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .nth(2)
            .click();
        await this.page.getByRole('button', { name: 'Delete' }).click();

        await expect(this.page.getByText('Guide deleted successfully')).toBeVisible({ timeout: 5000 });

    }
}