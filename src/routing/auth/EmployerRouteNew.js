import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const EmployerRouteNew = ({ component }) => {
  const {
    authState: { role },
  } = useContext(AuthContext);

  if (role === "ROLE_EMPLOYER") return component;
  else return <Navigate to="/user/login" />;
};

export default EmployerRouteNew;
