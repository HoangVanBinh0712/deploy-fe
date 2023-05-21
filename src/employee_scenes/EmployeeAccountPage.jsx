import AccountComponent from "./components/AccountComponent";
import TopBar from "../components/global/TopBar";
import { Navigate } from "react-router-dom";


const EmployeeAccountPage = () => {

    const permistion=localStorage["USER_ROLE"]==='user'?true:false;

    let body
    if (permistion) {
        body = (
            <>
                <TopBar />
                <AccountComponent />
            </>
        )
    }
    else body = (
        <>
            <Navigate to="/user/login" />
        </>
    )

    return (
        <>
            {body}
        </>
    );
}

export default EmployeeAccountPage;