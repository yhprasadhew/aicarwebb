import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Drivemart",
  description: "Find your next car with Drivemart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 text-gray-900 overflow-x-hidden`}
      >
        <ClerkProvider>

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="min-h-screen w-full">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-black text-white py-6 mt-10">
            <div className="container mx-auto text-center">
              <p className="text-sm">
                &copy; 2026 Drivemart. All rights reserved.
              </p>
            </div>
          </footer>

        </ClerkProvider>
      </body>
    </html>
  );
}