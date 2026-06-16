import { ContactView } from '../../src/components/ContactView';
import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Contact Elite Plumbing Services',
  description:
    'Contact Elite Plumbing Services for 24/7 emergency plumbing dispatch, general enquiries, billing support, and London property maintenance requests.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactView />;
}
