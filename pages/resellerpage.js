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

    async openFirstContactRow() {
        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .nth(0)
            .click();
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

    async addContactReseller() {
        const data = generateUniqueResellerData();

        await this.page.locator('button:has(path[d="M12 20h9"])').nth(0).click();
        await this.page.getByRole('tab', { name: 'Contacts' }).click();
        await this.page.getByRole('button', { name: 'Add Contact' }).click();
        await this.page.getByRole('textbox', { name: 'First Name*' }).click();
        await this.page.getByRole('textbox', { name: 'First Name*' }).fill(data.name);
        await this.page.getByRole('textbox', { name: 'Last Name*' }).click();
        await this.page.getByRole('textbox', { name: 'Last Name*' }).fill(data.name);
        await this.page.getByRole('textbox', { name: 'Email*' }).click();
        await this.page.getByRole('textbox', { name: 'Email*' }).fill(data.email);
        await this.page.getByRole('textbox', { name: 'Phone Number*' }).click();
        await this.page.getByRole('textbox', { name: 'Phone Number*' }).fill(data.phone);
        await this.page.getByRole('radio', { name: 'Inactive' }).click();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).click();
        await this.page.getByRole('checkbox', { name: 'Set as primary' }).click();
        await this.page.getByRole('button', { name: 'Save & Continue' }).click();
        await expect(this.page.getByText('Contact saved successfully')).toBeVisible({timeout: 5000});
    }

    async editContactReseller() {
        const data = generateUniqueResellerData();

        await this.page.locator('button:has(path[d="M12 20h9"])').nth(0).click();
        await this.page.getByRole('tab', { name: 'Contacts' }).click();
        await this.openFirstContactRow();
        await this.page.getByRole('textbox', { name: 'First Name*' }).click();
        await this.page.getByRole('textbox', { name: 'First Name*' }).fill(`${data.name} Edited`);
        await this.page.getByRole('textbox', { name: 'Last Name*' }).click();
        await this.page.getByRole('textbox', { name: 'Last Name*' }).fill(`${data.name} Edited`);
        await this.page.getByRole('textbox', { name: 'Email*' }).click();
        await this.page.getByRole('textbox', { name: 'Email*' }).fill(data.email);
        await this.page.getByRole('textbox', { name: 'Phone Number*' }).click();
        await this.page.getByRole('textbox', { name: 'Phone Number*' }).fill(data.phone);
        await this.page.getByRole('radio', { name: 'Inactive' }).click();
        await this.page.getByRole('radio', { name: 'Active', exact: true }).click();
        await this.page.getByRole('checkbox', { name: 'Set as primary' }).click();
        await this.page.getByRole('button', { name: 'Save & Continue' }).click();
        await expect(this.page.getByText('Contact saved successfully')).toBeVisible({ timeout: 5000 });
    }

    async addAttachmentReseller() {
        const data = generateUniqueResellerData();

        await this.page.locator('button:has(path[d="M12 20h9"])').nth(0).click();
        await this.page.getByRole('tab', { name: 'Attachments' }).click();
        await this.page.getByRole('button', { name: 'Add Attachment' }).click();
        await this.page.getByRole('textbox', { name: 'File Name*' }).click();
        await this.page.getByRole('textbox', { name: 'File Name*' }).fill(data.name);
        await this.page.setInputFiles(
            'input[type="file"]',
            'C:/Users/SatyamTiwari/Downloads/chota chari.jpeg'
        );
        await this.page.getByRole('button', { name: 'Save & Continue' }).click();
        await expect(this.page.getByText('Attachment saved successfully')).toBeVisible({ timeout: 5000 });
    }

    async downloadAttachmentReseller() {
        const data = generateUniqueResellerData();

        await this.page.locator('button:has(path[d="M12 20h9"])').nth(0).click();
        await this.page.getByRole('tab', { name: 'Attachments' }).click();
        await this.openFirstContactRow();

    }

    async editAttachmentReseller() {
        const data = generateUniqueResellerData();

        await this.page.locator('button:has(path[d="M12 20h9"])').nth(0).click();
        await this.page.getByRole('tab', { name: 'Attachments' }).click();
        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .nth(1)
            .click();
        await this.page.getByRole('textbox').nth(0).click();
        await this.page.getByRole('textbox', { name: 'File Name*' }).fill(data.name);
        await this.page.setInputFiles(
            'input[type="file"]',
            'C:/Users/SatyamTiwari/Downloads/chota chari.jpeg'
        );
        await this.page.getByRole('button', { name: 'Save & Continue' }).click();
        await expect(this.page.getByText('Attachment saved successfully')).toBeVisible({ timeout: 5000 });
    }

    async deleteFirstAttachment() {
        await this.page.locator('button:has(path[d="M12 20h9"])').nth(0).click();
        await this.page.getByRole('tab', { name: 'Attachments' }).click();
        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .nth(2)
            .click();
        await this.page.getByRole('button', { name: 'Yes, Delete It' }).click();

        await expect(this.page.getByText('Attachment deleted successfully')).toBeVisible({ timeout: 5000 });

    }

    async deleteFirstReseller() {
        await this.page
            .getByRole('row', { name: '1' })
            .getByRole('button')
            .nth(1)
            .click();
        await this.page.getByRole('button', { name: 'Yes, Delete It' }).click();

        await expect(this.page.getByText('Reseller deleted successfully')).toBeVisible({ timeout: 5000 }); 

    }
}