import type { ArtName, ScreenName } from "./images";

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: { text: string; pro?: boolean }[];
  screen: ScreenName;
  prop: ArtName;
  /** A card laid over the phone, e.g. the low-stock notification. */
  overlay?: ArtName;
};
