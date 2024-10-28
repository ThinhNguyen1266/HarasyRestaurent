import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const AuthRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  const defaultRolePath = {
    RECEPTIONIST: "/receptionist-home",
    CHEF: "/chef-home",
    ADMIN: "/admin-home",
    BRANCH_MANAGER: "/branch",
    WAITER: "/waiter-home",
    CUSTOMER: "/",
  };

  return allowedRoles.find((role) => role === user?.role) ? (
    <Outlet />
  ) : user ? (
    <Navigate to={defaultRolePath[user?.role]} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default AuthRoute;
