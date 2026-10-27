import { LazyImage } from "@/components/media/lazy-image";
import { Prop } from "@/components/media/prop";
import type { Feature } from "@/content/features";
import { screens } from "@/content/images";
import phone from "@/components/media/phone.module.css";
import styles from "./story-stage.module.css";

type Props = { items: Feature[]; active: number };

/** The pinned side of the story: the active feature's prop behind a phone
    whose screen cross-fades, an optional overlay card, and a progress rail. */
export function StoryStage({ items, active }: Props) {
  const current = items[active];
  return (
    <div className={styles.stage}>
      <span className={styles.halo} aria-hidden="true" />
      {items.map((f, i) => (
        <div key={f.id} className={styles.propSlot} data-on={i === active || undefined} aria-hidden="true">
          <Prop name={f.prop} sizes="(min-width: 1024px) 24vw, 1px" />
        </div>
      ))}

      <div className={`${phone.phone} ${styles.phone}`}>
        <div className={`${phone.screen} ${styles.screens}`}>
          {items.map((f, i) => (
            <LazyImage
              key={f.id}
              src={screens[f.screen].src}
              alt={i === active ? screens[f.screen].alt : ""}
              sizes="(min-width: 1024px) 22vw, 1px"
              frameClassName={styles.screen}
              className={phone.img}
              data-on={i === active || undefined}
            />
          ))}
        </div>
      </div>

      {current.overlay && (
        <div key={current.id} className={styles.overlay} aria-hidden="true">
          <Prop name={current.overlay} sizes="26vw" />
        </div>
      )}

      <ol className={styles.rail} aria-label="Features">
        {items.map((f, i) => (
          <li key={f.id} data-on={i === active || undefined}>
            <a href={`#story-${f.id}`} aria-current={i === active ? "step" : undefined}>
              <span className="sr-only">{f.eyebrow}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
