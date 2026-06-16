import { AdminPortalView } from '../../../../src/components/AdminPortalView';

type AdminWorkerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ['W-201', 'W-202', 'W-203'].map((id) => ({ id }));
}

export default async function AdminWorkerDetailPage({ params }: AdminWorkerDetailPageProps) {
  const { id } = await params;
  return <AdminPortalView mode="worker-detail" recordId={id} />;
}
