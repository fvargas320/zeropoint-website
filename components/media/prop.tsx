import { LazyImage } from "./lazy-image";
import { art, type ArtName } from "@/content/images";

type Props = {
  name: ArtName;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** A decorative cut-out from the App Store set. Lazy, fades in, no shimmer
    (a shimmer box around transparent art looks broken). */
export function Prop({ name, sizes, className, priority = false }: Props) {
  return <LazyImage src={art[name]} alt="" sizes={sizes} priority={priority} bare frameClassName={className} />;
}
