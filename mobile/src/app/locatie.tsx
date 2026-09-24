import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/Button';
import { RadiusPicker } from '@/components/RadiusPicker';
import { useAppState } from '@/context/AppState';
import { cities } from '@/data/cities';
import { colors, radius, spacing } from '@/theme';

export default function LocationScreen() {
  const { location, setLocation, locateDevice, locating } = useAppState();
  const [filter, setFilter] = useState('');
  const [error, setError] = useState<string | null>(null);

  const matches = useMemo(() => {
    const needle = filter.trim().toLocaleLowerCase('nl-NL');
    return cities.filter((c) => c.name.toLocaleLowerCase('nl-NL').includes(needle));
  }, [filter]);

  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  const useGps = async () => {
    setError(null);
    const result = await locateDevice();
    if (result.ok) close();
    else setError(result.reason);
  };

  return (
    <FlatList
      data={matches}
      keyExtractor={(c) => c.name}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.header}>
          <Button
            label="Gebruik mijn huidige locatie"
            icon="locate"
            loading={locating}
            onPress={useGps}
          />
          {error && <Text style={styles.error}>{error}</Text>}

          <Text style={styles.label}>Zoekstraal</Text>
          <View style={styles.bleed}>
            <RadiusPicker />
          </View>

          <Text style={styles.label}>Of kies een plaats</Text>
          <View style={styles.search}>
            <Ionicons name="search" size={18} color={colors.textMuted} />
            <TextInput
              value={filter}
              onChangeText={setFilter}
              placeholder="Zoek plaats"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              accessibilityLabel="Zoek plaats"
            />
          </View>
        </View>
      }
      renderItem={({ item }) => {
        const selected = location?.source === 'city' && location.label === item.name;
        return (
          <Pressable
            onPress={() => {
              setLocation({ label: item.name, coordinates: item.coordinates, source: 'city' });
              close();
            }}
            style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.background }]}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            <Text style={[styles.city, selected && { color: colors.primary }]}>{item.name}</Text>
            {selected && <Ionicons name="checkmark" size={20} color={colors.primary} />}
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg },
  header: { gap: spacing.md, marginBottom: spacing.md },
  bleed: { marginHorizontal: -spacing.lg },
  error: { color: colors.primaryDark, fontSize: 14 },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.sm,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: { flex: 1, fontSize: 15, paddingVertical: 12, color: colors.text },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  city: { fontSize: 16, color: colors.text },
});
