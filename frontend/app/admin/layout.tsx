import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Admin Portal',
  description: 'Private Elite Plumbing Services admin portal.',
  path: '/admin/dashboard',
  noIndex: true,
});

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
