import { ScrollView, StyleSheet } from 'react-native';

import { RADIUS_OPTIONS, useAppState } from '@/context/AppState';
import { spacing } from '@/theme';

import { Chip } from './Chip';

export function RadiusPicker() {
  const { radiusKm, setRadius } = useAppState();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {RADIUS_OPTIONS.map((r) => (
        <Chip
          key={r ?? 'all'}
          label={r ? `${r} km` : 'Heel NL'}
          selected={radiusKm === r}
          onPress={() => setRadius(r)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.sm, paddingHorizontal: spacing.lg },
});
