"use client";

import { useEffect, useState } from "react";
import { Strike } from "./strike";
import styles from "./rotating-strike.module.css";

/** How long each struck word stays up before the next one lands (ms). The
    first word waits longer: its line is the slower load-time draw. */
const FIRST_HOLD = 2000;
const HOLD = 1500;

/**
 * The hero's struck word, cycled once: each word drops in and is crossed
 * out in turn, then the first comes back and stays. Screen readers and
 * search only ever get the first word; the slot is as wide as the longest
 * word so the headline never reflows. Reduced motion shows the first word
 * and stops.
 */
export function RotatingStrike({ words }: { words: string[] }) {
  const [step, setStep] = useState(0);
  const sequence = [...words, words[0]];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (step >= sequence.length - 1) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? FIRST_HOLD : HOLD);
    return () => window.clearTimeout(id);
  }, [step, sequence.length]);

  return (
    <>
      <span className="sr-only">{words[0]}</span>
      <span className={styles.slot} aria-hidden="true">
        {words.map((w) => <span key={w} className={styles.ghost}>{w}</span>)}
        {/* A new key remounts the strike, so its line redraws. */}
        <Strike key={step} quick={step > 0}>
          <span className={styles.word} data-enter={step > 0 || undefined}>{sequence[step]}</span>
        </Strike>
      </span>
    </>
  );
}
