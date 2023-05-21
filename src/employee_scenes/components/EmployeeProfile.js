import '../css/u-profile.css'
import { useParams } from 'react-router-dom';
import TopBar from '../../components/global/TopBar';
import Footer from '../../components/global/Footer';

import cameraIcon from '../../assets/icons/camera-icon.png'
import logoIcon from '../../assets/icons/logo.png'
import checkIcon from '../../assets/icons/check-icon.png'
import locationIcon from '../../assets/icons/location-ping.png'
import threeDotIcon from '../../assets/icons/3dot-icon.png'
import cerIcon from '../../assets/icons/certificate-icon.png'
import actIcon from '../../assets/icons/activities.png'
import addIcon from '../../assets/icons/add-icon.png'




const EmployeeProfile = () => {

    let { id } = useParams();

    return (
        <>
            <TopBar />
            <div className='background-grey-profile'>
                <div className="body-container">
                    <p id="notice">Please add information to have a complete profile</p>
                    <div className="profile-head">
                        <div className="cover">
                            <div id="change-image" style={{display:'none'}}>
                                <img id="camera-icon" src={cameraIcon} alt='' />
                                <div>Change image</div>
                            </div>
                        </div>
                        <div className="profile-info">
                            <div className="avatarTop" >
                                <div className="transparent-camera" style={{display:'none'}}><img id="camera-icon" src={cameraIcon} alt='' /></div>
                            </div>
                            <div className="name-viewer-wrapper">
                                <div className="name">Nguyen van anh</div>
                                <div className="viewer-info">
                                    <div className="viewer-icon"></div>
                                    <div className="viewer-count">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-parent">
                        <div className="left-side-content">
                            <div className="info-area">
                                <p className="area-title">Introduction</p>
                                <div className="area-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                                </div>
                                
                                <div className="edit-button" style={{display:'none'}}></div>
                            </div>
                            <div id="employer-seen" className="info-area">
                                <p className="area-title">Employers seen CV</p>
                                <div className="content-wrapper" style={{display:'block'}}>
                                    <div className="employer-seen-info">
                                        <img id="employer-logo" src={logoIcon} alt='' />
                                        <div className="info-employee-wrapper">
                                            <div id="employer-seen-name">Nguyen Sy Manh <img id="tick" src={checkIcon} alt='' /></div>
                                            <div id="company-name">CÔNG TY TNHH ABC</div>
                                        </div>
                                        <div id="day-viewed">2 ngày trước</div>
                                    </div>
                                    <div className="employer-seen-info">
                                        <img id="employer-logo" src={logoIcon} alt='' />
                                        <div className="info-employee-wrapper">
                                            <div id="employer-seen-name">Nguyen Sy Manh <img id="tick" src={checkIcon} alt='' /></div>
                                            <div id="company-name">CÔNG TY TNHH ABC</div>
                                        </div>
                                        <div id="day-viewed">2 ngày trước</div>
                                    </div>
                                    <div className="employer-seen-info">
                                        <img id="employer-logo" src={logoIcon} alt='' />
                                        <div className="info-employee-wrapper">
                                            <div id="employer-seen-name">Nguyen Sy Manh <img id="tick" src={checkIcon} alt='' /></div>
                                            <div id="company-name">CÔNG TY TNHH ABC</div>
                                        </div>
                                        <div id="day-viewed">2 ngày trước</div>
                                    </div>
                                    <div className="employer-seen-info">
                                        <img id="employer-logo" src={logoIcon} alt='' />
                                        <div className="info-employee-wrapper">
                                            <div id="employer-seen-name">Nguyen Sy Manh <img id="tick" src={checkIcon} alt='' /></div>
                                            <div id="company-name">CÔNG TY TNHH ABC</div>
                                        </div>
                                        <div id="day-viewed">2 ngày trước</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-side-content">
                            <div className="info-area">
                                <p className="area-title">Address</p>
                                <p className="area-content"><img id="location-ping" src={locationIcon} alt='' /> Số 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                                <div className="edit-button" style={{display:'none'}}></div>
                            </div>
                            <div className="info-area" id="achivement-area">
                                <div className="title-include-add">
                                    <p className="area-title">Achivement</p>
                                    <img id="add-button" src={addIcon} alt='' style={{display:'none'}}/>
                                </div>
                                <div className="area-content">
                                    <div className="achive-item">
                                        <img id="achive-icon" src={cerIcon} alt='' />
                                        <div className="achive-name">Achivement 1</div>
                                        <img id="achive-more" src={threeDotIcon} alt='' style={{display:'none'}} />
                                    </div>
                                    <div className="achive-item">
                                        <img id="achive-icon" src={cerIcon} alt='' />
                                        <div className="achive-name">Achivement 1</div>
                                        <img id="achive-more" src={threeDotIcon} alt='' style={{display:'none'}}/>
                                    </div>
                                    <div className="achive-item">
                                        <img id="achive-icon" src={cerIcon} alt='' />
                                        <div className="achive-name">Achivement 1</div>
                                        <img id="achive-more" src={threeDotIcon} alt='' style={{display:'none'}}/>
                                    </div>
                                    <div className="achive-item">
                                        <img id="achive-icon" src={cerIcon} alt='' />
                                        <div className="achive-name">Achivement 1</div>
                                        <img id="achive-more" src={threeDotIcon} alt='' style={{display:'none'}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="info-area" id="activities-area">
                                <div className="title-include-add">
                                    <p className="area-title">Activities</p>
                                    <img id="add-button" src={addIcon} alt='' style={{display:'none'}} />
                                </div>
                                <div className="area-content">
                                    <div className="achive-item">
                                        <img id="clock-icon" src={actIcon} alt='' />
                                        <div className="achive-name" id="activity-title">
                                            <div id="activity-name">Activity 1</div>
                                            <div id="activity-time">06/2021-06-2022</div>
                                        </div>
                                        <img id="achive-more" src={threeDotIcon} alt='' style={{display:'none'}} />
                                    </div>
                                    <div className="achive-item">
                                        <img id="clock-icon" src={actIcon} alt='' />
                                        <div className="achive-name" id="activity-title">
                                            <div id="activity-name">Activity 1</div>
                                            <div id="activity-time">06/2021-06-2022</div>
                                        </div>
                                        <img id="achive-more" src={threeDotIcon} alt='' style={{display:'none'}}/>
                                    </div>
                                    <div className="achive-item">
                                        <img id="clock-icon" src={actIcon} alt='' />
                                        <div className="achive-name" id="activity-title">
                                            <div id="activity-name">Activity 1</div>
                                            <div id="activity-time">06/2021-06-2022</div>
                                        </div>
                                        <img id="achive-more" src={threeDotIcon} alt='' style={{display:'none'}}/>
                                    </div>
                                    <div className="achive-item">
                                        <img id="clock-icon" src={actIcon} alt='' />
                                        <div className="achive-name" id="activity-title">
                                            <div id="activity-name">Activity 1</div>
                                            <div id="activity-time">06/2021-06-2022</div>
                                        </div>
                                        <img id="achive-more" src={threeDotIcon} alt='' style={{display:'none'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default EmployeeProfile;