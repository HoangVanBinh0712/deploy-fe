import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "../../employee_scenes/css/Homepage.css";
import logoBHQ from "../../assets/img/logo.png";
import personIcon from "../../assets/img/personal.png";
import bellIcon from "../../assets/icons/bell-grey-icon.png";
import swal from "sweetalert";

const TopBar = () => {
  const {
    authState: { authloading, role, user },
    logoutSection,
    getRecentNotice,
  } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotice, setIsOpentNotice] = useState(false);
  const toggleDropdown = () => {
    setIsOpentNotice(false);
    setIsOpen(!isOpen);
  };
  const toggleDropdownNotice = () => {
    setIsOpen(false);
    setIsOpentNotice(!isOpenNotice);
  };
  const dropdownRef = useRef(null);
  const [isOpenTool, setIsOpenTool] = useState(false);
  const toggleDropdownTool = () => setIsOpenTool(!isOpenTool);
  const dropTooldownRef = useRef(null);
  const [listNotice, setListNotice] = useState([]);

  const getListNotification = async () => {
    const res = await getRecentNotice();
    if (res && res.success) setListNotice(res.data.reverse());
  };

  useEffect(() => {
    getListNotification();
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
      setIsOpentNotice(false);
    }
  };

  const handleClickOutsideTool = (event) => {
    if (dropTooldownRef.current && !dropTooldownRef.current.contains(event.target)) {
      setIsOpenTool(false);
    }
  };

  const logout = () => {
    swal({
      title: "Information",
      icon: "info",
      text: "Do you want to logout ? ",
      buttons: {
        cancel: "Cancel",
        confirm: "Yes"
      },
    }).then((click) => {
      if (click) {
        logoutSection();
      }
    });
  };
  const getPostDate = (date, isGetTime) => {
    const myDate = new Date(date);
    const day = ("0" + myDate.getDate()).slice(-2);
    const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    const year = myDate.getFullYear();
    const hour = String(myDate.getHours()).padStart(2, "0");
    const min = String(myDate.getMinutes()).padStart(2, "0");
    if (isGetTime) return `${hour}:${min}${" "}${day}/${month}/${year}`;
    else return `${day}/${month}/${year}`;
  };

  let body;

  if (!authloading && role === "ROLE_USER") {
    body = (
      <div className="topbar-home">
        <div className="logo-home">
          <Link to="/home">
            <img className="logo-intopbar" src={logoBHQ} alt="logo" />
          </Link>
        </div>
        <div className="menu-homepage-signed">
          <div className="option-menu">
            <Link className="option-a-menu" to="/posts">
              Job
            </Link>
          </div>
          <div className="option-menu">
            <Link className="option-a-menu" to="/user/account">
              Profile & CV
            </Link>
          </div>
          <div className="option-menu">
            <Link className="option-a-menu" to="/highlight-company">
              Company
            </Link>
          </div>
          {/* <div className="option-menu" ref={dropTooldownRef}>
                        <p className="option-a-menu" href="#_" onClick={toggleDropdownTool} style={{ cursor: 'pointer' }}>Tools</p>
                        {isOpenTool && (
                            <div className='dropbox-tool-topbar' >
                                <div className='option-dropdown'><Link className="option-a-menu" to="/user/account/predict-job">Predict Resume</Link></div>
                                <div className='option-dropdown'> <Link className="option-a-menu" to="#_">Customer services</Link></div>
                            </div>
                        )}
                    </div> */}
        </div>
        <div className="dropdown-container" ref={dropdownRef}>
          <div className="option-account">
            {/* <div className="signed-homepage">
                            <img className="messbell-intopbar" src={messIcon} alt="mess" />
                        </div> */}
            <div className="signed-homepage" onClick={toggleDropdownNotice}>
              <img className="messbell-intopbar" src={bellIcon} alt="bell" />
            </div>
            <div className="signed-homepage">
              <img
                className="messbell-intopbar"
                src={user.urlAvatar === null ? personIcon : user.urlAvatar}
                onClick={toggleDropdown}
                /* onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} */
                alt="avt"
              />
            </div>
          </div>
          {isOpen && (
            <div className="dropdown-menu">
              <div className="user-dropbox">
                <div className="avt-in-dropbox">
                  <img src={user.urlAvatar ? user.urlAvatar : personIcon} alt="avt" />
                </div>
                <div className="name-in-dropbox">
                  <div className="n-user-in-dropbox">{user.name}</div>
                  <div className="num-user-in-dropbox">
                    USER ID: <b>{user.id}</b>
                  </div>
                </div>
              </div>
              <Link className="option-a-menu" to="#_">
                Tools
              </Link>

              <div>
                <div className="drop-text my-account-chose">
                  <Link to="/user/account/personal-info" className="color-a-dropdownbox">
                    My Account
                  </Link>
                </div>
                <div className="drop-text emp-follow-chose">
                  <Link to="/user/account/recruiter-followed" className="color-a-dropdownbox">
                    My followed
                  </Link>
                </div>
                <div className="drop-text post-follow-chose">
                  <Link to="/user/account/post-followed" className="color-a-dropdownbox">
                    My Posts saved
                  </Link>
                </div>
                <div className="drop-text post-apply-chose">
                  <Link to="/user/account/post-submitted" className="color-a-dropdownbox">
                    My post applied
                  </Link>
                </div>
                <div className="drop-text change-pwd-chose">
                  <Link to="/user/account/change-password" className="color-a-dropdownbox">
                    Change Password
                  </Link>
                </div>
                <div className="drop-text logout-chose" onClick={logout}>
                  Logout
                </div>
              </div>
            </div>
          )}

          {isOpenNotice && (
            <div className="dropdown-menu" style={{ minHeight: "300px", width: "25%", right: "5px", maxHeight: "500px", overflow: "auto" }}>
              <div className="notification-topbar-header">Notifications</div>

              {listNotice.length > 0 ? (
                <>
                  {listNotice.map((notice, id) => (
                    <div className="single-notice-in-dropbox" key={id}>
                      <div style={{ width: "15px", marginTop: "10px", marginRight: "5px" }}>
                        <i className="fa fa-circle" aria-hidden="true" style={{ fontSize: "10px", display: "flex", alignItems: "center", color: "#0c62ad" }}></i>
                      </div>
                      <div className="gr-title-date-notice">
                        {notice.post ? (
                          <Link to={`/post/${notice.post.id}`}  className="href-notification">
                            <div className="single-notice-in-dropbox-title" style={{ fontSize: "1em" }}>
                              {notice?.title}
                            </div>
                          </Link>
                        ) : (
                          <div className="single-notice-in-dropbox-title" style={{ fontSize: "1em" }}>
                            {notice?.title}
                          </div>
                        )}

                        <div className="single-notice-in-dropbox-date"> {getPostDate(notice.date, true)}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div> You don't have any notifications yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } else if (!authloading && role === "ROLE_EMPLOYER") {
    body = (
      <div className="topbar-home">
        <div className="logo-home">
          <Link to="/home">
            <img className="logo-intopbar" src={logoBHQ} alt="logo" />
          </Link>
        </div>
        <div className="menu-homepage-signed">
          <div className="option-menu">
            <Link className="option-a-menu" to="/employer/home">
              Services
            </Link>
          </div>
          <div className="option-menu">
            <Link className="option-a-menu" to="/employer/account/job-posting">
              Job Posting
            </Link>
          </div>
          <div className="option-menu">
            <Link className="option-a-menu" to="/employer/account/search-candidates">
              Search Candidate
            </Link>
          </div>
          {/* <div className="option-menu" ref={dropTooldownRef}>
                        <p className="option-a-menu" onClick={toggleDropdownTool} style={{ cursor: 'pointer' }}>Tools</p>
                        {isOpenTool && (
                            <div className='dropbox-tool-topbar' >
                                <div className='option-dropdown'><Link className="option-a-menu" to="/employer/account/recruitment-statistics">Recruitment ststistics</Link></div>
                                <div className='option-dropdown'><Link className="option-a-menu" to="/employer/account/search-candidates">Looking for candidates</Link></div>
                                <div className='option-dropdown'> <Link className="option-a-menu" to="/customer-services">Customer services</Link></div>
                            </div>
                        )}
                    </div> */}
        </div>
        <div className="dropdown-container" ref={dropdownRef}>
          <div className="option-account">
            {/* <div className="signed-homepage">
                            <img className="messbell-intopbar" src={messIcon} alt="mess" />
                        </div> */}
            <div className="signed-homepage" onClick={toggleDropdownNotice}>
              <img className="messbell-intopbar" src={bellIcon} alt="bell" />
            </div>
            <div className="signed-homepage">
              <img
                className="messbell-intopbar"
                src={user.urlAvatar === null ? personIcon : user.urlAvatar}
                onClick={toggleDropdown}
                /* onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} */
                alt="avt"
              />
            </div>
          </div>
          {isOpen && (
            <div className="dropdown-menu">
              <div className="user-dropbox">
                <div className="avt-in-dropbox">
                  <img src={user.urlAvatar ? user.urlAvatar : personIcon} alt="avt" />
                </div>
                <div className="name-in-dropbox">
                  <div className="n-user-in-dropbox">{user.name}</div>
                  <div className="num-user-in-dropbox">
                    USER ID: <b>{user.id}</b>
                  </div>
                </div>
              </div>
              <div>
                <div className="drop-text my-account-chose">
                  <Link to="/employer/account/recruitment-statistics" className="color-a-dropdownbox">
                    My Account
                  </Link>
                </div>
                <div className="drop-text add-post-chose">
                  <Link to="/employer/account/add-post" className="color-a-dropdownbox">
                    Create Post
                  </Link>
                </div>
                <div className="drop-text list-posting-chose">
                  <Link to="/employer/account/job-posting" className="color-a-dropdownbox">
                    My Job Posting
                  </Link>
                </div>
                <div className="drop-text search-cv-chose">
                  <Link to="/employer/account/search-candidates" className="color-a-dropdownbox">
                    Looking for Candidates
                  </Link>
                </div>
                {/* <div className='drop-text brand-promotion-chose'>
                                    <Link to=' ' className='color-a-dropdownbox'>Brand Promotion</Link>
                                </div> */}
                <div className="drop-text change-pwd-chose">
                  <Link to="/employer/account/change-password" className="color-a-dropdownbox">
                    Change Password
                  </Link>
                </div>
                <div className="drop-text logout-chose" onClick={logout}>
                  Logout
                </div>
              </div>
            </div>
          )}

          {isOpenNotice && (
            <div className="dropdown-menu" style={{ minHeight: "300px", width: "25%", right: "5px", maxHeight: "500px", overflow: "auto" }}>
              <div className="notification-topbar-header">Notifications</div>

              {listNotice.length > 0 ? (
                <>
                  {listNotice.map((notice, id) => (
                    <div className="single-notice-in-dropbox" key={id}>
                      <div style={{ width: "15px", marginTop: "10px", marginRight: "5px" }}>
                        <i className="fa fa-circle" aria-hidden="true" style={{ fontSize: "10px", display: "flex", alignItems: "center", color: "#0c62ad" }}></i>
                      </div>
                      <div className="gr-title-date-notice">
                        {notice.post ? (
                          <Link to={`/employer/account/post-submitted/${notice.post.id}`} className="href-notification">
                            <div className="single-notice-in-dropbox-title" style={{ fontSize: "1em" }}>
                              {notice?.title}
                            </div>
                          </Link>
                        ) : (
                          <div className="single-notice-in-dropbox-title" style={{ fontSize: "1em" }}>
                            {notice?.title}
                          </div>
                        )}
                        <div className="single-notice-in-dropbox-date"> {getPostDate(notice.date, true)}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div> You don't have any notifications yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    body = (
      <div className="topbar-home">
        <div className="logo-home">
          <Link to="/home">
            <img className="logo-intopbar" src={logoBHQ} alt="logo" />
          </Link>
        </div>
        <div className="menu-homepage" style={{ width: "70%" }}>
          <div className="option-menu">
            <Link className="option-a-menu" to="/posts">
              Job
            </Link>
          </div>
          <div className="option-menu">
            <Link className="option-a-menu" to="/user/account">
              Profile & CV
            </Link>
          </div>
          <div className="option-menu">
            <Link className="option-a-menu" to="/highlight-company">
              Company
            </Link>
          </div>
          {/* <div className="option-menu">
                        <Link className="option-a-menu" to="#_" >Tools</Link>
                    </div> */}
        </div>

        <div className="signipup-homepage ">
          <Link to="/user/login">
            <div className="login-reg-topbar signin-blue">Sign In</div>
          </Link>
        </div>
        <div className="signipup-homepage ">
          <Link to="/user/register">
            <div className="login-reg-topbar signup-white">Sign Up</div>
          </Link>
        </div>
      </div>
    );
  }

  return <>{body}</>;
};
export default TopBar;
