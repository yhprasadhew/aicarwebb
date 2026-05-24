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
    <ClerkProvider> 

    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="min-h-screen">
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

      </body>
    </html>
    </ClerkProvider> 
  );
}