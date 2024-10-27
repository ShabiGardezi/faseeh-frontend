import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "فصيح",
  description: "Digitalize your Business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Header />
        <div className="w-full h-full">{children}</div>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
