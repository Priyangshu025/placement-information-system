import type { Metadata } from 'next';
import './globals.css';
import { getCurrentUser } from '@/lib/auth';
import DemoRoleBar from '@/components/DemoRoleBar';

export const metadata: Metadata = {
  title: 'Campus Placement Information System (PIS)',
  description: 'A modern, centralized campus recruitment and placement management platform.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
        <DemoRoleBar
          currentRole={currentUser?.role || 'student'}
          currentUserName={currentUser?.name || 'Guest User'}
        />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}

