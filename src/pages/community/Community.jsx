import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Users,
  Eye,
  Globe,
  Lock,
  PlusCircle,
  XCircle,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Star, TrendingUp, Crown } from "lucide-react";
import toast from "react-hot-toast";
import CreateComunityModal from "../../components/Modal/CreateComunityModal";

const CommunityList = () => {
  const { user } = useContext(UserContext);
  const [communities, setCommunities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    visibility: "public",
  });

  const navigate = useNavigate();
  const userId = user?._id;

  useEffect(() => {
    const fetchComunity = async () => {
      const response = await axiosInstance.get(
        API_PATH.COMUNITY.GET_ALL_COMMUNITIES
      );
      const allCommunities = response.data.data;
      setCommunities(allCommunities);
      setFiltered(allCommunities);
    };
    fetchComunity();
  }, []);

  useEffect(() => {
    const filteredCommunities = communities.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredCommunities);
  }, [search, communities]);

  const handleJoinCommunity = async (communityId) => {
    if (!user) {
      navigate("/login");
    }
    try {
      setLoading(true);
      await axiosInstance.post(API_PATH.COMUNITY.JOIN_COMMUNITY, {
        communityId,
      });

      const response = await axiosInstance.get(
        API_PATH.COMUNITY.GET_ALL_COMMUNITIES
      );
      setCommunities(response.data.data);
      setFiltered(response.data.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Error joining community");
    } finally {
      setLoading(false);
    }
  };

  const isUserJoined = (community) => {
    return community.members.some(
      (m) => m.user === userId && m.status === "approved"
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCommunity({ name: "", description: "", visibility: "public" });
  };

  const handleCreateCommunity = async () => {
    // logic to create a community will go here later
    try {
      const response = await axiosInstance.post(
        API_PATH.COMUNITY.CREATE_COMMUNITY,
        newCommunity
      );
      if (response) {
        toast.success("Comunity Created");
      } else {
        toast.error("Failed ot create groupe");
      }
    } catch (error) {
      console.error("Failed ", error);
      toast.error("Failed ot create groupe");
    }
    console.log("Creating community: ");
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-100/80 to-yellow-200/60 border-b border-yellow-200/50">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400/15 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-yellow-300/50 mb-6 shadow-sm">
              <Star className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">
                Discover Amazing Communities
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="text-black">Explore</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600">
                Communities
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Connect with like-minded people, share your passions, and build
              meaningful relationships in our vibrant community ecosystem
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            {/* Search Box */}
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search communities by name, topic, or interest..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 bg-white shadow-sm transition-all duration-300 placeholder-gray-400 hover:border-gray-300"
              />
            </div>

            {/* Create Community Button for Astrologers */}
            {user?.role === "astrologer" && (
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg group min-w-fit"
              >
                <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                Create Community
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="p-2 bg-yellow-100 rounded-xl">
                <Users className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black">
                  {filtered.length}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {filtered.length === 1 ? "Community" : "Communities"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="p-2 bg-green-100 rounded-xl">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black">
                  {filtered.reduce((acc, c) => acc + c.members.length, 0)}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Total Members
                </div>
              </div>
            </div>
          </div>

          {/* Communities Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((community) => {
                const joined = isUserJoined(community);
                return (
                  <div
                    key={community._id}
                    className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 hover:-translate-y-2 relative overflow-hidden"
                  >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full opacity-60 -translate-y-12 translate-x-12 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-50 to-yellow-100 rounded-full opacity-40 translate-y-8 -translate-x-8 group-hover:opacity-80 transition-opacity duration-500"></div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl ${
                            community.visibility === "public"
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          {community.visibility === "public" ? (
                            <Globe className="h-4 w-4 text-green-600" />
                          ) : (
                            <Lock className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <span
                          className={`text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider ${
                            community.visibility === "public"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                        >
                          {community.visibility}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full border border-gray-200">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-bold text-gray-700">
                          {community.members.length}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-8 relative z-10">
                      <h2 className="text-2xl font-bold text-black mb-4 group-hover:text-yellow-700 transition-colors duration-300 leading-tight">
                        {community.name}
                      </h2>
                      <p className="text-gray-600 leading-relaxed line-clamp-3 text-base">
                        {community.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    {/* Action Button */}
                    <div className="relative z-10">
                      {community.isMember ? (
                        <button
                          className="w-full py-4 text-lg font-bold rounded-2xl text-black bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 border-2 border-yellow-300 hover:border-yellow-400 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-3 group"
                          onClick={() =>
                            navigate(`/community/${community._id}`)
                          }
                        >
                          <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                          View Community
                        </button>
                      ) : (
                        <button
                          className="w-full py-4 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleJoinCommunity(community._id)}
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Crown className="h-5 w-5" />
                          )}
                          {loading ? "Joining..." : "Join Community"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-24">
              <div className="max-w-lg mx-auto">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Search className="h-16 w-16 text-yellow-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">0</span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-black mb-4">
                  No Communities Found
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We couldn't find any communities matching your search. Try
                  different keywords or explore all available communities.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setSearch("")}
                    className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Show All Communities
                  </button>
                  {user?.role === "astrologer" && (
                    <button
                      onClick={handleOpenModal}
                      className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="h-5 w-5" />
                      Create First Community
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Community Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-8 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Create Community
                </h2>
                <p className="text-gray-600 mt-1">
                  Build something amazing together
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <XCircle className="w-6 h-6 text-gray-500 hover:text-red-500 transition-colors duration-200" />
              </button>
            </div>

            {/* Modal Body */}
            <CreateComunityModal
              newCommunity={newCommunity}
              setNewCommunity={setNewCommunity}
            />

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 p-8 border-t border-gray-100">
              <button
                onClick={handleCloseModal}
                className="px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCommunity}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Create Community
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityList;
