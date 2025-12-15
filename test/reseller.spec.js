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

test('Reseller contact Add Flow', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.addContactReseller();
});

test('Reseller contact Edit Flow', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.editContactReseller();
});

test('Reseller Attachment Flow', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.addAttachmentReseller();
});

test('Reseller Download Attachment Flow', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.downloadAttachmentReseller();
});

test('Reseller Edit Attachment Flow', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.editAttachmentReseller();
});

test('Reseller Delete Attachment Flow', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.deleteFirstAttachment();
});

test('Reseller Delete Flow', async ({ page }) => {
    const resellerPage = new ResellerPage(page);

    await resellerPage.loginAndOpenList();
    await resellerPage.deleteFirstReseller();
});
