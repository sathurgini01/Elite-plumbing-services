import { AdminPortalView } from '../../../../src/components/AdminPortalView';

type AdminCustomerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ['C-1001', 'C-1002', 'C-1003', 'C-1004'].map((id) => ({ id }));
}

export default async function AdminCustomerDetailPage({ params }: AdminCustomerDetailPageProps) {
  const { id } = await params;
  return <AdminPortalView mode="customer-detail" recordId={id} />;
}
