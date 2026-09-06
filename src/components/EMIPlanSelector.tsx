import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { EMIPlan } from '../types';
import { colors, radius, spacing, typography } from '../theme/colors';

interface Props {
  plans: EMIPlan[];
  totalAmount: number;
  selectedId: string;
  onSelect: (id: string) => void;
}

function computeMonthly(totalAmount: number, plan: EMIPlan): number {
  if (plan.interestRate === 0) {
    return Math.ceil(totalAmount / plan.tenureMonths);
  }
  // simple flat-interest approximation for display purposes
  const totalWithInterest = totalAmount * (1 + plan.interestRate / 100);
  return Math.ceil(totalWithInterest / plan.tenureMonths);
}

export default function EMIPlanSelector({ plans, totalAmount, selectedId, onSelect }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>Choose your EMI plan</Text>
      {plans.map((plan) => {
        const isActive = plan.id === selectedId;
        const monthly = computeMonthly(totalAmount, plan);
        return (
          <TouchableOpacity
            key={plan.id}
            style={[styles.planRow, isActive && styles.planRowActive]}
            onPress={() => onSelect(plan.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.radioOuter, isActive && styles.radioOuterActive]}>
              {isActive && <View style={styles.radioInner} />}
            </View>
            <View style={styles.planInfo}>
              <Text style={styles.planTenure}>{plan.tenureMonths} months</Text>
              <Text style={styles.planSub}>
                {plan.interestRate === 0 ? 'No-cost EMI · 0% interest' : `${plan.interestRate}% interest`}
              </Text>
            </View>
            <Text style={styles.planAmount}>₹{monthly.toLocaleString('en-IN')}/mo</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: spacing.lg, paddingHorizontal: spacing.md },
  label: { ...typography.h2, fontSize: 15, color: colors.textPrimary, marginBottom: spacing.sm },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  planRowActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  radioOuterActive: { borderColor: colors.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  planInfo: { flex: 1 },
  planTenure: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  planSub: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  planAmount: { ...typography.body, fontWeight: '700', color: colors.textPrimary },
});
