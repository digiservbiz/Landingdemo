import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useAppState } from '@/context/AppState';
import { colors, radius, spacing } from '@/theme';

type Props = { tone?: 'light' | 'dark' };

export function LocationBar({ tone = 'dark' }: Props) {
  const { location, radiusKm } = useAppState();
  const color = tone === 'light' ? colors.white : colors.text;
  const label = location
    ? `${location.label}${radiusKm ? ` · binnen ${radiusKm} km` : ' · heel Nederland'}`
    : 'Kies je locatie';

  return (
    <Pressable
      onPress={() => router.push('/locatie')}
      style={[styles.bar, tone === 'light' && styles.barLight]}
      accessibilityRole="button"
      accessibilityLabel={`Locatie: ${label}. Wijzig locatie`}
    >
      <Ionicons name="location" size={16} color={color} />
      <Text style={[styles.text, { color }]} numberOfLines={1}>
        {label}
      </Text>
      <Ionicons name="chevron-down" size={16} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  barLight: { backgroundColor: 'rgba(255,255,255,0.18)' },
  text: { fontSize: 14, fontWeight: '600', flexShrink: 1 },
});
