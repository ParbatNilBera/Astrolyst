import React from "react";
import { Outlet } from "react-router-dom";
import AstrolystNavbar from "../components/landingpage/AstrolystNavbar";
import AstrologyFooter from "../components/landingpage/AstrologyFooter";

const PublicLayout = () => {
  return (
    <>
      <AstrolystNavbar />
      <Outlet /> {/* All child pages will render here */}
      <AstrologyFooter />
    </>
  );
};

export default PublicLayout;
