// Outline icons (24px grid, 1.8 stroke) for feature tiles and chips.
const paths = {
  armory: "M7.5 15.5a3.5 3.5 0 1 1 0-7c2.5 0 6.5 7 9 7a3.5 3.5 0 1 0 0-7c-2.5 0-6.5 7-9 7z",
  cloud: "M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4.25 4.25 0 0 1-.5 9.5H7z M9.5 13.5l2-2 2 2 M11.5 11.5v5",
  cost: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.8-2.5 1.9s1 1.6 2.5 1.9 2.5.8 2.5 1.9-1.1 2-2.5 2c-1.1 0-2.1-.5-2.6-1.3 M12 6.5V8 M12 16v1.5",
  forecast: "M4 19h16 M5 15l4-4 3 3 6-7 M14 7h4v4",
  timer: "M12 7a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M12 10.5V14l2 1.5 M10 3h4 M12 3v4 M18.5 6.5l1.5-1.5",
  noAds: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M5.6 5.6l12.8 12.8",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  stage: "M4 20V10 M10 20V4 M16 20v-7 M22 20H2",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
