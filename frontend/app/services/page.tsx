import { ServicesView } from '../../src/components/ServicesView';

export const dynamic = 'force-dynamic';

type ServicesPageProps = {
  searchParams?: Promise<{
    categoryId?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams;

  return <ServicesView initialCategoryId={params?.categoryId ?? null} />;
}
