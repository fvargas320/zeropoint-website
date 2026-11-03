export type Link = { href: string; label: string };

export const headerNav: Link[] = [
  { href: "/#features", label: "Features" },
  { href: "/#matches", label: "Matches" },
  { href: "/#web-app", label: "Web app" },
  { href: "/#pro", label: "Pro" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
];

/** The sports with their own page: the header's Sports menu. */
export const sportsNav: (Link & { note: string })[] = [
  { href: "/uspsa", label: "USPSA", note: "See exactly where you lost points" },
  { href: "/idpa", label: "IDPA", note: "See where your seconds went" },
];

export const footerNav: Link[] = [
  { href: "https://app.zeropointlog.com", label: "Web app" },
  { href: "/uspsa", label: "USPSA" },
  { href: "/idpa", label: "IDPA" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/your-data", label: "Your data" },
  { href: "/shooting-log-app", label: "Shooting log app" },
  { href: "/ammo-inventory-app", label: "Ammo inventory app" },
  { href: "mailto:support@zeropointlog.com", label: "Contact" },
];
