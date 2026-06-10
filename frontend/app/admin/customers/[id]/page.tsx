import { AdminPortalView } from '../../../../src/components/AdminPortalView';

type AdminCustomerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminCustomerDetailPage({ params }: AdminCustomerDetailPageProps) {
  const { id } = await params;
  return <AdminPortalView mode="customer-detail" recordId={id} />;
}
