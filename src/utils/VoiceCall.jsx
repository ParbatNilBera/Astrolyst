// // src/components/VoiceCall.jsx
// import React, { useContext, useEffect, useRef, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";
// import { PhoneOff, Mic } from "lucide-react";
// import axiosInstance from "../utils/axiosInstance"; // your auth axios wrapper
// import { API_PATH, BASE_URL } from "../utils/apiPath";
// import { UserContext } from "../Context/UserContext";
// import toast from "react-hot-toast";

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// export default function VoiceCall() {
//   const { user } = useContext(UserContext);
//   const [searchParams] = useSearchParams();
//   const channelName = searchParams.get("channel"); // auto-provided via ?channel=
//   const [joined, setJoined] = useState(false);
//   const [joining, setJoining] = useState(false); // UI state while joining
//   const [error, setError] = useState(null);
//   const localTrackRef = useRef(null);
//   const subscribedRemoteRef = useRef(new Map()); // track remote users if needed

//   // keep a stable handler reference to unsubscribe later
//   const onUserPublishedRef = useRef(null);

//   useEffect(() => {
//     // auto join when channel is provided
//     if (channelName) {
//       join(channelName);
//     }

//     // cleanup on unmount
//     return () => {
//       (async () => {
//         try {
//           if (localTrackRef.current) {
//             try {
//               // stop & close local track
//               await localTrackRef.current.stop();
//             } catch (e) {
//               console.log("Error", e);
//             }
//             try {
//               localTrackRef.current.close();
//             } catch (e) {
//               console.log("Error", e);
//             }
//             localTrackRef.current = null;
//           }
//           // leave client if joined
//           if (client) {
//             try {
//               await client.leave();
//             } catch (e) {
//               console.log("Error", e);
//               // ignore
//             }
//           }
//         } catch (err) {
//           console.log("Error", err);
//           // ignore cleanup errors
//         }
//       })();
//     };
//     // we intentionally only run when channelName changes
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [channelName]);

//   // join helper: accepts optional channel param; if not provided uses channelName from URL
//   async function join(channelParam) {
//     const channel = channelParam || channelName;
//     if (!channel) {
//       toast.error("No channel provided to join.");
//       return;
//     }
//     if (joined || joining) {
//       // already joining/joined
//       return;
//     }

//     setJoining(true);
//     setError(null);

//     try {
//       // 1) get token from backend
//       // Use BASE_URL because rtc-token is a public endpoint in your index.js
//       const backend = BASE_URL || "http://localhost:6000";
//       const tokenRes = await axios.get(
//         `${backend.replace(/\/$/, "")}/rtc-token?channel=${encodeURIComponent(
//           channel
//         )}&uid=0`
//       );

//       const rtcToken = tokenRes?.data?.rtcToken;
//       if (!rtcToken) throw new Error("No RTC token returned from server");

//       // 2) join Agora
//       const APP_ID = "7131ecbf8da84f3d915c0aa8a1735919";
//       await client.join(APP_ID, channel, rtcToken, null);

//       // 3) create local mic audio track and publish
//       const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//       localTrackRef.current = localAudioTrack;
//       await client.publish([localAudioTrack]);

//       // 4) subscribe to remote users
//       // attach handler once and store ref so we can remove later if needed
//       if (!onUserPublishedRef.current) {
//         onUserPublishedRef.current = async (userObj, mediaType) => {
//           try {
//             await client.subscribe(userObj, mediaType);
//             if (mediaType === "audio") {
//               const remoteAudioTrack = userObj.audioTrack;
//               if (remoteAudioTrack) {
//                 remoteAudioTrack.play(); // plays the remote audio
//               }
//             }
//           } catch (err) {
//             console.error("subscribe error", err);
//           }
//         };
//         client.on("user-published", onUserPublishedRef.current);
//       }

//       // handle user-unpublished if you want to stop some UI / cleanup
//       client.on("user-unpublished", (userObj) => {
//         // optional: stop remote audio or remove from UI
//         try {
//           const uid = userObj.uid;
//           if (subscribedRemoteRef.current.has(uid)) {
//             subscribedRemoteRef.current.delete(uid);
//           }
//         } catch (e) {
//           console.log("Error", e);
//         }
//       });

//       setJoined(true);
//       toast.success("Joined the call");
//     } catch (err) {
//       console.error("join error", err);
//       setError(err.message || "Failed to join call");
//       toast.error("Failed to join call: " + (err.message || ""));
//       // if token invalid, you may want to show more info
//     } finally {
//       setJoining(false);
//     }
//   }

//   async function leave() {
//     // if astrologer, re-enable availability by calling enable endpoint
//     try {
//       if (user?.role === "astrologer") {
//         try {
//           await axiosInstance.put(API_PATH.CALL.ENABLE_ASTROLOGER); // your auth axiosInstance
//           toast.success("Astrologer set to idle");
//         } catch (err) {
//           console.warn(
//             "Failed to enable astrologer after leaving:",
//             err?.message || err
//           );
//         }
//       }
//     } catch (err) {
//       console.error("enable astrologer error", err);
//     }

//     try {
//       if (localTrackRef.current) {
//         try {
//           await localTrackRef.current.stop();
//         } catch (e) {
//           console.log("Error", e);
//         }
//         try {
//           localTrackRef.current.close();
//         } catch (e) {
//           console.log("Error", e);
//         }
//         localTrackRef.current = null;
//       }

//       // remove event listeners we added
//       if (onUserPublishedRef.current) {
//         client.off("user-published", onUserPublishedRef.current);
//         onUserPublishedRef.current = null;
//       }

//       await client.leave();
//       setJoined(false);
//       toast.success("Left the call");
//     } catch (err) {
//       console.error("leave error", err);
//       toast.error("Error while leaving call");
//     }
//   }

//   function toggleMute() {
//     if (!localTrackRef.current) return;
//     // use setEnabled for rtc-sdk-ng
//     const isEnabled = localTrackRef.current.enabled;
//     // setEnabled toggles microphone capture
//     localTrackRef.current.setEnabled(!isEnabled);
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center p-4">
//       <div className="relative w-full max-w-2xl mx-auto">
//         <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-yellow-200/50">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-bold">Voice Call</h1>
//             <p className="mt-2 text-sm text-gray-600">
//               {joined
//                 ? `Connected to ${channelName}`
//                 : joining
//                 ? "Connecting..."
//                 : "Waiting to connect"}
//             </p>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button
//               onClick={leave}
//               disabled={!joined && !joining}
//               className="px-6 py-3 bg-red-500 text-white rounded-md disabled:opacity-50"
//             >
//               <PhoneOff className="inline-block mr-2" /> Leave
//             </button>

//             <button
//               onClick={toggleMute}
//               disabled={!joined}
//               className="px-6 py-3 bg-gray-800 text-white rounded-md disabled:opacity-50"
//             >
//               <Mic className="inline-block mr-2" /> Mute/Unmute
//             </button>

//             {/* Optional: allow manual join button for testing when no URL param */}
//             {!channelName && !joined && (
//               <button
//                 onClick={() => join()}
//                 className="px-6 py-3 bg-green-500 text-white rounded-md"
//               >
//                 Join (manual)
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { PhoneOff, Mic } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH, BASE_URL } from "../utils/apiPath";
import { UserContext } from "../Context/UserContext";
import toast from "react-hot-toast";

export default function VoiceCall() {
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const channelName = searchParams.get("channel");

  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  const clientRef = useRef(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );
  const localTrackRef = useRef(null);
  const subscribedRemoteRef = useRef(new Map());
  const onUserPublishedRef = useRef(null);
  const timerRef = useRef(null);

  // Format seconds into mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Timer for call duration
  useEffect(() => {
    if (joined) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => clearInterval(timerRef.current);
  }, [joined]);

  // JOIN FUNCTION
  async function join(channelParam) {
    const channel = channelParam || channelName;
    if (!channel) {
      toast.error("No channel provided to join.");
      return;
    }
    if (joined || joining) return;

    setJoining(true);
    setError(null);

    try {
      // Get token from backend
      const backend = BASE_URL || "http://localhost:6000";
      const tokenRes = await axios.get(
        `${backend.replace(/\/$/, "")}/rtc-token?channel=${encodeURIComponent(
          channel
        )}&uid=0`
      );
      const rtcToken = tokenRes?.data?.rtcToken;
      if (!rtcToken) throw new Error("No RTC token returned from server");

      const APP_ID = "7131ecbf8da84f3d915c0aa8a1735919";
      await clientRef.current.join(APP_ID, channel, rtcToken, null);

      // Publish local mic track
      const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localTrackRef.current = localAudioTrack;
      await clientRef.current.publish([localAudioTrack]);

      // Subscribe to remote users
      if (!onUserPublishedRef.current) {
        onUserPublishedRef.current = async (userObj, mediaType) => {
          await clientRef.current.subscribe(userObj, mediaType);
          if (mediaType === "audio") {
            const remoteAudioTrack = userObj.audioTrack;
            if (remoteAudioTrack) {
              remoteAudioTrack.play();
            }
          }
        };
        clientRef.current.on("user-published", onUserPublishedRef.current);
      }

      clientRef.current.on("user-unpublished", (userObj) => {
        subscribedRemoteRef.current.delete(userObj.uid);
      });

      setJoined(true);
      toast.success("Joined the call");
    } catch (err) {
      console.error("join error", err);
      setError(err.message || "Failed to join call");
      toast.error("Failed to join call: " + (err.message || ""));
    } finally {
      setJoining(false);
    }
  }

  // LEAVE FUNCTION
  async function leave() {
    if (user?.role === "astrologer") {
      try {
        await axiosInstance.put(API_PATH.CALL.ENABLE_ASTROLOGER);
        toast.success("Astrologer set to idle");
      } catch (err) {
        console.warn("Failed to enable astrologer:", err);
      }
    }

    try {
      if (localTrackRef.current) {
        await localTrackRef.current.stop();
        localTrackRef.current.close();
        localTrackRef.current = null;
      }

      if (onUserPublishedRef.current) {
        clientRef.current.off("user-published", onUserPublishedRef.current);
        onUserPublishedRef.current = null;
      }

      await clientRef.current.leave();
      setJoined(false);
    } catch (err) {
      console.error("leave error", err);
      toast.error("Error while leaving call");
    }
  }

  function toggleMute() {
    if (!localTrackRef.current) return;
    const isEnabled = localTrackRef.current.enabled;
    localTrackRef.current.setEnabled(!isEnabled);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-yellow-200/50">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Voice Call</h1>
            <p className="mt-2 text-sm text-gray-600">
              {joined
                ? `Connected to ${channelName}`
                : joining
                ? "Connecting..."
                : "Waiting to connect"}
            </p>
            {joined && (
              <p className="mt-1 text-lg font-semibold text-green-600">
                Call Duration: {formatTime(callDuration)}
              </p>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={leave}
              disabled={!joined && !joining}
              className="px-6 py-3 bg-red-500 text-white rounded-md disabled:opacity-50"
            >
              <PhoneOff className="inline-block mr-2" /> Leave
            </button>

            <button
              onClick={toggleMute}
              disabled={!joined}
              className="px-6 py-3 bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
              <Mic className="inline-block mr-2" /> Mute/Unmute
            </button>

            {!joined && channelName && (
              <button
                onClick={() => join()}
                className="px-6 py-3 bg-green-500 text-white rounded-md"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
