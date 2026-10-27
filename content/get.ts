import type { RailItem } from "@/components/sections/screen-rail";
import type { Step } from "@/components/sections/steps";

export const getRail: RailItem[] = [
  { screen: "session", title: "Log the day", caption: "Gun, rounds, target photo. Done." },
  { screen: "inventory", title: "Know your ammo", caption: "Firearms and rounds on hand, always current." },
  { screen: "spending", title: "See what it costs", caption: "Sessions, rounds and spend at a glance." },
  { screen: "crew", title: "Bring your crew", caption: "Chat and plan the next range day." },
];

export const getSteps: Step[] = [
  { title: "Download free", body: "On iPhone or Android. No card needed." },
  { title: "Add your firearms and ammo", body: "Up to 3 firearms free, with the ammo you have on hand." },
  { title: "Log your next range day", body: "Rounds come off your stock and the session lands on your calendar." },
];
