# 1Fi Marketplace — SDE Intern Assignment

Implementation of the **1Fi Marketplace** section on the Shop page, built to match
the visual language of the existing 1Fi app (purple banner, pill segmented control,
white rounded cards, bottom-nav-style flows).

## Setup

```bash
npm install
npm start
```

Then scan the QR code with Expo Go (Android/iOS) or press `w` for web preview.

## What's implemented

- **Shop page** with the existing "Top Brands" / "Nearby Stores" tabs (left as blank
  stubs per the assignment) plus a new **"1Fi Marketplace"** tab.
- **Product listing** — searchable, card-based, reuses the same visual pattern as the
  real app's brand/store list rows.
- **Product detail screen** — image, description, variant selection (chips),
  EMI plan selection (radio rows with live monthly-amount calculation), and a
  Continue CTA — mirroring the real "Pay using 1Fi" screen's layout.
- **Mock API layer** (`src/api/marketplaceApi.ts`) — simulates network latency and
  an occasional failure so loading and error states are real, not just theoretical.
  Swapping in a real backend later only touches this one file.
- **Loading / error / empty states** on both the listing and detail screens.

## Architecture notes

- `src/theme` — centralized design tokens (colors, spacing, typography) extracted
  from the real app's screenshots, so all new UI stays visually consistent.
- `src/types` — shared TypeScript interfaces for Product / Variant / EMI plan.
- `src/data` — mock "database" (not wired directly into any component).
- `src/api` — the only layer screens talk to; returns Promises like a real API would.
- `src/components` — reusable, presentation-only components (ProductCard,
  SegmentedControl, VariantSelector, EMIPlanSelector, StateViews).
- `src/screens` — screen-level composition + data fetching (via hooks).
- `src/navigation` — React Navigation native-stack setup.

## Assumptions made

- The exact reference material for product/content requirements mentioned in the
  assignment PDF wasn't available, so product data (iPhone, MacBook, mattress, gold
  coin) was chosen to match the brand categories visible in the real app's "Top
  Brands" list (Apple, Wakefit, Kalyan).
- EMI monthly amounts are computed with a simple flat calculation for display —
  a real implementation would call 1Fi's actual EMI/interest calculation service.
- Top Brands and Nearby Stores tabs are left blank per the explicit instruction in
  the assignment brief.

## Submission checklist

- [ ] Push this repo to GitHub (public or add the evaluator as a collaborator).
- [ ] Fill the submission form: https://forms.gle/WZYqNEAJZPXonLk88
- [ ] Deadline: **8th September 2026**.
