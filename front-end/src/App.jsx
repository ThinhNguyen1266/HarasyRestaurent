import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import CreateEmployee from "./components/CreateEmployee";
import DefaultLayout from "./components/DefaultLayout";
import ScrollToTop from "./components/ScrollToTop";
import StaffLayout from "./components/StaffLayout";
import About from "./pages/About";
import BranchManagement from "./pages/BranchManagement";
import ChefMenu from "./pages/ChefMenu";
import ConfirmReservation from "./pages/ConfirmReservation";
import Contacts from "./pages/Contacts";
import CreateBranch from "./pages/CreateBranch";
import CreateFood from "./pages/CreateFood";
import EditBranch from "./pages/EditBranch";
import EditFood from "./pages/EditFood";
import FindTable from "./pages/FindTable";
import HCMMenu from "./pages/HCMMenu";
import HCMVenues from "./pages/HCMVenues";
import HNMenu from "./pages/HNMenu";
import HNVenues from "./pages/HNVenues";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageFood from "./pages/ManageFood";
import Menu from "./pages/Menu";
import OrderWaiter from "./pages/OrderWaiter";
import Overview from "./pages/Overview";
import Register from "./pages/Register";
import RegrisCus from "./pages/RegrisCus";
import TableList from "./pages/TableList";
import Profile from "./pages/UserProfile";
import Venues from "./pages/Venues";
import WorkforceList from "./pages/WorkforceList";
import CreateOrder from "./pages/CreateOrder";
import EditOrder from "./pages/EditOrder";
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/hcm" element={<HCMVenues />} />
          <Route path="/venues/hanoi" element={<HNVenues />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/hcm" element={<HCMMenu />} />
          <Route path="/menu/hanoi" element={<HNMenu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/userprofile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/findtable" element={<FindTable />} />
        <Route path="/reservationdetails" element={<ConfirmReservation />} />
        <Route path="/table" element={<TableList />} />
        <Route path="/chefmenu" element={<ChefMenu />} />

        <Route path="/profile/:id" element={<Profile />} />

        <Route element={<StaffLayout />}>
          <Route
            element={<AuthRoute allowedRoles={["ADMIN", "BRANCH_MANAGER"]} />}
          >
            <Route path="/food" element={<ManageFood />} />
            <Route path="/food/create" element={<CreateFood />} />
            <Route path="/food/:foodId" element={<EditFood />} />
            <Route path="/workforce" element={<WorkforceList />} />
            <Route path="/workforce/:branchId" element={<WorkforceList />} />
            <Route path="/workforce/create" element={<CreateEmployee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/branch" element={<BranchManagement />} />
            <Route path="/branch/create" element={<CreateBranch />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/branch/:branchId" element={<EditBranch />} />
          </Route>
          <Route element={<AuthRoute allowedRoles={["WAITER"]} />}>
            <Route path="/order" element={<OrderWaiter />} />
            <Route path="/regriscus" element={<RegrisCus />} />
            <Route path="/createorder" element={<CreateOrder />} />
            <Route path="/order/:id" element={<EditOrder />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
