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

    if (currentUrl === "/") {
        return <Navigate to="/user/home" />;
    }
    else if (currentUrl === "/admin") {
        return <Navigate to="/admin/login" />;
    }
    else if (currentUrl === "/admin/login" && !isAdmin) {
        body = (
            <AuthContextProvider>
                <LoginPageAdmin />
            </AuthContextProvider>
        )
    }
    else if (!webUrlActivity.includes(currentUrl + " ")) {
        body = (
            <Routes>
                <Route path ="/admin/*" element={<PageNotFound />} />
            </Routes>
        )
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
                                    <Route path="/admin/dashboard" element={<Dashboard />} />
                                    <Route path="/admin/account" element={<Account />} />
                                    <Route path="/admin/post" element={<Post />} />
                                    <Route path="/admin/services" element={<Services />} />
                                    <Route path="/admin/form" element={<Form />} />
                                    <Route path="/admin/bar" element={<Bar />} />
                                    <Route path="/admin/pie" element={<Pie />} />
                                    <Route path="/admin/line" element={<Line />} />
                                    <Route path="/admin/industries" element={<Industries />} />
                                    <Route path="/admin/reports" element={<Reports />} />

                                </Routes>
                            </main>
                        </div>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </AuthContextProvider>
        )
    }
    else if (isAdmin && currentUrl === "/admin/login") {
        return <Navigate to="/admin/dashboard" />;
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