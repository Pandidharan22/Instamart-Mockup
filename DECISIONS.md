# Design & Architecture Decisions

This file logs every significant decision made during the build — what was chosen, what was rejected, and why.

## Decision 1: Scope reduction — what we cut and why

**What we cut:** real authentication, payment gateway, live order tracking, and real Swiggy assets.

**Why:** these require a backend and add zero agent-testable surface area. The goal of this mockup is to provide a safe, deterministic UI for a voice agent to operate on — not to replicate Swiggy's full infrastructure.

**Tradeoff acknowledged:** the app will not feel "complete" as a consumer product, but it will be complete as a test harness.

## Decision 2: Checkout empty-cart guard — useRef over useState

**Context:** Checkout has a guard that redirects to `/` if the cart is empty (so users can't land on an empty checkout). But "Place Order" also empties the cart — which was accidentally triggering the same guard and redirecting to `/` instead of `/order-success`.

**Options considered:**

- Remove the guard entirely — rejected, leaves a broken empty checkout accessible by URL.
- Use `useState` for an `orderPlaced` flag — rejected, `useState` triggers a re-render on update, creating a potential race condition with the effect.
- Use `useRef` for an `orderPlaced` flag — chosen. Refs update synchronously without causing re-renders. Setting `orderPlaced.current = true` before `clearCart()` ensures the guard sees the correct value immediately in the same render cycle.

**Outcome:** Two empty-cart scenarios (arrived-empty vs just-placed-order) are now handled correctly with a single ref.

## Decision 3: Static data over API / async fetching

**Context:** The app needs product data, user data, and addresses. We could have fetched these from a mock API (e.g. json-server, MockAPI, or a hardcoded fetch call).

**Why we didn't:** This mockup is a test harness for a voice agent. Async data introduces loading states, timing dependencies, and potential network failures — all of which make the app non-deterministic. A deterministic app (same state every load, every time) is far easier to write reliable agent tests against.

**Outcome:** All data lives in `src/data/products.js` and `src/data/user.js` as plain JS exports. No async, no loading spinners, no failure states. The app is fully predictable from the first paint.

## Decision 4: Vercel SPA routing — vercel.json rewrite rule

**Context:** Vite builds a single `index.html` SPA. Vercel serves files statically by default — direct access to `/cart` or `/checkout` returns 404 because no matching file exists.

**Fix:** added `vercel.json` with a catch-all rewrite (`/(.*)` → `/index.html`) so all routes serve `index.html` and React Router handles routing client-side.

**Why it matters for agent testing:** a voice agent navigating directly to any route must get a 200, not a 404. Every URL in the app must be directly addressable.

**Committed to repo** so all future git-based auto-deploys include the fix.

## Decision 5: data-testid naming convention — kebab-case with entity id suffix

All `data-testid` values follow the pattern `{component}-{action/role}-{entity-id}` e.g. `add-to-cart-amul-milk-1l`, `cart-item-amul-milk-1l`, `remove-item-amul-milk-1l`.

**Why:** consistent, predictable, human-readable. A voice agent or test script can construct the expected testid from the product id alone — no guessing or DOM traversal needed.

**Alternative considered:** numeric indices (e.g. `product-card-0`) — rejected because indices change if the product list order changes. Entity ids are stable.
