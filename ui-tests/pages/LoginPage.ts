import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.getByRole('button', { name: /^Sign in$/i });
    this.rememberMeCheckbox = page.locator('#remember-me');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'load' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.expectVisible();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await Promise.all([
      this.page.waitForURL('**/dashboard', { timeout: 30000 }),
      this.submitButton.click()
    ]);
    await expect(this.page.getByRole('heading', { name: /welcome back/i })).toBeVisible({ timeout: 20000 });
  }
}
