import { Product } from '../types';

// This is the mock "database". In production this would live behind a real
// backend endpoint (e.g. GET /marketplace/products) — the API layer in
// src/api/marketplaceApi.ts is what the UI actually talks to, so swapping
// this file for a real fetch() later requires zero UI changes.

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15',
    brand: 'Apple Premium Reseller',
    imageUrl: 'https://picsum.photos/seed/iphone15/400/400',
    basePrice: 69900,
    description:
      'A17 Pro chip, 48MP main camera, USB-C. Available with no-cost EMI backed by your mutual funds — no credit score required.',
    variants: [
      { id: 'v1', label: '128GB / Black', priceDelta: 0 },
      { id: 'v2', label: '256GB / Black', priceDelta: 10000 },
      { id: 'v3', label: '128GB / Blue', priceDelta: 0 },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 3, interestRate: 0 },
      { id: 'e2', tenureMonths: 6, interestRate: 0 },
      { id: 'e3', tenureMonths: 12, interestRate: 0 },
      { id: 'e4', tenureMonths: 24, interestRate: 2.5 },
    ],
  },
  {
    id: 'p2',
    name: 'MacBook Air M2',
    brand: 'Apple Premium Reseller',
    imageUrl: 'https://picsum.photos/seed/macbookair/400/400',
    basePrice: 114900,
    description:
      'M2 chip, 18-hour battery life, Liquid Retina display. Pay later using your mutual funds, zero interest.',
    variants: [
      { id: 'v1', label: '256GB / Midnight', priceDelta: 0 },
      { id: 'v2', label: '512GB / Midnight', priceDelta: 20000 },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 6, interestRate: 0 },
      { id: 'e2', tenureMonths: 12, interestRate: 0 },
      { id: 'e3', tenureMonths: 24, interestRate: 2.5 },
    ],
  },
  {
    id: 'p3',
    name: 'Wakefit Orthopedic Mattress',
    brand: 'Wakefit',
    imageUrl: 'https://picsum.photos/seed/mattress/400/400',
    basePrice: 18999,
    description:
      'Dual comfort orthopedic mattress. Comfort on 12-month no-cost EMIs, backed by your investments.',
    variants: [
      { id: 'v1', label: 'Queen', priceDelta: 0 },
      { id: 'v2', label: 'King', priceDelta: 4000 },
    ],
    emiPlans: [
      { id: 'e1', tenureMonths: 3, interestRate: 0 },
      { id: 'e2', tenureMonths: 6, interestRate: 0 },
      { id: 'e3', tenureMonths: 12, interestRate: 0 },
    ],
  },
  {
    id: 'p4',
    name: 'Kalyan Gold Coin (10g)',
    brand: 'Kalyan Jewellers',
    imageUrl: 'https://picsum.photos/seed/goldcoin/400/400',
    basePrice: 82000,
    description:
      '24K 999 purity gold coin, hallmarked. No-cost EMIs up to 5 months.',
    variants: [{ id: 'v1', label: '10 grams', priceDelta: 0 }],
    emiPlans: [
      { id: 'e1', tenureMonths: 3, interestRate: 0 },
      { id: 'e2', tenureMonths: 5, interestRate: 0 },
    ],
  },
];
