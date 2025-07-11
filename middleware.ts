import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Add '/' to public routes
const isPublicRoute = createRouteMatcher([
  '/',
  "/home",
  "/api/uploadthing",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/privacy",
  "/terms", 
  "/about",
  "/contact",
  "/pricing",
  "/blog",
  "/docs"
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
