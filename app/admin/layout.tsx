import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-37px)] bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-bold text-slate-900">Platform Super Administration</h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
              Root Level Authority
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-500 hidden sm:inline">
              User: <strong>{currentUser?.name || 'Chief Administrator'}</strong>
            </span>
            <Link
              href="/"
              className="text-rose-600 hover:text-rose-800 font-semibold"
            >
              Public Site →
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

