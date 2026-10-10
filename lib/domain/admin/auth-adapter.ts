import "server-only";
import { eq, and } from "drizzle-orm";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { db } from "@/lib/db/client";
import { authUsers, authVerificationTokens } from "@/lib/db/schema";

// Minimal Auth.js adapter: only the methods the Email (magic-link) provider
// actually calls under a JWT session strategy — see
// node_modules/@auth/core/src/lib/actions/callback/handle-login.ts and
// .../lib/utils/assert.ts for the exact set required. We deliberately don't
// implement account/session methods (linkAccount, createSession, etc.)
// because this admin login never uses OAuth and never uses database
// sessions.
export function DrizzleAdminAuthAdapter(): Adapter {
  return {
    async getUser(id) {
      const [row] = await db.select().from(authUsers).where(eq(authUsers.id, id));
      return row ? toAdapterUser(row) : null;
    },

    async getUserByEmail(email) {
      const [row] = await db.select().from(authUsers).where(eq(authUsers.email, email));
      return row ? toAdapterUser(row) : null;
    },

    async createUser(user) {
      const [row] = await db
        .insert(authUsers)
        .values({ email: user.email, emailVerified: user.emailVerified })
        .returning();
      return toAdapterUser(row);
    },

    async updateUser(user) {
      const [row] = await db
        .update(authUsers)
        .set({ emailVerified: user.emailVerified })
        .where(eq(authUsers.id, user.id))
        .returning();
      return toAdapterUser(row);
    },

    async createVerificationToken(token) {
      const [row] = await db.insert(authVerificationTokens).values(token).returning();
      return row;
    },

    async useVerificationToken({ identifier, token }) {
      const [row] = await db
        .delete(authVerificationTokens)
        .where(
          and(
            eq(authVerificationTokens.identifier, identifier),
            eq(authVerificationTokens.token, token)
          )
        )
        .returning();
      return row ?? null;
    },
  };
}

function toAdapterUser(row: typeof authUsers.$inferSelect): AdapterUser {
  return { id: row.id, email: row.email, emailVerified: row.emailVerified };
}
