import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryTile } from '@/components/CategoryTile';
import { LocationBar } from '@/components/LocationBar';
import { ProductCard } from '@/components/ProductCard';
import { useAppState } from '@/context/AppState';
import { getCategories, searchProducts } from '@/lib/catalog';
import { colors, radius, spacing } from '@/theme';

const STEPS = [
  {
    icon: 'location-outline',
    title: 'Kies je locatie',
    text: 'Geef aan waar je het gereedschap nodig hebt.',
  },
  {
    icon: 'search-outline',
    title: 'Zoek gereedschap',
    text: 'Vind precies de machine die je zoekt.',
  },
  {
    icon: 'call-outline',
    title: 'Huur direct',
    text: 'Regel het rechtstreeks met de verhuurder, zonder tussenpersoon.',
  },
] as const;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { location, radiusKm } = useAppState();
  const [query, setQuery] = useState('');

  const featured = useMemo(
    () => searchProducts({ origin: location?.coordinates ?? null, radiusKm }).slice(0, 8),
    [location, radiusKm],
  );

  const submit = () => router.push({ pathname: '/zoeken', params: { q: query.trim() } });

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      <View style={[styles.hero, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.logoWrap}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
            contentFit="contain"
            accessibilityLabel="HandyRent"
          />
        </View>
        <Text style={styles.title}>Eenvoudig gereedschap huren in jouw buurt</Text>
        <Text style={styles.subtitle}>
          Vind snel en simpel verhuurbedrijven bij jou in de buurt.
        </Text>
        <LocationBar tone="light" />
        <View style={styles.search}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={submit}
            placeholder="Wat wil je huren? Bijv. minigraver"
            placeholderTextColor={colors.textMuted}
            returnKeyType="search"
            style={styles.searchInput}
            accessibilityLabel="Zoek gereedschap"
          />
          <Pressable onPress={submit} style={styles.searchButton} accessibilityRole="button">
            <Text style={styles.searchButtonText}>Zoek</Text>
          </Pressable>
        </View>
      </View>

      <Section title="Categorieën" action={{ label: 'Alles', href: '/zoeken' }}>
        <View style={styles.grid}>
          {getCategories().map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </View>
      </Section>

      <Section title={location ? `Populair bij ${location.label}` : 'Populair om te huren'}>
        <FlatList
          horizontal
          data={featured}
          keyExtractor={(p) => p.id}
          renderItem={({ item }) => <ProductCard product={item} variant="tile" />}
          ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
          showsHorizontalScrollIndicator={false}
        />
      </Section>

      <Section title="Zo werkt HandyRent">
        <View style={styles.steps}>
          {STEPS.map((step, i) => (
            <View key={step.title} style={styles.step}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepText}>{step.text}</Text>
              </View>
              <Ionicons name={step.icon} size={22} color={colors.primary} />
            </View>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

type SectionProps = {
  title: string;
  action?: { label: string; href: '/zoeken' };
  children: React.ReactNode;
};

function Section({ title, action, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action && (
          <Link href={action.href} style={styles.sectionAction}>
            {action.label}
          </Link>
        )}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  logoWrap: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  logo: { width: 92, height: 37 },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '800', color: colors.white },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)' },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingLeft: spacing.md,
    padding: 6,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.text, paddingVertical: 8 },
  searchButton: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  searchButtonText: { color: colors.white, fontWeight: '700' },
  section: { marginTop: spacing.xl, gap: spacing.md },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  sectionAction: { fontSize: 14, fontWeight: '700', color: colors.primary },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  steps: { paddingHorizontal: spacing.lg, gap: spacing.md },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: { color: colors.white, fontWeight: '800' },
  stepTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  stepText: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
});
