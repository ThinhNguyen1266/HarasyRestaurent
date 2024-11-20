import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const AuthRoute = ({ allowedRoles, isRequired }) => {
  const { user } = useAuth();
  const location = useLocation();

  const defaultRolePath = {
    RECEPTIONIST: "/receptionist-home",
    CHEF: "/chef-home",
    ADMIN: "/branch",
    BRANCH_MANAGER: "/branch",
    WAITER: "/waiter-home",
    CUSTOMER: "/",
  };

  return allowedRoles.find(
    (role) =>
      role === user?.role ||
      (role === "CUSTOMER" && user?.role === "CUSTOMER" && isRequired === false)
  ) ? (
    <Outlet />
  ) : user ? (
    <Navigate to={defaultRolePath[user?.role]} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default AuthRoute;
