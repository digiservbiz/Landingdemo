import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CompanyCard } from '@/components/CompanyCard';
import { EmptyState } from '@/components/EmptyState';
import { LocationBar } from '@/components/LocationBar';
import { RadiusPicker } from '@/components/RadiusPicker';
import { useAppState } from '@/context/AppState';
import { searchCompanies } from '@/lib/catalog';
import { openInApp, siteUrl } from '@/lib/links';
import { colors, spacing } from '@/theme';

export default function CompaniesScreen() {
  const { location, radiusKm } = useAppState();
  const results = useMemo(
    () => searchCompanies(location?.coordinates ?? null, radiusKm),
    [location, radiusKm],
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(c) => c.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.intro, styles.inset]}>
            Vind het juiste verhuurbedrijf met het gereedschap dat je nodig hebt. Je huurt
            rechtstreeks bij de verhuurder.
          </Text>
          <View style={styles.inset}>
            <LocationBar />
          </View>
          {location && <RadiusPicker />}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.inset}>
          <CompanyCard company={item} />
        </View>
      )}
      ListEmptyComponent={
        <EmptyState
          icon="storefront-outline"
          title="Geen verhuurbedrijven in de buurt"
          message="Vergroot de zoekstraal om meer verhuurbedrijven te zien."
        />
      }
      ListFooterComponent={
        <View style={[styles.inset, styles.footer]}>
          <Button
            label="Alle verhuurbedrijven op handyrent.nl"
            icon="open-outline"
            variant="secondary"
            onPress={() => openInApp(siteUrl('/verhuurbedrijven'))}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: spacing.lg },
  header: { gap: spacing.md, marginBottom: spacing.md },
  inset: { paddingHorizontal: spacing.lg },
  intro: { fontSize: 14, lineHeight: 20, color: colors.textMuted },
  footer: { marginTop: spacing.xl },
});
