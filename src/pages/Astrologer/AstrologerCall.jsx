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

const AstrologersGrid = () => {
  const [astrologerData, setAstrologerData] = useState();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log(user);

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

  // in useEffect on mount (if logged in)
  useEffect(() => {
    if (user?.id || user?._id) {
      connectSocket(user._id || user.id);
      // listen for acceptance
      socket.on("call_accepted", (payload) => {
        // payload: { callId, channelName, astrologer }
        if (payload?.channelName) {
          // navigate to voice call page (auto-join)
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
      return;
    }
  };

  if (!astrologerData) {
    return <div>No astrologers are active at this moment</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Professional Astrologers
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {astrologerData?.map((astrologer) => (
            <div
              key={astrologer._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              {/* Header with Profile Icon and Basic Info */}
              <div className="p-6 pb-4">
                <div className="flex items-start gap-4 mb-4">
                  <FaUserCircle className="text-4xl text-gray-400 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {astrologer.name}
                      </h3>
                      {astrologer.isApprovedByAdmin && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {astrologer.location}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {astrologer.gender}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {astrologer.email}
                    </p>
                  </div>
                </div>

                {/*Avalibility*/}
                <div className="flex flex-wrap gap-1">
                  {astrologer.availability?.map((availability, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {availability.day}
                    </span>
                  ))}
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2 mb-4">
                  <FaStar className="text-yellow-500 text-sm" />
                  <span className="text-sm text-gray-700 font-medium">
                    {astrologer.experience} years experience
                  </span>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FaComment className="text-blue-500 text-sm" />
                    <div>
                      <p className="text-xs text-gray-500">Chat</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{astrologer.pricing.chatPerMin}/min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-green-500 text-sm" />
                    <div>
                      <p className="text-xs text-gray-500">Call</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{astrologer.pricing.callPerMin}/min
                      </p>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaGlobe className="text-gray-500 text-sm" />
                    <span className="text-sm font-medium text-gray-700">
                      Languages
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {astrologer.languages.map((language, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expertise */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {astrologer.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full"
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
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => {
                    handleCallNow(astrologer._id);
                  }}
                >
                  <FaPhone className="text-sm" />
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
