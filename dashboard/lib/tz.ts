// Dates in the viewer's time zone. Pages render on the server, which runs in
// UTC on Vercel, so anything that depends on "which day" (a session's date,
// this month's totals, the greeting) takes the viewer's IANA zone explicitly.
// `undefined` means the process's own zone (local dev, design previews).

export const TZ_COOKIE = "zp_tz";

export function isTimeZone(tz: string | undefined | null): tz is string {
  if (!tz || tz.length > 64) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/// Wall-clock parts of [at] in [tz]: month is 0-based, weekday 0 = Sunday.
export function wall(at: Date, tz?: string) {
  if (!tz) return { y: at.getFullYear(), mo: at.getMonth(), d: at.getDate(), h: at.getHours(), wd: at.getDay() };
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", hourCycle: "h23", weekday: "short",
  }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    y: Number(get("year")),
    mo: Number(get("month")) - 1,
    d: Number(get("day")),
    h: Number(get("hour")) % 24,
    wd: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")),
  };
}

/// Milliseconds [tz]'s wall clock is ahead of UTC at instant [ms].
function offset(tz: string, ms: number) {
  const p = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const n = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0);
  return Date.UTC(n("year"), n("month") - 1, n("day"), n("hour") % 24, n("minute"), n("second")) - Math.floor(ms / 1000) * 1000;
}

/// Midnight starting the wall-clock day y-mo-d in [tz]. Out-of-range months
/// and days roll over (d = 0 is the last day of the month before).
export function midnight(y: number, mo: number, d: number, tz?: string): Date {
  if (!tz) return new Date(y, mo, d);
  const guess = Date.UTC(y, mo, d);
  const first = guess - offset(tz, guess);
  return new Date(guess - offset(tz, first)); // second pass lands DST days right
}
