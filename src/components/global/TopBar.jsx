import React from 'react'
import { useState, useContext, useRef, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import "../../employee_scenes/css/Homepage.css"
import logoBHQ from "../../assets/img/logo.png"
import messIcon from '../../assets/icons/mess-icon.png'
import bellIcon from '../../assets/icons/bell-grey-icon.png'
import personIcon from "../../assets/img/personal.png"

const TopBar = () => {

    const { authState: { authloading, role, user }, logoutSection } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const dropdownRef = useRef(null);

    const [isOpenTool, setIsOpenTool] = useState(false);
    const toggleDropdownTool = () => setIsOpenTool(!isOpenTool);
    const dropTooldownRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("click", handleClickOutsideTool);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("click", handleClickOutsideTool);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleClickOutsideTool = (event) => {
        if (dropTooldownRef.current && !dropTooldownRef.current.contains(event.target)) {
            setIsOpenTool(false);
        }
    };

    const logout = () => {
        const confirm = window.confirm("Are you sure you want to logout?");
        if (confirm) {
            logoutSection()
        }
    }


    let body

    if (authloading) {
        body = (
            <div className="topbar-home">
                <div className="logo-home">
                    <Link to='/home'><img className="logo-intopbar" src={logoBHQ} alt="logo" /></Link>
                </div>
                <div className="menu-homepage">
                    <div className="option-menu">
                        <Link className="option-a-menu" to="/home">Job</Link>
                    </div>
                    <div className="option-menu">
                        <Link className="option-a-menu" to="/user/account">Profile & CV</Link>
                    </div>
                    <div className="option-menu">
                        <Link className="option-a-menu" to="#_">Company</Link>
                    </div>
                    <div className="option-menu">
                        <Link className="option-a-menu" to="#_" >Tools</Link>
                    </div>
                </div>
                <div className="mess-bell-homepage" style={{}}>
                    {/* <Link to='/user/login'> */}<img className="messbell-intopbar" src={messIcon} alt="mess" />{/* </Link> */}
                </div>
                <div className="mess-bell-homepage" style={{ marginRight: "20px" }}>
                    <Link to='/user/login'><img className="messbell-intopbar" src={bellIcon} alt="bell" /></Link>
                </div>
                <div className="signipup-homepage ">
                    <Link to='/user/login'><div className="login-reg-topbar signin-blue">Sign In</div></Link>
                </div>
                <div className="signipup-homepage ">
                    <Link to='/user/register'><div className="login-reg-topbar signup-white">Sign up</div></Link>
                </div>
            </div>
        )
    }

    else if (!authloading && role === "ROLE_USER") {
        body = (
            <div className="topbar-home">
                <div className="logo-home">
                    <Link to='/home'><img className="logo-intopbar" src={logoBHQ} alt="logo" /></Link>
                </div>
                <div className="menu-homepage-signed">
                    <div className="option-menu">
                        <Link className="option-a-menu" to="/home">Job</Link>
                    </div>
                    <div className="option-menu">
                        <Link className="option-a-menu" to="/user/account">Profile & CV</Link>
                    </div>
                    <div className="option-menu">
                        <Link className="option-a-menu" to="#_">Company</Link>
                    </div>
                    <div className="option-menu" ref={dropTooldownRef}>
                        <p className="option-a-menu" href="#_" onClick={toggleDropdownTool} style={{ cursor: 'pointer' }}>Tools</p>
                        {isOpenTool && (
                            <div className='dropbox-tool-topbar' >
                                <div className='option-dropdown'><Link className="option-a-menu" to="/user/account/predict-job">Predict Resume</Link></div>
                                <div className='option-dropdown'> <Link className="option-a-menu" to="#_">Customer services</Link></div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="dropdown-container" ref={dropdownRef}>
                    <div className='option-account'>
                        <div className="signed-homepage">
                            <img className="messbell-intopbar" src={messIcon} alt="mess" />
                        </div>
                        <div className="signed-homepage">
                            <img className="messbell-intopbar" src={bellIcon} alt="bell" />
                        </div>
                        <div className="signed-homepage">
                            <img className="messbell-intopbar" src={user.urlAvatar === null ? personIcon : user.urlAvatar}
                                onClick={toggleDropdown}
                                /* onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} */
                                alt="avt" />
                        </div>
                    </div>
                    {isOpen && (
                        <div className="dropdown-menu">
                            <div className='user-dropbox'>
                                <div className='avt-in-dropbox'>
                                    <img src={personIcon} alt="avt" />
                                </div>
                                <div className='name-in-dropbox'>
                                    <div className='n-user-in-dropbox'>{user.name}</div>
                                    <div className='num-user-in-dropbox'>USER ID: <b>{user.id}</b></div>
                                </div>
                            </div>
                            <Link className="option-a-menu" to="#_" >Tools</Link>

                            <div>
                                <div className='drop-text my-account-chose'>
                                    <Link to='/user/account' className='color-a-dropdownbox'>My Account</Link></div>
                                <div className='drop-text emp-follow-chose'><Link to='/user/account/recruiter-followed' className='color-a-dropdownbox'>My followed</Link></div>
                                <div className='drop-text post-follow-chose'><Link to='/user/account/post-followed' className='color-a-dropdownbox'>My Posts saved</Link></div>
                                <div className='drop-text post-apply-chose'><Link to='/user/account/post-submitted' className='color-a-dropdownbox'>My post applied</Link></div>
                                <div className='drop-text change-pwd-chose'><Link to='/user/account/change-password' className='color-a-dropdownbox'>Change Password</Link></div>
                                <div className='drop-text logout-chose' onClick={logout}>Logout</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    else if (!authloading && role === "ROLE_EMPLOYER") {
        body = (
            <div className="topbar-home">
                <div className="logo-home">
                    <Link to='/employer/home'><img className="logo-intopbar" src={logoBHQ} alt="logo" /></Link>
                </div>
                <div className="menu-homepage-signed">
                    <div className="option-menu">
                        <Link className="option-a-menu" to="/employer/home">Services</Link>
                    </div>
                    <div className="option-menu">
                        <Link className="option-a-menu" to="#_">Brand promotion</Link>
                    </div>
                    <div className="option-menu" ref={dropTooldownRef}>
                        <p className="option-a-menu" onClick={toggleDropdownTool} style={{ cursor: 'pointer' }}>Tools</p>
                        {isOpenTool && (
                            <div className='dropbox-tool-topbar' >
                                <div className='option-dropdown'><Link className="option-a-menu" to="/employer/account/recruitment-statistics">Recruitment ststistics</Link></div>
                                <div className='option-dropdown'><Link className="option-a-menu" to="/employer/account/search-candidates">Looking for candidates</Link></div>
                                <div className='option-dropdown'> <Link className="option-a-menu" to="/customer-services">Customer services</Link></div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="dropdown-container" ref={dropdownRef}>
                    <div className='option-account'>
                        <div className="signed-homepage">
                            <img className="messbell-intopbar" src={messIcon} alt="mess" />
                        </div>
                        <div className="signed-homepage">
                            <img className="messbell-intopbar" src={bellIcon} alt="bell" />
                        </div>
                        <div className="signed-homepage">
                            <img className="messbell-intopbar" src={user.urlAvatar === null ? personIcon : user.urlAvatar}
                                onClick={toggleDropdown}
                                /* onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} */
                                alt="avt" />
                        </div>
                    </div>
                    {isOpen && (
                        <div className="dropdown-menu">
                            <div className='user-dropbox'>
                                <div className='avt-in-dropbox'>
                                    <img src={personIcon} alt="avt" />
                                </div>
                                <div className='name-in-dropbox'>
                                    <div className='n-user-in-dropbox'>{user.name}</div>
                                    <div className='num-user-in-dropbox'>USER ID: <b>{user.id}</b></div>
                                </div>
                            </div>
                            <div>
                                <div className='drop-text my-account-chose'>
                                    <Link to='/employer/account' className='color-a-dropdownbox'>My Account</Link>
                                </div>
                                <div className='drop-text add-post-chose'>
                                    <Link to='/employer/account/add-post' className='color-a-dropdownbox'>Create Post</Link>
                                </div>
                                <div className='drop-text list-posting-chose'>
                                    <Link to='/employer/account/job-posting' className='color-a-dropdownbox'>My Job Posting</Link>
                                </div>
                                <div className='drop-text search-cv-chose'>
                                    <Link to='/employer/account/search-candidates' className='color-a-dropdownbox'>Looking for Candidates</Link>
                                </div>
                                <div className='drop-text brand-promotion-chose'>
                                    <Link to=' ' className='color-a-dropdownbox'>Brand Promotion</Link>
                                </div>
                                <div className='drop-text change-pwd-chose'>
                                    <Link to='/employer/account/change-password' className='color-a-dropdownbox'>Change Password</Link>
                                </div>
                                <div className='drop-text logout-chose' onClick={logout}>Logout
                                </div>
                            </div>
                        </div>
                    )}
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
export default TopBar