// pages/ResellerPage.js
import { expect } from '@playwright/test';
import { LoginPage } from './loginpage';
import { generateUniqueResellerData } from '../utils/testdata';

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

        await this.page.getByRole('button', { name: 'Select State State*' }).click();
        await this.page
            .getByLabel('New South Wales', { exact: true })
            .getByText('New South Wales')
            .click();

        await this.page.getByRole('textbox', { name: 'City*' }).fill(data.city);
        await this.page.getByRole('textbox', { name: 'Postal Code*' }).fill(data.postalCode);

        await this.page
            .getByRole('button', { name: 'Select Font Style Font Style' })
            .click();
        await this.page.getByLabel('Arial', { exact: true }).getByText('Arial').click();

        await this.page.locator('.w-5.h-5.cursor-pointer').first().click();
        await this.page.locator('.card.overflow-y-auto').click();
        await this.page
            .locator('div:nth-child(12) > .group > .h-full.flex > .relative > .inline-flex > .w-5')
            .click();
        await this.page.locator('.card.overflow-y-auto').click();
        await this.page
            .locator('div:nth-child(12) > .group > .h-full.flex > .relative > .inline-flex > .w-5')
            .click();

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
    }

    async editFirstReseller() {
        const data = generateUniqueResellerData();

        // Open first reseller row in edit mode (same selector you already use)
        await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();

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

        await this.page
            .getByRole('button', { name: 'Select State State*' })
            .click();
        await this.page
            .getByLabel('New South Wales', { exact: true })
            .getByText('New South Wales')
            .click();

        await this.page
            .getByRole('textbox', { name: 'City*' })
            .fill(data.city);

        await this.page
            .getByRole('textbox', { name: 'Postal Code*' })
            .fill('2002');

        await this.page
            .getByRole('button', { name: 'Select Font Style Font Style' })
            .click();
        await this.page
            .getByLabel('Arial', { exact: true })
            .getByText('Arial')
            .click();

        await this.page.locator('.w-5.h-5.cursor-pointer').first().click();
        await this.page.locator('.card.overflow-y-auto').click();
        await this.page
            .locator(
                'div:nth-child(12) > .group > .h-full.flex > .relative > .inline-flex > .w-5'
            )
            .click();
        await this.page.locator('.card.overflow-y-auto').click();
        await this.page
            .locator(
                'div:nth-child(12) > .group > .h-full.flex > .relative > .inline-flex > .w-5'
            )
            .click();

        await this.page.getByRole('radiogroup', { name: 'Status' }).click();
        await this.page.getByRole('radio', { name: 'Inactive' }).check();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).check();

        await this.page
            .getByRole('textbox', { name: 'Note' })
            .fill(`${data.note} +1`);

        await this.page
            .getByRole('button', { name: 'Browse Files' })
            .first()
            .click();
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
    }
}