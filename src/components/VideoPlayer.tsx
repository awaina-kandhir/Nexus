import type { ComponentProps } from "react";

type Props = {
  videoRef: ComponentProps<"video">["ref"];
  muted?: boolean;
  title: string;
};

function VideoPlayer({
  videoRef,
  muted = false,
  title,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-bold text-center mb-3">
        {title}
      </h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className="w-full rounded-lg bg-black"
      />
    </div>
  );
}

export default VideoPlayer;