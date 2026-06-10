'use client';

import { usePathname } from 'next/navigation';
import { EmergencyBar } from './EmergencyBar';
import { Footer } from './Footer';
import { Header } from './Header';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideSiteChrome = pathname === '/terms';

  return (
    <div className="min-h-screen bg-[#050505] text-[#E5E7EB] flex flex-col font-sans antialiased">
      {!hideSiteChrome && <EmergencyBar />}
      {!hideSiteChrome && <Header />}
      <main className="flex-1">{children}</main>
      {!hideSiteChrome && <Footer />}
    </div>
  );
}
