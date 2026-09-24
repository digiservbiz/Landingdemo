import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { LocationBar } from '@/components/LocationBar';
import { ProductCard } from '@/components/ProductCard';
import { RadiusPicker } from '@/components/RadiusPicker';
import { useAppState } from '@/context/AppState';
import { getCategory, searchProducts } from '@/lib/catalog';
import { openInApp, siteUrl } from '@/lib/links';
import { colors, spacing } from '@/theme';

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { location, radiusKm } = useAppState();
  const category = getCategory(slug);

  const results = useMemo(
    () => searchProducts({ categorySlug: slug, origin: location?.coordinates ?? null, radiusKm }),
    [slug, location, radiusKm],
  );

  if (!category) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Categorie niet gevonden"
        message="Deze categorie bestaat niet (meer)."
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: category.name }} />
      <FlatList
        data={results}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.description, styles.inset]}>{category.description}</Text>
            <View style={styles.inset}>
              <LocationBar />
            </View>
            {location && <RadiusPicker />}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.inset}>
            <ProductCard product={item} />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="construct-outline"
            title="Nog geen aanbod in de buurt"
            message="Vergroot de zoekstraal of bekijk het volledige aanbod op handyrent.nl."
          />
        }
        ListFooterComponent={
          <View style={[styles.inset, { marginTop: spacing.xl }]}>
            <Button
              label="Volledig aanbod op handyrent.nl"
              icon="open-outline"
              variant="secondary"
              onPress={() => openInApp(siteUrl(category.webPath))}
            />
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: spacing.lg },
  header: { gap: spacing.md, marginBottom: spacing.md },
  inset: { paddingHorizontal: spacing.lg },
  description: { fontSize: 15, lineHeight: 22, color: colors.textMuted },
});
