import { expect as baseExpect, test as base } from '@playwright/test';

const username = process.env.UI_USERNAME || 'guest';
const password = process.env.UI_PASSWORD || 'password';
const baseURL = process.env.UI_BASE_URL || 'https://dev-executive.entebus.com';

export const test = base.extend({
  uiBaseURL: [baseURL, { option: true }],
  uiCredentials: [{ username, password }, { option: true }]
});

export const expect = baseExpect;
