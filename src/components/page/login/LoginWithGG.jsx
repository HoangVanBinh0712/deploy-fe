import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Navigate, Link, useSearchParams } from "react-router-dom";
import "./login.css";
import logoBHQ from "../../../assets/img/logo.png";
import pt3Login from "../../../assets/img/cv-picture3.png";
import ggIcon from "../../../assets/img/gg.png";
import { AuthContext } from "../../../contexts/AuthContext";
import { useToast } from "../../../contexts/Toast";
import axios from "axios";
import Spinning from "../../../routing/auth/Spinner";

const LoginGG = () => {
  const {
    authState: { authloading, role },
    loginUser,
    loginGoogleUser,
  } = useContext(AuthContext);
  const [waitLogin, setAuthLoading] = useState(true);
  const { warn, error, success } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const onClick = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const onChangeEmail = (event) => setEmail(event.target.value);

  const [pwd, setPwd] = useState("");
  const onChangePwd = (event) => setPwd(event.target.value);

  const [checkEMP, setCreateEMP] = useState(false);
  const [checkUser, setCreateUser] = useState(true);

  const onClickEMPCheck = () => {
    if (!checkEMP) {
      setCreateEMP(!checkEMP);
      setCreateUser(!checkUser);
    }
  };

  const onClickUCheck = () => {
    if (!checkUser) {
      setCreateEMP(!checkEMP);
      setCreateUser(!checkUser);
    }
  };

  const [mess, setMess] = useState("");

  /* const loginGG =() =>{
        const response= axios.post("https://career-website.herokuapp.com/oauth2/authorization/google",{
            headers: {
              "Content-Type": "application/json",
            },
          }) 
          console.log(response)
    }
    loginGG() */

  const onClickLoginBtn = async (event) => {
    setAuthLoading(false);
    event.preventDefault();
    if (email.length === 0 || pwd.length === 0) {
      console.log("hehe");
      setMess("*Required...");
      setTimeout(() => {
        setMess("");
      }, 5000);
    } else {
      try {
        const userLoginForm = {
          username: email,
          password: pwd,
        };
        let isEmpAccount = "";
        if (checkEMP) isEmpAccount = "ROLE_EMPLOYER";
        else isEmpAccount = "ROLE_USER";
        const userLoginData = await loginUser(userLoginForm, isEmpAccount);
        if (userLoginData.success === false) {
          warn(userLoginData.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setAuthLoading(true);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  // single-time read
  const params = Object.fromEntries([...searchParams]);

  const loginGG = async () => {
    try {
      await loginGoogleUser(params.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loginGG();
  }, []);

  let body;
  if (!authloading && role === "ROLE_USER") {
    body = <Navigate to="/home" />;
  } else if (!authloading && role === "ROLE_EMPLOYER") {
    body = <Navigate to="/employer/home" />;
  } else {
    body = <Spinning />;
  }
  return <>{body}</>;
};
export default LoginGG;
