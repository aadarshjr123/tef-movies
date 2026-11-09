import { useAppDispatch } from "@/app/hooks";
import { youtubeThumbnail } from "@/shared/lib/images";
import { PlayIcon } from "@/shared/ui/icons";
import { trailerOpened } from "./playerSlice";

interface TrailerCardProps {
  youtubeId: string;
  name: string;
  /** Shown under the thumbnail, e.g. the title the trailer belongs to. */
  caption?: string;
  size?: "md" | "lg";
}

/**
 * A YouTube thumbnail that opens the shared player. No iframe is created
 * until the user clicks, which keeps pages light.
 */
export function TrailerCard({ youtubeId, name, caption, size = "md" }: TrailerCardProps) {
  const dispatch = useAppDispatch();
  const width = size === "lg" ? "w-72 sm:w-[28rem]" : "w-60 sm:w-72";

  return (
    <button
      type="button"
      onClick={() => dispatch(trailerOpened({ youtubeId, name }))}
      className={`group block text-left ${width}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <img
          src={youtubeThumbnail(youtubeId)}
          alt=""
          loading="lazy"
          decoding="async"
          width={480}
          height={360}
          className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-black/60 p-3 text-white transition group-hover:scale-110 group-hover:bg-purple-600">
            <PlayIcon width={28} height={28} />
          </span>
        </span>
      </div>
      <p className="mt-2 line-clamp-2 font-mono text-xs font-semibold text-gray-900 dark:text-white">
        <span className="sr-only">Play trailer: </span>
        {caption ?? name}
      </p>
      {caption && <p className="line-clamp-1 font-mono text-[11px] text-gray-500 dark:text-gray-400">{name}</p>}
    </button>
  );
}
