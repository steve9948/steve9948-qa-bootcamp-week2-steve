## TypeScript basics (Day 6)


## What changed
- Added `src/ts-basics/` with one file per topic from the Mosh tutorial: tuples, functions, objects, type aliases, union types and optional chaining.
- Added `src/profile-validator.ts`: a `UserProfile` type alias and an `isNotified()` function.
- Added a README section describing these files and how to run them.

## Why
- To practise TypeScript, which this week's Playwright tests are written in.
- To practise handling missing data safely: API responses often leave out optional fields, and reading them carelessly crashes at runtime.
- After an AI review, I made `notifications` optional inside `settings` and added a test user with `settings` present but `notifications` missing, so all three required cases are covered.

## How to check
1. Check out the branch: `git checkout week2-day6`
2. Run `npx tsx src/profile-validator.ts`. Expected output, one line per user:
   - `stephen no settings: false`
   - `grace settings, no notifications: false`
   - `daniel notifications on: true`
3. Run `npx tsc --noEmit`. It should print no type errors.
4. Run any file in `src/ts-basics/` with `npx tsx`, for example `npx tsx src/ts-basics/tuples.ts`.