import { test } from '@playwright/test';
import { GuidePage } from '../pages/guidepage';
import { generateUniqueguideData } from '../util/testdata';


test.describe('Guides module', () => {
    test('To verify guide creation successfully', async ({ page }) => {
        const guidePage = new GuidePage(page);
        await guidePage.loginAndOpenList();
        await guidePage.createguide();
    });

    test('To verify guide edit successfully', async ({ page }) => {
        const guidePage = new GuidePage(page);
        await guidePage.loginAndOpenList();
        await guidePage.editguide();
    });

    test('To verify guide view successfully', async ({ page }) => {
        const guidePage = new GuidePage(page);
        await guidePage.loginAndOpenList();
        await guidePage.viewguide();
    });

    test('To verify guide delete successfully', async ({ page }) => {
        const guidePage = new GuidePage(page);
        await guidePage.loginAndOpenList();
        await guidePage.deleteguide();
    });
});


