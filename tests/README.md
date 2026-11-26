What changed
Added two Playwright API tests for the cart (create and add a product, and an unknown cart returning 404) with cleanup, a trace-viewer failure investigation, one combined suite, and a three-step README.

Why
To automate two Monday Postman requests with cleanup so tests don't leave carts behind or depend on each other, and so someone new can run the whole suite from a fresh clone.

How to check
1. Clone the repo and check out week2-day9.
2. Follow the README: npm install, npx playwright install chromium, copy .env.example to .env.
3. Run npm test. All tests should pass.

Please check
That the cart cleanup runs even when a check fails.