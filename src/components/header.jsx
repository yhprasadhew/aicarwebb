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

  // CHANGE THIS EMAIL TO YOUR ADMIN EMAIL
  const isAdmin =
    user?.primaryEmailAddress?.emailAddress === "influencer3721@gmail.com";

  return (
    <header className="w-full bg-black text-white h-18 px-6 flex items-center justify-between shadow-md">

      {/* LOGO */}
      <Link href="/" className="flex items-center">
        <Image
          src="/aiwebbcar.jpg"
          alt="Logo"
          width={110}
          height={25}
          className="object-contain"
        />
      </Link>

      {/* CENTER NAV */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-gray-300 transition">
          Home
        </Link>

        <Link href="/inventory" className="hover:text-gray-300 transition">
          Inventory
        </Link>

        <Link href="/about" className="hover:text-gray-300 transition">
          About
        </Link>
      </nav>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* NOT SIGNED IN */}
        {!isSignedIn && (
          <SignInButton mode="modal">
            <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition">
              Sign In
            </button>
          </SignInButton>
        )}

        {/* SIGNED IN */}
        {isSignedIn && (
          <>
            {/* ADMIN */}
            {isAdmin ? (
              <>
                <Link
                  href="/"
                  className="text-sm hover:text-gray-300 transition"
                >
                  Back to Website
                </Link>

                <Link
                  href="/admin"
                  className="text-sm hover:text-gray-300 transition"
                >
                  Admin Dashboard
                </Link>
              </>
            ) : (
              <>
                {/* CUSTOMER */}
                <Link
                  href="/saved-cars"
                  className="text-sm hover:text-gray-300 transition"
                >
                  Saved Cars
                </Link>

                <Link
                  href="/reservations"
                  className="text-sm hover:text-gray-300 transition"
                >
                  My Reservations
                </Link>
              </>
            )}

            {/* PROFILE */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </>
        )}

      </div>
    </header>
  );
};

export default Header;