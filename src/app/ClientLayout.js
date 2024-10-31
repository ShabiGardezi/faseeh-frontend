"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@/contexts/UserContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = ["/login", "/signup", "/forget-password"].includes(
    pathname
  );
  const isProtectedPage = ["/me"].includes(pathname);
  const { isAuthenticated } = useUser();
  const router = useRouter();

  if (!isAuthenticated && isProtectedPage) {
    router.push("/login");
    return null;
  }

  return (
    <>
      {!isAuthPage && <Header />}
      <div className="w-full h-full">{children}</div>
      <Toaster />
      {!isAuthPage && <Footer />}
    </>
  );
}
