import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import VariantSelector from '../components/VariantSelector';
import EMIPlanSelector from '../components/EMIPlanSelector';
import { LoadingView, ErrorView } from '../components/StateViews';
import { fetchProductById } from '../api/marketplaceApi';
import { Product, LoadState } from '../types';
import { colors, radius, spacing, typography } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type Route = RouteProp<RootStackParamList, 'ProductDetail'>;
type Nav = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function ProductDetailScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();

  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<LoadState>('idle');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('');

  const load = async () => {
    setState('loading');
    try {
      const data = await fetchProductById(params.productId);
      if (!data) throw new Error('Product not found.');
      setProduct(data);
      setSelectedVariantId(data.variants[0]?.id ?? '');
      setSelectedPlanId(data.emiPlans[0]?.id ?? '');
      setState('success');
    } catch (err) {
      setState('error');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.productId]);

  if (state === 'loading' || state === 'idle') return <LoadingView />;
  if (state === 'error' || !product) {
    return <ErrorView message="Couldn't load this product." onRetry={load} />;
  }

  const variant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const totalAmount = product.basePrice + (variant?.priceDelta ?? 0);

  const handleContinue = () => {
    const plan = product.emiPlans.find((p) => p.id === selectedPlanId);
    Alert.alert(
      'Proceeding with plan',
      `${product.name}${variant ? ` (${variant.label})` : ''}\n${formatINR(totalAmount)} over ${plan?.tenureMonths} months`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>‹</Text>
        <Text style={styles.backLabel}>Pay using 1Fi</Text>
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
        </View>
      </View>

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.amountBlock}>
        <Text style={styles.amountLabel}>Total amount</Text>
        <Text style={styles.amount}>{formatINR(totalAmount)}</Text>
      </View>

      <VariantSelector
        variants={product.variants}
        selectedId={selectedVariantId}
        onSelect={setSelectedVariantId}
      />

      <EMIPlanSelector
        plans={product.emiPlans}
        totalAmount={totalAmount}
        selectedId={selectedPlanId}
        onSelect={setSelectedPlanId}
      />

      <TouchableOpacity style={styles.cta} onPress={handleContinue} activeOpacity={0.85}>
        <Text style={styles.ctaText}>Continue →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  backArrow: { fontSize: 24, color: colors.textPrimary, marginRight: spacing.sm },
  backLabel: { ...typography.h2, fontSize: 16, color: colors.textPrimary },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  image: { width: 64, height: 64, borderRadius: radius.md, backgroundColor: colors.surface },
  name: { ...typography.h1, fontSize: 20, color: colors.textPrimary },
  brand: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    lineHeight: 20,
  },
  amountBlock: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  amountLabel: { ...typography.caption, color: colors.textSecondary },
  amount: { ...typography.h1, fontSize: 32, color: colors.textPrimary, marginTop: 4 },
  cta: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  ctaText: { ...typography.button, color: colors.textOnPrimary, fontSize: 17 },
});
