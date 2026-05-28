"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  UserButton,
  useUser,
  SignInButton,
} from "@clerk/nextjs";

const Header = () => {
  const { user, isSignedIn } = useUser();

  const isAdmin =
    user?.primaryEmailAddress?.emailAddress ===
    "influencer3721@gmail.com";

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-black/90 backdrop-blur-md border-b border-white/10 z-50">

      <div className="w-full h-full pl-2 pr-6 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
        >
          <div className="relative h-14 w-[220px]">
            <Image
              src="/aiwebbcar.jpg"
              alt="AUTODRIVE Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-white">

          <Link
            href="/"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            href="/inventory"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            Inventory
          </Link>

          <Link
            href="/about"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            About
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 text-white">

          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all duration-200">
                Sign In
              </button>
            </SignInButton>
          )}

          {isSignedIn && (
            <>
              <Link
                href="/saved-cars"
                className="hidden md:flex text-sm hover:text-cyan-400 transition-colors duration-200"
              >
                ♡ Saved Cars
              </Link>

              <Link
                href="/reservations"
                className="hidden md:flex text-sm hover:text-cyan-400 transition-colors duration-200"
              >
                📅 Reservations
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