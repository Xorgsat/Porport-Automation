// pages/ResellerPage.js
import { expect } from '@playwright/test';
import { LoginPage } from './loginpage';
import { generateUniqueResellerData } from '../util/testdata';
export class ResellerPage {
    constructor(page) {
        this.page = page;
    }

    async loginAndOpenList() {
        const loginPage = new LoginPage(this.page);
        await loginPage.goto();
        await loginPage.loginAsValidAdmin();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('div').filter({ hasText: /^resellers$/ }).nth(2).click();
    }

    async addReseller() {
        const data = generateUniqueResellerData();

        await this.page.getByRole('button', { name: 'Add Reseller' }).click();

        await this.page.getByRole('textbox', { name: 'Reseller Name*' }).fill(data.name);
        await this.page
            .getByRole('textbox', { name: 'Reseller Company Name*' })
            .fill(data.companyName);

        await this.page
            .locator('div:nth-child(3) > .h-full.flex > .relative > .inline-flex')
            .click();
        await this.page.getByRole('textbox', { name: 'Domain*' }).fill(data.domain);

        await this.page.getByRole('textbox', { name: 'Reseller Email*' }).fill(data.email);
        await this.page.getByRole('textbox', { name: 'Phone No.*' }).fill(data.phone);
        await this.page.getByRole('textbox', { name: 'Address*' }).fill(data.address);

        await this.page.locator('button[data-slot="trigger"]').nth(1).click();
        await this.page.locator('[role="listbox"] [role="option"]').first().click();

        await this.page.getByRole('textbox', { name: 'City*' }).fill(data.city);
        await this.page.getByRole('textbox', { name: 'Postal Code*' }).fill(data.postalCode);

        await this.page.locator('button[data-slot="trigger"]').nth(2).click();
        await this.page.locator('[role="listbox"] [role="option"]').first().click();

        await this.page.getByRole('textbox', { name: 'Primary Color*' }).click()
        await this.page.getByRole('textbox', { name: 'Primary Color*' }).fill('#00020');

        await this.page.getByRole('textbox', { name: 'Secondary Color*' }).click();
        await this.page.getByRole('textbox', { name: 'Secondary Color*' }).fill('#1');

        await this.page.getByRole('radiogroup', { name: 'Status' }).click();
        await this.page.getByRole('radio', { name: 'Inactive' }).check();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).check();

        await this.page.getByRole('textbox', { name: 'Note' }).fill(data.note);

        await this.page.getByRole('button', { name: 'Browse Files' }).first().click();
        await this.page.setInputFiles(
            'input[type="file"]',
            'C:/Users/SatyamTiwari/Downloads/Crest-Background.jpeg'
        );

        const firstFileInput = this.page.locator(
            'div:nth-child(2) > .flex.flex-col.h-full > .border-2 input[type="file"]'
        );
        await firstFileInput.setInputFiles(
            'C:/Users/SatyamTiwari/Downloads/Crest-Background.jpeg'
        );

        const secondFileInput = this.page.locator(
            '.w-full > .flex.flex-col.h-full > .border-2 input[type="file"]'
        );
        await secondFileInput.setInputFiles(
            'C:/Users/SatyamTiwari/Downloads/Charizard.png'
        );

        await this.page.getByRole('button', { name: 'Save & Continue' }).click()
       
        await expect(
            this.page.locator('text=Reseller saved successfully')
        ).toBeVisible({ timeout: 10000 });
    }

    async editFirstReseller() {
        const data = generateUniqueResellerData();

        await this.page.locator('button:has(path[d="M12 20h9"])').nth(0).click();

        await this.page
            .getByRole('textbox', { name: 'Reseller Name*' })
            .fill(`${data.name} Edited`);

        await this.page
            .getByRole('textbox', { name: 'Reseller Company Name*' })
            .fill(`${data.companyName} Edited`);

        await this.page
            .locator('div:nth-child(3) > .h-full.flex > .relative > .inline-flex')
            .click();
        await this.page
            .getByRole('textbox', { name: 'Domain*' })
            .fill(`${data.domain}-edited`);

        await this.page
            .getByRole('textbox', { name: 'Reseller Email*' })
            .fill(data.email);

        await this.page
            .getByRole('textbox', { name: 'Phone No.*' })
            .fill(data.phone);

        await this.page
            .getByRole('textbox', { name: 'Address*' })
            .fill(`${data.address} edited`);

        await this.page.locator('button[data-slot="trigger"]').nth(1).click();
        await this.page.locator('[role="listbox"] [role="option"]').nth(1).click();

        await this.page
            .getByRole('textbox', { name: 'City*' })
            .fill(data.city);

        await this.page
            .getByRole('textbox', { name: 'Postal Code*' })
            .fill('2002');

        await this.page.locator('button[data-slot="trigger"]').nth(2).click();
        await this.page.locator('[role="listbox"] [role="option"]').nth(1).click();
        
        await this.page.getByRole('textbox', { name: 'Primary Color*' }).click()
        await this.page.getByRole('textbox', { name: 'Primary Color*' }).fill('#00000');
    
        await this.page.getByRole('textbox', { name: 'Secondary Color*' }).click();
        await this.page.getByRole('textbox', { name: 'Secondary Color*' }).fill('#');

        await this.page.getByRole('radiogroup', { name: 'Status' }).click();
        await this.page.getByRole('radio', { name: 'Inactive' }).check();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).check();

        await this.page
            .getByRole('textbox', { name: 'Note' })
            .fill(`${data.note} +1`);

        const removeButton = this.page.getByRole('button', { name: 'Remove' }).nth(0);
        if (await removeButton.count() > 0) {
            await removeButton.click();
        }

        await this.page
            .getByRole('button', { name: 'Browse Files' })
            .first()
            .click();
        await this.page.setInputFiles(
            'input[type="file"]',
            'C:/Users/SatyamTiwari/Downloads/Crest-Background.jpeg'
        );

        const removeButton1 = this.page.getByRole('button', { name: 'Remove' }).nth(1);
        if (await removeButton1.count() > 0) {
            await removeButton1.click();
        }
        const firstFileInput = this.page.locator(
            'div:nth-child(2) > .flex.flex-col.h-full > .border-2 input[type="file"]'
        );
        await firstFileInput.setInputFiles(
            'C:/Users/SatyamTiwari/Downloads/Crest-Background.jpeg'
        );

        const removeButton2 = this.page.getByRole('button', { name: 'Remove' }).nth(2);
        if (await removeButton2.count() > 0) {
            await removeButton2.click();
        };

        const secondFileInput = this.page.locator(
            '.w-full > .flex.flex-col.h-full > .border-2 input[type="file"]'
        );
        await secondFileInput.setInputFiles(
            'C:/Users/SatyamTiwari/Downloads/Charizard.png'
        );

        await this.page.getByRole('button', { name: 'Save & Continue' }).click()

        await expect(
            this.page.locator('text=Reseller saved successfully')
        ).toBeVisible({ timeout: 10000 });
    }
}