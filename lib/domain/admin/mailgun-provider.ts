import "server-only";
import type { EmailConfig, EmailUserConfig } from "next-auth/providers";
import { adminAuthEmail } from "@/content/text";

// Auth.js Email (magic-link) provider backed by Mailgun's HTTP API.
//
// Requirement from the W3 admin-auth task: Mailgun is NOT confirmed
// configured for real delivery yet (no verified sending domain / API key
// present as of writing — see the chat transcript for the exact dashboard
// steps still needed). So this provider:
//   1. ALWAYS logs the magic-link URL to the server console, so the sign-in
//      flow is testable locally with zero email setup.
//   2. Only ATTEMPTS a real Mailgun send when both MAILGUN_API_KEY and
//      MAILGUN_DOMAIN are set, and never throws if that send fails — a
//      broken/unconfigured Mailgun must not block local admin login.
export function MailgunMagicLink(config: EmailUserConfig = {}): EmailConfig {
  return {
    id: "mailgun-magic-link",
    type: "email",
    name: "Email",
    from: config.from ?? "Kvapp <no-reply@kvapp.ge>",
    maxAge: 60 * 15, // magic link expires in 15 minutes
    async sendVerificationRequest({ identifier: to, url }) {
      console.log(`\n[admin-auth] Magic sign-in link for ${to}:\n${url}\n`);

      const apiKey = process.env.MAILGUN_API_KEY;
      const domain = process.env.MAILGUN_DOMAIN;
      if (!apiKey || !domain) {
        console.warn(
          "[admin-auth] MAILGUN_API_KEY / MAILGUN_DOMAIN not set — email was not actually sent. Use the console link above to test locally."
        );
        return;
      }

      const body = new URLSearchParams();
      body.set("from", "Kvapp <no-reply@" + domain + ">");
      body.set("to", to);
      body.set("subject", adminAuthEmail.subject);
      body.set("text", adminAuthEmail.body(url));

      try {
        const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
          method: "POST",
          headers: {
            Authorization: "Basic " + Buffer.from(`api:${apiKey}`).toString("base64"),
          },
          body,
        });
        if (!res.ok) {
          console.error(
            `[admin-auth] Mailgun send failed (${res.status}): ${await res.text()}`
          );
        }
      } catch (err) {
        console.error("[admin-auth] Mailgun send threw:", err);
      }
    },
  };
}
