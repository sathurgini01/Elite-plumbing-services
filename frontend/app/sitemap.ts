import type { MetadataRoute } from 'next';
import { SERVICE_CATEGORIES } from '../src/data';
import { absoluteUrl, getServiceCategoryHref, publicPages } from '../src/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const publicRoutes = publicPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.path === '/' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const serviceRoutes = SERVICE_CATEGORIES.map((category) => ({
    url: absoluteUrl(getServiceCategoryHref(category)),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: category.isEmergency ? 0.95 : 0.85,
  })) satisfies MetadataRoute.Sitemap;

  return [...publicRoutes, ...serviceRoutes];
}
