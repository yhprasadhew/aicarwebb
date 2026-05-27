'use client';

import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';

export default function AuthButtons() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {!isSignedIn ? (
        <>
          <SignInButton mode="modal">
            <button className="rounded bg-white px-4 py-2 text-black transition hover:bg-gray-200">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="rounded border border-white px-4 py-2 text-white transition hover:bg-white/10">
              Sign up
            </button>
          </SignUpButton>
        </>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
    </div>
  );
}
