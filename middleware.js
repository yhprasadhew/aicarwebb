import { clerkMiddleware } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    "/admin(.*)",
    "/saved-cars(.*)",
    "/reservations(.*)",
]);

export default clerkMiddleware(async (auth,req) => {
    const {userId} = await auth();

    if(!userId && isProtectedRoute(req.nextUrl.pathname)){
        const signInUrl = new URL("/sign-in", req.url);
        return redirectToSignIn(signInUrl);
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/(.*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};