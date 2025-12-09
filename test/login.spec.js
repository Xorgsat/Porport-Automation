// test/login.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import credentials from '../data/credentials.json';

test('Login successfully with valid email and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAsValidAdmin();
});

test('Wrong email or password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  const { email, password } = credentials.invalidAdmin;
  await loginPage.loginWith(email, password);
  await loginPage.assertInvalidLoginMessage();
});
