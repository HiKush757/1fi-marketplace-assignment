import { MOCK_PRODUCTS } from '../data/products';
import { Product } from '../types';

// Simulated network layer. Swapping this for a real backend later means
// replacing the bodies of these two functions with fetch() calls — screens
// never touch MOCK_PRODUCTS directly, so nothing else in the app changes.

const NETWORK_DELAY_MS = 700;

function delay<T>(value: T, ms: number = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchProducts(): Promise<Product[]> {
  // Simulate an occasional transient failure so the error state is real,
  // not just a theoretical UI branch. ~8% failure rate.
  if (Math.random() < 0.08) {
    await delay(null, 500);
    throw new Error('Unable to load Marketplace products. Please try again.');
  }
  return delay(MOCK_PRODUCTS);
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  const products = await fetchProducts().catch(() => MOCK_PRODUCTS);
  return products.find((p) => p.id === id);
}
