import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import swal from "sweetalert";

const EmployerChangePassword = () => {
    const { changEmpPassword } = useContext(AuthContext)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onChangOldPassword = (event) => {
        setOldPassword(event.target.value)
    }
    const onChangNewPassword = (event) => {
        setNewPassword(event.target.value)
    }
    const onChangConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const [showPassword, setShowPassword] = useState(false);
    const onClickShow = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = (oldPassword, password1, password2) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
        const check1 = regex.test(password1)
        if (password1 !== password2) {
            return { success: false, message: "The password you entered does not match." }
        }
        else if (oldPassword === password1) {
            return { success: false, message: "The new password cannot be the same as the old password!" }
        }
        else if (!check1) {
            return { success: false, message: "Your password must contain at least 8 characters including at least one lowercase letter, uppercase letter, number and special character." }
        }
        return { success: true, message: "Checked" }
    }

    const [mess, setMess] = useState('')

    const onClickSave = async () => {
        if (oldPassword.length === 0 || newPassword.length === 0 || confirmPassword.length === 0) {
            setMess("*Required...")
            setTimeout(() => {
                setMess("")
            }, 5000)
        }
        else {
            const checkPassword = validatePassword(oldPassword, newPassword, confirmPassword)
            if (!checkPassword.success) {
                swal({
                    title: "Error",
                    icon: "warning",
                    text: checkPassword.message,
                    dangerMode: true,
                  })
            }
            else {
                const confirm = window.confirm("Are you sure you want to change your password?");
                const pw = {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }
                if (confirm) {
                    const res = await changEmpPassword(pw);
                    if (res.success) {
                        swal({
                            title: "Success",
                            icon: "success",
                            text: "Changed password successfully",
                            dangerMode: false,
                          })
                    }
                    else {
                        swal({
                            title: "Error",
                            icon: "warning",
                            text: res.message,
                            dangerMode: true,
                          })
                    }
                }
            }
        }

    }
    return (
        <>
            <div style={{ width: "80%" }}>
                <div className="component-title">
                    <span>Change password</span>
                </div>
                <div className="free-space" id="free-space" style={{justifyContent: 'flex-start'}}>
                    <div className="content-wrapper">

                        <div className="input-wrapper ">
                            <div className="label">Old Password</div>
                            <input className="coler-placeholder" type={showPassword ? "text" : "password"}
                                name="oldPassword"
                                onChange={onChangOldPassword}
                                placeholder={mess}>

                            </input>
                        </div>

                        <div className="input-wrapper">
                            <div className="label">New Password</div>
                            <input className="coler-placeholder" type={showPassword ? "text" : "password"}
                                name="newPassword"
                                onChange={onChangNewPassword}
                                placeholder={mess}>

                            </input>
                        </div>
                        <div className="input-wrapper">
                            <div className="label">Confirm password</div>
                            <input className="coler-placeholder" type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                onChange={onChangConfirmPassword}
                                placeholder={mess}>

                            </input>
                        </div>
                        <div className="group-buttons checkbox-show-password">
                            <div style={{ width: "300px" }}>
                                <label className="checkbox-showpass">
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={onClickShow}
                                    />
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
    )
}

export default EmployerChangePassword;