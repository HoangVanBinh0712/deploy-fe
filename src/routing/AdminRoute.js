import React from 'react'
import { useState, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../admin_scenes/global/Topbar";
import Sidebar from "../admin_scenes/global/Sidebar";
import Dashboard from "../admin_scenes/Dashboard";
import Account from "../admin_scenes/Account";
import Post from "../admin_scenes/Post";
import Bar from "../admin_scenes/Bar";
import Services from "../admin_scenes/Services";
import Industries from "../admin_scenes/Industries";
import Reports from "../admin_scenes/Reports";
import Form from "../admin_scenes/Form";
import Line from "../admin_scenes/Line";
import Pie from "../admin_scenes/Pie";
import PostStatitics from "../admin_scenes/PostStatitics";
import UserStatitics from "../admin_scenes/UserStatitics";
import RevenueStatitics from "../admin_scenes/RevenueStatitics";
import ReportStatitics from "../admin_scenes/ReportStatitics";
import Revenues from '../admin_scenes/Revenues';
import PageNotFound from "../components/page/notfound/PageNotFound";
import { webUrlActivity } from "../contexts/Constants";
import LoginPageAdmin from '../admin_scenes/LoginPageAdmin';
import AuthContextProvider from "../contexts/AuthContext";
import { AuthContext } from "../contexts/AuthContext";

export const AdminRoute = ({ ...rest }) => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const { authState: { authloading, role } } = useContext(AuthContext)
    
    let isAdmin = false
    if(role==="ROLE_ADMIN")isAdmin=true
    else isAdmin=false

    const location = useLocation();
    const currentUrl = location.pathname;

    let body;
    if (currentUrl === "/admin") {
        return <Navigate to="/admin/login" />;
    }
    else if (currentUrl === "/admin/login" && !isAdmin) {
        body = (
            <Routes>
                <Route path ="/admin/login" element={<LoginPageAdmin />} />
            </Routes>
        )
    }
    else if (!webUrlActivity.includes(currentUrl + " ")) {
        body = (
            <Routes>
                <Route path ="/admin/*" element={<PageNotFound />} />
            </Routes>
        )
    }
    else if (isAdmin && currentUrl === "/admin/login") {
        return <Navigate to="/admin/dashboard" />;
    }
    else if (rest.path.includes(currentUrl) && isAdmin) {
        body = (
            <AuthContextProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <div className="app">
                            <Sidebar isSidebar={isSidebar} />
                            <main className="content">
                                <Topbar setIsSidebar={setIsSidebar} />
                                <Routes>
                                    <Route path="/admin/dashboard"  element={isAdmin ? <Dashboard/> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/account" element={isAdmin ? <Account/> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/post" element={isAdmin ? <Post /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/services" element={isAdmin ? <Services /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/revenues" element={isAdmin ? <Revenues /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/form" element={isAdmin ? <Form /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/bar" element={isAdmin ? <Bar /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/pie" element={isAdmin ? <Pie /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/line" element={isAdmin ? <Line /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/industries" element={isAdmin ? <Industries /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/reports" element={isAdmin ? <Reports /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/post-statitics" element={isAdmin ? <PostStatitics /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/user-statitics" element={isAdmin ? <UserStatitics /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/revenue-statitics" element={isAdmin ? <RevenueStatitics /> : <Navigate to="/user/login" />} />
                                    <Route path="/admin/report-statitics" element={isAdmin ? <ReportStatitics /> : <Navigate to="/user/login" />} />

                                </Routes>
                            </main>
                        </div>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </AuthContextProvider>
        )
    }
    
    else if (rest.path.includes(currentUrl)) {
        body = (
            <>
                <div>You need permission to access the admin page! </div>
            </>
        )
    }

    return (
        <>
            {body}
        </>
    )
}

export default AdminRoute;