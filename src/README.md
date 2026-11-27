# TypeScript Basics (Day 6)

Practice files covering core TypeScript concepts and safe handling of optional nested properties.

## Files

- `src/ts-basics/aliases.ts` — Reusable `type` aliases
- `src/ts-basics/functions.ts` — Parameter and return type annotations, default/optional parameters
- `src/ts-basics/objects.ts` — Typed object shapes, optional properties, and `readonly` fields
- `src/ts-basics/optionalChaining.ts` — Safe property access (`?.`)
- `src/ts-basics/tuples.ts` — Fixed-length, typed arrays
- `src/ts-basics/unions.ts` — Union types and type narrowing
- `src/profile-validator.ts` — `UserProfile` type alias and `isNotified()` helper for optional nested fields

## Run the exercises

Run any file directly from the project root using `npx tsx`:

| File | Command | Expected Output |
| :--- | :--- | :--- |
| `src/ts-basics/aliases.ts` | `npx tsx src/ts-basics/aliases.ts` | `{ id: 1, name: 'Amina' }` |
| `src/ts-basics/functions.ts` | `npx tsx src/ts-basics/functions.ts` | `The area is: 50`<br>`The tax is: 20` |
| `src/ts-basics/objects.ts` | `npx tsx src/ts-basics/objects.ts` | `undefined`<br>`stephen`<br>`STEPHEN 1` |
| `src/ts-basics/optionalChaining.ts` | `npx tsx src/ts-basics/optionalChaining.ts` | `undefined` |
| `src/ts-basics/tuples.ts` | `npx tsx src/ts-basics/tuples.ts` | `Stephen`<br>`28`<br>`Stephen`<br>`28`<br>`Stephen 28` |
| `src/ts-basics/unions.ts` | `npx tsx src/ts-basics/unions.ts` | `ABC`<br>`3.14` |
| `src/profile-validator.ts` | `npx tsx src/profile-validator.ts` | `stephen no settings: false`<br>`grace settings, no notifications: false`<br>`daniel notifications on: true` |

### Type-check all files

```bash
npx tsc --noEmit