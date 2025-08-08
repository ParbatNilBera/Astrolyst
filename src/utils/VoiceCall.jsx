import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

export default function VoiceCall() {
  const [channelName, setChannelName] = useState("");
  const [joined, setJoined] = useState(false);
  const localTrackRef = useRef(null);

  useEffect(() => {
    return () => {
      if (localTrackRef.current) {
        localTrackRef.current.close();
      }
      client && client.leave();
    };
  }, []);

  async function join() {
    if (!channelName.trim()) {
      alert("Please enter a channel name");
      return;
    }

    try {
      // 1) get token from your server
      // const tokenRes = await fetch(`/rtc-token?channel=${channelName}&uid=0`);
      // const tokenRes = fetch(
      //   `http://localhost:8100/rtc-token?channel=${channelName}&uid=0`
      // );

      const tokenRes = await axios.get(
        `http://localhost:8100/rtc-token?channel=${channelName}&uid=0`
      );
      if (!tokenRes) {
        console.error("Sorry No token is loaded");
      }
      const rtcToken = tokenRes.data.rtcToken;
      // 2) join Agora
      const APP_ID = "7131ecbf8da84f3d915c0aa8a1735919";
      await client.join(APP_ID, channelName, rtcToken, null);

      // 3) create local mic audio track
      const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localTrackRef.current = localAudioTrack;
      await client.publish([localAudioTrack]);

      // 4) subscribe to remote users
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "audio" && user.audioTrack) {
          user.audioTrack.play();
        }
      });

      setJoined(true);
    } catch (err) {
      console.error("join error", err);
    }
  }

  async function leave() {
    try {
      if (localTrackRef.current) {
        localTrackRef.current.stop();
        localTrackRef.current.close();
      }
      await client.leave();
      setJoined(false);
    } catch (err) {
      console.error("leave error", err);
    }
  }

  async function toggleMute() {
    if (!localTrackRef.current) return;
    const muted = localTrackRef.current.muted;
    localTrackRef.current.setMuted(!muted);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>{joined ? `Channel: ${channelName}` : "Join a Voice Call"}</h3>

      {!joined && (
        <div>
          <input
            type="text"
            placeholder="Enter channel name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="border px-3 py-2 rounded-md mr-3"
          />
          <button
            onClick={join}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Join Call
          </button>
        </div>
      )}

      {joined && (
        <>
          <button
            onClick={leave}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-3"
          >
            Leave
          </button>
          <button
            onClick={toggleMute}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Mute / Unmute
          </button>
        </>
      )}
    </div>
  );
}
