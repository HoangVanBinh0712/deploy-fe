// import { useContext } from "react";
import Spiner from "react-bootstrap/Spinner";

const AuthUser = ({ authRoute }) => {
  //   const {
  //     authState: { authLoading },
  //   } = useContext(AuthContext);
  const authLoading = false;

  let body;

  if (authLoading)
    body = (
      <div
        style={{
          width: "100%",
          hegiht: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="d-flex justify-content-center mt-2">
          <Spiner animation="border" variant="info" />
        </div>
      </div>
    );
  else
    body = (
      <>
        {authRoute === "user-login" && <>Login </>}
        {authRoute === "user-register" && <>Register</>}
      </>
    );

  return <div>{body}</div>;
};

export default AuthUser;
