import { features } from "@/content/features";
import { FeatureList } from "../feature-list";
import { FeatureStory } from "./feature-story";

/** Home's feature block: the pinned story on desktop, stacked rows on phones.
    Only the visible one loads its images (hidden lazy images aren't fetched). */
export function Features() {
  return (
    <section id="features" aria-label="Features">
      <FeatureStory items={features} />
      <FeatureList items={features} phonesOnly />
    </section>
  );
}
