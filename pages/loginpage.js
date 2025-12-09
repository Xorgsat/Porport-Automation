// pages/LoginPage.js
import { expect } from '@playwright/test';
import credentials from '../data/credentials.json';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email address*' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async loginAsValidAdmin() {
    const { email, password } = credentials.validAdmin;
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async loginWith(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async assertInvalidLoginMessage() {
    await expect(this.page.getByText('Invalid email or password')).toBeVisible();
  }
}
