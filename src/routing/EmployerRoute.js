import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import Login from "../components/page/login/Login";
import Register from "../components/page/register/Register";
import EmployerAccount from "../employer_scenes/components/EmployerAccountComponent";
import EmployerChangePassword from "../employer_scenes/components/EmployerChangePasswordComponent";
import EmployerInfo from "../employer_scenes/components/EmployerInfoComponent";
import PageNotFound from "../components/page/notfound/PageNotFound";
import EmployerVerifyEmail from "../employer_scenes/components/EmployerVerifyEmailComponent";
import AddPostComponent from "../employer_scenes/components/AddPostComponent";
import JobPostingComponent from "../employer_scenes/components/JobPostingComponent";
import ServicePage from "../employer_scenes/components/ServicePage";
import PostDetails from "../components/PostDetails";
import EmployeeProfile from "../employee_scenes/components/EmployeeProfile";
import PageCustomerServices from "../components/PageCustomerServiceNoneTopbar";
import SubmitDetail from "../employer_scenes/components/SubmitDetail";
import CandidatesProfile from "../employer_scenes/components/CandidatesProfile";
import PurchaseHistory from "../employer_scenes/components/PurchaseHistory";
import CurrentService from "../employer_scenes/components/CurrentService";
import SearchCandidates from "../employer_scenes/components/SearchCandidates";
import StatiticsPage from "../employer_scenes/components/StatiticsPage";
import { AuthContext } from "../contexts/AuthContext";


const EmployerRoute = ({ ...rest }) => {

  const {authState:{authloading, role}}=useContext(AuthContext)
  const location = useLocation();
  const currentUrl = location.pathname;

  let body;

  if (currentUrl === "/" || currentUrl === "/employer") {
    return <Navigate to="/home" />;
  }
  if (currentUrl === "/employer/login") {
    return <Navigate to="/user/login"/>
  }
  //Check if user logged in
  if (currentUrl === "/employer/account")
    return <Navigate to="/employer/account/employer-info" />;
  else if(!authloading && role==="ROLE_EMPLOYER"){
    body = (
      <Routes>
        <Route path="/employer/login" element={<Login />} />
        <Route path="/employer/register" element={<Register />} />
        <Route path="/employer/home" element={<ServicePage />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/employer/post/:id" element={<PostDetails />} />
        <Route path="/employer/candidates/:id" element={<EmployeeProfile />} />
        <Route path="/employer/account" element={<EmployerAccount />}>
          <Route path="employer-info" element={<EmployerInfo />} />
          <Route path="change-password" element={<EmployerChangePassword />} />
          <Route path="verify-email" element={<EmployerVerifyEmail />} />
          <Route path="add-post" element={<AddPostComponent />} />
          <Route path="job-posting" element={<JobPostingComponent />} />
          <Route path="cus-service" element={<PageCustomerServices />} />
          <Route path="post-submitted" element={<CandidatesProfile />} />
          <Route path="post-submitted/:id" element={<SubmitDetail />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="current-services" element={<CurrentService />} />
          <Route path="search-candidates" element={<SearchCandidates />} />
          <Route path="recruitment-statistics" element={<StatiticsPage />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    );
  }

  return <>{body}</>;
};

export default EmployerRoute;
