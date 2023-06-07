import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import swal from "sweetalert";

const ChangePassword = () => {
  const { changPassword, logoutSection } = useContext(AuthContext);

  // const [oldPassword, setOldPassword] = useState('')
  // const [newPassword, setNewPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState({});
  const { oldPassword, newPassword, confirmPassword } = formData;

  const validate = () => {
    const errors = {};
    //email, password
    if (!newPassword) errors.newPassword = "Password is required";
    else if (newPassword?.length < 6) errors.newPassword = "Password must at least 6 characters !";
    else if (newPassword !== confirmPassword) errors.confirmPassword = "Confirm password not match !";

    if (!oldPassword) errors.oldPassword = "Password is required";
    else if (oldPassword?.length < 6) errors.oldPassword = "Password must at least 6 characters !";

    if (!confirmPassword) errors.confirmPassword = "Password is required";
    else if (confirmPassword?.length < 6) errors.confirmPassword = "Password must at least 6 characters !";

    return errors;
  };

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const onClickShow = () => {
    setShowPassword(!showPassword);
  };

  const [mess, setMess] = useState("");

  const onClickSave = async () => {
    const err = validate();
    console.log(err);
    if (Object.keys(err).length > 0) {
      setFormErrors(err);
    } else {
      setFormErrors({});

      swal({
        title: "Information",
        icon: "info",
        text: "Are you sure to update your password ?",
      }).then(async (click) => {
        if (click) {
          const res = await changPassword(formData);
          swal({
            title: res.success ? "Success" : "Error",
            icon: res.success ? "success" : "error",
            text: res.message,
          }).then(c=>{
            if(c && res.success){
                logoutSection()
            }
          });
        }
      });
    }
  };
  return (
    <>
      <div style={{ width: "80%" }}>
        <div className="component-title">
          <span>Change password</span>
        </div>
        <div className="free-space" id="free-space">
          <div className="content-wrapper">
            <div className="input-wrapper ">
              <div className="label">Old Password</div>
              <input className="coler-placeholder" type={showPassword ? "text" : "password"} name="oldPassword" value={oldPassword} onChange={onFormChange} placeholder={mess}></input>
              <label className="label-error-message" htmlFor="email">
                {formErrors?.oldPassword}
              </label>
            </div>

            <div className="input-wrapper">
              <div className="label">New Password</div>
              <input className="coler-placeholder" type={showPassword ? "text" : "password"} name="newPassword" value={newPassword} onChange={onFormChange} placeholder={mess}></input>
              <label className="label-error-message" htmlFor="email">
                {formErrors?.newPassword}
              </label>
            </div>
            <div className="input-wrapper">
              <div className="label">Confirm password</div>
              <input className="coler-placeholder" type={showPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={onFormChange} placeholder={mess}></input>
              <label className="label-error-message" htmlFor="email">
                {formErrors?.confirmPassword}
              </label>
            </div>
            <div className="group-buttons checkbox-show-password">
              <div style={{ width: "250px" }}>
                <label className="checkbox-showpass">
                  <input type="checkbox" checked={showPassword} onChange={onClickShow} />
                  Show password
                </label>
              </div>
              <div className="button" onClick={onClickSave}>
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
                Confirm
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
