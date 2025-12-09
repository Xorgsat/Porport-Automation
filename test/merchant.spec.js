// test/merchant.spec.js
import { test } from '@playwright/test';
import { MerchantPage } from '../pages/merchantpage';
import { generateUniqueMerchantData } from '../util/testdata';

test('Merchant creation flow', async ({ page }) => {
    const merchantPage = new MerchantPage(page);
    const testData = generateUniqueMerchantData();

    await merchantPage.loginAndOpenList();
    await merchantPage.createMerchant(testData);
});

test('Merchant edit flow', async ({ page }) => {
    const merchantPage = new MerchantPage(page);
    const testData = generateUniqueMerchantData();

    await merchantPage.loginAndOpenList();
    await merchantPage.editFirstMerchant(testData);
});

test('Product addition flow', async ({ page }) => {
    const merchantPage = new MerchantPage(page);

    await merchantPage.loginAndOpenList();
    await merchantPage.addProductsToFirstMerchant();
});

test('Merchant Contact Add Successfully', async ({ page }) => {
    const merchantPage = new MerchantPage(page);

    await merchantPage.loginAndOpenList();
    await merchantPage.addContactToFirstMerchant();
});

test('Store Creation Successfully', async ({ page }) => {
    const merchantPage = new MerchantPage(page);

    await merchantPage.loginAndOpenList();
    await merchantPage.createStoreForFirstMerchant();
});

test('Merchant Status Change', async ({ page }) => {
    const merchantPage = new MerchantPage(page);

    await merchantPage.loginAndOpenList();
    await merchantPage.changeStatusOfFirstMerchantToInactive();
});

