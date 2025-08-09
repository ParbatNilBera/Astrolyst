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

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes with navbar & footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/free-kundli" element={<RegisterUser />} />
          <Route path="/kundli-match" element={<RegisterUser />} />
          <Route path="/astrologers" element={<Astrologers />} />
          <Route path="/community" element={<Community />} />
          <Route path="talk-to-astrologer" element={<AstrologerCall />} />
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

        {/* Astrologer Dashboard */}
        <Route element={<Layout />}>
          <Route path="bookings" element={<GetCall />} />
          <Route path="community-astrologer" element={<Community />} />
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
