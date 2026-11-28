# QA Bootcamp — Week 2 Day 10 Capstone & Flakiness Drill

Playwright test suite and diagnostic notes covering selected capstone scenarios (**C3** UI and **C4** API), trace-based failure classification, and the delayed-save flakiness drill.

## Repository Structure

```text
├── pages/
│   └── home.page.ts
├── tests/
│   ├── capstone-cart-api.spec.ts
│   ├── sort-by-price.spec.ts
│   └── drill/
│       ├── index.html
│       ├── flaky.spec.ts
│       └── fixed.spec.ts
└── README.md
```

## Capstone Cases Selected

- **C3 — Sort by price (UI)** (`tests/sort-by-price.spec.ts`, `pages/home.page.ts`): Interacts with the storefront sort control and verifies product price ordering on the page.
- **C4 — Add to a cart (API)** (`tests/capstone-cart-api.spec.ts`):
  1. Fetches a valid `productId` from `GET /products` via `getFirstProductId(request)` and verifies a `200` response with a non-empty `data` array.
  2. Creates a new cart via `POST /carts` (`200`/`201`) and stores `cartId`.
  3. Adds `{ product_id: productId, quantity: 2 }` via `POST /carts/${cartId}` and asserts status `200`.
  4. Reads back `GET /carts/${cartId}` (`200`) and confirms `cart_items` includes `productId` with `quantity === 2`.
  5. Cleans up in `test.afterEach` using `DELETE /carts/${cartId}` (`200`/`204`) and resets `cartId = undefined`.

## Running Tests

Run the capstone tests:

```bash
npx playwright test tests/sort-by-price.spec.ts tests/capstone-cart-api.spec.ts --reporter=list
```

Capture a trace on a failing run and open it in Trace Viewer:

```bash
npx playwright test tests/capstone-cart-api.spec.ts --trace=on --reporter=list
npx playwright show-trace test-results/capstone-cart-api-*/trace.zip
```

Restore modified test files after an intentional failure run:

```bash
git checkout -- tests/capstone-cart-api.spec.ts tests/sort-by-price.spec.ts
```

## Flakiness Drill (`tests/drill/`)

- **Target (`tests/drill/index.html`)**: Clicking `#save` sets `#status` text to `"Saved"` after a random delay of `0` to `1000ms`.
- **Unfixed (`tests/drill/flaky.spec.ts`)**: Opens `index.html` via `pathToFileURL` and `__dirname`, clicks `Save`, waits a fixed duration, reads `#status` once with `.textContent()`, and checks with a non-retrying assertion.
- **Fixed (`tests/drill/fixed.spec.ts`)**: Replaces the fixed wait and one-shot check with Playwright's retrying condition assertion on `#status`.

Run 20 iterations:

```bash
npx playwright test tests/drill/flaky.spec.ts --repeat-each=20 --reporter=list
npx playwright test tests/drill/fixed.spec.ts --repeat-each=20 --reporter=list
```

### Drill Results (`--repeat-each=20`)

- **Before fix (`flaky.spec.ts`)**: `9 passed / 11 failed` (failures reported `Expected: "Saved"`, `Received: ""` at `tests/drill/flaky.spec.ts:15:22`).
- **After fix (`fixed.spec.ts`)**: `20 passed / 0 failed`.