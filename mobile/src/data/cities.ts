import type { Coordinates } from './types';

export type City = { name: string; coordinates: Coordinates };

// Fallback locations for users who do not share their GPS position.
export const cities: City[] = [
  { name: 'Almelo', coordinates: { latitude: 52.3567, longitude: 6.6625 } },
  { name: 'Amsterdam', coordinates: { latitude: 52.3676, longitude: 4.9041 } },
  { name: 'Apeldoorn', coordinates: { latitude: 52.2112, longitude: 5.9699 } },
  { name: 'Arnhem', coordinates: { latitude: 51.9851, longitude: 5.8987 } },
  { name: 'Breda', coordinates: { latitude: 51.5719, longitude: 4.7683 } },
  { name: 'Den Haag', coordinates: { latitude: 52.0705, longitude: 4.3007 } },
  { name: 'Eindhoven', coordinates: { latitude: 51.4416, longitude: 5.4697 } },
  { name: 'Enschede', coordinates: { latitude: 52.2215, longitude: 6.8937 } },
  { name: 'Groningen', coordinates: { latitude: 53.2194, longitude: 6.5665 } },
  { name: 'Leeuwarden', coordinates: { latitude: 53.2012, longitude: 5.7999 } },
  { name: 'Maastricht', coordinates: { latitude: 50.8514, longitude: 5.691 } },
  { name: 'Meppel', coordinates: { latitude: 52.6958, longitude: 6.1944 } },
  { name: 'Nijmegen', coordinates: { latitude: 51.8126, longitude: 5.8372 } },
  { name: 'Rotterdam', coordinates: { latitude: 51.9244, longitude: 4.4777 } },
  { name: 'Tilburg', coordinates: { latitude: 51.5555, longitude: 5.0913 } },
  { name: 'Utrecht', coordinates: { latitude: 52.0907, longitude: 5.1214 } },
  { name: 'Zwolle', coordinates: { latitude: 52.5168, longitude: 6.083 } },
];
