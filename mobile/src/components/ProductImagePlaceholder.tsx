import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

type Props = { icon?: string; size?: number };

export function ProductImagePlaceholder({ icon = 'hammer-outline', size = 36 }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={size} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
});
