import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Customer Account',
  description: 'Private Elite Plumbing Services customer account area.',
  path: '/customer/bookings',
  noIndex: true,
});

export default function CustomerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
