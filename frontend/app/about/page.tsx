import { AboutView } from '../../src/components/AboutView';
import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'About Our Gas Safe London Plumbers',
  description:
    'Learn about Elite Plumbing Services, Gas Safe registration, insured workmanship, London service standards, and our 12-month plumbing guarantee.',
  path: '/about',
  image: '/images/why-choose-quality-plumbing.jpg',
});

export default function AboutPage() {
  return <AboutView />;
}
