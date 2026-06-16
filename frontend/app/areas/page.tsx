import { AreasCoveredView } from '../../src/components/AreasCoveredView';
import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Areas Covered by Our London Plumbers',
  description:
    'Elite Plumbing Services covers West, South West, Central, North, East, and South East London for emergency and scheduled plumbing visits.',
  path: '/areas',
  image: '/images/areas-covered-london-plumber.jpg',
});

export default function AreasPage() {
  return <AreasCoveredView />;
}
