import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import swal from "sweetalert";

const VerifyEmail = () => {

    const { authState: { user }, sendVirifyCode, verifyEmail, } = useContext(AuthContext)

    const [verifyCode, setVerifyCode] = useState('')
    const onChangeVerifyCode = (event) => setVerifyCode(event.target.value)

    const [mess, setMess] = useState('')
    const [clickButton, setClickBtn] = useState(true)

    const onSendCodeClick = async () => {
        setClickBtn(false)
        const res = await sendVirifyCode(user.email)
        if (res.success) {
            swal({
                title: "Success",
                icon: "success",
                text: "Sent code successfully!",
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
        setClickBtn(true)
    }

    const onVerifyClick = async () => {
        setClickBtn(false)
        if (verifyCode.length === 0) {
            setMess("*Required...")
            setTimeout(() => {
                setMess("")
            }, 5000)
        }
        else {
            const res = await verifyEmail(user.email, verifyCode)
            if (res.success) {
                swal({
                    title: "Success",
                    icon: "success",
                    text: "Email verificated successfully!",
                    dangerMode: false,
                  })
            }
            else swal({
                title: "Error",
                icon: "warning",
                text: res.message,
                dangerMode: true,
              })
        }
        setClickBtn(true)
    }

    return (
        <div style={{ width: "80%" }}>
            <div className="component-title">
                <span>Verify email</span>
            </div>
            <div className="free-space" id="free-space" style={{ justifyContent: "start" }}>
                <div className="content-wrapper">

                    <div className="row">
                        <div className="code-input">
                            <div className="label">Code</div>
                            <input className="coler-placeholder"
                                type="text"
                                placeholder={mess}
                                onChange={onChangeVerifyCode}>

                            </input>
                        </div>
                        <div className="email-icon" style={{ cursor: 'pointer' }}>
                            <i className="fa fa-envelope-o" aria-hidden="true" onClick={clickButton?onSendCodeClick:''}></i>
                            <div className="label">Send Code</div>
                        </div>
                    </div>
                    <div className="group-buttons">
                        <div className="button" onClick={clickButton?onVerifyClick:""}>
                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                            Confirm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;