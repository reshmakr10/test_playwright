export const log = (message: string): void => {
  const prefix = '[ui-tests]';
  // Keep logs minimal and visible in Playwright traces
  // eslint-disable-next-line no-console
  console.log(`${prefix} ${message}`);
};
