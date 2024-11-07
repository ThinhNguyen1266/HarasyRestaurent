import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import DefaultLayout from "./components/DefaultLayout";
import StaffLayout from "./components/StaffLayout";
import About from "./pages/About";
import ReservationsPage from "./pages/AllReservation";
import BranchManagement from "./pages/BranchManagement";
import ChefMenu from "./pages/ChefMenu";
import Contacts from "./pages/Contacts";
import CreateBranch from "./pages/CreateBranch";
import EditBranch from "./pages/EditBranch";
import HCMMenu from "./pages/HCMMenu";
import HCMVenues from "./pages/HCMVenues";
import HNMenu from "./pages/HNMenu";
import HNVenues from "./pages/HNVenues";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import OrderWaiter from "./pages/OrderWaiter";
import Overview from "./pages/Overview";
import Register from "./pages/Register";
import TableList from "./pages/TableList";
import Profile from "./pages/UserProfile";
import Venues from "./pages/Venues";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<AuthRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/reservation" element={<ReservationsPage />} />
          </Route>
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/hcm" element={<HCMVenues />} />
          <Route path="/venues/hanoi" element={<HNVenues />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/hcm" element={<HCMMenu />} />
          <Route path="/menu/hanoi" element={<HNMenu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/table" element={<TableList />} />
        <Route path="/chefmenu" element={<ChefMenu />} />
        <Route path="/order" element={<OrderWaiter />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route element={<StaffLayout />}>
          <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/branch" element={<BranchManagement />} />
            <Route path="/branch/create" element={<CreateBranch />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/branch/:branchId" element={<EditBranch />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
