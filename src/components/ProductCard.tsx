import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types';
import { colors, radius, spacing, typography } from '../theme/colors';

interface Props {
  product: Product;
  onPress: () => void;
}

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

// Same list-row shape as the "Nearby Stores" / "Top Brands" cards in the
// real app (logo/image left, title + subtitle, meta on the right) so the
// Marketplace tab feels native rather than bolted on.
export default function ProductCard({ product, onPress }: Props) {
  const maxTenure = Math.max(...product.emiPlans.map((p) => p.tenureMonths));

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.price}>{formatINR(product.basePrice)}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.emiTag}>No-cost EMI</Text>
        <Text style={styles.emiTenure}>upto {maxTenure}mo</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: { ...typography.h2, fontSize: 16, color: colors.textPrimary },
  brand: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  price: { ...typography.body, fontWeight: '700', color: colors.textPrimary, marginTop: 4 },
  meta: {
    alignItems: 'flex-end',
  },
  emiTag: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  emiTenure: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
