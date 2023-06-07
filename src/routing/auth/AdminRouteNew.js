import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const AdminRouteNew = ({ component }) => {
  const {
    authState: { role },
  } = useContext(AuthContext);
  if (role === "ROLE_ADMIN") return component;
  else return <Navigate to="/user/login" />;
};

export default AdminRouteNew;
