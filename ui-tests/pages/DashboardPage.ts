import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeHeading: Locator;
  readonly profileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeHeading = page.getByRole('heading', { name: /welcome back/i }).first();
    this.profileButton = page.getByRole('button', { name: /Entebus guest|guest|profile|account/i }).first();
  }

  async expectLoaded() {
    await expect(this.welcomeHeading).toBeVisible({ timeout: 20000 });
    await expect(this.page).toHaveURL(/dashboard|\/$/, { timeout: 20000 });
  }

  async clickSectionCard(sectionName: string) {
    const card = this.page.locator('a.dashboard-card', { hasText: sectionName }).first();
    await expect(card).toBeVisible({ timeout: 15000 });
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      card.click()
    ]);
  }

  async openProfileMenu() {
    await expect(this.profileButton).toBeVisible({ timeout: 15000 });
    await this.profileButton.click();
  }

  async logout() {
    await this.openProfileMenu();

    const logoutMenuItem = this.page.getByRole('menuitem', { name: /logout/i }).first();
    const logoutButton = this.page.getByRole('button', { name: /logout/i }).first();
    const logoutLink = this.page.getByRole('link', { name: /logout/i }).first();

    if (await logoutMenuItem.count() > 0) {
      await logoutMenuItem.click();
    } else if (await logoutButton.count() > 0) {
      await logoutButton.click();
    } else if (await logoutLink.count() > 0) {
      await logoutLink.click();
    } else {
      await this.page.getByText(/logout/i).first().click();
    }

    const confirmDialog = this.page.getByRole('dialog', { name: /confirm logout/i }).first();
    if (await confirmDialog.count() > 0) {
      const confirmLogoutButton = confirmDialog.getByRole('button', { name: /^Logout$/i }).first();
      await expect(confirmLogoutButton).toBeVisible({ timeout: 15000 });
      await Promise.all([
        this.page.waitForLoadState('domcontentloaded'),
        confirmLogoutButton.click()
      ]);
      return;
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectSectionLoaded(expectedHeading: RegExp, expectedUrl: RegExp) {
    await expect(this.page).toHaveURL(expectedUrl, { timeout: 20000 });
    await expect(this.page.getByRole('heading', { name: expectedHeading })).toBeVisible({ timeout: 20000 });
  }
}
