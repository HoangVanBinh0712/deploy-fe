import React from "react";
import "./register.css";
import { useState, useContext, useEffect } from "react";
import logoBHQ from "../../../assets/img/logo.png";
import pt3Login from "../../../assets/img/cv-picture3.png";
import { AuthContext } from "../../../contexts/AuthContext";
import { useToast } from "../../../contexts/Toast";
import axios from "axios";
import { apiUrl } from "../../../contexts/Constants";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Register = () => {
  const { registerUser, registerEmployer } = useContext(AuthContext);
  const {
    globalState: { industries, cities },
  } = useContext(GlobalContext);
  const navigate = useNavigate()

  const [showPassword1, setShowPassword1] = useState(false);
  const onClickShow1 = () => {
    setShowPassword1(!showPassword1);
  };

  const [showPassword2, setShowPassword2] = useState(false);
  const onClickShow2 = () => {
    setShowPassword2(!showPassword2);
  };

  const [createEMP, setCreateEMP] = useState(false);
  const [createU, setCreateUser] = useState(true);

  const onClickEMPCheck = () => {
    if (!createEMP) {
      setCreateEMP(!createEMP);
      setCreateUser(!createU);
    }
  };

  const onClickUCheck = () => {
    if (!createU) {
      setCreateEMP(!createEMP);
      setCreateUser(!createU);
    }
  };

  const [name, setName] = useState("");
  const onChangeName = (event) => setName(event.target.value);

  const [mail, setMail] = useState("");
  const onChangeMail = (event) => setMail(event.target.value);

  const [password, setPassword] = useState("");
  const onChangePassword = (event) => setPassword(event.target.value);

  const [r_Password, setR_Password] = useState("");
  const onChangeR_Password = (event) => setR_Password(event.target.value);

  const [phoneNumber, setPhoneNumber] = useState("");
  const onChangePhoneNumber = (event) => setPhoneNumber(event.target.value);

  const [address, setAddress] = useState("");
  const onChangeAddress = (event) => setAddress(event.target.value);

  const [choseIndustry, setChoseIndustry] = useState(0);
  const onChangeIndustry = (event) => setChoseIndustry(event.target.value);

  const [choseCity, setChoseCity] = useState(0);
  const onChangeCity = (event) => setChoseCity(event.target.value);

  const [mess, setMess] = useState("");
  const [clickedBtn, setClickedBtn] = useState(false);

  const employeeReg = async (event) => {
    try {
      const registerForm = {
        name: name,
        email: mail,
        password: password,
      };
      const registerData = await registerUser(registerForm);
      console.log(registerData);
      if (registerData.success === false) {
        swal({
          title: "Error",
          icon: "warning",
          text: registerData.message,
          dangerMode: true,
        });
      } else {
        swal({
          title: "Successfully!",
          icon: "success",
          text: registerData.message,
        })
        navigate('/user/login')
      };

    } catch (error) {
      console.log(error);
    }
  };

  const employerReg = async (event) => {
    try {
      const registerForm = {
        name: name,
        email: mail,
        password: password,
        phone: phoneNumber,
        industry: choseIndustry,
        city: choseCity,
        address: address,
      };
      const registerData = await registerEmployer(registerForm);
      console.log(registerData);
      if (registerData.success === false) {
        swal({
          title: "Error",
          icon: "warning",
          text: registerData.message,
          dangerMode: true,
        });
      } else {
        swal({
          title: "Successfully!",
          icon: "success",
          text: registerData.message,
        })
        navigate('/user/login')
      };
    } catch (error) {
      console.log(error);
    }
  };

  const validatePassword = (password1, password2) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    const check1 = regex.test(password1);
    if (!check1) {
      return { success: false, message: "Your password must contain at least 8 characters including at least one lowercase letter, uppercase letter, number and special character." };
    } else if (password1 !== password2) {
      return { success: false, message: "The password you entered does not match." };
    }
    return { success: true, message: "Checked" };
  };

  const onClickRegister = () => {
    setClickedBtn(true);
    if (createU) {
      const checkPassword = validatePassword(password, r_Password);
      if (name.length === 0 || mail.length === 0 || password.length === 0 || r_Password.length === 0) {
        setMess("*Required...");
        setTimeout(() => {
          setMess("");
        }, 5000);
      } else if (!checkPassword.success) {
        swal({
          title: "Error",
          icon: "warning",
          text: checkPassword.message,
          dangerMode: true,
        });
      } else {
        employeeReg();
      }
    } else {
      const checkPassword = validatePassword(password, r_Password);
      if (name.length === 0 || mail.length === 0 || password.length === 0 || r_Password.length === 0 || phoneNumber.length === 0 || address.length === 0) {
        setMess("*Required...");
        setTimeout(() => {
          setMess("");
        }, 5000);
      } else if (choseIndustry === 0) {
        swal({
          title: "Error",
          icon: "warning",
          text: "You must choose one industry.",
          dangerMode: true,
        });
      } else if (choseCity === 0) {
        swal({
          title: "Error",
          icon: "warning",
          text: "You must choose one city.",
          dangerMode: true,
        });
      } else if (!checkPassword.success) {
        swal({
          title: "Error",
          icon: "warning",
          text: checkPassword.message,
          dangerMode: true,
        })
      } else {
        employerReg();
      }
    }
    setClickedBtn(false);
  };

  const removeVietnameseAccents = (str) => {
    const map = {
      'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
      'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
      'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
      'đ': 'd',
      'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
      'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
      'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
      'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
      'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
      'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
      'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
      'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
      'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
      'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
      'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
      'Đ': 'D',
      'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
      'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
      'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
      'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
      'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
      'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
      'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
      'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
      'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y'
    };

    return str.replace(/[^A-Za-z0-9]/g, function (x) {
      return map[x] || x;
    });
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-more">
            <div className="frame-logo-login">
              <Link to="/home">
                {" "}
                <img className="logo-login" src={logoBHQ} alt="img logo" height="8%" />
              </Link>
            </div>
            <div className="picture-login-page">
              <img src={pt3Login} alt="img adv" height="680px" style={{ paddingBottom: "28px", margin: "0 13%" }} />
            </div>
          </div>
          <div className="register100-form">
            <span className="register100-form-title">Create Your Account</span>
            <div>
              <p className="txt1">
                Already have an account?{" "}
                <Link to="/user/login" className="link-to-login">
                  Login
                </Link>
              </p>
            </div>
            <div>
              <label className="lb-name">Full name</label>
              <input className="input-reg" type="text" onChange={onChangeName} value={name} placeholder={mess} style={{ fontSize: "20px" }} />
            </div>
            <div>
              <label className="lb-name">Email</label>
              <input className="input-reg" type="email" onChange={onChangeMail} value={mail} placeholder={mess} style={{ fontSize: "20px" }} />
            </div>
            <div>
              <label className="lb-name">Password</label>
              <div className="group-password">
                <div style={{ width: "100%" }}>
                  <input
                    className="input-text-login password"
                    type={showPassword1 ? "text" : "password"}
                    id="pswrd"
                    name="pwd"
                    value={password}
                    placeholder={mess}
                    style={{ margin: "0", border: "none", height: "56px", fontSize: "20px" }}
                    onChange={onChangePassword}
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    right: "1.5em",
                    top: "50%",
                  }}
                >
                  <i className="fa fa-eye" onClick={onClickShow1}></i>
                </div>
              </div>
            </div>
            <div>
              <label className="lb-name">Confirm Password</label>
              <div className="group-password">
                <div style={{ width: "100%" }}>
                  <input
                    className="input-text-login password"
                    type={showPassword2 ? "text" : "password"}
                    id="pswrd"
                    name="pwd"
                    value={r_Password}
                    placeholder={mess}
                    style={{ margin: "0", border: "none", height: "56px", fontSize: "20px" }}
                    onChange={onChangeR_Password}
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    right: "1.5em",
                    top: "50%",
                  }}
                >
                  <i className="fa fa-eye" onClick={onClickShow2}></i>
                </div>
              </div>
            </div>
            <div className="flex-sb-m w-full p-t-3 p-b-32">
              <span className="recruit">Are you recruiter?</span>
              <div onClick={onClickEMPCheck} style={{ marginLeft: "20px", cursor: "pointer" }}>
                <input type="radio" value="yes" checked={createEMP} /> Yes
              </div>
              <div onClick={onClickUCheck} style={{ marginLeft: "20px", cursor: "pointer" }}>
                <input type="radio" value="no" checked={createU} /> No
              </div>
            </div>
            <div id="Company" style={createEMP ? { display: "block" } : { display: "none" }}>
              <label htmlFor="text" className="lb-name">
                Phone number
              </label>
              <input type="text" className="input-reg" onChange={onChangePhoneNumber} value={phoneNumber} placeholder={mess} />
              <label htmlFor="text" className="lb-name">
                Industry
              </label>
              <select className="select-reg" onChange={onChangeIndustry}>
                <option key={""} value="" defaultChecked>
                  Select Industry
                </option>
                {industries.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
              <label htmlFor="text" className="lb-name">
                City
              </label>
              <select className="select-reg" onChange={onChangeCity}>
                <option key={""} value="" defaultChecked>
                  Select City Location
                </option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {removeVietnameseAccents(c.name)}
                  </option>
                ))}
              </select>
              <label htmlFor="text" className="lb-name">
                Address
              </label>
              <input type="text" className="input-reg" onChange={onChangeAddress} value={address} placeholder={mess} />
            </div>
            <div className="container-register100-form-btn">
              <button className="register100-form-btn" onClick={onClickRegister} disabled={clickedBtn}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
