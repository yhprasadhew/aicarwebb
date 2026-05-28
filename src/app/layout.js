import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "AUTODRIVE-AI",
  description: "Find your Dream car with AUTODRIVE-AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-[#071120] text-white overflow-x-hidden`}
        >
          {/* HEADER */}
          <Header />

          {/* PAGE CONTENT */}
          <main className="min-h-screen w-full">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="bg-black border-t border-white/10 text-white py-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-sm text-gray-400">
                © 2026 AUTODRIVE-AI. All rights reserved.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}