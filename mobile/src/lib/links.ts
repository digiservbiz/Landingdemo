import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';

import type { Coordinates } from '@/data/types';
import { colors } from '@/theme';

export const SITE_URL = 'https://www.handyrent.nl';

export function siteUrl(path: string, business?: boolean): string {
  const url = `${SITE_URL}${path}`;
  if (business === undefined) return url;
  return `${url}${url.includes('?') ? '&' : '?'}business=${business}`;
}

export function openInApp(url: string) {
  return WebBrowser.openBrowserAsync(url, {
    toolbarColor: colors.primary,
    controlsColor: colors.primary,
  });
}

export function openRoute({ latitude, longitude }: Coordinates) {
  return Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
  );
}

export function openExternal(url: string) {
  return Linking.openURL(url);
}
