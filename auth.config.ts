import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/admin");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // TODO: improve redirect between user and admin dashboard
        return Response.redirect(new URL("/admin/users", nextUrl));
      }
      return true;
    },
  },
  providers: [
    // external login providers
  ],
} satisfies NextAuthConfig;
