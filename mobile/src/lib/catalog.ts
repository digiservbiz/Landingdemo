import { categories, companies, products } from '@/data/catalog';
import type { Category, Coordinates, Product, RentalCompany } from '@/data/types';
import { distanceKm } from '@/lib/geo';

export type WithDistance<T> = T & { distance?: number };

export const getCategories = (): Category[] => categories;

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getCompany = (id: string) => companies.find((c) => c.id === id);

export const getProduct = (id: string) => products.find((p) => p.id === id);

export function productDistance(product: Product, origin: Coordinates | null) {
  const company = product.companyId ? getCompany(product.companyId) : undefined;
  if (!origin || !company) return undefined;
  return distanceKm(origin, company.coordinates);
}

const byDistance = (a: { distance?: number }, b: { distance?: number }) =>
  (a.distance ?? Infinity) - (b.distance ?? Infinity);

const normalize = (s: string) => s.toLocaleLowerCase('nl-NL').normalize('NFD').replace(/[̀-ͯ]/g, '');

export type ProductQuery = {
  text?: string;
  categorySlug?: string;
  origin: Coordinates | null;
  /** Only listings within this many kilometres; listings without a known location are kept. */
  radiusKm?: number;
};

export function searchProducts({ text, categorySlug, origin, radiusKm }: ProductQuery) {
  const needle = text ? normalize(text.trim()) : '';
  return products
    .filter((p) => !categorySlug || p.categorySlug === categorySlug)
    .filter((p) => {
      if (!needle) return true;
      const category = getCategory(p.categorySlug);
      return normalize(`${p.name} ${p.description} ${category?.name ?? ''}`).includes(needle);
    })
    .map((p): WithDistance<Product> => ({ ...p, distance: productDistance(p, origin) }))
    .filter((p) => radiusKm === undefined || p.distance === undefined || p.distance <= radiusKm)
    .sort(byDistance);
}

export function searchCompanies(origin: Coordinates | null, radiusKm?: number) {
  return companies
    .map(
      (c): WithDistance<RentalCompany> => ({
        ...c,
        distance: origin ? distanceKm(origin, c.coordinates) : undefined,
      }),
    )
    .filter((c) => radiusKm === undefined || c.distance === undefined || c.distance <= radiusKm)
    .sort(byDistance);
}

export const getCompanyProducts = (companyId: string) =>
  products.filter((p) => p.companyId === companyId);
