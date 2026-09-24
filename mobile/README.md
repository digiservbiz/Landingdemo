# HandyRent mobiele app

Native iOS/Android app (plus web) for [handyrent.nl](https://www.handyrent.nl): find tool and machine rental companies near you. Built with Expo SDK 57, Expo Router and TypeScript. The UI is in Dutch, like the website.

## Features

| Tab | What it does |
| --- | --- |
| **Ontdek** | Hero search, category grid, popular listings near your location, "Zo werkt HandyRent" |
| **Zoeken** | Full-text search with category and radius filters (10/25/50/100 km or heel NL), sorted by distance |
| **Verhuurders** | Rental companies within your radius, with detail pages, route and "Bekijk op HandyRent" |
| **Favorieten** | Saved listings, persisted on the device |
| **Meer** | Private/business toggle (passes `?business=` to listing pages), about/service/blog links, sign-up for rental companies, socials, legal pages |

- Location comes from GPS (`expo-location`) or from a list of Dutch cities.
- Listing pages open on handyrent.nl in an in-app browser (`expo-web-browser`), so renting still happens directly with the rental company, the same as on the website.
- Location, radius, business mode and favourites are stored with AsyncStorage.

## Getting started

```bash
cd mobile
npm install
npx expo start        # press i / a / w, or scan the QR code with Expo Go
```

Checks:

```bash
npm run typecheck
npm run lint
```

## Project layout

```
src/
  app/                 Expo Router routes
    (tabs)/            index (Ontdek), zoeken, verhuurbedrijven, favorieten, meer
    product/[id].tsx   Listing detail
    verhuurder/[id].tsx
    categorie/[slug].tsx
    locatie.tsx        Location picker (modal)
  components/          Reusable UI
  context/AppState.tsx Location, radius, business mode and favourites
  data/                Catalog data (categories, companies, products, cities)
  lib/                 Catalog queries, distance maths, link helpers
  theme.ts             HandyRent colours (#ED1C24 / #932025)
```

## Connecting real data

`src/data/catalog.ts` holds a small local catalog that mirrors the public structure of handyrent.nl: its categories, some real listings and rental companies, and product photos from its CDN. Screens read data only through `src/lib/catalog.ts`. To go live, replace those functions with calls to the HandyRent backend; screens don't need to change.

## Building for the stores

Use EAS (no local Xcode/Android Studio needed):

```bash
npx eas-cli@latest build --platform all
npx eas-cli@latest submit
```

Bundle identifiers are `nl.handyrent.app` (iOS and Android). You can change them in `app.json`.
