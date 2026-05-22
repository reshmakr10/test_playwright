import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeHeading = page.getByRole('heading', { name: /welcome back/i }).first();
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.welcomeHeading).toBeVisible({ timeout: 20000 });
  }

  async clickSectionCard(sectionName: string) {
    const card = this.page.locator('a.dashboard-card', { hasText: sectionName }).first();
    await expect(card).toBeVisible({ timeout: 15000 });
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      card.click()
    ]);
  }

  async expectSectionLoaded(expectedHeading: RegExp, expectedUrl: RegExp) {
    await expect(this.page).toHaveURL(expectedUrl, { timeout: 20000 });
    await expect(this.page.getByRole('heading', { name: expectedHeading })).toBeVisible({ timeout: 20000 });
  }
}
