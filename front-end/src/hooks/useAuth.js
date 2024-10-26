import { useSelector } from "react-redux";
const useAuth = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = useSelector((state) => state.aut.login?.accessToken);
  return { user, accessToken };
};

export default useAuth;
