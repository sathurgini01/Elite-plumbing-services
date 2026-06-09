import { BookingWizard } from '../../src/components/BookingWizard';

export const dynamic = 'force-dynamic';

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
