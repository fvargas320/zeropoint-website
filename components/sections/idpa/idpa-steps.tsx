import Image from "next/image";
import appIcon from "@/assets/images/app-icon.webp";
import { SectionIndex } from "@/components/ui/section-index";
import { idpaSteps, idpaStepsHead } from "@/content/idpa";
import { ScreenPiece } from "./screen-piece";
import styles from "./idpa-steps.module.css";

/** 04: posted results to the match page, each step with the piece of the
    app it ends on. */
export function IdpaSteps() {
  const visuals = [
    <ScreenPiece key="results" screen="idpaFullResults" crop={[40, 804, 710, 1150]} label="Your row in the full results: 13th, 106.91, 19 down, 3 s of penalties" className={styles.piece} />,
    <p key="share" className={styles.share}>
      <span className={styles.file}>Results file</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      <Image src={appIcon} alt="" width={56} height={56} className={styles.icon} />
      <b>ZeroPoint</b>
    </p>,
    <ScreenPiece key="match" screen="idpaMatch" crop={[40, 560, 710, 1050]} label="Where the time went, with Stage 2 costing 11.0 s" className={styles.piece} />,
  ];
  return (
    <section className={styles.section} id="how" aria-labelledby="how-title">
      <div className="wrap">
        <SectionIndex index="04" label={idpaStepsHead.label} />
        <h2 id="how-title">{idpaStepsHead.title}</h2>
        <ol className={styles.steps}>
          {idpaSteps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.n} aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className={styles.visual}>{visuals[i]}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
