import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Venues from "./pages/Venues";
import TableList from "./pages/TableList";
import ChefMenu from "./pages/ChefMenu";
import BranchManagement from "./pages/BranchManagement";
import ReservationsPage from "./pages/AllReservation";

function App() {
  const location = useLocation();

  const noNavFooterRoutes = [
    "/login",
    "/register",
    "/table",
    "/chefmenu",
    "/branch",
  ];

  const showNavFooter = !noNavFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
      {showNavFooter && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/table" element={<TableList />} />
        <Route path="/chefmenu" element={<ChefMenu />} />
        <Route path="/branch" element={<BranchManagement />} />
        <Route path="/reservation" element={<ReservationsPage />} />
      </Routes>
      {showNavFooter && <Footer />}
    </div>
  );
}

export default App;
