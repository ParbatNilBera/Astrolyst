// import React, { useState, useEffect } from "react";
// import { Search, Users, Eye, Globe, Lock } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATH } from "../../utils/apiPath";
// import { useNavigate } from "react-router-dom";

// const CommunityList = () => {
//   const [communities, setCommunities] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchComunity = async () => {
//       const response = await axiosInstance.get(
//         API_PATH.COMUNITY.GET_ALL_COMMUNITIES
//       );
//       const allCommunities = response.data.data;
//       setCommunities(allCommunities);
//       setFiltered(allCommunities);
//     };
//     fetchComunity();
//   }, []);

//   useEffect(() => {
//     const filteredCommunities = communities.filter((c) =>
//       c.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFiltered(filteredCommunities);
//   }, [search, communities]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-50">
//       {/* Header Section */}
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-amber-200/20"></div>
//         <div className="relative px-6 py-16">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black tracking-tight">
//               Explore
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">
//                 Communities
//               </span>
//             </h1>
//             <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
//               Discover amazing communities, connect with like-minded people, and
//               be part of something special
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="px-6 pb-16">
//         <div className="max-w-6xl mx-auto">
//           {/* Search Section */}
//           <div className="mb-12 max-w-lg mx-auto">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-500" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search communities..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-yellow-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200/50 bg-white shadow-lg transition-all duration-300 placeholder-gray-500"
//               />
//             </div>
//           </div>

//           {/* Stats Bar */}
//           <div className="mb-8 text-center">
//             <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-yellow-200">
//               <Users className="h-4 w-4 text-yellow-600" />
//               <span className="text-sm font-medium text-gray-700">
//                 {filtered.length}{" "}
//                 {filtered.length === 1 ? "Community" : "Communities"} Found
//               </span>
//             </div>
//           </div>

//           {/* Communities Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filtered.map((community) => (
//               <div
//                 key={community._id}
//                 className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-yellow-100 hover:border-yellow-300 hover:-translate-y-2 relative overflow-hidden"
//               >
//                 {/* Card Background Pattern */}
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full -translate-y-10 translate-x-10"></div>

//                 {/* Visibility Badge */}
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-2">
//                     {community.visibility === "public" ? (
//                       <Globe className="h-4 w-4 text-green-600" />
//                     ) : (
//                       <Lock className="h-4 w-4 text-gray-600" />
//                     )}
//                     <span
//                       className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                         community.visibility === "public"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {community.visibility}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Users className="h-4 w-4 text-gray-500" />
//                     <span className="text-sm font-medium text-gray-700">
//                       {community.members.length}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Community Info */}
//                 <div className="mb-6">
//                   <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-yellow-700 transition-colors duration-300">
//                     {community.name}
//                   </h2>
//                   <p className="text-gray-600 leading-relaxed line-clamp-3">
//                     {community.description}
//                   </p>
//                 </div>
//                 {}
//                 {/* Action Button */}
//                 <button
//                   className="w-full py-4 text-base font-semibold rounded-2xl text-black bg-gradient-to-r from-yellow-300 to-amber-300 hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2"
//                   onClick={() => {
//                     console.log(community._id);
//                     navigate(`/community/${community._id}`);
//                   }}
//                 >
//                   <Eye className="h-4 w-4" />
//                   View Community
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* No Results State */}
//           {filtered.length === 0 && (
//             <div className="text-center py-16">
//               <div className="max-w-md mx-auto">
//                 <div className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Search className="h-10 w-10 text-yellow-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-black mb-2">
//                   No Communities Found
//                 </h3>
//                 <p className="text-gray-600">
//                   Try adjusting your search terms or explore all available
//                   communities
//                 </p>
//                 <button
//                   onClick={() => setSearch("")}
//                   className="mt-4 px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors duration-300"
//                 >
//                   Clear Search
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommunityList;

// import React, { useState, useEffect, useContext } from "react";
// import { Search, Users, Eye, Globe, Lock } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATH } from "../../utils/apiPath";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../Context/UserContext";

// const CommunityList = () => {
//   const { user } = useContext(UserContext);
//   const [communities, setCommunities] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [role, userRole] = useState("user");
//   const navigate = useNavigate();

//   // Get current userId (assuming token stores userId or use your logic)
//   console.log("hi", user);
//   const userId = user?._id;
//   console.log(user);

//   console.log("userId is ", user?.role);

//   useEffect(() => {
//     const fetchComunity = async () => {
//       const response = await axiosInstance.get(
//         API_PATH.COMUNITY.GET_ALL_COMMUNITIES
//       );
//       const allCommunities = response.data.data;
//       setCommunities(allCommunities);
//       setFiltered(allCommunities);
//     };
//     fetchComunity();
//   }, []);

//   useEffect(() => {
//     const filteredCommunities = communities.filter((c) =>
//       c.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFiltered(filteredCommunities);
//   }, [search, communities]);

//   const handleJoinCommunity = async (communityId) => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.post(API_PATH.COMUNITY.JOIN_COMMUNITY, {
//         communityId,
//       });

//       // Refresh the community list after joining
//       const response = await axiosInstance.get(
//         API_PATH.COMUNITY.GET_ALL_COMMUNITIES
//       );
//       setCommunities(response.data.data);
//       setFiltered(response.data.data);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Error joining community");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isUserJoined = (community) => {
//     return community.members.some(
//       (m) => m.user === userId && m.status === "approved"
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-50">
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-amber-200/20"></div>
//         <div className="relative px-6 py-16">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black tracking-tight">
//               Explore
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">
//                 Communities
//               </span>
//             </h1>
//             <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
//               Discover amazing communities, connect with like-minded people, and
//               be part of something special
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="px-6 pb-16">
//         <div className="max-w-6xl mx-auto">
//           {/* Search Box */}
//           <div className="mb-12 max-w-lg mx-auto">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-500" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search communities..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-yellow-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200/50 bg-white shadow-lg transition-all duration-300 placeholder-gray-500"
//               />
//             </div>
//           </div>

//           {/* Count */}
//           <div className="mb-8 text-center">
//             <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-yellow-200">
//               <Users className="h-4 w-4 text-yellow-600" />
//               <span className="text-sm font-medium text-gray-700">
//                 {filtered.length}{" "}
//                 {filtered.length === 1 ? "Community" : "Communities"} Found
//               </span>
//             </div>
//           </div>

//           {/* Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filtered.map((community) => {
//               const joined = isUserJoined(community);
//               return (
//                 <div
//                   key={community._id}
//                   className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-yellow-100 hover:border-yellow-300 hover:-translate-y-2 relative overflow-hidden"
//                 >
//                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full -translate-y-10 translate-x-10"></div>

//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       {community.visibility === "public" ? (
//                         <Globe className="h-4 w-4 text-green-600" />
//                       ) : (
//                         <Lock className="h-4 w-4 text-gray-600" />
//                       )}
//                       <span
//                         className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                           community.visibility === "public"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {community.visibility}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Users className="h-4 w-4 text-gray-500" />
//                       <span className="text-sm font-medium text-gray-700">
//                         {community.members.length}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-yellow-700 transition-colors duration-300">
//                       {community.name}
//                     </h2>
//                     <p className="text-gray-600 leading-relaxed line-clamp-3">
//                       {community.description}
//                     </p>
//                   </div>

//                   {/* Conditional Button */}
//                   {joined ? (
//                     <button
//                       className="w-full py-4 text-base font-semibold rounded-2xl text-black bg-gradient-to-r from-yellow-300 to-amber-300 hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2"
//                       onClick={() => navigate(`/community/${community._id}`)}
//                     >
//                       <Eye className="h-4 w-4" />
//                       View Community
//                     </button>
//                   ) : (
//                     <button
//                       className="w-full py-4 text-base font-semibold rounded-2xl text-white bg-yellow-600 hover:bg-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
//                       onClick={() => handleJoinCommunity(community._id)}
//                       disabled={loading}
//                     >
//                       {loading ? "Joining..." : "Join Community"}
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* No Results */}
//           {filtered.length === 0 && (
//             <div className="text-center py-16">
//               <div className="max-w-md mx-auto">
//                 <div className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Search className="h-10 w-10 text-yellow-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-black mb-2">
//                   No Communities Found
//                 </h3>
//                 <p className="text-gray-600">
//                   Try adjusting your search terms or explore all available
//                   communities
//                 </p>
//                 <button
//                   onClick={() => setSearch("")}
//                   className="mt-4 px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors duration-300"
//                 >
//                   Clear Search
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommunityList;

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
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-amber-200/20"></div>
        <div className="relative px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black tracking-tight">
              Explore
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">
                Communities
              </span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Discover amazing communities, connect with like-minded people, and
              be part of something special
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* 🌟 Create Community Button for Astrologers Only */}
          {user?.role === "astrologer" && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow-md transition-all"
              >
                <PlusCircle className="h-5 w-5" />
                Create Community
              </button>
            </div>
          )}

          {/* 🔍 Search Box */}
          <div className="mb-12 max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search communities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-yellow-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200/50 bg-white shadow-lg transition-all duration-300 placeholder-gray-500"
              />
            </div>
          </div>

          {/* 🔢 Community Count */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-yellow-200">
              <Users className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">
                {filtered.length}{" "}
                {filtered.length === 1 ? "Community" : "Communities"} Found
              </span>
            </div>
          </div>

          {/* 🧱 Grid of Communities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((community) => {
              const joined = isUserJoined(community);
              return (
                <div
                  key={community._id}
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-yellow-100 hover:border-yellow-300 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full -translate-y-10 translate-x-10"></div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {community.visibility === "public" ? (
                        <Globe className="h-4 w-4 text-green-600" />
                      ) : (
                        <Lock className="h-4 w-4 text-gray-600" />
                      )}
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          community.visibility === "public"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {community.visibility}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {community.members.length}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-yellow-700 transition-colors duration-300">
                      {community.name}
                    </h2>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {community.description}
                    </p>
                  </div>

                  {joined ? (
                    <button
                      className="w-full py-4 text-base font-semibold rounded-2xl text-black bg-gradient-to-r from-yellow-300 to-amber-300 hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2"
                      onClick={() => navigate(`/community/${community._id}`)}
                    >
                      <Eye className="h-4 w-4" />
                      View Community
                    </button>
                  ) : (
                    <button
                      className="w-full py-4 text-base font-semibold rounded-2xl text-white bg-yellow-600 hover:bg-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                      onClick={() => handleJoinCommunity(community._id)}
                      disabled={loading}
                    >
                      {loading ? "Joining..." : "Join Community"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* ❌ No Result Found */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  No Communities Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or explore all available
                  communities
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors duration-300"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🟨 Modal for Create Community */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create Community</h2>
              <button onClick={handleCloseModal}>
                <XCircle className="w-6 h-6 text-gray-600 hover:text-red-500" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Community Name"
                value={newCommunity.name}
                onChange={(e) =>
                  setNewCommunity({ ...newCommunity, name: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
              />
              <textarea
                placeholder="Description"
                rows="3"
                value={newCommunity.description}
                onChange={(e) =>
                  setNewCommunity({
                    ...newCommunity,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border rounded-xl"
              ></textarea>
              <select
                value={newCommunity.visibility}
                onChange={(e) =>
                  setNewCommunity({
                    ...newCommunity,
                    visibility: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="protected">Protected</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCommunity}
                className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityList;
