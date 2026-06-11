import { AuthView } from '../../src/components/AuthView';
import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Sign In',
  description: 'Sign in to manage Elite Plumbing Services bookings, invoices, and engineer updates.',
  path: '/signin',
  noIndex: true,
});

export default function SignInPage() {
  return <AuthView mode="signin" />;
}
