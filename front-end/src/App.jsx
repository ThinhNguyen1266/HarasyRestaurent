import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import About from "./pages/About";
import ReservationsPage from "./pages/AllReservation";
import BranchManagement from "./pages/BranchManagement";
import ChefMenu from "./pages/ChefMenu";
import Contacts from "./pages/Contacts";
import HCMMenu from "./pages/HCMMenu";
import HNMenu from "./pages/HNMenu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import TableList from "./pages/TableList";
import AuthRoute from "./components/AuthRoute";
import Venues from "./pages/Venues";
import StaffLayout from "./components/StaffLayout";
import DefaultLayout from "./components/DefaultLayout";
import Profile from "./pages/UserProfile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<AuthRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/reservation" element={<ReservationsPage />} />
          </Route>
          <Route path="/venues" element={<Venues />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
        <Route path="/menu/hcm" element={<HCMMenu />} />
        <Route path="/menu/hanoi" element={<HNMenu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/table" element={<TableList />} />
        <Route path="/chefmenu" element={<ChefMenu />} />        
        <Route path="/profile/:id" element={<Profile />} />
        <Route element={<StaffLayout />}>
          <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/branch" element={<BranchManagement />} />
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
