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

    test('To verify discount rule creation', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.createDiscountRule();
    });

    test('To verify discount updation successfully', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.updateFirstDiscountRule();
    });

    test('To verify template creation', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.createTemplate();
    });

    test('To verify template updation successfully', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.updateFirstTemplate();
    });

    test('To verify system wide settings', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.SystemWide();
    });

    test('To verify module settings functionality', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.createModulePrice();
    });

    test('To verify module price updation functionality', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.updateFirstModulePrice();
    });

    test('Module deletion functionality', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.deleteFirstModulePrice();
    });
});