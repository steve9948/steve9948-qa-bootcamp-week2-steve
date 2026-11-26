# Toolshop Test Suite

Playwright UI and API tests for [practicesoftwaretesting.com](https://practicesoftwaretesting.com) and its API, plus one Cucumber-js scenario and Day 6 TypeScript exercises.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS) and npm
- [Git](https://git-scm.com/)
- Internet access (tests run against the public Toolshop website and API)

## Setup and run

1. **Clone and install:**
   ```bash
   git clone https://github.com/steve9948/steve9948-qa-bootcamp-week2-steve.git
   cd steve9948-qa-bootcamp-week2-steve
   npm install
   npx playwright install chromium
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   The defaults in `.env.example` work out of the box:
   - `TOOLSHOP_URL`: base URL of the Toolshop website (used by UI tests)
   - `TOOLSHOP_API_URL`: base URL of the Toolshop API

   > **Warning:** Never commit `.env`. It is listed in `.gitignore` so local settings and secrets stay out of version control.

3. **Verify API connectivity:**
   ```bash
   npm run check
   ```
   Runs `scripts/check.ts` to confirm Node version, `.env` loading, and a `200` response from `/products` (`PASS`).

4. **Run the tests:**
   ```bash
   npm test
   ```

## Other ways to run

```bash
npx playwright test tests/cart-api.spec.ts        # run one test file
npx playwright test -g "pliers"                   # run tests matching a name
npx playwright test --headed                      # watch the browser
npx playwright test --trace on                    # record execution traces
npx playwright show-trace <path-to>/trace.zip     # inspect a trace
npx playwright show-report                        # open the HTML report
npm run test:cucumber                             # run the automated Cucumber scenario
npx cucumber-js --dry-run                         # verify Cucumber step matching
```

## What's in the suite (7 Playwright tests)

| Type | File | Test |
| --- | --- | --- |
| UI | `tests/home.spec.ts` | Home page has the expected title |
| UI | `tests/search.spec.ts` | Search `"pliers"` returns only matching pliers products |
| UI | `tests/login.spec.ts` | Invalid login shows an error message |
| UI | `tests/add-to-cart.spec.ts` | Add a product to the cart using `pages/product.page.ts` |
| API | `tests/products-api.spec.ts` | `GET /products` returns `200` and a product list |
| API | `tests/cart-api.spec.ts` | Create a cart, add a product, and verify response fields |
| API | `tests/cart-api.spec.ts` | Non-existent cart ID returns `404` |

## Cucumber scenario

`npm run test:cucumber` runs one scenario from `features/cart.feature`: **"A shopper adds a product and sees it in the cart"** (tagged `@automated`). Its step definitions live in `features/step-definitions/cart.steps.ts` and reuse the page objects in `pages/`.

The other two scenarios in `features/cart.feature` do not have the `@automated` tag yet, so Cucumber skips them via `tags: '@automated'` in `cucumber.js`. `npm test` runs only the Playwright suite.

## TypeScript exercises

Day 6 TypeScript exercises (`src/ts-basics/*.ts` and `src/profile-validator.ts`) can be run directly with `npx tsx`:

```bash
npx tsx src/profile-validator.ts
npx tsc --noEmit
```

See [src/README.md](src/README.md) for the full table of exercise files, commands, and expected outputs.

## Project structure

```text
tests/                      Playwright UI and API tests
pages/                      Page objects (product.page.ts, cart.page.ts)
features/                   Gherkin feature file (cart.feature)
features/step-definitions/  Cucumber step definitions (cart.steps.ts)
features/support/           Cucumber Playwright World and hooks (world.ts, hooks.ts)
src/                        Day 6 TypeScript basics and profile validator exercises
scripts/                    Environment & API health check script (check.ts)
cucumber.js                 Cucumber config (runs @automated scenarios with tsx/cjs)
playwright.config.ts        Playwright test runner configuration
.env.example                Environment variable template
```

## Test data and cleanup

- Tests create their own data and run independently without sharing state.
- Any cart created during an API test is deleted afterwards (`test.afterEach`), even if an assertion fails.
- Each Cucumber scenario launches a fresh Playwright `BrowserContext` in `features/support/hooks.ts`.

## Troubleshooting

- **Browser not found:** run `npx playwright install chromium`.
- **Tests fail with an undefined URL:** `.env` is missing. Run `cp .env.example .env`.
- **Timeouts or `5xx` errors:** the public Toolshop site or API may be temporarily slow or down; rerun later.