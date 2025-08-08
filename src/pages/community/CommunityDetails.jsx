import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import Post from "./Post/Post";
import Members from "./Members/Members";
import Settings from "./settings/Settings";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const CommunityDetails = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("POST");
  const { user } = useContext(UserContext);
  const { communityId } = useParams();
  const [communityData, setCommunityData] = useState();

  useEffect(() => {
    if (!communityId) return;
    if (!user) {
      navigate("/login");
    }

    const fetchComunityDetails = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATH.COMUNITY.GET_COMUNITY_BY_ID(communityId)
        );

        setCommunityData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch community:", error);
      }
    };

    fetchComunityDetails();
  }, [communityId]);

  const getVisibilityStyle = (visibility) => {
    switch (visibility) {
      case "Public":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300";
      case "Private":
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300";
      case "Protected":
        return "bg-gradient-to-r from-yellow-50 to-white text-black border-yellow-200";
      default:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300";
    }
  };

  const renderTabContent = () => {
    switch (tab) {
      case "POST":
        return <Post communityId={communityId} />;
      case "MEMBERS":
        return <Members communityId={communityId} />;
      case "SETTINGS":
        return <Settings communityId={communityId} />;
      default:
        return <h1 className="text-3xl font-bold text-black">POST</h1>;
    }
  };

  if (!communityData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-yellow-600">Loading Community...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Top Section - Community Name */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {communityData?.name}
          </h1>
        </div>

        {/* Description and Visibility Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-yellow-200 p-6 mb-8">
          {/* Description */}
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed text-lg">
              {communityData.description}
            </p>
          </div>

          {/* Visibility Badge */}
          <div className="flex items-center">
            <span className="text-sm font-medium text-black mr-3">
              Visibility:
            </span>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${getVisibilityStyle(
                communityData.visibility
              )}`}
            >
              {communityData.visibility}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-yellow-200 overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-yellow-200">
            <button
              onClick={() => setTab("POST")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                tab === "POST"
                  ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-black border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-black hover:bg-yellow-50"
              }`}
            >
              Post
            </button>
            <button
              onClick={() => setTab("MEMBERS")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                tab === "MEMBERS"
                  ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-black border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-black hover:bg-yellow-50"
              }`}
            >
              Members
            </button>
            <button
              onClick={() => setTab("SETTINGS")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                tab === "SETTINGS"
                  ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-black border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-black hover:bg-yellow-50"
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 bg-red-600 bg-gradient-to-b from-white to-yellow-50 min-h-64 flex items-center justify-center">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
