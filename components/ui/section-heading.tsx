import styles from "./section-heading.module.css";

type Props = {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** h1 on a page's first section, h2 everywhere else. */
  level?: 1 | 2;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, lede, level = 2, className }: Props) {
  const Title = level === 1 ? "h1" : "h2";
  return (
    <div className={[styles.heading, className].filter(Boolean).join(" ")}>
      <p className="eyebrow">{eyebrow}</p>
      <Title id={id}>{title}</Title>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
