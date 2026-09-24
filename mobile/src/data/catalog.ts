import type { Category, Product, RentalCompany } from './types';

// Local catalog mirroring the public structure of handyrent.nl. Replace these
// arrays with calls to the HandyRent backend once an API is available; screens
// only read through the functions in `src/lib/catalog.ts`.

export const categories: Category[] = [
  {
    slug: 'graaf-en-grondverzet',
    name: 'Graaf en grondverzet',
    description: 'Minigravers, graafmachines, dumpers en minikippers voor grondwerk.',
    icon: 'construct-outline',
    webPath: '/gereedschapsverhuur/graaf-en-grondverzet',
  },
  {
    slug: 'hoogwerkers-en-ladders',
    name: 'Hoogwerkers en ladders',
    description: 'Schaarhoogwerkers, spinhoogwerkers, steigers en ladders.',
    icon: 'trending-up-outline',
    webPath: '/gereedschapsverhuur/hoogwerkers-en-ladders',
  },
  {
    slug: 'heftrucks-en-transportmiddelen',
    name: 'Heftrucks en transportmiddelen',
    description: 'Heftrucks, verreikers, aanhangwagens en hulpstukken.',
    icon: 'car-outline',
    webPath: '/gereedschapsverhuur/heftrucks-en-transportmiddelen',
  },
  {
    slug: 'tuin-en-bestratinguitrusting',
    name: 'Tuin en bestratinguitrusting',
    description: 'Kettingzagen, versnipperaars, kantensnijders en trilplaten.',
    icon: 'leaf-outline',
    webPath: '/gereedschapsverhuur/tuin-en-bestratinguitrusting',
  },
  {
    slug: 'verf-en-afwerkingsapparatuur',
    name: 'Verf en afwerkingsapparatuur',
    description: 'Verfspuiten, schuurmachines en afwerkingsgereedschap.',
    icon: 'color-palette-outline',
    webPath: '/gereedschapsverhuur/verf-en-afwerkingsapparatuur',
  },
  {
    slug: 'reinigingsapparatuur',
    name: 'Reinigingsapparatuur',
    description: 'Hogedrukreinigers, bouwdrogers en tapijtreinigers.',
    icon: 'water-outline',
    webPath: '/gereedschapsverhuur/reinigingsapparatuur',
  },
  {
    slug: 'installatie',
    name: 'Installatie',
    description: 'Gereedschap voor loodgieters-, elektra- en installatiewerk.',
    icon: 'flash-outline',
    webPath: '/gereedschapsverhuur/installatie',
  },
];

export const companies: RentalCompany[] = [
  {
    id: 'ce0001-schreur-hoogwerksystemen-rogat',
    name: 'Schreur Hoogwerksystemen',
    city: 'Rogat',
    province: 'Drenthe',
    coordinates: { latitude: 52.7353, longitude: 6.2442 },
    categorySlugs: ['hoogwerkers-en-ladders', 'tuin-en-bestratinguitrusting'],
    webPath: '/verhuurbedrijven/ce0001-schreur-hoogwerksystemen-rogat',
  },
  {
    id: 'dc0001-j.vd-zwaag-verhuur-lutjesgast',
    name: 'J. vd Zwaag Verhuur',
    city: 'Lutjegast',
    province: 'Groningen',
    coordinates: { latitude: 53.2336, longitude: 6.2642 },
    categorySlugs: ['graaf-en-grondverzet'],
    webPath: '/verhuurbedrijven/dc0001-j.vd-zwaag-verhuur-lutjesgast',
  },
  {
    id: 'fe0002-geco-verhuur-wijk-bij-duurstede',
    name: 'GECO Verhuur',
    city: 'Wijk bij Duurstede',
    province: 'Utrecht',
    coordinates: { latitude: 51.9745, longitude: 5.3417 },
    categorySlugs: ['heftrucks-en-transportmiddelen'],
    webPath: '/verhuurbedrijven/fe0002-geco-verhuur-wijk-bij-duurstede',
  },
];

const CDN = 'https://handy-rent.b-cdn.net/products/images';

export const products: Product[] = [
  {
    id: 'minigraver-bobcat-e20',
    name: 'Minigraver huren - Bobcat E20',
    categorySlug: 'graaf-en-grondverzet',
    description:
      'Compacte minigraver voor graaf- en grondverzetwerk op kleine of moeilijk bereikbare locaties. Geschikt voor sleuven graven, tuinaanleg en licht sloopwerk.',
    companyId: 'dc0001-j.vd-zwaag-verhuur-lutjesgast',
    webPath:
      '/verhuurbedrijven/dc0001-j.vd-zwaag-verhuur-lutjesgast/graaf-en-grondverzet/002-minigraver-huren-bobcat-e20',
  },
  {
    id: 'houtversnipperaar-19cm',
    name: 'Houtversnipperaar 19 cm doorvoer',
    categorySlug: 'tuin-en-bestratinguitrusting',
    description:
      'Universele, duurzame en betrouwbare houtversnipperaar, geschikt voor alle soorten snoeihout tot 19 cm doorsnede.',
    companyId: 'ce0001-schreur-hoogwerksystemen-rogat',
    webPath:
      '/verhuurbedrijven/ce0001-schreur-hoogwerksystemen-rogat/versnipperaar/46-houtversnipperaar-huren-19-cm-doorvoer',
  },
  {
    id: 'ruwterrein-heftruck-2-5-ton',
    name: 'Ruwterrein heftruck 2,5 ton',
    categorySlug: 'heftrucks-en-transportmiddelen',
    description:
      'Heftruck voor onverhard terrein met een hefvermogen van 2,5 ton. Ideaal voor bouwplaatsen en buitenopslag.',
    companyId: 'fe0002-geco-verhuur-wijk-bij-duurstede',
    webPath:
      '/verhuurbedrijven/fe0002-geco-verhuur-wijk-bij-duurstede/heftrucks-en-transportmiddelen/083.2500-ruwterrein-heftruck-25-ton',
  },
  {
    id: 'minikraan-1600kg',
    name: 'Minikraan 1600 kg',
    categorySlug: 'hoogwerkers-en-ladders',
    description: 'Compacte rupskraan met 1600 kg hefvermogen die door smalle doorgangen past.',
    imageUrl: `${CDN}/1789304494036_Minikraan-1600-kg-diesel-copy-2048x1367.webp`,
    webPath: '/gereedschapsverhuur/hoogwerkers-en-ladders',
  },
  {
    id: 'wacker-neuson-et20',
    name: 'Wacker Neuson ET20',
    categorySlug: 'graaf-en-grondverzet',
    description: 'Wendbare 2-tons minigraver voor grondwerk, tuinaanleg en funderingswerk.',
    imageUrl: `${CDN}/1745049906156_wacker%20et20.webp`,
    webPath: '/gereedschapsverhuur/graaf-en-grondverzet',
  },
  {
    id: 'bobcat-e10z',
    name: 'Bobcat E10Z graafmachine',
    categorySlug: 'graaf-en-grondverzet',
    description:
      'Ultracompacte graafmachine die door deuropeningen past; ideaal voor achtertuinen.',
    imageUrl: `${CDN}/1743508944011_hamusta-verhuur-bobcat-graafmachine-1307-01.webp`,
    webPath: '/gereedschapsverhuur/graaf-en-grondverzet',
  },
  {
    id: 'jako-tiger-10',
    name: 'Jako Tiger 10 minikipper',
    categorySlug: 'graaf-en-grondverzet',
    description: 'Minikipper om zand, grond en puin snel en rugvriendelijk te verplaatsen.',
    imageUrl: `${CDN}/1753264362317_63ee2edb-7e1e-4b2b-b834-847122391798.webp`,
    webPath: '/gereedschapsverhuur/graaf-en-grondverzet',
  },
  {
    id: 'zoomlion-zs0607ac',
    name: 'Zoomlion ZS0607AC Li schaarhoogwerker',
    categorySlug: 'hoogwerkers-en-ladders',
    description:
      'Elektrische schaarhoogwerker op lithium-accu, stil en emissievrij voor binnen en buiten.',
    imageUrl: `${CDN}/1779036215550_hgw3.webp`,
    webPath: '/gereedschapsverhuur/hoogwerkers-en-ladders',
  },
  {
    id: 'hinowa-17m',
    name: 'Spinhoogwerker Hinowa 17 meter',
    categorySlug: 'hoogwerkers-en-ladders',
    description:
      'Spinhoogwerker op rupsen met 17 meter werkhoogte, voor lastig bereikbare plekken.',
    imageUrl: `${CDN}/1762979177963_KM-verhuur%20-%2001%20.webp`,
    webPath: '/gereedschapsverhuur/hoogwerkers-en-ladders',
  },
  {
    id: 'steiger-10m',
    name: 'Steiger 10 meter',
    categorySlug: 'hoogwerkers-en-ladders',
    description: 'Rolsteiger met 10 meter werkhoogte voor schilder-, gevel- en dakwerk.',
    imageUrl: `${CDN}/1750260846148_rolsteiger-foto.webp`,
    webPath: '/gereedschapsverhuur/hoogwerkers-en-ladders',
  },
  {
    id: 'trapgat-steiger',
    name: 'Trapgat steiger',
    categorySlug: 'hoogwerkers-en-ladders',
    description: 'Verstelbare steiger voor veilig werken in trapgaten en op ongelijke vloeren.',
    imageUrl: `${CDN}/1750342309535_trapgat-steiger-foto.webp`,
    webPath: '/gereedschapsverhuur/hoogwerkers-en-ladders',
  },
  {
    id: 'graskantensnijder',
    name: 'Graskantensnijder',
    categorySlug: 'tuin-en-bestratinguitrusting',
    description: 'Gemotoriseerde kantensnijder voor strakke gazonranden langs paden en borders.',
    imageUrl: `${CDN}/1788361258270_graskantensnijder.webp`,
    webPath: '/gereedschapsverhuur/tuin-en-bestratinguitrusting',
  },
];
