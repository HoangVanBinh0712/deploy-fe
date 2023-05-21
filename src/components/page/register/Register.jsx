import React from 'react'
import "./register.css"
import { useState, useContext, useEffect } from 'react'
import logoBHQ from '../../../assets/img/logo.png'
import pt3Login from '../../../assets/img/cv-picture3.png'
import { AuthContext } from '../../../contexts/AuthContext'
import { useToast } from "../../../contexts/Toast";
import axios from 'axios'
import { apiUrl } from "../../../contexts/Constants";
import { GlobalContext } from '../../../contexts/GlobalContext'

const Register = () => {

    const { registerUser, registerEmployer } = useContext(AuthContext)
    const { globalState: { industries, cities } } = useContext(GlobalContext)
    const { warn, success } = useToast();

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
            setCreateEMP(!createEMP)
            setCreateUser(!createU)
        }
    };

    const onClickUCheck = () => {
        if (!createU) {
            setCreateEMP(!createEMP)
            setCreateUser(!createU)
        }
    };

    const [name, setName] = useState('')
    const onChangeName = (event) => setName(event.target.value)

    const [mail, setMail] = useState('')
    const onChangeMail = (event) => setMail(event.target.value)

    const [password, setPassword] = useState('')
    const onChangePassword = (event) => setPassword(event.target.value)

    const [r_Password, setR_Password] = useState('')
    const onChangeR_Password = (event) => setR_Password(event.target.value)

    const [phoneNumber, setPhoneNumber] = useState('')
    const onChangePhoneNumber = (event) => setPhoneNumber(event.target.value)

    const [address, setAddress] = useState('')
    const onChangeAddress = (event) => setAddress(event.target.value)

    const [choseIndustry, setChoseIndustry] = useState(0)
    const onChangeIndustry = (event) => setChoseIndustry(event.target.value)

    const [choseCity, setChoseCity] = useState(0)
    const onChangeCity = (event) => setChoseCity(event.target.value)

    const [mess, setMess] = useState('')
    const [clickedBtn, setClickedBtn] = useState(false)

    const employeeReg = async (event) => {
        try {
            const registerForm = {
                name: name,
                email: mail,
                password: password
            }
            const registerData = await registerUser(registerForm);
            console.log(registerData);
            if (registerData.success === false) {
                warn(registerData.message)
            }
            else success(registerData.message)
        } catch (error) {
            console.log(error);
        }
    }

    const employerReg = async (event) => {
        try {
            const registerForm = {
                name: name,
                email: mail,
                password: password,
                phone: phoneNumber,
                industry: choseIndustry,
                city: choseCity,
                address: address
            }
            const registerData = await registerEmployer(registerForm);
            console.log(registerData);
            if (registerData.success === false) {
                warn(registerData.message)
            }
            else success(registerData.message)
        } catch (error) {
            console.log(error);
        }
    }

    const validatePassword = (password1, password2) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
        const check1 = regex.test(password1)
        if (!check1) {
            return { success: false, message: "Your password must contain at least 8 characters including at least one lowercase letter, uppercase letter, number and special character." }
        }
        else if (password1 !== password2) {
            return { success: false, message: "The password you entered does not match." }
        }
        return { success: true, message: "Checked" }
    }

    const onClickRegister = () => {
        setClickedBtn(true)
        if (createU) {
            const checkPassword = validatePassword(password, r_Password)
            if (name.length === 0 || mail.length === 0 || password.length === 0 || r_Password.length === 0) {
                setMess("*Required...")
                setTimeout(() => {
                    setMess("")
                }, 5000)
            }
            else if (!checkPassword.success) {
                warn(checkPassword.message)
            }
            else {
                employeeReg()
            }
        }
        else {
            const checkPassword = validatePassword(password, r_Password)
            if (name.length === 0 || mail.length === 0 || password.length === 0 || r_Password.length === 0 || phoneNumber.length === 0 || address.length === 0) {
                setMess("*Required...")
                setTimeout(() => {
                    setMess("")
                }, 5000)

            }
            else if (choseIndustry === 0) {
                warn("You must choose one industry.")
            }
            else if (choseCity === 0) {
                warn("You must choose one city.")
            }
            else if (!checkPassword.success) {
                warn(checkPassword.message)
            }
            else {
                employerReg()
            }
        }
        setClickedBtn(false)
    }

    return (
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
                    <div className="register100-form">
                        <span className="register100-form-title">
                            Create Your Account
                        </span>
                        <div>
                            <p className="txt1">
                                Already have an account? <a href="/user/login" className='link-to-login'>Login</a>
                            </p>
                        </div>
                        <div >
                            <label className="lb-name">Full name</label>
                            <input className='input-reg' type="text"
                                onChange={onChangeName}
                                value={name}
                                placeholder={mess}
                                style={{ fontSize: '20px' }}
                            />
                        </div>
                        <div >
                            <label className="lb-name" >Email</label>
                            <input className='input-reg' type="email"
                                onChange={onChangeMail}
                                value={mail}
                                placeholder={mess}
                                style={{ fontSize: '20px' }}
                            />
                        </div>
                        <div >
                            <label className="lb-name">Password</label>
                            <div className="group-password" >
                                <div style={{ width: '92%' }}>
                                    <input className="input-text-login password"
                                        type={showPassword1 ? "text" : "password"}
                                        id="pswrd"
                                        name="pwd"
                                        value={password}
                                        placeholder={mess}
                                        style={{ margin: "0", border: 'none', height: '56px', fontSize: '20px' }}
                                        onChange={onChangePassword}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <i className="fa fa-eye" onClick={onClickShow1} ></i>
                                </div>
                            </div>
                        </div>
                        <div >
                            <label className="lb-name" >Confirm Password</label>
                            <div className="group-password" >
                                <div style={{ width: '92%' }}>
                                    <input className="input-text-login password"
                                        type={showPassword2 ? "text" : "password"}
                                        id="pswrd"
                                        name="pwd"
                                        value={r_Password}
                                        placeholder={mess}
                                        style={{ margin: "0", border: 'none', height: '56px', fontSize: '20px' }}
                                        onChange={onChangeR_Password}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <i className="fa fa-eye" onClick={onClickShow2} ></i>
                                </div>
                            </div>
                        </div>
                        <div className="flex-sb-m w-full p-t-3 p-b-32">
                            <span className="recruit">Are you recruiter?</span>
                            <div >
                                <input type="radio" value="yes"
                                    onClick={onClickEMPCheck}
                                    style={{ marginLeft: "20px", cursor: "pointer" }}
                                    checked={createEMP} /> Yes
                            </div>
                            <div >
                                <input type="radio" value="no"
                                    onClick={onClickUCheck}
                                    style={{ marginLeft: "20px", cursor: "pointer" }}
                                    checked={createU} /> No
                            </div>
                        </div>
                        <div id="Company" style={createEMP ? { display: "block" } : { display: "none" }}>
                            <label for="text" className='lb-name'>Phone number</label>
                            <input type="text" className='input-reg'
                                onChange={onChangePhoneNumber}
                                value={phoneNumber}
                                placeholder={mess}
                            />
                            <label for="text" className='lb-name'>Industry</label>
                            <select className='select-reg' onChange={onChangeIndustry}>
                                <option key={""} value="" defaultChecked>
                                    Select Industry
                                </option>
                                {industries.map((i) => (
                                    <option key={i.id} value={i.id}>
                                        {i.name}
                                    </option>
                                ))}
                            </select>
                            <label for="text" className='lb-name'>City</label>
                            <select className='select-reg' onChange={onChangeCity}>
                                <option key={""} value="" defaultChecked>
                                    Select City Location
                                </option>
                                {cities.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <label for="text" className='lb-name'>Address</label>
                            <input type="text" className='input-reg'
                                onChange={onChangeAddress}
                                value={address}
                                placeholder={mess}
                            />
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
    )
}
export default Register;