import Image from "next/image";

export function Wordmark() {
  return <Image className="wordmark" src="/wordmark-light.png" alt="ZeroPoint" width={967} height={555} priority />;
}
