// test/settings.spec.js
import { test } from '@playwright/test';
import { SettingsPage } from '../pages/settingspage';

test.describe('Settings - Tax & Modules', () => {
    test('To verify tax creation successfully', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.createTaxRule();
    });

    test('To verify tax updation successfully', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.updateFirstTaxRule();
    });

    test('To verify module settings functionality', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.createModulePrice();
    });

    test('Module deletion functionality', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.deleteFirstModulePrice();
    });
});