import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const location = useLocation;

  const defaultRolePath = {
    RECEPTIONIST: "/receptionist-home",
    CHEF: "/chef-home",
    ADMIN: "/admin-home",
    BRANCH_MANAGER: "/branch-manager-home",
    WAITER: "/waiter-home",
    CUSTOMER: "/",
  };
  return allowedRoles.find((role) => role === user.role) ? (
    <Outlet />
  ) : user ? (
    <Navigate to={defaultRolePath[user]} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default AuthRoute;
