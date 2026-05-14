import { Navigate } from "react-router";

function Navigator() {
  const role = localStorage.getItem("role");

  if (role == "super-admin" || role == "agency" || role == "client") {
    return <Navigate to={`/${role.toString()}`} />;
  }
  return <Navigate to={"/login"} />;
}

export default Navigator;
