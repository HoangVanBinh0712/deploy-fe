import threeDotIcon from '../../assets/icons/3dot-icon.png'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'


export const SingleRowSubmit = ({ submit, num, position, openAppointment, predict }) => {

    const [isOpen, setIsOpen] = useState(false)
    const { viewProfileJSK } = useContext(AuthContext)


    const userId = submit.profile.user.id
    const mediaId = submit.profile.mediaId
    const onMouseEnter = () => {
        setIsOpen(true)
    }
    const onMouseOver = () => {
        setIsOpen(false)
    }

    const getPostDate = (date) => {
        const myDate = new Date(date);
        const day = ("0" + myDate.getDate()).slice(-2);
        const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
        const year = myDate.getFullYear();

        return (`${day}/${month}/${year}`)
    }

    const viewProfile = () => {
        window.open(`/employer/candidates/${submit.profile.user.id}`, "_blank");
        /* window.location.href = `/employer/candidates/${data.profile.user.id}` */
    }

    const viewCV = async () => {
        viewProfileJSK(userId, mediaId)
        window.open(submit.url, "_blank");
        /* window.location.href = `/employer/candidates/${data.profile.user.id}` */
    }

    return (
        <div className="row-data-listpost">
            <div style={{ width: "25px", fontFamily: "Roboto-Light" }}>
                {num + 1}.
            </div>
            <div style={{ width: "30%", fontFamily: "Roboto-Light" }} className="limit-title-post">
                <div className='name-user' onClick={viewProfile} style={{ cursor: 'pointer' }}>
                    {submit.profile.user.name}
                    <i className="fa fa-check-circle-o" aria-hidden="true" style={{ marginLeft: '5px', color: "#0c62ad" }}></i>
                </div>
                <div className='name-profile'
                    onClick={() => viewCV()} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-file-text-o" aria-hidden="true" style={{ marginRight: '5px', color: "#0c62ad" }}></i>
                    {submit.profile.name}
                </div>
            </div>
            <div style={{ width: "25%", fontFamily: "Roboto-Light" }}>
                {position}
            </div>
            <div style={{ width: "12%", fontFamily: "Roboto-Light" }}>
                {getPostDate(submit.date)}
            </div>
            <div style={{ width: "12%", display: "flex", justifyContent: "center", fontFamily: "Roboto-Light" }}>
                Attached Profile
            </div>
            <div style={{ width: "8%", position: 'relative' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseOver}>
                <div className="others-btn" style={{ marginLeft: '60%' }} >
                    <img src={threeDotIcon} alt='' className="three-dot-chose-post"></img>
                </div>
                {isOpen && (<>
                    <div style={{ position: 'absolute', width: '100%', zIndex: "5" }}>
                        <div className="chose-active chose-update" style={{ marginLeft: "-15px", width: '140px' }} onClick={viewProfile}>
                            View Profile</div>
                        <div className="chose-active chose-update" style={{ marginLeft: "-15px", width: '140px' }} onClick={viewCV}>
                            View Resume</div>
                        <div className="chose-active chose-update" style={{ marginLeft: "-15px", width: '140px', display: 'flex', textAlign: 'center' }}
                            onClick={() => openAppointment(submit.profile.user.id)}>
                            Appointment
                        </div>
                        <div className="chose-active chose-update" style={{ marginLeft: "-15px", width: '140px' }}
                            onClick={() => predict(submit)}>
                            View Predict</div>
                    </div>
                </>)}
            </div>
        </div>
    )
}
