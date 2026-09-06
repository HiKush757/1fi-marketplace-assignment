import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import SegmentedControl from '../components/SegmentedControl';
import MarketplaceTab from './MarketplaceTab';
import { colors, spacing, typography } from '../theme/colors';

const TABS = ['Top Brands', 'Nearby Stores', '1Fi Marketplace'];

// Top Brands and Nearby Stores are stubs per the assignment brief —
// only "1Fi Marketplace" needs a real implementation.
function StubTab({ label }: { label: string }) {
  return (
    <View style={styles.stub}>
      <Text style={styles.stubText}>{label} — coming soon</Text>
    </View>
  );
}

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState('1Fi Marketplace');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✦ NO-COST EMIs</Text>
        </View>
        <Text style={styles.title}>
          Shop today,{'\n'}
          <Text style={styles.titleItalic}>Pay later using</Text>
          {'\n'}Mutual funds.
        </Text>
        <Text style={styles.subtitle}>
          No credit score required. No interest. Backed by your investments.
        </Text>
      </View>

      <SegmentedControl options={TABS} selected={activeTab} onSelect={setActiveTab} />

      <View style={styles.body}>
        {activeTab === 'Top Brands' && <StubTab label="Top Brands" />}
        {activeTab === 'Nearby Stores' && <StubTab label="Nearby Stores" />}
        {activeTab === '1Fi Marketplace' && <MarketplaceTab />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  banner: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl + 12,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: spacing.md,
  },
  badgeText: { color: colors.textOnPrimary, fontSize: 11, fontWeight: '700' },
  title: { ...typography.h1, fontSize: 26, color: colors.textOnPrimary, lineHeight: 32 },
  titleItalic: { fontStyle: 'italic', fontWeight: '400' },
  subtitle: { ...typography.caption, color: 'rgba(255,255,255,0.85)', marginTop: spacing.sm },
  body: { flex: 1, marginTop: spacing.md },
  stub: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  stubText: { ...typography.body, color: colors.textSecondary },
});
