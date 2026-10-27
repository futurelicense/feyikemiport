import type { AnchorHTMLAttributes } from "react";

import { downloads, type DownloadId } from "@/lib/site-data";
import { useTrack } from "@/lib/use-stats";

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">;

/** External link that counts a view on click (including middle-click / open in new tab). */
export function ViewLink({ id, href, ...props }: AnchorProps & { id: string; href: string }) {
  const track = useTrack();
  const count = () => track({ kind: "view", id });
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={count}
      onAuxClick={(e) => e.button === 1 && count()}
      {...props}
    />
  );
}

/** File link that counts a download on click. */
export function DownloadLink({ id, ...props }: AnchorProps & { id: DownloadId }) {
  const track = useTrack();
  return (
    <a
      href={downloads[id].file}
      download={downloads[id].filename}
      onClick={() => track({ kind: "download", id })}
      {...props}
    />
  );
}
