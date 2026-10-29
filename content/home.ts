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
