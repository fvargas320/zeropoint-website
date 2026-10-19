import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProStatus } from "@/lib/pro";

/// The signed-in user, their access token and Pro status — once per request.
export const getViewer = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  const { data: s } = await supabase.auth.getSession();
  const token = s.session?.access_token ?? "";
  const pro = await getProStatus(supabase, token);
  return { supabase, user: data.user, pro };
});
