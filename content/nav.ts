export type Link = { href: string; label: string };

/** Plain header links, after the Features and Matches menus: with them, an
    index of Home's sections. Privacy and Support live in the footer (and the
    mobile drawer) to keep the bar short. */
export const headerNav: Link[] = [
  { href: "/#web-app", label: "Web app" },
  { href: "/#pro", label: "Pricing" },
  { href: "/#next", label: "What's next" },
  { href: "/#faq", label: "FAQ" },
];

/** Extra links only the mobile drawer shows. */
export const drawerNav: Link[] = [
  { href: "/#privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
];

export type MenuLink = Link & { note: string };

/** The header's Features menu: a page where one exists, else Home's section. */
export const featuresNav: MenuLink[] = [
  { href: "/#features", label: "All features", note: "Log, armory, costs, training and crews" },
  { href: "/shooting-log-app", label: "Shooting log", note: "Every session in seconds" },
  { href: "/ammo-inventory-app", label: "Ammo inventory", note: "Know before a caliber runs dry" },
  { href: "/#armory", label: "Firearms & maintenance", note: "Your armory, with maintenance alerts" },
];

/** Home's Matches section and the sports with their own page. */
export const matchesNav: MenuLink[] = [
  { href: "/#matches", label: "Match analysis", note: "Import results, see where points went" },
  { href: "/uspsa", label: "USPSA", note: "See exactly where you lost points" },
  { href: "/idpa", label: "IDPA", note: "See where your seconds went" },
];

export const legalNav: Link[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
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
];
