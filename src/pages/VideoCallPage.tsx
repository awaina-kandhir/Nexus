import useWebRTC from "../hooks/useWebRTC";
import VideoPlayer from "../components/VideoPlayer";
import Controls from "../components/Controls";

function VideoCallPage() {
  const {
    localVideo,
    remoteVideo,
    toggleMute,
    toggleCamera,
    isMuted,
    isCameraOff,
  } = useWebRTC("meeting123");

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Video Call Room
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <VideoPlayer
          videoRef={localVideo}
          muted={true}
          title="Your Camera"
        />

        <VideoPlayer
          videoRef={remoteVideo}
          title="Remote User"
        />

      </div>

      <Controls
        toggleMute={toggleMute}
        toggleCamera={toggleCamera}
        isMuted={isMuted}
        isCameraOff={isCameraOff}
      />

    </div>
  );
}

export default VideoCallPage;