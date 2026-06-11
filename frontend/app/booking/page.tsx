import { BookingWizard } from '../../src/components/BookingWizard';
import { createPageMetadata } from '../../src/seo';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: 'Book a London Plumber',
  description:
    'Book a plumbing, heating, drainage, leak repair, or emergency plumber visit with Elite Plumbing Services in London.',
  path: '/booking',
  noIndex: true,
});

type BookingPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  const firstValue = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

  return (
    <BookingWizard
      initialParams={{
        categoryId: firstValue(params?.categoryId),
        serviceId: firstValue(params?.serviceId),
        postcode: firstValue(params?.postcode),
        isEmergency: firstValue(params?.isEmergency) === 'true',
      }}
    />
  );
}
