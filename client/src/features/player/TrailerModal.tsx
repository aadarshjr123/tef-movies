import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { youtubeEmbedUrl } from "@/shared/lib/images";
import { Modal } from "@/shared/ui/Modal";
import { selectPlayingVideo, trailerClosed } from "./playerSlice";

/** The single trailer player, mounted once in the app layout. */
export function TrailerModal() {
  const video = useAppSelector(selectPlayingVideo);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={video !== null}
      onClose={() => dispatch(trailerClosed())}
      label={video ? `Trailer: ${video.name}` : "Trailer"}
      className="max-w-5xl overflow-hidden"
    >
      {video && (
        <iframe
          title={video.name}
          src={youtubeEmbedUrl(video.youtubeId)}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="aspect-video w-full"
        />
      )}
    </Modal>
  );
}
