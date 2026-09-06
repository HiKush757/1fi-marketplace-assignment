export interface EMIPlan {
  id: string;
  tenureMonths: number;
  interestRate: number; // 0 for no-cost EMI
  monthlyAmountLabel?: string; // computed at render time, not stored
}

export interface ProductVariant {
  id: string;
  label: string; // e.g. "128GB / Black", "Size M"
  priceDelta: number; // added to base price, 0 for default variant
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  basePrice: number;
  description: string;
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
}

export type LoadState = 'idle' | 'loading' | 'success' | 'error';
