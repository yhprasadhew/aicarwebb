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

  const isAdmin = user?.primaryEmailAddress?.emailAddress === "influencer3721@gmail.com";

  return (
    <header className="w-full bg-black/95 backdrop-blur-md text-white h-17 px-7 flex items-center justify-between shadow-lg border-b border-gray-200 fixed top-0 z-50">
      
      {/* LOGO - Fixed sizing & alignment */}
      <Link href="/" className="flex items-center -ml-2">
        <Image
          src="/aiwebbcar.jpg"
          alt="AUTODRIVE Logo"
          width={100}
          height={25}
          className="object-contain"
          priority
        />
      </Link>

      {/* CENTER NAV */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link href="/inventory" className="hover:text-blue-600 transition-colors">
          Inventory
        </Link>
        <Link href="/about" className="hover:text-blue-600 transition-colors">
          About
        </Link>
      </nav>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {!isSignedIn && (
          <SignInButton mode="modal">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
              Sign In
            </button>
          </SignInButton>
        )}

        {isSignedIn && (
          <>
            {isAdmin ? (
              <>
                <Link href="/" className="text-sm hover:text-blue-600 transition">Back to Website</Link>
                <Link href="/admin" className="text-sm hover:text-blue-600 transition">Admin Dashboard</Link>
              </>
            ) : (
              <>
                <Link href="/saved-cars" className="text-sm hover:text-blue-600 transition">Saved Cars</Link>
                <Link href="/reservations" className="text-sm hover:text-blue-600 transition">My Reservations</Link>
              </>
            )}
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;