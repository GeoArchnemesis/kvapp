"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { adminDashboard } from "@/content/text";
import { cn } from "@/lib/utils/cn";
import type { contactSubmissions } from "@/lib/db/schema";

type Lead = typeof contactSubmissions.$inferSelect;

const TABS = [
  { key: "leads", label: adminDashboard.nav.leads, disabled: false },
  { key: "bookings", label: adminDashboard.nav.bookings, disabled: true },
  { key: "inquiries", label: adminDashboard.nav.inquiries, disabled: true },
  { key: "newsletter", label: adminDashboard.nav.newsletter, disabled: true },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function formatTbilisi(date: Date) {
  return date.toLocaleString("ka-GE", {
    timeZone: "Asia/Tbilisi",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function DashboardTabs({ leads }: { leads: Lead[] }) {
  const [active, setActive] = useState<TabKey>("leads");

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[200px_1fr]">
      <nav className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            disabled={tab.disabled}
            title={tab.disabled ? adminDashboard.comingSoon : undefined}
            onClick={() => setActive(tab.key)}
            className={cn(
              "shrink-0 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors",
              active === tab.key
                ? "bg-accent text-white"
                : "bg-surface text-foreground hover:bg-accent-soft",
              tab.disabled && "cursor-not-allowed opacity-50 hover:bg-surface"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <Card>
        {active === "leads" ? (
          <LeadsTable leads={leads} />
        ) : (
          <p className="py-10 text-center text-sm text-foreground-muted">
            {adminDashboard.comingSoon}
          </p>
        )}
      </Card>
    </div>
  );
}

function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold">{adminDashboard.leads.heading}</h2>
      {leads.length === 0 ? (
        <p className="mt-6 text-sm text-foreground-muted">{adminDashboard.leads.empty}</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-foreground-muted">
                <th className="py-2 pr-4 font-semibold">{adminDashboard.leads.columns.name}</th>
                <th className="py-2 pr-4 font-semibold">{adminDashboard.leads.columns.contact}</th>
                <th className="py-2 pr-4 font-semibold">{adminDashboard.leads.columns.message}</th>
                <th className="py-2 font-semibold">{adminDashboard.leads.columns.submittedAt}</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4">{lead.fullName}</td>
                  <td className="py-3 pr-4">
                    <div>{lead.email}</div>
                    <div className="text-foreground-muted">{lead.phone}</div>
                  </td>
                  <td className="max-w-xs truncate py-3 pr-4">{lead.message ?? "—"}</td>
                  <td className="whitespace-nowrap py-3">{formatTbilisi(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
