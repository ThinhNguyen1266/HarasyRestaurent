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
import HCMMenu from "./pages/HCMMenu";
import HCMVenues from "./pages/HCMVenues";
import HNMenu from "./pages/HNMenu";
import HNVenues from "./pages/HNVenues";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import TableList from "./pages/TableList";
import Profile from "./pages/UserProfile";
import EditBranch from "./pages/EditBranch";
import Venues from "./pages/Venues";
import OrderWaiter from "./pages/OrderWaiter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<AuthRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/reservation" element={<ReservationsPage />} />
            
          <Route path="/" element={<Home />} />
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
          <Route
            element={<AuthRoute allowedRoles={["ADMIN", "BRANCH_MANAGER"]} />}
          >
            <Route path="/workforce" element={<WorkforceList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/branch" element={<BranchManagement />} />
            <Route path="/branch/create" element={<CreateBranch />} />
            <Route path="/branch/:branchId" element={<EditBranch />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
