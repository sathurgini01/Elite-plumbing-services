import { WorkerPortalView } from '../../../../src/components/WorkerPortalView';

type PlumberJobDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ['EP-6128', 'EP-6094', 'EP-5902', 'EP-5840'].map((id) => ({ id }));
}

export default async function PlumberJobDetailPage({ params }: PlumberJobDetailPageProps) {
  const { id } = await params;
  return <WorkerPortalView mode="job-detail" jobId={id} />;
}
