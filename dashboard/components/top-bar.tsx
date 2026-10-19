import Link from "next/link";

export interface Account {
  email: string;
  provider: string;
}

export function TopBar({ account, current }: { account: Account; current: "season" }) {
  const { email, provider } = account;
  return (
    <header className="topbar">
      <Link className="brandmark" href="/">ZeroPoint</Link>
      <nav className="tabs" aria-label="Main">
        <Link href="/" aria-current={current === "season" ? "page" : undefined}>Season</Link>
        <span title="Coming soon">Compare</span>
        <span title="Coming soon">Import</span>
      </nav>
      <div className="spacer" />
      <div className="account">
        <span className="quiet" title={`Signed in as ${email} with ${provider}`}>
          {provider === "email" ? email : `${email} · ${provider}`}
        </span>
        <form action="/auth/signout" method="post">
          <button className="textbutton">Sign out</button>
        </form>
        <span className="avatar" aria-hidden>{email.charAt(0).toUpperCase()}</span>
      </div>
    </header>
  );
}
