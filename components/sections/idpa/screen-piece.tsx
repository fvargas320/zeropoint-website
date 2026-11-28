import { screens, type ScreenName } from "@/content/images";
import styles from "./screen-piece.module.css";

type Props = {
  screen: ScreenName;
  /** x0, y0, x1, y1 in the capture's own pixels. */
  crop: [number, number, number, number];
  label: string;
  className?: string;
};

/** One piece of a real app screen, cut out as a card: the capture drawn as a
    background and positioned so only the crop shows. */
export function ScreenPiece({ screen, crop, label, className }: Props) {
  const { src } = screens[screen];
  const [x0, y0, x1, y1] = crop;
  const w = x1 - x0;
  const h = y1 - y0;
  return (
    <div
      className={[styles.piece, className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
      style={{
        aspectRatio: `${w} / ${h}`,
        backgroundImage: `url(${src.src})`,
        backgroundSize: `${(src.width / w) * 100}% auto`,
        backgroundPosition: `${(x0 / (src.width - w)) * 100}% ${(y0 / (src.height - h)) * 100}%`,
      }}
    />
  );
}
