import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./admin_scenes/global/Topbar";
import Sidebar from "./admin_scenes/global/Sidebar";
import Dashboard from "./admin_scenes/Dashboard";
import Account from "./admin_scenes/Account";
import Post from "./admin_scenes/Post";
import Bar from "./admin_scenes/Bar";
import Category from "./admin_scenes/Services";
import Form from "./admin_scenes/Form";
import Line from "./admin_scenes/Line";
import Pie from "./admin_scenes/Pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AdminRoute from "./routing/AdminRoute";
import EmployeeRoute from "./routing/EmployeeRoute";
import EmployerRoute from "./routing/EmployerRoute";
import AuthContextProvider from "./contexts/AuthContext";
import { ToastProvider } from './contexts/ToastProvider';
import GlobalContextProvider from "./contexts/GlobalContext";
import PostContextProvider from "./contexts/PostContext";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const location = useLocation();
  const currentUrl = location.pathname;

  let body;

  if (currentUrl.includes("/admin")) {
    body = (
      <AdminRoute path="/admin/dashboard /admin/account /admin/post /admin/services /admin/form /admin/bar /admin/pie /admin/line /admin/industries /admin/reports /admin/form" />
    );
  } else if (currentUrl.includes("/employer"))
    body = <EmployerRoute path="/employer/login" />;
  else {
    body = <EmployeeRoute path="/user/login " />;
  }

  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <ToastProvider>
            <GlobalContextProvider>
              {body}
            </GlobalContextProvider>
          </ToastProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
