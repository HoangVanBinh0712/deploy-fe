import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useMode } from "./theme";
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
