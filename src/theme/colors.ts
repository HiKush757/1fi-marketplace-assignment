// Design tokens reverse-engineered from the real 1Fi app screenshots
// (Shop page banner, brand cards, pay screen). Keeping these centralized
// so every new Marketplace screen stays visually consistent with the
// existing app instead of hardcoding colors per-component.

export const colors = {
  primary: '#6B21D9', // main purple used in banner, CTAs, active tab text
  primaryDark: '#4C1D95',
  primaryLight: '#EDE4FB', // light purple used for inactive segmented control bg
  accentGold: '#F5B301', // confetti / "no-cost EMI" accents

  background: '#F5F5F7', // page background (grey)
  surface: '#FFFFFF', // cards
  border: '#E9E9EF',

  textPrimary: '#14142B', // headings
  textSecondary: '#6E7191', // subtitles / meta text
  textOnPrimary: '#FFFFFF',

  success: '#1DB954',
  danger: '#E5484D',
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  h1: { fontSize: 24, fontWeight: '700' as const },
  h2: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
};
