'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/signup', '/forget-password'].includes(pathname);

  return (
    <>
      {!isAuthPage && <Header />}
      <div className="w-full h-full">{children}</div>
      <Toaster />
      {!isAuthPage && <Footer />}
    </>
  );
}