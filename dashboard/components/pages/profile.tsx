import type { Account } from "@/lib/account";
import { ShooterProfileForm } from "@/components/shooter-profile-form";
import { planLines } from "@/lib/plan";
import type { ProStatus } from "@/lib/pro";
import type { Repo } from "@/lib/repo";

const DISCIPLINE: Record<string, string> = {
  uspsa: "USPSA", idpa: "IDPA", steelChallenge: "Steel Challenge", ipsc: "IPSC", icore: "ICORE", multigun: "3-Gun", prs: "PRS", nrl22: "NRL22", bullseye: "Bullseye",
};

const initials = (n: string) => (n.includes("@") ? n[0] : n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("")).toUpperCase();

export async function ProfilePage({ repo, base, account, pro, saveProfile, saved }: {
  repo: Repo; base: string; account: Account; pro: ProStatus;
  saveProfile?: (form: FormData) => Promise<void>; saved?: boolean;
}) {
  const profile = await repo.profile();
  const sp = profile?.shooter_profile ?? {};
  const name = profile?.display_name || account.email;
  const plan = planLines(pro);
  return (
    <main className="page narrow">
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 22 }}>
        <span className="avatar-lg" aria-hidden>{initials(name)}</span>
        <div>
          <h1 className="greeting" style={{ margin: 0 }}>{name}</h1>
          {profile?.username && <span className="muted">@{profile.username}</span>}
        </div>
      </div>
      <div className="stack">
        <section className="card group">
          <h2>Shooter profile</h2>
          <p className="sub">Used to find you in imported results (member numbers first, then your name).</p>
          {saved && <div className="notice" role="status" style={{ marginBottom: 8 }}>Saved. Your phone picks it up next time it opens.</div>}
          <div className="line"><span className="label">Disciplines</span><span>{(sp.disciplines ?? []).map((d) => DISCIPLINE[d] ?? d).join(", ") || "—"}</span><span /></div>
          <ShooterProfileForm
            division={sp.division ?? ""}
            officialClass={sp.officialClass ?? ""}
            memberNumbers={sp.memberNumbers ?? {}}
            disciplines={sp.disciplines ?? []}
            action={saveProfile}
          />
        </section>
        <section className="card group">
          <h2>Plan</h2>
          <div className="line"><span className="label">Plan</span><span>{pro.pro ? "ZeroPoint Pro" : "Free"}</span><span /></div>
          <div className="line"><span className="label">Billed through</span><span>{plan.store}</span><span /></div>
          {plan.renews && <div className="line"><span className="label">Renews or ends</span><span>{plan.renews}</span><span /></div>}
          {plan.manage && <div className="line"><span className="label">Manage</span><span className="muted">{plan.manage}</span><span /></div>}
        </section>
        <section className="card group">
          <h2>Account</h2>
          <div className="line">
            <span className="label">Signed in as</span>
            <span>{account.email} with {account.provider}</span>
            <form action="/auth/signout" method="post"><button className="textbutton">Sign out</button></form>
          </div>
          <p className="quiet" style={{ margin: "4px 0 14px" }}>Use the same sign-in here as on your phone, so you see the same data.</p>
        </section>
        <section className="card group">
          <h2>Your data</h2>
          <div className="line">
            <span className="label">Sessions</span>
            <span className="muted">Every session as a spreadsheet (CSV)</span>
            <a className="pill" href={`${base}/export/sessions.csv`}>Export</a>
          </div>
          <div className="line">
            <span className="label">Everything</span>
            <span className="muted">The full export with photos is on your phone: Settings › Your data</span>
            <span />
          </div>
        </section>
      </div>
    </main>
  );
}
