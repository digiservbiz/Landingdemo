import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';
import type { ColorValue } from 'react-native';

import { colors } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

type TabIconProps = { color: ColorValue; focused: boolean; size: number };

function tabIcon(name: IconName, focusedName: IconName) {
  return function TabIcon({ color, focused, size }: TabIconProps) {
    return <Ionicons name={focused ? focusedName : name} size={size} color={color} />;
  };
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerTitleStyle: { fontWeight: '700', color: colors.text },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ontdek',
          headerShown: false,
          tabBarIcon: tabIcon('home-outline', 'home'),
        }}
      />
      <Tabs.Screen
        name="zoeken"
        options={{ title: 'Zoeken', tabBarIcon: tabIcon('search-outline', 'search') }}
      />
      <Tabs.Screen
        name="verhuurbedrijven"
        options={{
          title: 'Verhuurders',
          headerTitle: 'Verhuurbedrijven',
          tabBarIcon: tabIcon('storefront-outline', 'storefront'),
        }}
      />
      <Tabs.Screen
        name="favorieten"
        options={{ title: 'Favorieten', tabBarIcon: tabIcon('heart-outline', 'heart') }}
      />
      <Tabs.Screen
        name="meer"
        options={{ title: 'Meer', tabBarIcon: tabIcon('menu-outline', 'menu') }}
      />
    </Tabs>
  );
}
