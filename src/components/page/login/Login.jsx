import React from 'react'
import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import './login.css'
import logoBHQ from '../../../assets/img/logo.png'
import pt3Login from '../../../assets/img/cv-picture3.png'
import ggIcon from "../../../assets/img/gg.png"
import { AuthContext } from '../../../contexts/AuthContext'
import swal from 'sweetalert';

const Login = () => {

    const { authState: { authloading, role }, loginUser } = useContext(AuthContext)
    const [waitLogin, setAuthLoading] = useState(true);
    const [formLogin, setFormLogin] = useState({ email: '', password: '' })
    const [formErrors, setFormErrors] = useState({});


    const [showPassword, setShowPassword] = useState(false);
    const onClick = () => {
        setShowPassword(!showPassword);
    };

    const { email, password } = formLogin
    const onFormLoginChange = (e) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
    }
    const [checkEMP, setCreateEMP] = useState(false);
    const [checkUser, setCreateUser] = useState(true);

    const onClickEMPCheck = () => {
        if (!checkEMP) {
            setCreateEMP(!checkEMP)
            setCreateUser(!checkUser)
        }
    };

    const onClickUCheck = () => {
        if (!checkUser) {
            setCreateEMP(!checkEMP)
            setCreateUser(!checkUser)
        }
    };

    const [mess, setMess] = useState('');


    const validate = (formLogin) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formLogin.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(formLogin.email)) {
            errors.email = "This is not a valid email format !";
        }
        if (!formLogin.password) {
            errors.password = "Password is required"
        } else if (formLogin.password?.length <= 6)
            errors.password = "Password must at least 6 characters !"
        return errors;
    };


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
        const err = validate(formLogin)
        if (Object.keys(err).length > 0) {
            setFormErrors(err);
        } else {
            try {
                let isEmpAccount = ''
                if (checkEMP) isEmpAccount = "ROLE_EMPLOYER"
                else isEmpAccount = "ROLE_USER"
                const userLoginData = await loginUser({username: formLogin.email, password: formLogin.password}, isEmpAccount);
                if (userLoginData.success === false) {
                    swal({
                        title: 'Error',
                        icon: 'error',
                        text: userLoginData.message,
                        dangerMode: true
                    })
                }
            } catch (error) {
                console.log(error);
            }

        }

        setAuthLoading(true);
    }
    let body
    if (!authloading && role === "ROLE_USER") {
        body = (<Navigate to="/home" />)
    }
    else if (!authloading && role === "ROLE_EMPLOYER") {
        body = (<Navigate to="/employer/home" />)
    }
    else {
        body = (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-more">
                            <div className='frame-logo-login'>
                                <img className='logo-login' src={logoBHQ} alt="img logo" height="8%" />
                            </div>
                            <div className='picture-login-page'>
                                <img src={pt3Login} alt="img adv" height="680px" style={{ paddingBottom: "28px", margin: "0 13%" }} />
                            </div>
                        </div>
                        <div className="login100-form">
                            <span className="login100-form-title p-b-43">
                                Login
                            </span>
                            <div>
                                <p className="txt1">
                                    Don’t have an account?
                                    <a className="link-to-register" href="/user/register" >{" Create now"}</a>
                                </p>
                            </div>
                            <div >
                                <label className="lb-name" for="email" style={{ color: "#207198" }}>Email </label>
                                <input className="input-text-login"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder={mess}
                                    onChange={onFormLoginChange}
                                    style={{ fontSize: '20px' }}
                                    required
                                />
                                <label className="lb-name" for="email" style={{ color: "red", fontSize: "0.8em" }}>{formErrors?.email} </label>

                            </div>
                            <div >
                                <label className="lb-name" for="password" style={{ color: "#207198" }}>Password</label>
                                <div className="group-password" >
                                    <div style={{ width: '92%' }}>
                                        <input className="input-text-login password"
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={password}
                                            placeholder={mess}
                                            style={{ margin: "0", border: 'none', height: '56px', fontSize: '20px' }}
                                            onChange={onFormLoginChange}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <i className="fa fa-eye" onClick={onClick} ></i>
                                    </div>
                                </div>
                                <label className="lb-name" for="password" style={{ color: "red", fontSize: "0.8em" }}>{formErrors?.password} </label>

                            </div>
                            <div className="flex-sb-m w-full p-t-3 p-b-32">
                                <span className="recruit">Are you recruiter?</span>
                                <div >
                                    <input className="input-radio-login" type="radio" name="question" value="yes" style={{ cursor: "pointer" }}
                                        onClick={onClickEMPCheck}
                                        checked={checkEMP}
                                    /> Yes
                                </div>
                                <div >
                                    <input className="input-radio-login" type="radio" name="question" value="no" style={{ cursor: "pointer" }}
                                        onClick={onClickUCheck}
                                        checked={checkUser}
                                    /> No
                                </div>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={onClickLoginBtn} disabled={!waitLogin}>
                                    Login
                                </button>
                            </div>
                            <div>
                                <a href="#_" className="txt3">Forgot a password?</a>
                            </div>
                            {checkUser && (<>
                                <div className="text-center p-t-20 p-b-20">
                                    <span className="txt2" style={{ fontSize: '20px' }}>
                                        Or
                                    </span>
                                </div>

                                <div className="login100-form-social-item">
                                    <img src={ggIcon} alt="gg icon" width="1em" height="1em" />
                                    <a className="link-to-gg" href="https://career-website.herokuapp.com/oauth2/authorization/google"
                                        style={{ fontSize: '1em' }}>
                                        Continue with google
                                    </a>
                                </div>
                            </>)}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {body}
        </>
    )
}
export default Login;