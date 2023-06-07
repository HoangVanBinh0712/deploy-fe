import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const EmployeeRouteNew = ({ component }) => {
  const {
    authState: { role },
  } = useContext(AuthContext);
  if (role === "ROLE_USER") return component;
  else return <Navigate to="/user/login" />;
};

export default EmployeeRouteNew;
