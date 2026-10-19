import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

/// Refreshes the Supabase session cookie on every request and returns the
/// signed-in user (or null). The Pro check happens in the app layout, on the
/// server, after this.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(env.supabaseUrl(), env.supabaseAnonKey(), {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  // getUser() validates the JWT with Supabase; never trust getSession() alone on the server.
  const { data } = await supabase.auth.getUser();
  return { response, user: data.user };
}
