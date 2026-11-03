import { site } from "@/content/site";

// The account-deletion page Google Play asks for. Checked against rangeai
// origin/master on 2026-11-03: the menu path (You tab › More › Settings ›
// Delete account, then type DELETE), and supabase/functions/delete-account,
// which deletes everything in one request when you confirm.
export function DeleteAccountBody() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Delete my account")}`;
  return (
    <>
      <div className="page-header">
      <p className="eyebrow">Your account</p>
      <h1>Delete your account</h1>
      <p className="lede">You can delete your ZeroPoint account and its data at any time, from the app or by email.</p>
      </div>
      <div className="prose">
      <h2>Delete it in the app</h2>
      <ol className="steps">
      <li>Open the <strong>You</strong> tab and tap <strong>More</strong> (the ⋯ button), then <strong>Settings</strong>.</li>
      <li>Scroll down and tap <strong>Delete account</strong>.</li>
      <li>Tap <strong>Continue</strong>, type <strong>DELETE</strong> and tap <strong>Delete my account</strong>.</li>
      </ol>
      <p>Your account and its data are deleted right away, and you are signed out.</p>
      <p>Deleting your account doesn’t cancel a subscription. If you have Pro, cancel it first in the App Store or Google Play.</p>
      <h2>Can’t open the app?</h2>
      <p>Email <a href={mail}>{site.email}</a> from the address you signed up with, with the subject “Delete my account”. We’ll delete the account and reply to confirm when it’s done.</p>
      <h2>What gets deleted</h2>
      <ul>
      <li>Your account and profile</li>
      <li>Your synced sessions and matches, with their notes and results</li>
      <li>Your photos and videos stored with us, including ones you posted in crews</li>
      <li>Your friendships, blocks, crew messages and the crews you own</li>
      <li>Your subscription records on our servers</li>
      </ul>
      <p>Data stored only on your phone is removed from that phone when you delete your account there, or when you delete the app.</p>
      <h2>What may be kept, and why</h2>
      <ul>
      <li><strong>Store purchase records.</strong> Apple and Google keep their own records of what you bought. We can’t delete those; ask the store.</li>
      <li><strong>Gift purchase records.</strong> If you bought or redeemed a gift, the record is kept for accounting with your account removed from it.</li>
      <li><strong>Analytics.</strong> Records held by PostHog and Firebase are tied to a random ID, not your email. Email us if you want those removed too, and we will ask the providers to delete them.</li>
      </ul>
      <p>For more on what we collect and how long we keep it, read the <a href="/privacy">privacy policy</a>.</p>
      </div>
    </>
  );
}
