import { ServicesView } from '../../src/components/ServicesView';
import { createPageMetadata } from '../../src/seo';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: 'Plumbing Services in London',
  description:
    'Explore emergency plumbing, boiler repairs, heating, drainage, leak detection, bathroom, kitchen, gas, landlord, and commercial plumbing services in London.',
  path: '/services',
});

type ServicesPageProps = {
  searchParams?: Promise<{
    categoryId?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams;

  return <ServicesView initialCategoryId={params?.categoryId ?? null} />;
}
