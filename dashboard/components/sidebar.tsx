"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

const ICONS: Record<string, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  list: <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  box: <path d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7M12 11v10" />,
  flag: <path d="M5 21V4m0 0h11l-2 4 2 4H5" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name]}
    </svg>
  );
}

/// Web round 5 navigation: one + New (Log a session / Import match results)
/// and the sections. `base` is "" for the app and "/preview" for dev previews.
export function Sidebar({ base, name }: { base: string; name: string }) {
  const path = usePathname();
  const isActive = (href: string) => {
    const full = `${base}${href}` || "/";
    return href === "" ? path === full || path === `${base}/` : path === full || path.startsWith(`${full}/`);
  };
  return (
    <aside className="sidebar">
      <Link className="brandmark" href={base || "/"}>ZeroPoint</Link>
      <details className="newmenu">
        <summary className="pill brand block" role="button">+ New</summary>
        <div className="menu" role="menu">
          <Link href={`${base}/sessions/new`} role="menuitem">
            Log a session<small>A range day, with photos and video</small>
          </Link>
          <span role="menuitem" aria-disabled="true">
            Import match results<small>PractiScore files and PDFs · coming next</small>
          </span>
        </div>
      </details>
      <nav aria-label="Sections">
        {NAV.map((item) => (
          <Link key={item.label} className="navlink" href={`${base}${item.href}` || "/"} aria-current={isActive(item.href) ? "page" : undefined}>
            <Icon name={item.icon} />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="bottom">
        <Link className="navlink" href={`${base}/profile`} aria-current={isActive("/profile") ? "page" : undefined}>
          <Icon name="user" />
          {name}
        </Link>
      </div>
    </aside>
  );
}
