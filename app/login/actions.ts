"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function signInAction(formData: FormData) {
  if (!isSupabaseConfigured) redirect("/dashboard");

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  if (!isSupabaseConfigured) redirect("/dashboard");

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/login?mode=signup&error=${encodeURIComponent(error.message)}`);
  }

  if (!data.session) {
    redirect("/login?checkEmail=1");
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  if (!isSupabaseConfigured) redirect("/dashboard");

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
