import { router } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { ProductCard } from '@/components/ProductCard';
import { useAppState } from '@/context/AppState';
import { getProduct, productDistance } from '@/lib/catalog';
import { spacing } from '@/theme';

export default function FavoritesScreen() {
  const { favorites, location } = useAppState();
  const items = useMemo(
    () =>
      favorites
        .map(getProduct)
        .filter((p) => p !== undefined)
        .map((p) => ({ ...p, distance: productDistance(p, location?.coordinates ?? null) })),
    [favorites, location],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(p) => p.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListEmptyComponent={
        <EmptyState
          icon="heart-outline"
          title="Nog geen favorieten"
          message="Tik op het hartje bij gereedschap om het hier te bewaren voor je volgende klus."
          action={
            <View style={{ marginTop: spacing.md }}>
              <Button
                label="Gereedschap zoeken"
                icon="search"
                onPress={() => router.navigate('/zoeken')}
              />
            </View>
          }
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.lg, flexGrow: 1 },
});
