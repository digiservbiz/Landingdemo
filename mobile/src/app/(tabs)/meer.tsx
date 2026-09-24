import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { useAppState } from '@/context/AppState';
import { openExternal, openInApp, siteUrl } from '@/lib/links';
import { colors, radius, spacing } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;
type Row = { icon: IconName; label: string; onPress: () => void };

const web = (path: string) => () => openInApp(siteUrl(path));

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: 'HandyRent',
    rows: [
      { icon: 'information-circle-outline', label: 'Over ons', onPress: web('/over-ons') },
      { icon: 'help-buoy-outline', label: 'Service', onPress: web('/service') },
      { icon: 'newspaper-outline', label: 'Blogs', onPress: web('/blogs-handy-rent') },
      { icon: 'globe-outline', label: 'Open handyrent.nl', onPress: web('/') },
    ],
  },
  {
    title: 'Voor verhuurbedrijven',
    rows: [
      { icon: 'add-circle-outline', label: 'Verhuurbedrijf aanmelden', onPress: web('/service') },
    ],
  },
  {
    title: 'Volg ons',
    rows: [
      {
        icon: 'logo-instagram',
        label: 'Instagram',
        onPress: () => openExternal('https://instagram.com/handyrent.nl'),
      },
      {
        icon: 'logo-facebook',
        label: 'Facebook',
        onPress: () => openExternal('https://facebook.com/profile.php?id=61564205223065'),
      },
      {
        icon: 'logo-linkedin',
        label: 'LinkedIn',
        onPress: () => openExternal('https://linkedin.com/company/handyrent-nl'),
      },
    ],
  },
  {
    title: 'Juridisch',
    rows: [
      {
        icon: 'document-text-outline',
        label: 'Gebruikersvoorwaarden',
        onPress: web('/gebruikersvoorwaarden'),
      },
      {
        icon: 'shield-checkmark-outline',
        label: 'Privacy statement',
        onPress: web('/privacybeleid-handyrent'),
      },
      { icon: 'alert-circle-outline', label: 'Disclaimer', onPress: web('/disclaimer') },
    ],
  },
];

export default function MoreScreen() {
  const { business, setBusiness } = useAppState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Voorkeuren</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="briefcase-outline" size={22} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Zakelijk huren</Text>
              <Text style={styles.rowHint}>
                Toon zakelijke prijzen en voorwaarden bij verhuurders
              </Text>
            </View>
            <Switch
              value={business}
              onValueChange={setBusiness}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={colors.white}
              accessibilityLabel="Zakelijk huren"
            />
          </View>
        </View>
      </View>

      {GROUPS.map((group) => (
        <View key={group.title} style={styles.group}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <View style={styles.card}>
            {group.rows.map((row, i) => (
              <Pressable
                key={row.label}
                onPress={row.onPress}
                style={({ pressed }) => [
                  styles.row,
                  i > 0 && styles.rowDivider,
                  pressed && { backgroundColor: colors.background },
                ]}
                accessibilityRole="link"
              >
                <Ionicons name={row.icon} size={22} color={colors.primary} />
                <Text style={[styles.rowLabel, { flex: 1 }]}>{row.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>HandyRent · Palet 10, 7606 GZ Almelo</Text>
        <Text style={styles.footerText}>Versie {Constants.expoConfig?.version ?? '1.0.0'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.xl },
  group: { gap: spacing.sm },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: spacing.xs,
  },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  rowLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
  rowHint: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  footer: { alignItems: 'center', gap: 4 },
  footerText: { fontSize: 12, color: colors.textMuted },
});
