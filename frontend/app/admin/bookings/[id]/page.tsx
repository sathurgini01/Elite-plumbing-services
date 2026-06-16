import { AdminPortalView } from '../../../../src/components/AdminPortalView';

type AdminBookingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ['EP-6128', 'EP-6094', 'EP-5902', 'EP-5840'].map((id) => ({ id }));
}

export default async function AdminBookingDetailPage({ params }: AdminBookingDetailPageProps) {
  const { id } = await params;
  return <AdminPortalView mode="booking-detail" recordId={id} />;
}
