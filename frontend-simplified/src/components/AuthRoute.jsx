import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const token = localStorage.getItem("token");


  if (token) return <Navigate to="/HomePage" replace />;

  return <Outlet />;
};

export default AuthRoute;