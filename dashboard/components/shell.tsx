import { Sidebar } from "@/components/sidebar";

export function Shell({ base, name, banner, children }: { base: string; name: string; banner?: string; children: React.ReactNode }) {
  return (
    <div className="shell">
      <Sidebar base={base} name={name} />
      <div className="main">
        {banner && <div className="banner-preview" role="note">{banner}</div>}
        {children}
      </div>
    </div>
  );
}
