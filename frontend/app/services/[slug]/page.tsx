import { notFound } from 'next/navigation';
import { JsonLd } from '../../../src/components/JsonLd';
import { ServicesView } from '../../../src/components/ServicesView';
import { SERVICE_CATEGORIES } from '../../../src/data';
import {
  cleanServiceName,
  createPageMetadata,
  getServiceCategoryBySlug,
  getServiceCategoryHref,
  serviceCategoryJsonLd,
} from '../../../src/seo';

type ServiceCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: ServiceCategoryPageProps) {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);

  if (!category) {
    return createPageMetadata({
      title: 'Plumbing Services in London',
      description:
        'Explore emergency plumbing, boiler repairs, heating, drainage, leak detection, bathroom, kitchen, gas, landlord, and commercial plumbing services in London.',
      path: '/services',
      noIndex: true,
    });
  }

  const serviceName = cleanServiceName(category.name);

  return createPageMetadata({
    title: `${serviceName} in London`,
    description: `${category.shortDescription} Book ${serviceName.toLowerCase()} with Elite Plumbing Services across London.`,
    path: getServiceCategoryHref(category),
  });
}

export default async function ServiceCategoryPage({ params }: ServiceCategoryPageProps) {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const jsonLd = serviceCategoryJsonLd(slug);

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <ServicesView initialCategoryId={category.id} />
    </>
  );
}
