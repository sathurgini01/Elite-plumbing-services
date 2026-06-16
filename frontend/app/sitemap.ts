import type { MetadataRoute } from 'next';
import { SERVICE_CATEGORIES } from '../src/data';
import { absoluteUrl, getServiceCategoryHref, publicPages } from '../src/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-06-16');

  const publicRoutes = publicPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.path === '/' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const serviceRoutes = SERVICE_CATEGORIES.map((category) => ({
    url: absoluteUrl(getServiceCategoryHref(category)),
    lastModified,
    changeFrequency: 'monthly',
    priority: category.isEmergency ? 0.95 : 0.85,
  })) satisfies MetadataRoute.Sitemap;

  return [...publicRoutes, ...serviceRoutes];
}
