import type { Faq } from "@/content/faq";
import { site } from "@/content/site";

// What people ask once they have the app. Home's FAQ covers the questions before it.
export const supportFaq: Faq[] = [
  {
    q: "How do I cancel my subscription?",
    a: "It depends where you bought Pro. On iPhone: Settings › your name › Subscriptions. On Android: Google Play › Menu › Subscriptions. On the web: Profile › Manage subscription in the web app. Pro stays until the billing period ends.",
  },
  {
    q: "Will I lose my data if I cancel Pro?",
    a: "Cloud data is kept for 30 days after the subscription ends. Re-subscribe within that window to restore full access. After 30 days, cloud data may be deleted. Data stored on your device stays.",
  },
  {
    q: "How do low-ammo and maintenance alerts work?",
    a: "As you log rounds, ZeroPoint updates your ammo inventory and the round count on each firearm. You set the thresholds for low-ammo warnings and cleaning or maintenance intervals. Alerts are based on what you logged, not on sensors.",
  },
  {
    q: "How do I export my data?",
    a: "Go to Settings › Data & Privacy › Export Data. You can export sessions, firearms and related records in a portable format. It's available to all users.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Settings › Account › Delete Account. This permanently deletes your account and its server data. Export anything you want to keep first, because deletion can't be undone.",
  },
  {
    q: "The app crashed. What should I do?",
    a: <>Force-close and reopen the app, then check you're on the latest version. If it keeps happening, email <a href={`mailto:${site.email}`}>{site.email}</a> with your device model, OS version and what you were doing.</>,
  },
];
