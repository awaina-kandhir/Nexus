import { useEffect, useRef, useState } from "react";
import socket from "../services/socket";

export default function useWebRTC(roomId: string) {
 const localVideo = useRef<HTMLVideoElement>(null!);
const remoteVideo = useRef<HTMLVideoElement>(null!);

  const localStream = useRef<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    startConnection();

    return () => {
      socket.emit("leave-room", roomId);

      localStream.current?.getTracks().forEach(track => track.stop());

      peerConnection.current?.close();
    };
  }, []);

  const startConnection = async () => {

    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideo.current) {
      localVideo.current.srcObject = localStream.current;
    }

    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    localStream.current.getTracks().forEach(track => {
      peerConnection.current?.addTrack(track, localStream.current!);
    });

    peerConnection.current.ontrack = (event) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = event.streams[0];
      }
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: event.candidate,
        });
      }
    };

    socket.emit("join-room", roomId);

    socket.on("user-joined", async () => {

      const offer = await peerConnection.current!.createOffer();

      await peerConnection.current!.setLocalDescription(offer);

      socket.emit("offer", {
        roomId,
        offer,
      });

    });

    socket.on("offer", async (data) => {

      await peerConnection.current!.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );

      const answer = await peerConnection.current!.createAnswer();

      await peerConnection.current!.setLocalDescription(answer);

      socket.emit("answer", {
        roomId,
        answer,
      });

    });

    socket.on("answer", async (data) => {

      await peerConnection.current!.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );

    });

    socket.on("ice-candidate", async (data) => {

      try {
        await peerConnection.current?.addIceCandidate(data.candidate);
      } catch (err) {
        console.log(err);
      }

    });

  };

  const toggleMute = () => {

    if (!localStream.current) return;

    localStream.current.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });

    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {

    if (!localStream.current) return;

    localStream.current.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });

    setIsCameraOff(!isCameraOff);
  };

  return {
    localVideo,
    remoteVideo,
    toggleMute,
    toggleCamera,
    isMuted,
    isCameraOff,
  };
}