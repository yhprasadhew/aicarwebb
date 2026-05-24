"use client";

import React from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="bg-black text-white p-4 flex justify-end gap-4">
      {!isSignedIn ? (
        <>
          <SignInButton />
          <SignUpButton />
        </>
      ) : (
        <UserButton />
      )}
    </header>
  );
};

export default Header;