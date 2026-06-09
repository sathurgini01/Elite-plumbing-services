import type { Metadata } from 'next';
import { EmergencyBar } from '../src/components/EmergencyBar';
import { Footer } from '../src/components/Footer';
import { Header } from '../src/components/Header';
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
        <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E0] flex flex-col font-sans antialiased">
          <EmergencyBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
