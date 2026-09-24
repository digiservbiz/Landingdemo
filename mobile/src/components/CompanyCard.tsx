import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { RentalCompany } from '@/data/types';
import { getCategory } from '@/lib/catalog';
import { formatDistance } from '@/lib/geo';
import { colors, radius, spacing } from '@/theme';

type Props = { company: RentalCompany & { distance?: number } };

export function CompanyCard({ company }: Props) {
  const initials = company.name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/verhuurder/[id]', params: { id: company.id } })}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      accessibilityRole="button"
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{company.name}</Text>
        <Text style={styles.meta}>
          {company.city}, {company.province}
          {company.distance !== undefined ? ` · ${formatDistance(company.distance)}` : ''}
        </Text>
        <Text style={styles.categories} numberOfLines={1}>
          {company.categorySlugs
            .map((s) => getCategory(s)?.name)
            .filter(Boolean)
            .join(' · ')}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontWeight: '800', fontSize: 16 },
  body: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  meta: { fontSize: 13, color: colors.textMuted },
  categories: { fontSize: 12, color: colors.primaryDark, marginTop: 2 },
});
