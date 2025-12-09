// test/reseller.spec.js
import { test } from '@playwright/test';
import { ResellerPage } from '../pages/resellerpage';

test('Add reseller', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.addReseller();
});

test('Reseller Edit Flow', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.editFirstReseller();
});
