import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { ProductCard } from '@/components/ProductCard';
import { useAppState } from '@/context/AppState';
import { getCategory, getCompany, getCompanyProducts } from '@/lib/catalog';
import { distanceKm, formatDistance } from '@/lib/geo';
import { openInApp, openRoute, siteUrl } from '@/lib/links';
import { colors, radius, spacing } from '@/theme';

export default function CompanyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { location } = useAppState();
  const company = getCompany(id);

  if (!company) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Verhuurbedrijf niet gevonden"
        message="Dit verhuurbedrijf is niet (meer) beschikbaar."
      />
    );
  }

  const distance = location ? distanceKm(location.coordinates, company.coordinates) : undefined;
  const products = getCompanyProducts(company.id).map((p) => ({ ...p, distance }));

  return (
    <>
      <Stack.Screen options={{ title: company.name }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{company.name}</Text>
          <View style={styles.meta}>
            <Ionicons name="location-outline" size={16} color={colors.textMuted} />
            <Text style={styles.metaText}>
              {company.city}, {company.province}
              {distance !== undefined
                ? ` · ${formatDistance(distance)} van ${location?.label}`
                : ''}
            </Text>
          </View>
          <View style={styles.tags}>
            {company.categorySlugs.map((slug) => (
              <View key={slug} style={styles.tag}>
                <Text style={styles.tagText}>{getCategory(slug)?.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.actions}>
            <Button
              label="Bekijk op HandyRent"
              icon="open-outline"
              onPress={() => openInApp(siteUrl(company.webPath))}
            />
            <Button
              label="Route"
              icon="navigate-outline"
              variant="secondary"
              onPress={() => openRoute(company.coordinates)}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Aanbod</Text>
        <View style={{ gap: spacing.md }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.md,
  },
  name: { fontSize: 22, fontWeight: '800', color: colors.text },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  metaText: { fontSize: 14, color: colors.textMuted, flexShrink: 1 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  tagText: { fontSize: 12, fontWeight: '600', color: colors.primaryDark },
  actions: { gap: spacing.sm },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: spacing.md },
});
