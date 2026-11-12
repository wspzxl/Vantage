import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/app/login/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { TrackingProvider } from "@/components/tracking/TrackingProvider";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  let userEmail = "demo@preview";

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      redirect("/login");
    }
    userEmail = user.email ?? userEmail;
  }

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader
        userEmail={userEmail}
        isSupabaseConfigured={isSupabaseConfigured}
        signOutAction={signOutAction}
      />
      <DashboardNav />
      <TrackingProvider>
        <main className="flex-1 px-6 py-6">{children}</main>
      </TrackingProvider>
    </div>
  );
}
