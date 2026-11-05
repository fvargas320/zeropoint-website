import Image from "next/image";
import cost from "@/assets/images/pro/icon-cost.webp";
import devices from "@/assets/images/pro/icon-devices.webp";
import target from "@/assets/images/pro/icon-target.webp";
import timer from "@/assets/images/pro/icon-timer.webp";
import vault from "@/assets/images/pro/icon-vault.webp";

const icons = { cost, devices, target, timer, vault };

export type ProIconName = keyof typeof icons;

/** A small 3D icon for the Pro tiles. Decorative: the title beside it says it all. */
export function ProIcon({ name, className }: { name: ProIconName; className?: string }) {
  return <Image src={icons[name]} alt="" sizes="48px" className={className} />;
}
