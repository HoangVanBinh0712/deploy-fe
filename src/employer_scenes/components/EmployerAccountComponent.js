import { Link, Outlet, useLocation } from "react-router-dom";
import "../css/account-setting.css";
import accountIcon from "../../assets/icons/account-icon.png";
import changePasswordIcon from "../../assets/icons/change-password-icon.png";
import checkIcon from "../../assets/icons/check-icon.png";
import addPostIcon from "../../assets/icons/add-post-icon.png";
import applyIcon from "../../assets/icons/apply-icon.png";
import TopBar from "../../components/global/TopBar";
import Footer from "../../components/global/Footer";
import checkServiceIcon from "../../assets/icons/check-service-icon.png";
import historyIcon from "../../assets/icons/history-icon.png";
import viewProfileIcon from "../../assets/icons/view-profile-icon.png";
import jobPostingIcon from "../../assets/icons/list-post-icon.png";
import chartIcon from "../../assets/icons/chart-icon.png";
import supportIcon from "../../assets/icons/support-icon.png";
import { useEffect } from "react";

const EmployerAccount = () => {
  const activeClick = (e) => {
    const el = e.target;
    if (!el.classList.contains("actived")) el.classList.add("actived");
    else {
      el.classList.remove("actived");
    }
  };
  const loc = useLocation();

  const getPath = () => {
    return loc.pathname.split("/")[loc.pathname.split("/").length - 1];
  };
  const listLabel = {
    overview: "overview",
    accountManage: "account-mamnagement",
    postManage: "post-management",
    candidateManage: "candidate-management",
    serviceManage: "service-management",
  };

  const accountManageItems = ["employer-info", "achievement", "change-password", "verify-email"];
  const overviewItems = ["recruitment-statistics", "cus-service"];
  const postManageItems = ["add-post", "job-posting"];
  const candidateManageItems = ["post-submitted", "search-candidates"];
  const serviceManageItems = ["purchase-history", "current-services"];

  useEffect(() => {
    const path = getPath();
    if (accountManageItems.includes(path)) document.getElementById(listLabel.accountManage).classList.add("actived");
    if (overviewItems.includes(path)) document.getElementById(listLabel.overview).classList.add("actived");
    if (postManageItems.includes(path)) document.getElementById(listLabel.postManage).classList.add("actived");
    if (candidateManageItems.includes(path)) document.getElementById(listLabel.candidateManage).classList.add("actived");
    if (serviceManageItems.includes(path)) document.getElementById(listLabel.serviceManage).classList.add("actived");
  }, [loc.pathname]);
  return (
    <>
      <TopBar />
      <div className="content-wrapper">
        <div className="navbar-vertical">
          <div className="label" id="overview" onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Overview
          </div>
          <ul className="nav-item disabled">
            <li className={getPath() === "recruitment-statistics" ? "selected" : ""}>
              <Link className="nav-text" to="recruitment-statistics">
                <img src={chartIcon} alt="" className="nav-icon" />
                Recruitment statistics
              </Link>
            </li>
            <li className={getPath() === "cus-service" ? "selected" : ""}>
              <Link className="nav-text" to="cus-service">
                <img src={supportIcon} alt="" className="nav-icon"></img>
                Customer service
              </Link>
            </li>
          </ul>

          <div className="label" id="account-mamnagement" onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Account management
          </div>
          <ul className="nav-item disabled">
            <li className={getPath() === "employer-info" ? "selected" : ""}>
              <Link className="nav-text" to="employer-info">
                <img src={accountIcon} alt="" className="nav-icon" />
                Your account
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

          <div className="label" id="post-management" onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Posts management
          </div>
          <ul className="nav-item">
            <li className={getPath() === "add-post" ? "selected" : ""}>
              <Link className="nav-text" to="add-post">
                <img src={addPostIcon} alt="" className="nav-icon"></img>
                Create post
              </Link>
            </li>
            <li className={getPath() === "job-posting" ? "selected" : ""}>
              <Link className="nav-text" to="job-posting">
                <img src={jobPostingIcon} alt="" className="nav-icon"></img>
                Job posting
              </Link>
            </li>
          </ul>
          <div className="label" id="candidate-management" onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Candidate Management
          </div>
          <ul className="nav-item">
            <li className={getPath() === "post-submitted" ? "selected" : ""}>
              <Link className="nav-text" to="post-submitted">
                <img src={applyIcon} alt="" className="nav-icon"></img>
                Candidate profile
              </Link>
            </li>
            <li className={getPath() === "search-candidates" ? "selected" : ""}>
              <Link className="nav-text" to="search-candidates">
                <img src={viewProfileIcon} alt="" className="nav-icon"></img>
                Looking for Candidates
              </Link>
            </li>
          </ul>
          <div className="label" id="service-management" onClick={(e) => activeClick(e)}>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
            Services management
          </div>
          <ul className="nav-item">
            <li className={getPath() === "purchase-history" ? "selected" : ""}>
              <Link className="nav-text" to="purchase-history">
                <img src={historyIcon} alt="" className="nav-icon"></img>
                Purchase history
              </Link>
            </li>
            <li className={getPath() === "current-services" ? "selected" : ""}>
              <Link className="nav-text" to="current-services">
                <img src={checkServiceIcon} alt="" className="nav-icon"></img>
                Current Service
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

export default EmployerAccount;
