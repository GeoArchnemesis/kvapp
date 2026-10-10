import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdminAuthAdapter } from "@/lib/domain/admin/auth-adapter";
import { MailgunMagicLink } from "@/lib/domain/admin/mailgun-provider";
import { isAdminEmail } from "@/lib/domain/admin/admin-emails";

// TEMPORARY, until Mailgun real delivery is confirmed set up: a dev-only
// password login so the admin doesn't have to dig the magic link out of
// the server console every time. Hardcoded password per explicit request
// (not an env var) — but hard-disabled outside development so it can
// never work if this ever runs in a deployed environment by accident.
// Remove this whole provider once Mailgun is confirmed working.
const DEV_ADMIN_PASSWORD = "12345";

// Auth.js v5 config for the internal admin dashboard only. This is NOT the
// future consumer-facing auth system (see `users` table / PRD) — it's a
// single-purpose, email-allowlisted login for the one admin account.
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdminAuthAdapter(),
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    MailgunMagicLink(),
    Credentials({
      id: "dev-password",
      name: "Password (temporary, dev only)",
      credentials: { email: {}, password: {} },
      authorize(raw) {
        if (process.env.NODE_ENV === "production") return null;

        const email = raw?.email?.toString().trim().toLowerCase() ?? "";
        const password = raw?.password?.toString() ?? "";
        if (password !== DEV_ADMIN_PASSWORD || !isAdminEmail(email)) return null;

        return { id: email, email };
      },
    }),
  ],
  callbacks: {
    // Runs twice per sign-in: once when the link is requested (before any
    // email is sent — this is what lets us reject non-admin addresses
    // without sending anything), and again when the link is clicked. Both
    // times, reject anyone not in ADMIN_EMAILS.
    async signIn({ user }) {
      if (!user.email || !isAdminEmail(user.email)) {
        console.warn(`[admin-auth] rejected sign-in attempt for "${user.email}" — not in ADMIN_EMAILS`);
        return false;
      }
      return true;
    },
  },
});
