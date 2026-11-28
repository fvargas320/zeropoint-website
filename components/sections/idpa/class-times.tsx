import { SectionIndex } from "@/components/ui/section-index";
import { idpaClassTimes } from "@/content/idpa";
import styles from "./class-times.module.css";

/** 06: the 5x5 classifier times for every division, as a real table: the
    answer to "what time do I need for Expert". Carry Optics, the demo
    shooter's division, is marked. */
export function ClassTimes() {
  const { classes, rows } = idpaClassTimes;
  return (
    <section className={styles.section} id="classifier" aria-labelledby="classifier-title">
      <div className="wrap">
        <SectionIndex index="06" label={idpaClassTimes.label} />
        <h2 id="classifier-title">{idpaClassTimes.title}</h2>
        <p className={styles.lede}>{idpaClassTimes.lede}</p>
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col"><span>Division</span></th>
                {classes.map((c) => <th key={c.code} scope="col"><abbr title={c.name}>{c.code}</abbr><span>{c.name}</span></th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code} data-mark={r.code === "CO" || undefined}>
                  <th scope="row"><b>{r.code}</b><span>{r.name}</span></th>
                  {r.times.map((t, i) => <td key={classes[i].code}>{t.toFixed(2)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.note}>{idpaClassTimes.note}</p>
        </div>
      </div>
    </section>
  );
}
