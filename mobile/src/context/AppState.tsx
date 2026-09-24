import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Coordinates } from '@/data/types';

export type UserLocation = {
  label: string;
  coordinates: Coordinates;
  source: 'gps' | 'city';
};

/** `undefined` means no distance limit. */
export type Radius = 10 | 25 | 50 | 100 | undefined;

export const RADIUS_OPTIONS: Radius[] = [10, 25, 50, 100, undefined];

type PersistedState = {
  location: UserLocation | null;
  radiusKm: Radius;
  business: boolean;
  favorites: string[];
};

type AppState = PersistedState & {
  hydrated: boolean;
  locating: boolean;
  setLocation: (location: UserLocation | null) => void;
  locateDevice: () => Promise<{ ok: true } | { ok: false; reason: string }>;
  setRadius: (radius: Radius) => void;
  setBusiness: (business: boolean) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
};

const STORAGE_KEY = 'handyrent:state:v1';

const initialState: PersistedState = {
  location: null,
  radiusKm: 50,
  business: false,
  favorites: [],
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setState({ ...initialState, ...JSON.parse(raw) });
      })
      .catch(() => {})
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, hydrated]);

  const setLocation = useCallback(
    (location: UserLocation | null) => setState((s) => ({ ...s, location })),
    [],
  );

  const locateDevice = useCallback(async () => {
    setLocating(true);
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        return { ok: false as const, reason: 'Geen toestemming om je locatie te gebruiken.' };
      }
      const position =
        (await Location.getLastKnownPositionAsync()) ??
        (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }));
      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      let label = 'Huidige locatie';
      try {
        const [address] = await Location.reverseGeocodeAsync(coordinates);
        if (address?.city) label = address.city;
      } catch {
        // Reverse geocoding is unavailable on some platforms; keep the generic label.
      }
      setState((s) => ({ ...s, location: { label, coordinates, source: 'gps' } }));
      return { ok: true as const };
    } catch {
      return { ok: false as const, reason: 'Je locatie kon niet worden bepaald.' };
    } finally {
      setLocating(false);
    }
  }, []);

  const setRadius = useCallback((radiusKm: Radius) => setState((s) => ({ ...s, radiusKm })), []);

  const setBusiness = useCallback((business: boolean) => setState((s) => ({ ...s, business })), []);

  const toggleFavorite = useCallback(
    (productId: string) =>
      setState((s) => ({
        ...s,
        favorites: s.favorites.includes(productId)
          ? s.favorites.filter((id) => id !== productId)
          : [...s.favorites, productId],
      })),
    [],
  );

  const value = useMemo<AppState>(
    () => ({
      ...state,
      hydrated,
      locating,
      setLocation,
      locateDevice,
      setRadius,
      setBusiness,
      isFavorite: (id) => state.favorites.includes(id),
      toggleFavorite,
    }),
    [state, hydrated, locating, setLocation, locateDevice, setRadius, setBusiness, toggleFavorite],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
