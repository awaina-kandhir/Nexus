type Props = {
  toggleMute: () => void;
  toggleCamera: () => void;
  isMuted: boolean;
  isCameraOff: boolean;
};

function Controls({
  toggleMute,
  toggleCamera,
  isMuted,
  isCameraOff,
}: Props) {
  return (
    <div className="flex justify-center gap-6 mt-8">

      <button
        onClick={toggleMute}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        {isMuted ? "🎤 Unmute" : "🔇 Mute"}
      </button>

      <button
        onClick={toggleCamera}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        {isCameraOff ? "📷 Camera On" : "📷 Camera Off"}
      </button>

      <button
        onClick={() => window.location.href = "/dashboard"}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
      >
        📞 End Call
      </button>

    </div>
  );
}

export default Controls;