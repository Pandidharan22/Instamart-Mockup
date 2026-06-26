# Design & Architecture Decisions

This file logs every significant decision made during the build — what was chosen, what was rejected, and why.

## Decision 1: Scope reduction — what we cut and why

**What we cut:** real authentication, payment gateway, live order tracking, and real Swiggy assets.

**Why:** these require a backend and add zero agent-testable surface area. The goal of this mockup is to provide a safe, deterministic UI for a voice agent to operate on — not to replicate Swiggy's full infrastructure.

**Tradeoff acknowledged:** the app will not feel "complete" as a consumer product, but it will be complete as a test harness.

## Decision 2: _Placeholder — to be filled in as the build progresses_

_TBD_

## Decision 3: _Placeholder — to be filled in as the build progresses_

_TBD_

## Decision 4: _Placeholder — to be filled in as the build progresses_

_TBD_
