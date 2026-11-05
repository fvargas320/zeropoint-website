import type { HeroStat } from "@/components/sections/target-hero";
import type { IconName } from "@/components/ui/icon";
// Smaller Home blocks. Facts checked against the app code on 2026-10-26.

/** What the hero's reticle shoots down, in order. The first is the one the
    headline means and the one it comes back to (and what screen readers and
    search see); the rest are the other ways shooters keep a log today. */
export const heroStrikes = ["notebook.", "spreadsheet.", "Notes app.", "guesswork."];

export const facts = [
  { title: "Free to start", detail: "No card needed" },
  { title: "iPhone & Android", detail: "Same log on both" },
  { title: "Works offline", detail: "Log at the range, no signal needed" },
  { title: "Never sold", detail: "Delete your account any time" },
];

export const compareRows = [
  { task: "Rounds fired and what they cost", notebook: "Do the maths later", zeropoint: "Added up as you log" },
  { task: "Ammo left at home", notebook: "Go count the boxes", zeropoint: "Counted, with a heads-up when low" },
  { task: "Your targets", notebook: "Taped in, if they fit", zeropoint: "Photos saved with the session" },
  { task: "That session in March", notebook: "Flip pages", zeropoint: "On the calendar in one tap" },
  { task: "Planning with friends", notebook: "A group text", zeropoint: "Crews and range days" },
  { task: "A rainy day at the range", notebook: "Smudged", zeropoint: "Backed up with Pro" },
];

export const privacyPoints = [
  { title: "We don’t sell it. Ever.", body: "Your firearms, ammo and sessions are never sold." },
  { title: "Your log lives on your phone.", body: "Sessions and target photos are saved on the device, so logging works with no signal. Cloud backup is a Pro option, encrypted in transit and at rest." },
  { title: "Delete it whenever you like.", body: "Delete your account in Settings and its cloud data and files go with it." },
];

// Home's hero cards: figures on the session screen and the web sample behind it.
export const heroStats: [HeroStat, HeroStat, HeroStat] = [
  { value: "200", label: "rounds" },
  { value: "$25.00", label: "spent" },
  { value: "12", label: "matches" },
];

// Plans, not promises: nothing here has shipped, so no dates and no "now".
// Each one is specified in rangeai's docs (zeropoint-v3, shot-timer,
// competitive-logging, ai-assistant); the forum is Fernando's call.
export const whatsNext: { title: string; lede: string; ask: string; items: { icon: IconName; title: string; body: string }[] } = {
  title: "Where ZeroPoint goes from here.",
  lede: "What we plan to build next. No dates yet, and what you ask for moves up the list.",
  ask: "Got an idea? Tell us",
  items: [
    { icon: "forecast", title: "Ask ZeroPoint", body: "Ask your own log a question, like what your last three matches have in common, and get a drill or a goal back in one tap." },
    { icon: "timer", title: "Shot timer", body: "A timer in your phone: par beep, dry fire, and your splits laid over the video of the run." },
    { icon: "stage", title: "Score stages as you shoot", body: "USPSA, IDPA and Steel Challenge scorers built in, with hit factor and classifier percentages." },
    { icon: "target", title: "Drill records", body: "Personal bests for the standards: Bill Drill, El Presidente and Dot Torture." },
    { icon: "sliders", title: "Foundations lessons", body: "Short lessons on the Train tab for the basics, tied to the drills you log." },
    { icon: "chat", title: "A forum for shooters", body: "A place on this site to swap drills, gear notes and match stories." },
  ],
};
