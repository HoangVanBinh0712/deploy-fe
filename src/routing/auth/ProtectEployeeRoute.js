import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from "../layout/NavbarMenu";
import Footer from "../layout/Footer";

const ProtectedEmplyeeRoute =({element: Element, ...rest}) => {

  const {authState: {authloading, role}} = useContext(AuthContext)

  if (!authloading && role === 'ROLE_EMPLOYER')
    return (
      <Route {...rest} render={props => (<Element {...rest} {...props} />)} />
    )
  else {
    return (
      <Navigate to="/user/login" />
    )
  }
}

export default ProtectedEmplyeeRoute;
