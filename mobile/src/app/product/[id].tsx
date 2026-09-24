import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { CompanyCard } from '@/components/CompanyCard';
import { EmptyState } from '@/components/EmptyState';
import { ProductImagePlaceholder } from '@/components/ProductImagePlaceholder';
import { useAppState } from '@/context/AppState';
import { getCategory, getCompany, getProduct } from '@/lib/catalog';
import { distanceKm } from '@/lib/geo';
import { openInApp, openRoute, siteUrl } from '@/lib/links';
import { colors, radius, spacing } from '@/theme';

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { location, business, isFavorite, toggleFavorite } = useAppState();
  const product = getProduct(id);

  if (!product) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Product niet gevonden"
        message="Dit product is niet (meer) beschikbaar."
      />
    );
  }

  const category = getCategory(product.categorySlug);
  const company = product.companyId ? getCompany(product.companyId) : undefined;
  const distance =
    company && location ? distanceKm(location.coordinates, company.coordinates) : undefined;
  // Company product pages on handyrent.nl switch between private and business pricing.
  const url = siteUrl(product.webPath, company ? business : undefined);
  const favorite = isFavorite(product.id);

  return (
    <>
      <Stack.Screen
        options={{
          title: category?.name ?? '',
          headerRight: () => (
            <View style={styles.headerActions}>
              <Pressable
                onPress={() =>
                  Share.share({ message: `${product.name} huren via HandyRent: ${url}` })
                }
                hitSlop={8}
                accessibilityLabel="Delen"
              >
                <Ionicons name="share-outline" size={22} color={colors.primary} />
              </Pressable>
              <Pressable
                onPress={() => toggleFavorite(product.id)}
                hitSlop={8}
                accessibilityLabel={favorite ? 'Verwijder uit favorieten' : 'Bewaar als favoriet'}
              >
                <Ionicons
                  name={favorite ? 'heart' : 'heart-outline'}
                  size={22}
                  color={colors.primary}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}>
        <View style={styles.imageWrap}>
          <ProductImagePlaceholder icon={category?.icon} size={72} />
          {product.imageUrl && (
            <Image
              source={product.imageUrl}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={200}
            />
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{category?.name}</Text>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.infoBox}>
            <Ionicons name="pricetag-outline" size={20} color={colors.primaryDark} />
            <Text style={styles.infoText}>
              Prijs en beschikbaarheid bepaal je rechtstreeks met de verhuurder
              {business ? ' (zakelijk tarief)' : ''}.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Verhuurd door</Text>
          {company ? (
            <View style={{ gap: spacing.md }}>
              <CompanyCard company={{ ...company, distance }} />
              <Button
                label="Route naar verhuurder"
                icon="navigate-outline"
                variant="secondary"
                onPress={() => openRoute(company.coordinates)}
              />
            </View>
          ) : (
            <Text style={styles.description}>
              Dit product wordt door meerdere verhuurbedrijven aangeboden. Bekijk op HandyRent welke
              verhuurder het dichtst bij jou zit.
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={[styles.cta, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          label={company ? 'Bekijk en huur bij verhuurder' : 'Bekijk verhuurders'}
          icon="open-outline"
          onPress={() => openInApp(url)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerActions: { flexDirection: 'row', gap: spacing.lg },
  imageWrap: { width: '100%', aspectRatio: 4 / 3, backgroundColor: colors.primarySoft },
  content: { padding: spacing.lg, gap: spacing.md },
  category: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  description: { fontSize: 15, lineHeight: 22, color: colors.text },
  infoBox: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  infoText: { flex: 1, fontSize: 14, color: colors.primaryDark, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  cta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
