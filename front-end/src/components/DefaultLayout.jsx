import React from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const DefaultLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;
