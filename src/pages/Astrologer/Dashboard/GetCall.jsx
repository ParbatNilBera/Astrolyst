import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import { FaPhoneAlt } from "react-icons/fa";

const GetCall = () => {
  const navigate = useNavigate();
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.CALL.GET_CALLS);
        if (res.data) {
          setCalls(res.data);
        }
      } catch (err) {
        console.error("Error fetching calls:", err);
      }
    };
    fetchCalls();
  }, []);
  const handleAcceptCall = async (callId) => {
    try {
      console.log(callId);
      const res = await axiosInstance.put(API_PATH.CALL.ACCEPT_CALL(callId));
      // API_PATH.CALL.ACCEPT_CALL.replace(":callId", callId)
      if (res.data?.call?.channelName) {
        // navigate astrologer to voice-call
        navigate(`/test?channel=${res.data.call.channelName}`);
      } else {
        // fallback: fetch call and channelName then navigate
        console.warn("No channelName returned");
      }
    } catch (err) {
      console.error("Accept Error", err);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-2xl font-bold text-black mb-6">
        Pending Call Requests
      </h1>

      <div className="grid gap-4">
        {calls.length > 0 ? (
          calls.map((call) => (
            <div
              key={call._id}
              className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 border border-yellow-200"
            >
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaPhoneAlt className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-black">{call.user?.name}</p>
                  <p className="text-sm text-gray-600">{call.user?.email}</p>
                  <p className="text-sm text-gray-500">📞 {call.user?.phone}</p>
                  <p className="text-xs text-gray-400">
                    Requested: {new Date(call.requestedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Accept Call Button */}
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
                onClick={() => handleAcceptCall(call._id)}
              >
                Accept Call
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No pending calls found.</p>
        )}
      </div>
    </div>
  );
};

export default GetCall;
