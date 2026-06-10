import type { Metadata } from 'next';
import { AppShell } from '../src/components/AppShell';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Elite Plumbing Services',
  description: '24/7 plumbing, heating, drainage, and Gas Safe services across London.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
