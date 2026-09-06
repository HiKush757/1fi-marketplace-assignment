import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProductVariant } from '../types';
import { colors, radius, spacing, typography } from '../theme/colors';

interface Props {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function VariantSelector({ variants, selectedId, onSelect }: Props) {
  if (variants.length <= 1) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.label}>Select variant</Text>
      <View style={styles.row}>
        {variants.map((variant) => {
          const isActive = variant.id === selectedId;
          return (
            <TouchableOpacity
              key={variant.id}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onSelect(variant.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {variant.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: spacing.lg, paddingHorizontal: spacing.md },
  label: { ...typography.h2, fontSize: 15, color: colors.textPrimary, marginBottom: spacing.sm },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  chipText: { ...typography.caption, color: colors.textSecondary, fontWeight: '600' },
  chipTextActive: { color: colors.primary },
});
