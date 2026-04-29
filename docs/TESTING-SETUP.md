# Testing Setup Documentation

## Scope

This document explains exactly what was implemented for the roadmap item:

- `Add unit/integration tests`

It covers every step from installing dependencies to running tests, including commands and why each change was made.

---

## 1) Installed Testing Dependencies

### Command used

```bash
npm install -D vitest jsdom
```

### Why

- `vitest`: fast modern test runner that integrates well with Vite projects.
- `jsdom`: browser-like DOM environment required for frontend-oriented tests and `localStorage` behavior.

### Result

- `package.json` updated with:
  - `vitest`
  - `jsdom`
- `package-lock.json` updated automatically.

---

## 2) Added Test Scripts in `package.json`

### Changes made

- Added:
  - `test`: `vitest run`
  - `test:watch`: `vitest`

### Why

- `npm run test` runs full suite once (ideal for CI and quick verification).
- `npm run test:watch` keeps test runner active during development.

---

## 3) Configured Vitest in `vite.config.js`

### Changes made

Added `test` section:

- `environment: 'jsdom'`
- `clearMocks: true`

### Why

- `jsdom` provides browser-like APIs (`window`, `document`, `localStorage`) needed by service and slice tests.
- `clearMocks` avoids test pollution by resetting mocks between tests.

---

## 4) Implemented Unit Tests

## 4.1) `src/utils/formatEgp.test.js`

### What is tested

- Number formatting with separators (`6800 -> 6,800`)
- Safe behavior for undefined input (`undefined -> 0`)
- Currency suffix formatting (`2,450 EGP`)

### Why this matters

- This utility is used in pricing display; wrong formatting directly affects UX consistency.

## 4.2) `src/services/cartService.test.js`

### What is tested

- Returns empty array when cart key does not exist.
- Persists items to `localStorage` and reads them back.
- Gracefully handles malformed JSON stored in `localStorage`.
- Does not throw when `localStorage.setItem` fails (simulated failure).

### Why this matters

- Cart persistence is critical business behavior.
- Defensive tests validate edge cases and failure safety in storage operations.

---

## 5) Implemented Integration Tests

## `src/store/slices/cartSlice.test.js`

### What is tested

- `addItem` integration flow:
  - adds new item
  - increments quantity when item already exists
- `updateQuantity` removes item when quantity becomes `0`
- selectors:
  - `selectCartCount`
  - `selectCartTotal`
- action flow:
  - `removeItem`
  - `clearCart`

### Why this is integration-level

- Tests reducer actions and selectors together as one behavior unit for the cart domain.
- Verifies business logic in a store-like flow rather than isolated single helpers only.

---

## 6) Updated README Roadmap and Scripts

### Changes made

- Added test commands in `Available Scripts`:
  - `npm run test`
  - `npm run test:watch`
- Marked roadmap item as complete:
  - `[x] Add unit/integration tests`

### Why

- Keeps project documentation aligned with current engineering status.

---

## 7) Ran the Test Suite

### Command used

```bash
npm run test
```

### Execution summary

- Test files passed: `3`
- Tests passed: `11`
- Status: all green

### Notes

- During one test (`cartService` failure simulation), expected console output appears:
  - `Error saving cart`
- This is normal and confirms error path behavior is being exercised.

---

## 8) Files Added/Updated for Testing Work

- `package.json` (scripts + devDependencies)
- `package-lock.json` (dependency lock updates)
- `vite.config.js` (Vitest config)
- `src/utils/formatEgp.test.js` (unit tests)
- `src/services/cartService.test.js` (unit tests)
- `src/store/slices/cartSlice.test.js` (integration tests)
- `README.md` (roadmap and scripts updates)

---

## 9) Git Workflow Used

### Commit and push flow (high-level)

1. Changes staged and committed with test setup + test files.
2. Push initially rejected because remote had new commits.
3. `git pull --rebase origin main` performed.
4. README conflict resolved.
5. Rebase continued and push completed successfully.

### Commands used during push/rebase stage

```bash
git add README.md package.json package-lock.json vite.config.js src/utils/formatEgp.test.js src/services/cartService.test.js src/store/slices/cartSlice.test.js
git commit -m "Add unit and integration testing setup with initial suites."
git push origin main
git pull --rebase origin main
git rebase --continue
git push origin main
```

---

## Final Outcome

The roadmap test item is now implemented with a working baseline test suite:

- Unit tests for utility and service logic
- Integration tests for cart slice action/selector behavior
- Verified execution via `npm run test`
- Changes pushed to `main`
