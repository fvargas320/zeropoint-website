function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`${name} is not set (see .env.example)`);
  return value;
}

// Read with literal property names so Next inlines them into the browser bundle.
export const env = {
  supabaseUrl: () => required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: () => required("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  siteUrl: () => process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  appStoreUrl: () => process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/us/app/zeropoint-shooting-range-log/id6757300865",
  playStoreUrl: () => process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "https://play.google.com/store/apps/details?id=com.zeropoint.zeropoint",
};
