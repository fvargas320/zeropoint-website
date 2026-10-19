import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProStatus } from "@/lib/pro";
import { supabaseRepo } from "@/lib/repo-supabase";

/// The signed-in user, their Pro status and a repo over their rows — once per request.
export const getViewer = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  const { data: s } = await supabase.auth.getSession();
  const token = s.session?.access_token ?? "";
  const pro = await getProStatus(supabase, token);
  return { supabase, user: data.user, pro, repo: supabaseRepo(supabase, data.user.id) };
});
