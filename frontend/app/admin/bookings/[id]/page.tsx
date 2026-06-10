import { AdminPortalView } from '../../../../src/components/AdminPortalView';

type AdminBookingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminBookingDetailPage({ params }: AdminBookingDetailPageProps) {
  const { id } = await params;
  return <AdminPortalView mode="booking-detail" recordId={id} />;
}
