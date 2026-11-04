export type Link = { href: string; label: string };

/** Plain header links, after the Features and Sports menus. */
export const headerNav: Link[] = [
  { href: "/#pro", label: "Pro" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
];

export type MenuLink = Link & { note: string };

/** The header's Features menu: a page where one exists, else Home's section. */
export const featuresNav: MenuLink[] = [
  { href: "/shooting-log-app", label: "Shooting log", note: "Every session in seconds" },
  { href: "/ammo-inventory-app", label: "Ammo inventory", note: "Know before a caliber runs dry" },
  { href: "/#matches", label: "Match analysis", note: "Import results, see where points went" },
  { href: "/#armory", label: "Firearms & maintenance", note: "Your armory, with maintenance alerts" },
  { href: "/#web-app", label: "Web dashboard", note: "Your whole log on the big screen" },
];

/** The sports with their own page: the header's Sports menu. */
export const sportsNav: MenuLink[] = [
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
