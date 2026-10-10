import { getRecentLeads } from "@/lib/domain/admin/queries";
import { DashboardTabs } from "@/components/admin/DashboardTabs";

export default async function AdminDashboardPage() {
  const leads = await getRecentLeads();

  return <DashboardTabs leads={leads} />;
}
