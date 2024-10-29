import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/styles/Profile.css";

function Profile() {
  const user = useSelector((state) => state.auth.login.currentUser);

  if (user) {
    return (
      <div className="profile-container">
        <h5 className="username">{user.username}</h5>
        <div className="user-avatar">
          <img
            src={user.image || "https://via.placeholder.com/40"}
            alt="User Avatar"
          />
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
