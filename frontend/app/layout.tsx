import type { Metadata } from 'next';
import { AppShell } from '../src/components/AppShell';
import { JsonLd } from '../src/components/JsonLd';
import { localBusinessJsonLd, rootMetadata, websiteJsonLd } from '../src/seo';
import '../src/index.css';

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
