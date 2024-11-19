import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Profile.css";
import useAuthApi from "../hooks/api/useAuthApi";

function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuthApi();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await logout(dispatch, navigate);
  };

  if (user) {
    return (
      <div className="profile-container">
        <h5 className="username">{user.username}</h5>
        <div className="user-avatar" onClick={toggleDropdown}>
          <img
            src={user.image || "https://via.placeholder.com/40"}
            alt="User Avatar"
          />
          <div
            className="dropdown-menu"
            style={{ display: isDropdownOpen ? "block" : "none" }}
          >
            <Link to="/userprofile" className="dropdown-item">
              My Profile
            </Link>
            <button onClick={handleLogout} className="dropdown-item logout">
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Link to="/login" className="login">
        LOGIN
      </Link>
    );
  }
}

export default Profile;
