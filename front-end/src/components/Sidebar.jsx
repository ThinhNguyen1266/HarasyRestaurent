import React from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaUserCircle,
  FaPowerOff,
} from "react-icons/fa";
import { BsGrid, BsPerson } from "react-icons/bs";
import harasylogo from "../assets/img/logo.png";
import "../assets/styles/Sidebar.css";
import useAuthApi from "../hooks/api/useAuthApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [showDashboards, setShowDashboards] = React.useState(false);
  const [showAccounts, setShowAccounts] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuthApi();

  const handleLogout = async () => {
    await logout(dispatch, navigate);
  };

  return (
    <aside className="sidebar active">
      <div className="text-center">
        <img src={harasylogo} alt="logo" className="logo text-center" />
      </div>

      <div className="sidebar-user text-center">
        <FaUserCircle size={30} />
        <br />
        <span>Thinh Nguyen</span>
      </div>

      {/* Dashboards Section */}
      <div className="sidebar-section">
        <div
          className="sidebar-item"
          onClick={() => setShowDashboards(!showDashboards)}
        >
          <BsGrid /> <span>Dashboards</span>
          {showDashboards ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showDashboards && (
          <ul>
            <li>
              <a href="/table">View table</a>
            </li>
            <li>
              <a href="/">View Orders</a>
            </li>
            <li>
              <a href="/reservation">View Reservation</a>
            </li>
          </ul>
        )}
      </div>

      {/* Accounts Section */}
      <div className="sidebar-section">
        <div
          className="sidebar-item"
          onClick={() => setShowAccounts(!showAccounts)}
        >
          <BsPerson /> <span>Accounts</span>
          {showAccounts ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showAccounts && (
          <ul>
            <li>
              <a href="/">Add Manager</a>
            </li>
            <li>
              <a href="/">Account Manager</a>
            </li>
            <li>
              <a href="/">My profile</a>
            </li>
          </ul>
        )}
      </div>

      {/* Log out Section */}
      <div className="sidebar-logout">
        <FaPowerOff />
        <span onClick={handleLogout}>Log out</span>
      </div>
    </aside>
  );
};

export default Sidebar;
