import { money, pricing, site, stores } from "./site";

export type Faq = { q: string; a: React.ReactNode };

const email = <a href={`mailto:${site.email}`}>{site.email}</a>;

/** `matchesLive` comes from lib/release.ts (the live App Store version). */
export function homeFaq(matchesLive: boolean): Faq[] {
  return [
    {
      q: "Is ZeroPoint free?",
      a: `Yes. Sessions, up to 3 firearms, your ammo inventory, reminders, the calendar, drills and crews are free. Pro (${money(pricing.monthly)} a month or ${money(pricing.yearly)} a year in the US) adds unlimited firearms, cloud backup and sync, spending and cost-per-round stats, custom drills, goals and no ads.`,
    },
    {
      q: "Can I bring in my match results?",
      a: `${matchesLive ? "Yes." : "Yes, in the next update."} Share your results from your scoring app to ZeroPoint, or add a .psc match file or a saved results page. USPSA, IDPA and Steel Challenge. Importing and head to head are free; the deeper analysis is part of Pro.`,
    },
    {
      q: "Is it on iPhone and Android?",
      a: (
        <>
          Yes. Download ZeroPoint from the <a href={stores.appStore}>App Store</a> or{" "}
          <a href={stores.playStore}>Google Play</a>.
        </>
      ),
    },
    {
      q: "Who can see my firearms and ammo?",
      a: "You. Friends and crews only see what you choose to share, like firearms you add to your profile showcase, a range-day plan or a chat message. Your data is never sold.",
    },
    {
      q: "Does it work without signal at the range?",
      a: "Yes. Sessions are saved on your phone. With Pro, they back up to the cloud once you’re back online.",
    },
    {
      q: "Can I get a copy of my data, or delete it?",
      a: (
        <>
          Email {email} for a copy. You can delete your account and its cloud data from Settings in the app.
          See <a href="/your-data">your data</a> for saving photos first.
        </>
      ),
    },
    {
      q: "What can I track?",
      a: "Range sessions with rounds, cost, firearm, caliber, distance, position, range, weather, buddies, notes and target photos; your firearms; ammo on hand; cleaning; drills, scores and personal bests; and range days with your crew.",
    },
    {
      q: "Where can I get help?",
      a: (
        <>
          Visit the <a href="/support">support page</a> or email {email}.
        </>
      ),
    },
  ];
}

// Picked by question so reordering homeFaq can't swap them.
const getQuestions = [
  "Is ZeroPoint free?",
  "Can I bring in my match results?",
  "Who can see my firearms and ammo?",
  "Does it work without signal at the range?",
];
export function getFaq(matchesLive: boolean): Faq[] {
  const all = homeFaq(matchesLive);
  return getQuestions.map((q) => all.find((f) => f.q === q)!).filter(Boolean);
}
