"use client";

import Link from "next/link";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

const Header = () => {
  const { user, isSignedIn } = useUser();

  const isAdmin =
    user?.publicMetadata?.role === "admin" ||
    user?.unsafeMetadata?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-black/90 backdrop-blur-md border-b border-white/10 z-50">
      <div className="w-full h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold tracking-tight text-white">
            AUTO<span className="text-cyan-400">DRIVE</span>
            <span className="text-xs ml-1 text-cyan-400/80 font-medium">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <Link href="/cars" className="hover:text-cyan-400 transition-colors">
            Inventory
          </Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors">
            About
          </Link>
          {isAdmin && (
            <Link href="/admin" className="hover:text-cyan-400 transition-colors">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4 text-white">
          {!isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="text-sm hover:text-cyan-400 transition-colors"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
                >
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}

          {isSignedIn && (
            <>
              <Link
                href="/saved-cars"
                className="hidden md:flex text-sm hover:text-cyan-400 transition-colors"
              >
                Saved
              </Link>
              <Link
                href="/reservations"
                className="hidden md:flex text-sm hover:text-cyan-400 transition-colors"
              >
                Reservations
              </Link>
              <Link
                href="/messages"
                className="hidden md:flex text-sm hover:text-cyan-400 transition-colors"
              >
                Messages
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
