import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const role = localStorage.getItem("role");

  return role == "super-admin" || role == "agency" || role == "client" || role == "agent" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
}

export default ProtectedRoute;
