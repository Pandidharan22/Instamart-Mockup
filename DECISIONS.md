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

## Decision 4: _Placeholder — to be filled in as the build progresses_

_TBD_
