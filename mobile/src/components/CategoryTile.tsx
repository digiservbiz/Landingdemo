import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Category } from '@/data/types';
import { colors, radius, spacing } from '@/theme';

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: '/categorie/[slug]', params: { slug: category.slug } })
      }
      style={({ pressed }) => [styles.tile, pressed && { opacity: 0.8 }]}
      accessibilityRole="button"
    >
      <View style={styles.iconWrap}>
        <Ionicons
          name={category.icon as keyof typeof Ionicons.glyphMap}
          size={24}
          color={colors.primary}
        />
      </View>
      <Text style={styles.label} numberOfLines={2}>
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
});
