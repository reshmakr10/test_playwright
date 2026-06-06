import { expect } from '@playwright/test';
import { test } from '../fixtures/ui-fixtures';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Executive Application UI Smoke', () => {
  test('should navigate from dashboard to Account management after login [smoke]', async ({ page, uiCredentials }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(uiCredentials.username, uiCredentials.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectLoaded();

    await dashboardPage.clickSectionCard('Account');
    await dashboardPage.expectSectionLoaded(/Account Management/i, /executive-account/);
  });
});
