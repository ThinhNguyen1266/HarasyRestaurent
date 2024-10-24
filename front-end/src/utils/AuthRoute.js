import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const role = user?.role;
  console.log(allowedRoles);

  const defaultRole = {
    RECEPTIONIST: "/receptionist-home",
    CHEF: "/chef-home",
    ADMIN: "/admin-home",
    BRANCH_MANAGER: "/branch-manager-home",
    WAITER: "/waiter-home",
    CUSTOMER: "/",
  };

  if (!user) return <Navigate to={"/login"} />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={defaultRole[role]} />;
  }
  return <Outlet />;
};

export default AuthRoute;
