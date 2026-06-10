import { AdminPortalView } from '../../../../src/components/AdminPortalView';

type AdminWorkerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminWorkerDetailPage({ params }: AdminWorkerDetailPageProps) {
  const { id } = await params;
  return <AdminPortalView mode="worker-detail" recordId={id} />;
}
