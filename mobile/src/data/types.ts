export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  /** Ionicons glyph name used for the category tile. */
  icon: string;
  /** Path on handyrent.nl, relative to the site root. */
  webPath: string;
};

export type RentalCompany = {
  id: string;
  name: string;
  city: string;
  province: string;
  coordinates: Coordinates;
  categorySlugs: string[];
  webPath: string;
};

export type Product = {
  id: string;
  name: string;
  categorySlug: string;
  description: string;
  imageUrl?: string;
  /** Unknown when the listing is not tied to a single rental company in the local catalog. */
  companyId?: string;
  webPath: string;
};
