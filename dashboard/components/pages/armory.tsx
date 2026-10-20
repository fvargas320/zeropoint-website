import Link from "next/link";
import { fmtDate, money } from "@/lib/compute";
import { firearmPhotoPath } from "@/lib/media";
import type { Repo } from "@/lib/repo";
import type { FirearmRow, MaintenanceRow } from "@/lib/types";

const TABS = [
  { key: "firearms", label: "Firearms" },
  { key: "ammo", label: "Ammo" },
  { key: "maintenance", label: "Maintenance" },
] as const;

function service(f: FirearmRow, log: MaintenanceRow[]) {
  const interval = f.cleaning_interval_rounds ?? 0;
  if (!interval) return null;
  const last = log.filter((m) => m.firearm_uuid === f.uuid && m.rounds_at_service != null).sort((a, b) => b.date.localeCompare(a.date))[0];
  const since = Math.max(0, (f.total_rounds ?? 0) - (last?.rounds_at_service ?? 0));
  return { pct: Math.min(100, (since / interval) * 100), left: interval - since, due: since >= interval };
}


// MaintenanceType.displayName in the app.
const MAINTENANCE_LABEL: Record<string, string> = { clean: "Clean", lube: "Lube", inspect: "Inspect", repair: "Repair", partReplace: "Part Replace" };
export async function ArmoryPage({ repo, base, tab = "firearms" }: { repo: Repo; base: string; tab?: string }) {
  const t = TABS.find((x) => x.key === tab)?.key ?? "firearms";
  const [firearms, ammo, log] = await Promise.all([repo.firearms(), repo.ammoLots(), repo.maintenance()]);
  const photoPaths = firearms.map((f) => firearmPhotoPath(f.photo_url) ?? "").filter(Boolean);
  const photos = t === "firearms" ? await repo.signedUrls("firearm-photos", photoPaths) : {};
  const names = new Map(firearms.map((f) => [f.uuid, f.name]));

  return (
    <main className="page">
      <div className="page-head"><h1>Armory</h1></div>
      <nav className="tabs-inline" aria-label="Armory">
        {TABS.map((x) => <Link key={x.key} href={`${base}/armory?tab=${x.key}`} aria-current={x.key === t ? "true" : undefined}>{x.label}</Link>)}
      </nav>

      {t === "firearms" && (firearms.length === 0 ? (
        <div className="card empty"><h2>No firearms yet</h2><p className="muted">Add them on your phone under Inventory.</p></div>
      ) : (
        <div className="grid-3">
          {firearms.map((f) => {
            const path = firearmPhotoPath(f.photo_url);
            const sv = service(f, log);
            return (
              <article key={f.uuid} className="card gun">
                <div className="photo">{path && photos[path] ? <img src={photos[path]} alt="" /> : <span aria-hidden>{f.name.slice(0, 2).toUpperCase()}</span>}</div>
                <div className="body">
                  <h3>{f.name}</h3>
                  <p className="muted" style={{ margin: "2px 0 8px" }}>{[f.caliber, f.manufacturer && f.model ? `${f.manufacturer} ${f.model}` : null].filter(Boolean).join(" · ")}</p>
                  <p style={{ margin: 0 }}><b>{(f.total_rounds ?? 0).toLocaleString()}</b> rounds · <b>{f.session_count ?? 0}</b> {f.session_count === 1 ? "session" : "sessions"}</p>
                  {sv && (
                    <div className={`service${sv.due ? " due" : ""}`}>
                      <div className="bar-track"><div className={`bar-fill${sv.due ? " warn" : ""}`} style={{ width: `${sv.pct}%` }} /></div>
                      <span>{sv.due ? "Due for cleaning" : `Clean in ${sv.left.toLocaleString()} rounds`}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ))}

      {t === "ammo" && (
        <section className="card">
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>Caliber</th><th>Ammo</th><th className="num">Left</th><th className="num">Bought</th><th className="num">Cost / round</th><th>Bought on</th></tr></thead>
              <tbody>
                {ammo.map((a) => {
                  // Same rule as the app's lot row: an untouched lot is never flagged low.
                  const left = a.remaining_quantity ?? 0;
                  const low = a.low_stock_threshold != null && left <= a.low_stock_threshold && left < (a.purchase_quantity ?? 0);
                  return (
                    <tr key={a.uuid}>
                      <td>{a.caliber}</td>
                      <td className="name">{[a.brand, a.product_name].filter(Boolean).join(" ") || "—"}</td>
                      <td className="num" style={low ? { color: "var(--amber)" } : undefined}>{(a.remaining_quantity ?? 0).toLocaleString()}{low ? " · low" : ""}</td>
                      <td className="num">{(a.purchase_quantity ?? 0).toLocaleString()}</td>
                      <td className="num">{a.total_cost && a.purchase_quantity ? money(a.total_cost / a.purchase_quantity) : "—"}</td>
                      <td>{a.purchase_date ? fmtDate(a.purchase_date) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {ammo.length === 0 && <p className="muted">No ammo yet. Add lots on your phone under Inventory › Ammo.</p>}
        </section>
      )}

      {t === "maintenance" && (
        <section className="card">
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>Date</th><th>Firearm</th><th>Type</th><th className="num">At rounds</th><th>Notes</th></tr></thead>
              <tbody>
                {log.map((m) => (
                  <tr key={m.uuid}>
                    <td>{fmtDate(m.date)}</td>
                    <td className="name">{names.get(m.firearm_uuid) ?? "—"}</td>
                    <td>{m.type ? MAINTENANCE_LABEL[m.type] ?? m.type.replace(/^\w/, (c) => c.toUpperCase()) : "—"}</td>
                    <td className="num">{m.rounds_at_service?.toLocaleString() ?? "—"}</td>
                    <td style={{ whiteSpace: "normal" }}>{m.notes ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {log.length === 0 && <p className="muted">Nothing logged yet.</p>}
        </section>
      )}
      <p className="quiet" style={{ marginTop: 14 }}>Add or change firearms, ammo and maintenance on your phone; they show up here when it syncs.</p>
    </main>
  );
}
