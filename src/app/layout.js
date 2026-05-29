import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { checkUser } from "@/lib/checkUser";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "AUTODRIVE-AI",
  description: "AI-powered car search, reservations, and messaging",
};

export default async function RootLayout({ children }) {
  await checkUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-[#071120] text-white overflow-x-hidden`}
        >
          <Header />
          <main className="min-h-screen w-full">{children}</main>
          <footer className="bg-black border-t border-white/10 text-white py-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-sm text-gray-400">
                © 2026 AUTODRIVE-AI. All rights reserved.
              </p>
            </div>
          </footer>
          <Toaster theme="dark" richColors position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
