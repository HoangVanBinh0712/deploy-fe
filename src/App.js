import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastProvider";
import GlobalContextProvider from "./contexts/GlobalContext";
import PostContextProvider from "./contexts/PostContext";
import { useContext, useState } from "react";
import Login from "./components/page/login/Login";
import LoginGG from "./components/page/login/LoginWithGG";
import Register from "./components/page/register/Register";
import HomePage from "./employee_scenes/HomePage";
import PostDetails from "./components/PostDetails";
import PostDetailsEmp from "./employer_scenes/components/PostDetailsEmp";
import SearchPageComponent from "./employee_scenes/components/SearchPageComponent";
import ForgotPassword from "./components/page/login/ForgotPassword";
import EmployerProfile from "./employer_scenes/components/EmployerProfile";
import HighLightCompany from "./components/global/HighlightCompany";
import PageNotFound from "./components/page/notfound/PageNotFound";
import EmployeeAccountPage from "./employee_scenes/EmployeeAccountPage";
import UserAchievement from "./employee_scenes/components/AchievementComponent";
import AddResume from "./employee_scenes/components/AddResumeComponent";
import ChangePassword from "./employee_scenes/components/ChangePasswordComponent";
import PostFollowed from "./employee_scenes/components/PostFollowedComponent";
import PostSubmitted from "./employee_scenes/components/PostSubmittedComponent";
import PredictJob from "./employee_scenes/components/PredictJobComponent";
import RecruiterFollowed from "./employee_scenes/components/RecruiterFollowedComponent";
import ResumeViewer from "./employee_scenes/components/ResumeViewerComponent";
import UpdateResume from "./employee_scenes/components/UpdateResumeComponent";
import VerifyEmail from "./employee_scenes/components/VerifyEmailComponent";
import PersonalInfoComponent from "./employee_scenes/components/PersionalInfoComponent";
import EmployerAccount from "./employer_scenes/components/EmployerAccountComponent";
import EmployerInfo from "./employer_scenes/components/EmployerInfoComponent";
import EmployerChangePassword from "./employer_scenes/components/EmployerChangePasswordComponent";
import EmployerVerifyEmail from "./employer_scenes/components/EmployerVerifyEmailComponent";
import AddPostComponent from "./employer_scenes/components/AddPostComponent";
import JobPostingComponent from "./employer_scenes/components/JobPostingComponent";
import PageCustomerServices from "./components/PageCustomerServiceNoneTopbar";
import CandidatesProfile from "./employer_scenes/components/CandidatesProfile";
import SubmitDetail from "./employer_scenes/components/SubmitDetail";
import PurchaseHistory from "./employer_scenes/components/PurchaseHistory";
import CurrentService from "./employer_scenes/components/CurrentService";
import SearchCandidates from "./employer_scenes/components/SearchCandidates";
import StatiticsPage from "./employer_scenes/components/StatiticsPage";
import ServicePage from "./employer_scenes/components/ServicePage";
import EmployeeProfile from "./employee_scenes/components/EmployeeProfile";
import EmployeeRouteNew from "./routing/auth/EmployeeRouteNew";
import EmployerRouteNew from "./routing/auth/EmployerRouteNew";
import Spinning from "./routing/auth/Spinner";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./admin_scenes/global/Sidebar";
import Topbar from "./admin_scenes/global/Topbar";
import Dashboard from "./admin_scenes/Dashboard";
import Post from "./admin_scenes/Post";
import Services from "./admin_scenes/Services";
import Revenues from "./admin_scenes/Revenues";
import Bar from "./admin_scenes/Bar";
import Form from "./admin_scenes/Form";
import Pie from "./admin_scenes/Pie";
import Line from "./admin_scenes/Line";
import Industries from "./admin_scenes/Industries";
import Reports from "./admin_scenes/Reports";
import PostStatitics from "./admin_scenes/PostStatitics";
import UserStatitics from "./admin_scenes/UserStatitics";
import RevenueStatitics from "./admin_scenes/RevenueStatitics";
import ReportStatitics from "./admin_scenes/ReportStatitics";
import Account from "./admin_scenes/Account";
import LoginPageAdmin from "./admin_scenes/LoginPageAdmin";
import ChatBox from "./components/global/ChatBox";
import RoomPage from "./components/global/MeetingRoomPublic";
function App() {
  const {
    authState: { user, authloading, role },
  } = useContext(AuthContext);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  let body;

  const currentUrl = window.location.pathname;
  
  const excludesAPI = ["login", "register", "room"];

  if (authloading) {
    body = <Spinning />;
  } else if (role !== "ROLE_ADMIN") {
    /*May not logged in */

    body = (
      <Routes>
        {/*Redirect path*/}
        <Route exac path="/" element={<Navigate to="home" />} />
        <Route exac path="/employer/" element={<Navigate to={"/employer/home"} />} />
        <Route exac path="/user/account/" element={<Navigate to={"/user/account/personal-info"} />} />
        <Route exac path="/employer/account/" element={<Navigate to={"/employer/account/employer-info"} />} />

        {/*Public API */}
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/login/:token" element={<LoginGG />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/posts" element={<SearchPageComponent />} />
        <Route path="/posts/:keyword" element={<SearchPageComponent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recruiter/:id" element={<EmployerProfile />} />
        <Route path="/highlight-company" element={<HighLightCompany />} />
        <Route path="/admin/login" element={<LoginPageAdmin />} />
        <Route path="/admin" element={<Navigate to='/admin/login' />} />

        {/*EMPLOYEE API */}
        <Route path="/user/account" element={<EmployeeRouteNew component={<EmployeeAccountPage />} />}>
          <Route path="personal-info" element={<EmployeeRouteNew component={<PersonalInfoComponent />} />} />
          <Route path="achievement" element={<EmployeeRouteNew component={<UserAchievement />} />} />
          <Route path="add-resume" element={<EmployeeRouteNew component={<AddResume />} />} />
          <Route path="change-password" element={<EmployeeRouteNew component={<ChangePassword />} />} />
          <Route path="post-followed" element={<EmployeeRouteNew component={<PostFollowed />} />} />
          <Route path="post-submitted" element={<EmployeeRouteNew component={<PostSubmitted />} />} />
          <Route path="predict-job" element={<EmployeeRouteNew component={<PredictJob />} />} />
          <Route path="recruiter-followed" element={<EmployeeRouteNew component={<RecruiterFollowed />} />} />
          <Route path="resume-viewer" element={<EmployeeRouteNew component={<ResumeViewer />} />} />
          <Route path="update-resume" element={<EmployeeRouteNew component={<UpdateResume />} />} />
          <Route path="verify-email" element={<EmployeeRouteNew component={<VerifyEmail />} />} />
        </Route>
        {/*EMPLOYER API */}
        <Route path="/employer/account" element={<EmployerRouteNew component={<EmployerAccount />} />}>
          <Route path="employer-info" element={<EmployerRouteNew component={<EmployerInfo />} />} />
          <Route path="change-password" element={<EmployerRouteNew component={<EmployerChangePassword />} />} />
          <Route path="verify-email" element={<EmployerRouteNew component={<EmployerVerifyEmail />} />} />
          <Route path="add-post" element={<EmployerRouteNew component={<AddPostComponent />} />} />
          <Route path="job-posting" element={<EmployerRouteNew component={<JobPostingComponent />} />} />
          <Route path="cus-service" element={<EmployerRouteNew component={<PageCustomerServices />} />} />
          <Route path="post-submitted" element={<EmployerRouteNew component={<CandidatesProfile />} />} />
          <Route path="post-submitted/:id" element={<EmployerRouteNew component={<SubmitDetail />} />} />
          <Route path="purchase-history" element={<EmployerRouteNew component={<PurchaseHistory />} />} />
          <Route path="current-services" element={<EmployerRouteNew component={<CurrentService />} />} />
          <Route path="search-candidates" element={<EmployerRouteNew component={<SearchCandidates />} />} />
          <Route path="recruitment-statistics" element={<EmployerRouteNew component={<StatiticsPage />} />} />
        </Route>
        <Route path="/employer/home" element={<EmployerRouteNew component={<ServicePage />} />} />
        <Route path="/employer/post/:id" element={<EmployerRouteNew component={<PostDetailsEmp />} />} />
        <Route path="/employer/candidates/:id" element={<EmployerRouteNew component={<EmployeeProfile />} />} />

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    );
  } else if (role === "ROLE_ADMIN") {
    /*ADMIN API Logged in*/
    body = (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/admin/login" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/account" element={<Account />} />
                <Route path="/admin/post" element={<Post />} />
                <Route path="/admin/services" element={<Services />} />
                <Route path="/admin/revenues" element={<Revenues />} />
                <Route path="/admin/form" element={<Form />} />
                <Route path="/admin/bar" element={<Bar />} />
                <Route path="/admin/pie" element={<Pie />} />
                <Route path="/admin/line" element={<Line />} />
                <Route path="/admin/industries" element={<Industries />} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/post-statitics" element={<PostStatitics />} />
                <Route path="/admin/user-statitics" element={<UserStatitics />} />
                <Route path="/admin/revenue-statitics" element={<RevenueStatitics />} />
                <Route path="/admin/report-statitics" element={<ReportStatitics />} />
                <Route exac path="/admin/" element={<Navigate to="/admin/dashboard" />} />

                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <ToastProvider>
            <GlobalContextProvider>
              {body}
              {!excludesAPI.some((url) => currentUrl.includes(url)) &&  user && role !== "ROLE_ADMIN" && <ChatBox />}
            </GlobalContextProvider>
          </ToastProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
