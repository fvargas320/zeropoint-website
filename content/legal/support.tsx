// Ported verbatim from the static support.html (October 2026).
export function SupportBody() {
  return (
    <>
      <div className="page-header">
      <p className="eyebrow">Help</p>
      <h1>Support</h1>
      <p className="lede">Questions about logging sessions, inventory, alerts, or your account — we're here to help.</p>
      </div>
      <div className="contact-grid">
      <div className="contact-card">
      <div className="contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
      </div>
      <h3>Email support</h3>
      <p>Send a message with what you were doing and which device you use. We read every note.</p>
      <a href="mailto:support@zeropointlog.com">support@zeropointlog.com</a>
      </div>
      <div className="contact-card">
      <div className="contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z"/></svg>
      </div>
      <h3>In-app feedback</h3>
      <p>Open Settings in ZeroPoint and use the feedback option to send context from your device.</p>
      <a href="https://apps.apple.com/us/app/zeropoint-range-log/id6757300865" target="_blank" rel="noopener noreferrer">Open on the App Store</a>
      </div>
      </div>
      <div className="faq-section">
      <h2>Frequently asked questions</h2>
      <details className="help-faq"><summary>What does ZeroPoint do?<span aria-hidden="true">+</span></summary><div>
      <p>ZeroPoint is a session-logging and inventory app for shooting ranges. You log range days, tag range / friends / guns / ammo, track inventory (brand and grain), and get low-ammo and maintenance alerts based on rounds you've logged. It does not automatically detect shots or measure paper targets.</p>
      </div></details>
      <details className="help-faq"><summary>How do I create an account?<span aria-hidden="true">+</span></summary><div>
      <p>You can use ZeroPoint without an account for local logging. To unlock sync and Pro features, open your profile and choose Create Account. Use email and password, or sign in with Apple or Google where available.</p>
      </div></details>
      <details className="help-faq"><summary>What's the difference between Free and Pro?<span aria-hidden="true">+</span></summary><div>
      <p>Free users can log sessions with data stored on the device. Pro adds cloud backup and sync, expanded storage, deeper statistics, and other Pro extras. Your data is yours — we never sell it.</p>
      </div></details>
      <details className="help-faq"><summary>How do low-ammo and maintenance alerts work?<span aria-hidden="true">+</span></summary><div>
      <p>As you log rounds in sessions, ZeroPoint updates ammo inventory and round counts on your firearms. You set thresholds for low-ammo warnings and cleaning / maintenance intervals. Alerts are based on what you logged — not on sensors or target photos.</p>
      </div></details>
      <details className="help-faq"><summary>How do I cancel my subscription?<span aria-hidden="true">+</span></summary><div>
      <p>Subscriptions are managed through your Apple ID or Google Play account. On iOS: Settings → [Your Name] → Subscriptions. On Android: Google Play → Menu → Subscriptions. Pro features remain until the billing period ends.</p>
      </div></details>
      <details className="help-faq"><summary>Will I lose my data if I cancel Pro?<span aria-hidden="true">+</span></summary><div>
      <p>Cloud data is retained for 30 days after the subscription ends. Re-subscribe within that window to restore full access. After 30 days, cloud data may be deleted. Data stored locally on your device remains.</p>
      </div></details>
      <details className="help-faq"><summary>How do I export my data?<span aria-hidden="true">+</span></summary><div>
      <p>Go to Settings → Data &amp; Privacy → Export Data. You can export sessions, firearms, and related records in a portable format. Available to all users.</p>
      </div></details>
      <details className="help-faq"><summary>How do I delete my account?<span aria-hidden="true">+</span></summary><div>
      <p>Go to Settings → Account → Delete Account. This permanently deletes your account and associated server data. Export anything you want to keep first — deletion cannot be undone.</p>
      </div></details>
      <details className="help-faq"><summary>The app crashed. What should I do?<span aria-hidden="true">+</span></summary><div>
      <p>Force-close and reopen the app, then confirm you're on the latest version from the App Store or Google Play. If it continues, email <a href="mailto:support@zeropointlog.com">support@zeropointlog.com</a> with your device model, OS version, and what you were doing when it crashed.</p>
      </div></details>
      </div>
      <div className="response-info">
      <h3>Response time</h3>
      <div className="response-badge">Typically within 24 hours</div>
      <p>We read every message. For urgent issues, include "URGENT" in the subject line.</p>
      </div>
    </>
  );
}
