import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Plumber Portal',
  description: 'Private Elite Plumbing Services plumber portal.',
  path: '/plumber/dashboard',
  noIndex: true,
});

export default function PlumberLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
