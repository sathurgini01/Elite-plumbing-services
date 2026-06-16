import { BookingWizard } from '../../src/components/BookingWizard';
import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Book a London Plumber',
  description:
    'Book a plumbing, heating, drainage, leak repair, or emergency plumber visit with Elite Plumbing Services in London.',
  path: '/booking',
  noIndex: true,
});

export default function BookingPage() {
  return <BookingWizard initialParams={null} />;
}
