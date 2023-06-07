import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import "../css/account-setting.css";
import accountIcon from "../../assets/icons/account-icon.png";
import certificateIcon from "../../assets/icons/certificate-blue-icon.png";
import changePasswordIcon from "../../assets/icons/change-password-icon.png";
import checkIcon from "../../assets/icons/check-icon.png";
import addPostIcon from "../../assets/icons/add-post-icon.png";
import editIcon from "../../assets/icons/edit-icon-blue.png";
import cvIcon from "../../assets/icons/cv-icon.png";
import applyIcon from "../../assets/icons/apply-icon.png";
import heartIcon from "../../assets/icons/heart-icon.png";
import searchIcon from "../../assets/icons/search-employee-icon.png";
import followedIcon from "../../assets/icons/followed-icon.png";
import Footer from "../../components/global/Footer";
import { useEffect } from "react";

const UserAccount = () => {
  const loc = useLocation();

  const listLabel = {
    accountManage: "account-mamnagement",
    recordManage: "record-management",
    jobManage: "job-management",
    yourEmployer: "your-employer",
  };
  const accountManageItems = ["personal-info", "achievement", "change-password", "verify-email"];
  const recordManageItems = ["add-resume", "update-resume", "predict-job"];
  const jobManageItems = ["post-submitted", "post-followed"];
  const yourEmployerItems = ["recruiter-followed", "resume-viewer"];
  const getPath = () => {
    return loc.pathname.split("/")[loc.pathname.split("/").length - 1];
  };
  useEffect(() => {
    const path = getPath();
    if (recordManageItems.includes(path)) document.getElementById(listLabel.recordManage).classList.add("actived");
    if (jobManageItems.includes(path)) document.getElementById(listLabel.jobManage).classList.add("actived");
    if (yourEmployerItems.includes(path)) document.getElementById(listLabel.yourEmployer).classList.add("actived");
    if (accountManageItems.includes(path)) document.getElementById(listLabel.accountManage).classList.add("actived");
  }, [loc.pathname]);

  const activeClick = (e) => {
    const el = e.target;
    if (!el.classList.contains("actived")) el.classList.add("actived");
    else {
      el.classList.remove("actived");
    }
  };

  return (
    <>
      <div className="header"></div>
      <div className="content-wrapper">
        <div className="navbar-vertical">
          <div className="label" id={listLabel.accountManage} onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Account management
          </div>
          <ul className="nav-item disabled">
            <li id="personal-info" className={getPath() === "personal-info" ? "selected" : ""}>
              <Link className="nav-text" to="personal-info">
                <img src={accountIcon} alt="" className="nav-icon" />
                Your account
              </Link>
            </li>
            <li id="achievement" className={getPath() === "achievement" ? "selected" : ""}>
              <Link className="nav-text" to="achievement">
                <img src={certificateIcon} alt="" className="nav-icon" />
                Achievement
              </Link>
            </li>

            <li className={getPath() === "change-password" ? "selected" : ""}>
              <Link className="nav-text" to="change-password">
                <img src={changePasswordIcon} alt="" className="nav-icon"></img>
                Change password
              </Link>
            </li>
            <li className={getPath() === "verify-email" ? "selected" : ""}>
              <Link className="nav-text" to="verify-email">
                <img src={checkIcon} alt="" className="nav-icon"></img>
                Verify email
              </Link>
            </li>
          </ul>

          <div className="label" id={listLabel.recordManage} onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Record management
          </div>
          <ul className="nav-item">
            <li className={getPath() === "add-resume" ? "selected" : ""}>
              <Link className="nav-text" to="add-resume">
                <img src={addPostIcon} alt="" className="nav-icon"></img>
                Add new resume
              </Link>
            </li>
            <li className={getPath() === "update-resume" ? "selected" : ""}>
              <Link className="nav-text" to="update-resume">
                <img src={editIcon} alt="" className="nav-icon"></img>
                Resume management
              </Link>
            </li>
            <li className={getPath() === "predict-job" ? "selected" : ""}>
              <Link className="nav-text" to="predict-job">
                <img src={cvIcon} alt="" className="nav-icon"></img>
                Predict job
              </Link>
            </li>
          </ul>
          <div className="label" id={listLabel.jobManage} onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Job management
          </div>
          <ul className="nav-item">
            <li className={getPath() === "post-submitted" ? "selected" : ""}>
              <Link className="nav-text" to="post-submitted">
                <img src={applyIcon} alt="" className="nav-icon"></img>
                Job applied
              </Link>
            </li>
            <li className={getPath() === "post-followed" ? "selected" : ""}>
              <Link className="nav-text" to="post-followed">
                <img src={heartIcon} alt="" className="nav-icon"></img>
                Saved jobs
              </Link>
            </li>
          </ul>
          <div className="label" id={listLabel.yourEmployer} onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Your employers
          </div>
          <ul className="nav-item">
            <li className={getPath() === "resume-viewer" ? "selected" : ""}>
              <Link className="nav-text" to="resume-viewer">
                <img src={searchIcon} alt="" className="nav-icon"></img>
                Profile viewers
              </Link>
            </li>
            <li className={getPath() === "recruiter-followed" ? "selected" : ""}>
              <Link className="nav-text" to="recruiter-followed">
                <img src={followedIcon} alt="" className="nav-icon"></img>
                Favorites
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="free-space" id="free-space"></div> */}

        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserAccount;
