import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HomePage from "../employee_scenes/HomePage";
import HomePageEmp from "../employer_scenes/HomePageEmp";
import PageNotFound from "../components/page/notfound/PageNotFound";
import { webUrlActivity } from "../contexts/Constants";
import EmployeeAccountPage from "../employee_scenes/EmployeeAccountPage";
import PersonalInfoComponent from "../employee_scenes/components/PersionalInfoComponent";
import UserAchievement from "../employee_scenes/components/AchievementComponent";
import AddResume from "../employee_scenes/components/AddResumeComponent";
import ChangePassword from "../employee_scenes/components/ChangePasswordComponent";
import PostFollowed from "../employee_scenes/components/PostFollowedComponent";
import PostSubmitted from "../employee_scenes/components/PostSubmittedComponent";
import PredictJob from "../employee_scenes/components/PredictJobComponent";
import RecruiterFollowed from "../employee_scenes/components/RecruiterFollowedComponent";
import UpdateResume from "../employee_scenes/components/UpdateResumeComponent";
import VerifyEmail from "../employee_scenes/components/VerifyEmailComponent";
import ResumeViewer from "../employee_scenes/components/ResumeViewerComponent";
import Login from "../components/page/login/Login";
import LoginGG from "../components/page/login/LoginWithGG";
import Register from "../components/page/register/Register";
import PostDetails from "../components/PostDetails";
import EmployerProfile from "../employer_scenes/components/EmployerProfile";
import SearchPageComponent from "../employee_scenes/components/SearchPageComponent";
import PageCustomerServices from "../components/PageCustomerServices";
import { AuthContext } from "../contexts/AuthContext";

const EmployeeRoute = ({ ...rest }) => {

  const { authState: { authloading, role } } = useContext(AuthContext)
  const location = useLocation();
  const currentUrl = location.pathname;

  let body;

  if (currentUrl === "/") {
    return <Navigate to="/home" />;
  }
  if (currentUrl === "/user") {
    return <Navigate to="/home" />;
  }
  if (currentUrl === "/user/account")
    return <Navigate to="/user/account/personal-info" />;
  //Check if user login here
  else if (!authloading && role === "ROLE_USER") {
    body = (
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/login/:token" element={<LoginGG />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/posts" element={<SearchPageComponent />} />
        <Route path="/posts/:keyword" element={<SearchPageComponent />} />
        <Route path="/recruiter/:id" element={<EmployerProfile />} />
        <Route path="/user/account" element={!authloading && role === "ROLE_USER" ? (<EmployeeAccountPage />)
          :(<Navigate to="/user/login" />)}>
          <Route path="personal-info" element={!authloading && role === "ROLE_USER" ? (<PersonalInfoComponent />)
          :(<Navigate to="/user/login" />)} />
          <Route path="achievement" element={!authloading && role === "ROLE_USER" ? (<UserAchievement />)
          :(<Navigate to="/user/login" />)} />
          <Route path="add-resume" element={!authloading && role === "ROLE_USER" ? (<AddResume />)
          :(<Navigate to="/user/login" />)} />
          <Route path="change-password" element={!authloading && role === "ROLE_USER" ? (<ChangePassword />)
          :(<Navigate to="/user/login" />)} />
          <Route path="post-followed" element={!authloading && role === "ROLE_USER" ? (<PostFollowed />)
          :(<Navigate to="/user/login" />)} />
          <Route path="post-submitted" element={!authloading && role === "ROLE_USER" ? (<PostSubmitted />)
          :(<Navigate to="/user/login" />)} />
          <Route path="predict-job" element={!authloading && role === "ROLE_USER" ? (<PredictJob />)
          :(<Navigate to="/user/login" />)} />
          <Route path="recruiter-followed" element={!authloading && role === "ROLE_USER" ? (<RecruiterFollowed />)
          :(<Navigate to="/user/login" />)} />
          <Route path="resume-viewer" element={!authloading && role === "ROLE_USER" ? (<ResumeViewer />)
          :(<Navigate to="/user/login" />)} />
          <Route path="update-resume" element={!authloading && role === "ROLE_USER" ? (<UpdateResume />)
          :(<Navigate to="/user/login" />)} />
          <Route path="verify-email" element={!authloading && role === "ROLE_USER" ? (<VerifyEmail />)
          :(<Navigate to="/user/login" />)} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    );
  }
  else {
    body = (
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/login/:token" element={<LoginGG />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/posts" element={<SearchPageComponent />} />
        <Route path="/posts/:keyword" element={<SearchPageComponent />} />
        <Route path="/recruiter/:id" element={<EmployerProfile />} />
        <Route path="/customer-services" element={<PageCustomerServices />} />
        <Route path="/user/account" element={<EmployeeAccountPage />}>
          <Route path="personal-info" element={<PersonalInfoComponent />} />
          <Route path="achievement" element={<UserAchievement />} />
          <Route path="add-resume" element={<AddResume />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="post-followed" element={<PostFollowed />} />
          <Route path="post-submitted" element={<PostSubmitted />} />
          <Route path="predict-job" element={<PredictJob />} />
          <Route path="recruiter-followed" element={<RecruiterFollowed />} />
          <Route path="resume-viewer" element={<ResumeViewer />} />
          <Route path="update-resume" element={<UpdateResume />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    );
  }

  return <>{body}</>;
};

export default EmployeeRoute;
