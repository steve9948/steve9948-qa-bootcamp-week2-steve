# QA Bootcamp Week 2: Toolshop test suite

Playwright and Cucumber-js tests (TypeScript) for the Toolshop site and API.

## Run the tests

1. Install: `npm install`, then `npx playwright install chromium`
2. Copy `.env.example` to `.env`: `cp .env.example .env`
3. Run the Playwright tests: `npm test`
4. Run the Cucumber scenario: `npm run test:cucumber`

## What the suite covers

- **UI tests** (`tests/`): home page title, product search, invalid login, and adding a product to the cart through page objects in `pages/`.
- **API tests** (`tests/`): the products list, plus the cart (create a cart and add a product, and an unknown cart returns 404). Each test that creates a cart deletes it.
- **Cucumber-js (one scenario)** (`features/cart.feature`): the first scenario, *"A shopper adds a product and sees it in the cart"* (tagged `@automated`), is connected to step definitions in `features/step-definitions/cart.steps.ts` and reuses the page objects in `pages/`. It runs separately via `npm run test:cucumber` (configured in `cucumber.js`). The other two scenarios in `features/cart.feature` are unautomated.

## Useful commands

- Run one Playwright file: `npx playwright test tests/login.spec.ts`
- Watch the browser: `npx playwright test --headed`
- Record a trace: `npx playwright test --trace on`, then `npx playwright show-trace <path-to-trace.zip>`
- Run Cucumber dry-run (check step matching): `npx cucumber-js --dry-run`