# QA Bootcamp Week 2: Toolshop test suite

Playwright tests (TypeScript) for the Toolshop site and API.

## Run the tests

1. Install: `npm install`, then `npx playwright install chromium`
2. Copy `.env.example` to `.env`: `cp .env.example .env`
3. Run the tests: `npm test`

## What the suite covers

- **UI tests** (`tests/`): home page title, product search, invalid login, and adding a product to the cart through page objects in `pages/`.
- **API tests** (`tests/`): the products list, plus the cart (create a cart and add a product, and an unknown cart returns 404). Each test that creates a cart deletes it.
- `features/cart.feature` is a plain-language description of the cart flow. It is not run by `npm test`.

## Useful commands

- Run one file: `npx playwright test tests/login.spec.ts`
- Watch the browser: `npx playwright test --headed`
- Record a trace: `npx playwright test --trace on`, then `npx playwright show-trace <path-to-trace.zip>`