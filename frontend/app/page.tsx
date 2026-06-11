import { HomeView } from '../src/components/HomeView';
import { JsonLd } from '../src/components/JsonLd';
import { createPageMetadata, faqJsonLd, reviewsJsonLd } from '../src/seo';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: '24/7 Emergency Plumbers in London',
  description:
    'Call Elite Plumbing Services for 24/7 emergency plumbers in London, fast leak repairs, boiler and heating support, drainage services, and clear upfront pricing.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(), reviewsJsonLd()]} />
      <HomeView />
    </>
  );
}
