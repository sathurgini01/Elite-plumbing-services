import { AuthView } from '../../src/components/AuthView';
import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Create an Account',
  description: 'Create an Elite Plumbing Services account to save property details and manage bookings.',
  path: '/signup',
  noIndex: true,
});

export default function SignUpPage() {
  return <AuthView mode="signup" />;
}
