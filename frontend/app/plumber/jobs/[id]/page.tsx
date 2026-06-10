import { WorkerPortalView } from '../../../../src/components/WorkerPortalView';

type PlumberJobDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PlumberJobDetailPage({ params }: PlumberJobDetailPageProps) {
  const { id } = await params;
  return <WorkerPortalView mode="job-detail" jobId={id} />;
}
