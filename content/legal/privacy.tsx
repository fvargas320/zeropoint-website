// Ported verbatim from the static privacy.html (October 2026).
export function PrivacyBody() {
  return (
    <>
      <div className="page-header">
      <p className="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: October 26, 2026</p>
      </div>
      <article className="prose">
      <p>ZeroPoint ("we," "our," or "us") makes ZeroPoint, a range log for shooters (the "App"), and runs zeropointlog.com (the "Site"). This policy explains what information we collect, where it is kept, who can see it and what you can do about it. By using the App or the Site you agree to this policy.</p>
      <h2>The short version</h2>
      <ul>
      <li>We do not sell your personal information.</li>
      <li>On the free plan, your sessions, notes, target photos, videos and ammo inventory are stored on your phone. They reach our servers only if you subscribe to Pro, which backs them up and syncs them across your devices.</li>
      <li>Some things always use our servers because they cannot work otherwise: your account, your public profile, friends and crews, crew chat, and firearm photos.</li>
      <li>Firearm serial numbers never leave your phone.</li>
      <li>The App does not access your device's location.</li>
      <li>You can delete your account, and the data on our servers with it, from Settings in the App.</li>
      </ul>
      <h2>Information you give us</h2>
      <ul>
      <li><strong>Account</strong> — your email address and password, or the identifier Apple or Google provides if you sign in with them.</li>
      <li><strong>Profile</strong> — username, display name, and optionally a bio, profile picture and cover image.</li>
      <li><strong>Range log</strong> — sessions (date, range, firearm, caliber, distance, position, rounds fired, cost, drill results, weather you type in, buddies' names and notes), photos and videos you attach, firearms, ammo inventory, maintenance, drills, goals and presets.</li>
      <li><strong>Firearm photos</strong> — photos you add to a firearm are uploaded to private cloud storage on every plan.</li>
      <li><strong>Social</strong> — friend requests, blocks, crews you create or join, crew chat messages and images, range-day events and replies, and reports you file about content.</li>
      <li><strong>Showcase</strong> — up to three firearms you choose to show on your profile (name, manufacturer, model, caliber and type).</li>
      <li><strong>Newsletter</strong> — your email address, if you sign up for news in the App.</li>
      <li><strong>Range search</strong> (Pro) — the text you type when searching for a range.</li>
      <li><strong>Referrals and gifts</strong> — invite codes you share or use, who invited whom, and gift codes you buy or redeem.</li>
      <li><strong>Support</strong> — anything you send us by email.</li>
      </ul>
      <h2>Information collected automatically</h2>
      <ul>
      <li><strong>Usage events</strong> — which screens and features you use (for example "firearm added" or "session saved"), with your app version, platform, plan and sign-up date. Events are linked to a random account ID, not your email, and never include notes, firearm names, serial numbers or locations.</li>
      <li><strong>Activity</strong> — a daily record that you opened the App and how many sessions you logged, plus achievements and experience points you unlock.</li>
      <li><strong>Errors</strong> — technical details when something goes wrong in the App, so we can fix it.</li>
      <li><strong>Push notifications</strong> — a device token so we can send the notifications you turn on, and your notification preferences.</li>
      <li><strong>Advertising identifiers</strong> — on the free plan, see Advertising below.</li>
      <li><strong>Purchases</strong> — subscription status and receipts from Apple or Google, processed through RevenueCat. We never see your card details.</li>
      </ul>
      <h2>Where your data is stored</h2>
      <h3>Free plan</h3>
      <p>Your range log (sessions, notes, target photos, videos, firearms and ammo inventory) is stored on your device. If you delete the App or lose your phone without Pro, that data is gone. Your account, profile, social activity, firearm photos and the other items listed above as using our servers are stored in the cloud.</p>
      <h3>Pro</h3>
      <p>With Pro, your range log, photos and videos are also stored on our servers so they can sync across your devices, along with a weekly summary of your stats that your friends can see if your privacy settings allow it.</p>
      <p>Our servers are provided by Supabase, hosted on Amazon Web Services in the United States.</p>
      <h2>What other people can see</h2>
      <ul>
      <li><strong>Any signed-in user</strong> can see your public profile: username, display name, bio, profile picture, cover image, the date you joined, and your showcase firearms if you choose any.</li>
      <li><strong>Friends and crew members</strong> can see the stats you allow in your privacy settings: total sessions and rounds, streak, favourite firearm, caliber and range, a recent sessions summary (off by default), your calendar (you choose how much), and your place on the friends and crew leaderboards.</li>
      <li><strong>Crew members</strong> can see the messages, images and range-day events posted in crews you belong to.</li>
      </ul>
      <p>You can block anyone, turn off friend requests and crew invites, and report a profile or message from within the App.</p>
      <h2>How we use your information</h2>
      <ul>
      <li>Provide the App: your account, your log, alerts and reminders, social features and sync.</li>
      <li>Send the notifications you turn on, and account emails such as sign-up confirmation and password resets.</li>
      <li>Send promotional notifications only if you opt in under "Offers and news".</li>
      <li>Understand how the App is used so we can improve it, and find and fix errors.</li>
      <li>Process subscriptions, referral rewards and gifts.</li>
      <li>Keep the service safe: prevent abuse, act on reports and enforce our Terms.</li>
      <li>Show ads to free users (see below).</li>
      </ul>
      <h2>Advertising</h2>
      <p>The free plan shows ads from Google AdMob. Pro has no ads.</p>
      <ul>
      <li><strong>On iPhone,</strong> we ask permission through Apple's App Tracking Transparency prompt before ads can use your device's advertising identifier. If you decline, ads are not personalised.</li>
      <li><strong>In the EEA, the UK and Switzerland,</strong> no ads are requested until you make a choice in Google's consent form. You can change it any time under Settings › Privacy choices.</li>
      </ul>
      <h2>Service providers</h2>
      <p>We share information only with the providers that run parts of the service for us, and only what they need:</p>
      <ul>
      <li><strong>Supabase</strong> (Amazon Web Services) — accounts, database and file storage</li>
      <li><strong>Apple and Google</strong> — sign-in, app distribution, in-app purchases and push notification delivery (Firebase Cloud Messaging)</li>
      <li><strong>RevenueCat</strong> — subscription management</li>
      <li><strong>PostHog and Google Firebase Analytics</strong> — usage analytics and error tracking</li>
      <li><strong>Google AdMob</strong> — ads on the free plan</li>
      <li><strong>Google Places</strong> — range search for Pro users</li>
      <li><strong>Resend</strong> — delivery of account emails</li>
      </ul>
      <p>We may also disclose information if the law requires it, to protect the rights and safety of our users or others, or as part of a merger or acquisition, in which case this policy continues to apply.</p>
      <h2>Keeping and deleting your data</h2>
      <p>We keep your information while your account is open. When you delete your account in Settings, we delete:</p>
      <ul>
      <li>your account and profile</li>
      <li>your synced data and files</li>
      <li>your friendships, blocks, crew messages and crews you own</li>
      <li>your subscription records on our servers</li>
      </ul>
      <p>Gift purchase records are kept for accounting with your name removed. Analytics records held by PostHog and Firebase are tied to a random ID rather than your email. Email us if you want those removed too, and we will ask the providers to delete them. Data stored only on your device is removed when you delete the App or your account.</p>
      <h2>Security</h2>
      <p>Data is encrypted in transit (HTTPS/TLS) and at rest on our servers. Photos are kept in private storage and shared only through signed, expiring links. No system is perfectly secure, but we work to protect your information and review our security regularly.</p>
      <h2>Your choices and rights</h2>
      <ul>
      <li><strong>Access or a copy</strong> — email us and we will send you the information we hold about you.</li>
      <li><strong>Correction</strong> — edit your profile and log in the App, or email us.</li>
      <li><strong>Deletion</strong> — delete your account in Settings, or email us.</li>
      <li><strong>Who sees what</strong> — your privacy settings in the App control your shared stats, calendar, friend requests and crew invites.</li>
      <li><strong>Notifications</strong> — turn each kind on or off in Settings, or in your phone's settings.</li>
      <li><strong>Ads</strong> — use Apple's tracking setting or Settings › Privacy choices, or subscribe to Pro.</li>
      <li><strong>Cloud storage</strong> — stay on the free plan to keep your range log on your device only.</li>
      </ul>
      <p>Contact us at <a href="mailto:support@zeropointlog.com">support@zeropointlog.com</a> to exercise any of these rights.</p>
      <h2>Our website</h2>
      <p>zeropointlog.com uses no advertising or tracking cookies. To understand which pages and campaigns bring people to ZeroPoint, it sends anonymous page views and store-button taps to PostHog. These are linked to a random ID that lasts only while the tab is open, and no profile is built. If you arrive from an ad or post, the campaign name is passed to the App Store or Google Play so we can tell which campaigns lead to installs.</p>
      <h2>Children</h2>
      <p>ZeroPoint is not intended for children under 13, and we do not knowingly collect information from them. If you believe a child has given us information, contact us and we will delete it.</p>
      <h2>Changes to this policy</h2>
      <p>We may update this policy. We will post the new version here and change the date at the top.</p>
      <h2>Contact</h2>
      <p>Email <a href="mailto:support@zeropointlog.com">support@zeropointlog.com</a>, or visit <a href="/support">our support page</a>.</p>
      <h2>California privacy rights (CCPA/CPRA)</h2>
      <p>California residents have the right to know what personal information we collect, use and disclose; to request deletion and correction; to opt out of the sale or sharing of personal information; and not to be discriminated against for using these rights. We do not sell personal information. On the free plan, ads may use your advertising identifier if you allow it, and you can opt out as described under Advertising.</p>
      <h2>EEA and UK privacy rights (GDPR)</h2>
      <p>If you are in the European Economic Area or the United Kingdom, you have the right to access, correct, delete, restrict and port your data and to object to processing, and you may complain to your local data protection authority.</p>
      <p>We rely on these legal bases:</p>
      <ul>
      <li><strong>Our contract with you</strong> — to provide the App</li>
      <li><strong>Your consent</strong> — for personalised ads and promotional notifications, which you can withdraw at any time</li>
      <li><strong>Our legitimate interests</strong> — for analytics, error tracking and keeping the service secure</li>
      </ul>
      <p>Your data is processed in the United States under the safeguards our providers offer, such as the EU Standard Contractual Clauses.</p>
      </article>
    </>
  );
}
