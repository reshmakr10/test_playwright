# End-to-End QA Automation Framework

This repository contains a hybrid automation framework for UI and API testing using Playwright, TypeScript, Pytest, and Python.

## Structure

- `ui-tests/`: Playwright UI tests with page objects, fixtures, config, and utilities.
- `api-tests/`: Python API tests with HTTP client abstractions, models, fixtures, and validators.
- `docker/`: Docker support for running UI and API test environments.
- `reports/`: Generated test artifacts and HTML reports.
- `logs/`: Execution logs and troubleshooting artifacts.
- `.github/workflows/`: CI configuration for GitHub Actions.

## Getting Started

1. Copy `.env.example` to `.env` and update values if needed.
2. Install UI dependencies:
   - `npm install`
   - `npm run prepare`
3. Install API dependencies:
   - `python3 -m venv .venv`
   - `.venv/bin/pip install --upgrade pip`
   - `.venv/bin/pip install -r api-tests/requirements.txt`

## Run tests

- UI tests: `npm run ui:test`
- UI smoke tests: `npm run ui:smoke`
- API tests: `npm run api:test`
- API smoke tests: `npm run api:smoke`
- Full suite: `npm test`

## Local environment variables

- `UI_BASE_URL` - Application under test URL.
- `UI_USERNAME` - Login username for UI tests.
- `UI_PASSWORD` - Login password for UI tests.
- `API_BASE_URL` - API base URL.
- `API_USERNAME` - Login username for API tests.
- `API_PASSWORD` - Login password for API tests.

## CI

GitHub Actions run both UI and API tests, collect HTML reports, and upload artifacts for review.
