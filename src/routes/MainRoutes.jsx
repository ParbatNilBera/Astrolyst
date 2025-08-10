import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginUser from "../auth/LoginUser";
import RegisterUser from "../auth/RegisterUser";
import Astrologers from "../pages/Astrologer/Astrologers";
import Community from "../pages/community/Community";
import LoginAstrologer from "../auth/LoginAstrologer";
import Layout from "../pages/Astrologer/Dashboard/Layout";
import LoginAdmin from "../auth/LoginAdmin";
import AdminLayout from "../pages/admin/Dashboard/AdminLayout";
import ApplyForAstrology from "../pages/Astrologer/ApplyForAstrology";
import AstrologerApplications from "../pages/admin/AstrologerApplications";
import Bookings from "../pages/Astrologer/Dashboard/Bookings";
import CommunityDetails from "../pages/community/CommunityDetails";
import AstrologerDashboard from "../pages/Astrologer/AstrologerDashboard";
import PublicLayout from "./PublicLayout";
import VoiceCall from "../utils/VoiceCall";
import AstrologerCall from "../pages/Astrologer/AstrologerCall";
import GetCall from "../pages/Astrologer/Dashboard/GetCall";
import ChatWithAstrologers from "../pages/Astrologer/ChatWithAstrologers";
import { useContext, useEffect } from "react";
import { connectSocket } from "../socket/socket";
import { UserContext } from "../Context/UserContext";
import ChatPage from "../pages/chat/ChatPage";
import AstrologerChat from "../pages/Astrologer/Dashboard/AstrologerChat";
import AstrologerChatPage from "../pages/Astrologer/Dashboard/AstrologerChatPage";
import ChatIcon from "../components/ChatIcon";
import Profile from "../pages/Profile";
import PaymentGateway from "../payment/PaymentGateway";

const MainRoutes = () => {
  const { user } = useContext(UserContext);
  console.log("from Main Routes", user);
  useEffect(() => {
    if (user && user._id) {
      console.log("Namaskar doston");
      connectSocket(user._id);
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        {/* Public routes with navbar & footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/free-kundli" element={<RegisterUser />} />
          <Route path="/kundli-match" element={<RegisterUser />} />
          <Route path="/astrologers" element={<Astrologers />} />
          <Route path="/community" element={<Community />} />
          <Route path="talk-to-astrologer" element={<AstrologerCall />} />
          <Route path="/chat-to-astrologer" element={<ChatWithAstrologers />} />
          <Route path="/chat/:astrologerId" element={<ChatPage />} />
          <Route path="/mychats" element={<ChatIcon />} />

          <Route path="/test" element={<VoiceCall />} />
          <Route
            path="/community/:communityId"
            element={<CommunityDetails />}
          />
        </Route>

        {/* Routes without navbar & footer */}
        <Route path="/login-astrologer" element={<LoginAstrologer />} />
        <Route path="/astrologer-apply" element={<ApplyForAstrology />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/payment" element={<PaymentGateway />} />
        {/* Astrologer Dashboard */}
        <Route element={<Layout />}>
          <Route path="bookings" element={<GetCall />} />
          <Route path="chat" element={<AstrologerChat />} />
          <Route path="community-astrologer" element={<Community />} />
          <Route
            path="astrologer/chat/:userId"
            element={<AstrologerChatPage />}
          />
          <Route
            path="community-astrologer/:communityId"
            element={<CommunityDetails />}
          />
          <Route
            path="astrologer-dashboard"
            element={<AstrologerDashboard />}
          />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route path="overview" element={<AstrologerApplications />} />
          <Route
            path="astrologers-application"
            element={<AstrologerApplications />}
          />
          {/* <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="roles" element={<Roles />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default MainRoutes;
