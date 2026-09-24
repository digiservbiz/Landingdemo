import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip } from '@/components/Chip';
import { EmptyState } from '@/components/EmptyState';
import { LocationBar } from '@/components/LocationBar';
import { ProductCard } from '@/components/ProductCard';
import { RadiusPicker } from '@/components/RadiusPicker';
import { useAppState } from '@/context/AppState';
import { getCategories, searchProducts } from '@/lib/catalog';
import { colors, radius, spacing } from '@/theme';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string; categorie?: string }>();
  const { location, radiusKm } = useAppState();
  const [query, setQuery] = useState(params.q ?? '');
  const [categorySlug, setCategorySlug] = useState<string | undefined>(params.categorie);

  // The home screen deep-links here with a query; pick it up when the tab is reused.
  const [lastParamQuery, setLastParamQuery] = useState(params.q);
  if (params.q !== lastParamQuery) {
    setLastParamQuery(params.q);
    if (params.q !== undefined) setQuery(params.q);
  }

  const results = useMemo(
    () =>
      searchProducts({
        text: query,
        categorySlug,
        origin: location?.coordinates ?? null,
        radiusKm,
      }),
    [query, categorySlug, location, radiusKm],
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(p) => p.id}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={styles.search}>
            <Ionicons name="search" size={20} color={colors.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Zoek gereedschap of machine"
              placeholderTextColor={colors.textMuted}
              returnKeyType="search"
              clearButtonMode="while-editing"
              style={styles.input}
              accessibilityLabel="Zoek gereedschap"
            />
          </View>
          <View style={styles.inset}>
            <LocationBar />
          </View>
          {location && <RadiusPicker />}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}
          >
            <Chip
              label="Alle categorieën"
              selected={!categorySlug}
              onPress={() => setCategorySlug(undefined)}
            />
            {getCategories().map((c) => (
              <Chip
                key={c.slug}
                label={c.name}
                selected={categorySlug === c.slug}
                onPress={() => setCategorySlug(c.slug)}
              />
            ))}
          </ScrollView>
          <Text style={[styles.count, styles.inset]}>
            {results.length} {results.length === 1 ? 'resultaat' : 'resultaten'}
          </Text>
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
          title="Niets gevonden"
          message="Probeer een andere zoekterm, categorie of een grotere straal."
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: spacing.lg },
  header: { gap: spacing.md, marginBottom: spacing.md },
  inset: { paddingHorizontal: spacing.lg },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: { flex: 1, fontSize: 15, paddingVertical: 12, color: colors.text },
  chips: { gap: spacing.sm, paddingHorizontal: spacing.lg },
  count: { fontSize: 13, color: colors.textMuted },
});
