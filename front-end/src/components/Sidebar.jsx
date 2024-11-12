import React, { useState } from "react";
import { BsGrid, BsPerson } from "react-icons/bs";
import {
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaPowerOff,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import harasylogo from "../assets/img/logo.png";
import "../assets/styles/Sidebar.css";
import useAuthApi from "../hooks/api/useAuthApi";
import { useLocation } from "react-router-dom"; // Import useLocation
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  const { logout } = useAuthApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const [showDashboards, setShowDashboards] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FaBars size={25} />
      </div>

      <aside className={`sidebar ${isSidebarOpen ? "active" : "hidden"}`}>
        <div className="text-center">
          <img src={harasylogo} alt="logo" className="logo text-center" />
        </div>

        <div className="sidebar-user text-center">
          <FaUserCircle size={30} />
          <br />
          <span>{user?.fullName}</span>
        </div>

        {user?.role === "ADMIN" ? (
          <>
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
                    <Link to="/overview">Overview</Link>
                  </li>
                  <li>
                    <Link to="/order">View Orders</Link>
                    {/* <li>
                    <a href="/table">View table</a>
                  </li> */}
                  </li>
                  <li>
                    <Link to="/branch">View Branch</Link>
                  </li>
                  <li>
                    <Link to="/reservation">View Reservation</Link>
                  </li>
                </ul>
              )}
            </div>

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
                    <a href="/" className={isActive("/") ? "active" : ""}>
                      Add Manager
                    </a>
                  </li>
                  <li>
                    <a href="/" className={isActive("/") ? "active" : ""}>
                      Account Manager
                    </a>
                  </li>
                  <li>
                    <a
                      href="/profile"
                      className={isActive("/profile") ? "active" : ""}
                    >
                      My profile
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : user?.role === "WAITER" ? (
          <div className="sidebar-section">
            <ul>
              <li>
                <a href="/table" className={isActive("/table") ? "active" : ""}>
                  View Table
                </a>
              </li>
              <li>
                <a href="/order" className={isActive("/order") ? "active" : ""}>
                  View Order
                </a>
              </li>
            </ul>
          </div>
        ) : user?.role === "CHEF" ? (
          <div className="sidebar-section">
            <div className="sidebar-item">
              <BsGrid /> <span>Orders</span>
            </div>
            <ul>
              <li>
                <a href="/table" className={isActive("/table") ? "active" : ""}>
                  View Order
                </a>
              </li>
              <li>
                <a href="/" className={isActive("/") ? "active" : ""}>
                  View Menu
                </a>
              </li>
            </ul>
          </div>
        ) : user?.role === "BRANCH_MANAGER" ? (
          <div className="sidebar-section">
            <div className="sidebar-item">
              <BsGrid /> <span>Orders</span>
            </div>
            <ul>
              <li>
                <a
                  href="/workforce"
                  className={isActive("/workforce") ? "active" : ""}
                >
                  View Workforce
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className={isActive("/profile") ? "active" : ""}
                >
                  View Profile
                </a>
              </li>
            </ul>
          </div>
        ) : user?.role === "RECEPTIONIST" ? (
          <div className="sidebar-section">
            <div className="sidebar-item">
              <BsGrid /> <span>Orders</span>
            </div>
            <ul>
              <li>
                <a
                  href="/reservation"
                  className={isActive("/reservation") ? "active" : ""}
                >
                  View Reservation
                </a>
              </li>
              <li>
                <a href="/table" className={isActive("/table") ? "active" : ""}>
                  View Table
                </a>
              </li>
              <li>
                <a href="/" className={isActive("/") ? "active" : ""}>
                  View Revenue
                </a>
              </li>
            </ul>
          </div>
        ) : null}

        <div
          className="sidebar-logout"
          onClick={async () => {
            await logout(dispatch, navigate);
          }}
        >
          <FaPowerOff />
          <span>Log out</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
