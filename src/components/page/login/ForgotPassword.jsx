import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import logoBHQ from "../../../assets/img/logo.png";
import pt3Login from "../../../assets/img/cv-picture3.png";
import swal from "sweetalert";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "../../../contexts/Constants";

const ForgotPassword = () => {
  const [waitLogin, setAuthLoading] = useState(true);
  const [sendCodeClicked, setSendCodeClicked] = useState(false);
  const [formForgotPassword, setFormForgotPassword] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });
  const [sendCodeDisabled, setSendCodeDisabled] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const onClick = () => {
    setShowPassword(!showPassword);
  };

  const { email, password, confirmPassword, code } = formForgotPassword;
  const onFormChange = (e) => {
    setFormForgotPassword({
      ...formForgotPassword,
      [e.target.name]: e.target.value,
    });
  };

  const [mess, setMess] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    //email, password
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) errors.email = "Email is required!";
    else if (!regex.test(email)) errors.email = "This is not a valid email format !";

    if (!password) errors.password = "Password is required";
    else if (password?.length < 6) errors.password = "Password must at least 6 characters !";
    else if (password !== confirmPassword) errors.confirmPassword = "Confirm password not match !";

    if (!confirmPassword) errors.confirmPassword = "Password is required";
    else if (confirmPassword?.length < 6) errors.confirmPassword = "Password must at least 6 characters !";

    if (!code || code.length != 10) {
      errors.code = "Code must have 6 characters !";
    }
    return errors;
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setAuthLoading(false);
    const err = validate();

    if (Object.keys(err).length > 0) {
      setFormErrors(err);
    } else {
      setFormErrors({});
      try {
        const response = await axios.post(`${apiUrl}/reset-password`, {
          email: email,
          newPassword: password,
          code: code,
        });
        if (response.data) {
          swal({
            title: response.data.success ? "Success" : "Error",
            icon: response.data.success ? "success" : "error",
            text: response.data.message,
          }).then((click) => {
            if (click && response.data.success) {
              navigate("/user/login");
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    setAuthLoading(true);
  };
  const onSendCodeClicked = async (e) => {
    e.preventDefault();
    if (sendCodeDisabled) {
      swal({
        title: "Error",
        icon: "warning",
        text: `Code is sended to your email. Please wait ${60} seconds for next request !`,
        dangerMode: true,
      });
      return;
    }

    const err = validate();
    if (err.email) {
      swal({
        title: "Error",
        icon: "warning",
        text: err.email,
        dangerMode: true,
      });
    } else {
      //Do Something
      setAuthLoading(false);

      try {
        const response = await axios.get(`${apiUrl}/send-reset-password-code?email=${email}`);
        if (response.data) {
          swal({
            title: response.data.success ? "Success" : "Error",
            icon: response.data.success ? "success" : "error",
            text: response.data.message,
          });

          if (response.data.success) {
            setSendCodeClicked(true);

            setSendCodeDisabled(true);

            setTimeout(() => {
              setSendCodeDisabled(false);
            }, 60000);
          }
        }
      } catch (error) {
        console.log(error);
      }

      setAuthLoading(true);
    }
  };
  let body = (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-more">
            <div className="frame-logo-login">
              <Link to="/home">
                <img className="logo-login" src={logoBHQ} alt="img logo" height="8%" />
              </Link>
            </div>
            <div className="picture-login-page">
              <img
                src={pt3Login}
                alt="img adv"
                height="680px"
                style={{
                  paddingBottom: "28px",
                  margin: "0 13%",
                }}
              />
            </div>
          </div>
          <div className="login100-form">
            <span className="login100-form-title p-b-43">Forgot password</span>
            <div>
              <p className="txt1">
                Don’t have an account?
                <Link className="link-to-register" to="/user/register">
                  {" Create now"}
                </Link>
              </p>
            </div>
            <div className="div-line-input">
              <label className="lb-name" htmlFor="email">
                Email
              </label>
              <div className="send-code-email">
                <input className="input-text-login" type="email" id="email" name="email" value={email} placeholder={mess} onChange={onFormChange} style={{ fontSize: "20px" }} required disabled={sendCodeDisabled}/>
                <div
                  className="button"
                  onClick={(e) => {
                    onSendCodeClicked(e);
                  }}
                  disabled={sendCodeDisabled}
                >
                  Send code
                </div>
              </div>
              <label className="label-error-message" htmlFor="email">
                {formErrors?.email}
              </label>
            </div>
            {sendCodeClicked && (
              <div>
                <div className="div-line-input">
                  <label className="lb-name" htmlFor="code">
                    Code
                  </label>
                  <input className="input-text-login" type="code" id="code" name="code" value={code} placeholder={mess} onChange={onFormChange} style={{ fontSize: "20px" }} required />
                  <label className="label-error-message" htmlFor="code">
                    {formErrors?.code}
                  </label>
                </div>

                <div className="div-line-input">
                  <label className="lb-name" htmlFor="password">
                    Password
                  </label>
                  <div className="group-password">
                    <div style={{ width: "92%" }}>
                      <input
                        className="input-text-login password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        placeholder={mess}
                        style={{
                          margin: "0",
                          border: "none",
                          height: "56px",
                          fontSize: "20px",
                        }}
                        onChange={onFormChange}
                        required
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i className="fa fa-eye" onClick={onClick}></i>
                    </div>
                  </div>
                  <label className="label-error-message" htmlFor="password">
                    {formErrors?.password}
                  </label>
                </div>

                <div className="div-line-input">
                  <label className="lb-name" htmlFor="password">
                    Confirm Password
                  </label>
                  <div className="group-password">
                    <div style={{ width: "92%" }}>
                      <input
                        className="input-text-login password"
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder={mess}
                        style={{
                          margin: "0",
                          border: "none",
                          height: "56px",
                          fontSize: "20px",
                        }}
                        onChange={onFormChange}
                        required
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i className="fa fa-eye" onClick={onClick}></i>
                    </div>
                  </div>
                  <label className="label-error-message" htmlFor="password">
                    {formErrors?.confirmPassword}
                  </label>
                </div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" onClick={onSubmitForm} disabled={!waitLogin}>
                    Submit
                  </button>
                </div>
              </div>
            )}
            <div>
              <Link to="/user/login" className="txt3">
                Login now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{body}</>;
};
export default ForgotPassword;
