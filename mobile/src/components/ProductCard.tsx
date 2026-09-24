import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppState } from '@/context/AppState';
import type { Product } from '@/data/types';
import { getCategory, getCompany } from '@/lib/catalog';
import { formatDistance } from '@/lib/geo';
import { colors, radius, spacing } from '@/theme';

import { ProductImagePlaceholder } from './ProductImagePlaceholder';

type Props = {
  product: Product & { distance?: number };
  variant?: 'row' | 'tile';
};

export function ProductCard({ product, variant = 'row' }: Props) {
  const { isFavorite, toggleFavorite } = useAppState();
  const company = product.companyId ? getCompany(product.companyId) : undefined;
  const category = getCategory(product.categorySlug);
  const favorite = isFavorite(product.id);
  const tile = variant === 'tile';

  return (
    <View style={[styles.card, tile && styles.tile]}>
      <Pressable
        onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}
        style={({ pressed }) => [
          styles.content,
          tile && styles.contentTile,
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={product.name}
      >
        <View style={tile ? styles.imageTile : styles.imageRow}>
          <ProductImagePlaceholder icon={category?.icon} />
          {product.imageUrl && (
            <Image
              source={product.imageUrl}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={150}
            />
          )}
        </View>
        <View style={styles.body}>
          <Text style={styles.category} numberOfLines={1}>
            {category?.name}
          </Text>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.meta}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={styles.metaText} numberOfLines={1}>
              {company
                ? `${company.city}${product.distance !== undefined ? ` · ${formatDistance(product.distance)}` : ''}`
                : 'Meerdere verhuurders'}
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={() => toggleFavorite(product.id)}
        hitSlop={10}
        style={[styles.heart, tile && styles.heartTile]}
        accessibilityRole="button"
        accessibilityLabel={favorite ? 'Verwijder uit favorieten' : 'Bewaar als favoriet'}
      >
        <Ionicons
          name={favorite ? 'heart' : 'heart-outline'}
          size={20}
          color={favorite ? colors.primary : colors.textMuted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tile: { width: 220 },
  content: { flexDirection: 'row', flex: 1 },
  contentTile: { flexDirection: 'column' },
  pressed: { opacity: 0.85 },
  imageRow: { width: 104, minHeight: 104, backgroundColor: colors.primarySoft },
  imageTile: { width: '100%', height: 140, backgroundColor: colors.primarySoft },
  body: { flex: 1, padding: spacing.md, gap: 4, paddingRight: spacing.xxl },
  category: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: { fontSize: 15, fontWeight: '700', color: colors.text },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 'auto' },
  metaText: { fontSize: 13, color: colors.textMuted, flexShrink: 1 },
  heart: { position: 'absolute', top: spacing.sm, right: spacing.sm, padding: 4 },
  heartTile: { backgroundColor: colors.surface, borderRadius: radius.pill },
});
