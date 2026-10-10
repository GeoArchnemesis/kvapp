import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/domain/admin/admin-emails";

/**
 * Data Access Layer convention for /admin (per CLAUDE.md's Next.js 16
 * auth notes): `proxy.ts` only does a cheap, optimistic cookie-presence
 * redirect for /admin/* — it is NOT a security boundary. Every Server
 * Action and Route Handler that reads or mutates admin data MUST call
 * `verifySession()` itself, independently of the (protected) layout gate.
 * Do not assume the layout already checked this for you: a mutating
 * action added later and reachable on its own is only as safe as its own
 * call to this function.
 */
export const verifySession = cache(async () => {
  const session = await auth();
  const email = session?.user?.email;

  if (!email || !isAdminEmail(email)) {
    redirect("/admin/login");
  }

  return { email };
});
