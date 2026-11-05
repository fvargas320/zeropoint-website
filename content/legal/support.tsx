import type { Faq } from "@/content/faq";
import { site } from "@/content/site";

// What people ask once they have the app. Home's FAQ covers the questions before it.
export const supportQuestions: { label: string; items: Faq[] }[] = [
  {
    label: "Billing",
    items: [
      {
        q: "How do I cancel my subscription?",
        a: "On iPhone: Settings › your name › Subscriptions. On Android: Google Play › Menu › Subscriptions. On the web: Profile › Manage subscription. Pro stays until the billing period ends.",
      },
      {
        q: "Will I lose my data if I cancel Pro?",
        a: "Cloud data is kept for 30 days after the subscription ends, and may be deleted after that. Data stored on your device stays.",
      },
    ],
  },
  {
    label: "Your data",
    items: [
      {
        q: "How do I export my data?",
        a: "Go to Settings › Data & Privacy › Export Data. You can export sessions, firearms and related records. It's available to all users.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings › Account › Delete Account. This permanently deletes your account and its server data, so export anything you want to keep first.",
      },
    ],
  },
  {
    label: "The app",
    items: [
      {
        q: "How do low-ammo and maintenance alerts work?",
        a: "They use the rounds you log and the limits you set for low ammo and cleaning. They're based on what you logged, not on sensors.",
      },
      {
        q: "The app crashed. What should I do?",
        a: <>Reopen it and check you're on the latest version. If it keeps happening, email <a href={`mailto:${site.email}`}>{site.email}</a> with your device, OS version and what you were doing.</>,
      },
    ],
  },
];
