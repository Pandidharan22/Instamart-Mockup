# Instamart Mockup

A static, frontend-only React mockup of Swiggy Instamart, built as an agent-testable UI harness for voice assistant testing. This is **not a real product** — there is no backend, no database, and no payments. Every screen and interaction is simulated against local data so the UI behaves deterministically.

## Purpose

This app is built for two distinct consumers:

1. **A human evaluator** — assessing the design thinking, layout, and flow decisions behind the mockup.
2. **A voice agent** — that will programmatically navigate and act on the UI, driving the app the way a user's voice commands would.

To support the voice agent, **every interactive element carries a stable `data-testid` attribute** for reliable agent addressability. These identifiers are intended to remain stable across changes so automated navigation does not break.

## Tech Stack

- **React** — UI library
- **Vite** — build tool and dev server
- **Tailwind CSS** — styling
- **React Router** — client-side routing
- **React Context** — cart state management
- **Vercel** — deployment

## Core Flows

1. **Home/Browse** — landing page with categories and featured products
2. **Search** — find products by query
3. **Product Listing** — browse products within a category or result set
4. **Cart** — review and adjust items before checkout
5. **Checkout** — confirm order details
6. **Order Confirmation** — success screen after placing an order

## Edge States

The mockup explicitly handles these required states:

1. **Empty cart** — no items added yet
2. **Out-of-stock product** — product unavailable for purchase
3. **No search results** — query returns nothing
4. **Order success** — order placed and confirmed

## Running Locally

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── data/        # static product and category data
├── context/     # React Context providers (cart state)
├── components/  # reusable UI components
└── pages/       # route-level page components
```

## Design Decisions

See [DECISIONS.md](DECISIONS.md) for full reasoning behind every architectural and design choice.
