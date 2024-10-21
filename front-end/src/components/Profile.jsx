import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Profile() {
  const user = useSelector((state) => state.auth.login.currentUser);
  console.log(user);
  if (user) {
    return <h5>Hi , {user.username}</h5>;
  } else {
    return (
      <Link to="/login" className="login">
        LOGIN
      </Link>
    );
  }
}

export default Profile;
