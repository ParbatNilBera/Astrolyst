import { socket, connectSocket } from "../../socket/socket";
import { useContext, useEffect, useState } from "react";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import {
  FaUserCircle,
  FaPhone,
  FaComment,
  FaStar,
  FaGlobe,
} from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserAstronaut } from "react-icons/fa";
const AstrologersGrid = () => {
  const [astrologerData, setAstrologerData] = useState();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllAstrologer = async () => {
      const response = await axiosInstance.get(
        API_PATH.CALL.GET_ACTIVE_ASTROLOGER
      );
      console.log(response.data.data);
      setAstrologerData(response.data.data);
    };
    fetchAllAstrologer();
  }, []);

  useEffect(() => {
    if (user?.id || user?._id) {
      connectSocket(user._id || user.id);
      socket.on("call_accepted", (payload) => {
        if (payload?.channelName) {
          navigate(`/test?channel=${payload.channelName}`);
        }
      });
    }
    return () => {
      socket.off("call_accepted");
    };
  }, [user]);

  const handleCallNow = async (astrologerId) => {
    if (!user || user.role !== "user") {
      toast.error("User not Logged In");
      navigate("/login");
      return;
    }

    const response = await axiosInstance.post(API_PATH.CALL.CALL_ASTROLOGER, {
      astrologerId,
    });
    if (response) {
      toast.success("Call Booked Successfully");
    }
  };

  if (!astrologerData || astrologerData?.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-4">
        <div className="bg-yellow-100 rounded-3xl p-12 shadow-lg flex flex-col items-center max-w-md mx-auto">
          <FaUserAstronaut className="text-yellow-400 text-9xl mb-6 animate-bounce" />
          <h2 className="text-3xl font-extrabold text-yellow-900 mb-2 text-center">
            No Astrologers Available
          </h2>
          <p className="text-yellow-800 text-center text-lg max-w-xs">
            Sorry, no astrologers are active at this moment. Please check back
            later for guidance and insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-yellow-900 text-center mb-12 drop-shadow-md">
          Professional Astrologers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {astrologerData.map((astrologer) => (
            <div
              key={astrologer._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-yellow-300 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start gap-5 mb-5">
                  <FaUserCircle className="text-yellow-600 text-7xl flex-shrink-0 rounded-full drop-shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-yellow-900 truncate">
                        {astrologer.name}
                      </h3>
                      {astrologer.isApprovedByAdmin && (
                        <span className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full select-none shadow-sm">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-yellow-700 font-medium mb-1">
                      {astrologer.location}
                    </p>
                    <p className="text-yellow-700 mb-1">{astrologer.gender}</p>
                    <p className="text-yellow-600 truncate text-sm">
                      {astrologer.email}
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {astrologer.availability?.map((availability, i) => (
                    <span
                      key={i}
                      className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full select-none"
                    >
                      {availability.day}
                    </span>
                  ))}
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2 mb-6">
                  <FaStar className="text-yellow-500 text-base" />
                  <span className="text-yellow-800 font-semibold">
                    {astrologer.experience} years experience
                  </span>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <FaComment className="text-yellow-600 text-lg" />
                    <div>
                      <p className="text-xs text-yellow-700 font-medium">
                        Chat
                      </p>
                      <p className="text-yellow-900 font-semibold text-sm">
                        ₹{astrologer.pricing.chatPerMin}/min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-yellow-600 text-lg" />
                    <div>
                      <p className="text-xs text-yellow-700 font-medium">
                        Call
                      </p>
                      <p className="text-yellow-900 font-semibold text-sm">
                        ₹{astrologer.pricing.callPerMin}/min
                      </p>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaGlobe className="text-yellow-700 text-base" />
                    <span className="text-yellow-900 font-semibold text-sm">
                      Languages
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {astrologer.languages.map((language, i) => (
                      <span
                        key={i}
                        className="bg-yellow-200 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm select-none"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expertise */}
                <div className="mb-6 flex-grow">
                  <p className="text-yellow-900 font-semibold text-sm mb-3">
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {astrologer.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-yellow-200 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => handleCallNow(astrologer._id)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-60 flex items-center justify-center gap-2"
                >
                  <FaPhone className="text-lg" />
                  Call Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AstrologersGrid;
