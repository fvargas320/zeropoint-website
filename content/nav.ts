export type Link = { href: string; label: string };

export const headerNav: Link[] = [
  { href: "/#features", label: "Features" },
  { href: "/#matches", label: "Matches" },
  { href: "/#pro", label: "Pro" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
];

export const footerNav: Link[] = [
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/your-data", label: "Your data" },
  { href: "/shooting-log-app", label: "Shooting log app" },
  { href: "/ammo-inventory-app", label: "Ammo inventory app" },
  { href: "mailto:support@zeropointlog.com", label: "Contact" },
];
