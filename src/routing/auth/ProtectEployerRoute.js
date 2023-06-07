import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedEmplyerRoute = ({ element: Element, ...rest }) => {

  const { authState: { authloading, role } } = useContext(AuthContext)

  if (!authloading && role === 'ROLE_EMPLOYER')
    return (
      <Route {...rest} render={props => (<Element {...rest} {...props} />)} />
    )
  else {
    return (
      <Navigate to="/employer/login" />
    )
  }
}

export default ProtectedEmplyerRoute;
