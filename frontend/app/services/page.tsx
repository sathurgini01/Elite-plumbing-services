import { ServicesView } from '../../src/components/ServicesView';
import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Plumbing Services in London',
  description:
    'Explore emergency plumbing, boiler repairs, heating, drainage, leak detection, bathroom, kitchen, gas, landlord, and commercial plumbing services in London.',
  path: '/services',
});

export default function ServicesPage() {
  return <ServicesView initialCategoryId={null} />;
}
