import { expect } from '@playwright/test';
import { test } from '../fixtures/ui-fixtures';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Executive Application UI Authentication', () => {
  test('should log in with valid credentials and validate dashboard state', async ({ page, uiCredentials }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectVisible();

    await loginPage.login(uiCredentials.username, uiCredentials.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectLoaded();

    const authState = await page.evaluate(() => sessionStorage.getItem('token'));
    expect(authState).toBeTruthy();
    await expect(page.getByText(/Entebus guest|Guest/i)).toBeVisible();
  });
});
