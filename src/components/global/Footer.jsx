import React from 'react'
import topArrow from '../../assets/icons/to-top-icon.png'
import logoBHQ from "../../assets/img/logo.png"
import locationIcon from "../../assets/icons/location-icon.png"
import shareIcon from "../../assets/icons/share-icon.png"
import contactIcon from "../../assets/icons/customer-support-icon.png"

const Footer = () => {

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    const currentYear = new Date().getFullYear();

    return (
        <div className="footer-homepage">
            <div className="onclick-to-top">
                <img id="click-to-top" className="to-top-icon" src={topArrow} onClick={scrollTop} alt='to-top'/>
            </div>
            <div className="footer-shadow">
                <div className="info-footer">
                    <div className="footer-leftpart">
                        <div className="logo-infooter">
                            <img src={logoBHQ} alt='logo'/>
                        </div>
                        <div className="name-school">
                            <div>
                                <p>Trường Đại Học Sư Phạm Kỹ Thuật</p>
                                <p>Thành Phố Hồ Chí Minh</p>
                            </div>
                            <div className="thoa-thuan">
                                Thoả thuận người dùng.
                            </div>
                        </div>
                    </div>
                    <div className="footer-rightpart">
                        <div className="contact-title">
                            Contact us
                        </div>
                        <div className="school-adress">
                            <div className="contact-icon">
                                <img src={locationIcon} alt=''/>
                            </div>
                            <div className="contact-text">
                                <p>Đại Học Sư Phạm Kỹ Thuật TP.HCM</p>
                                <p>01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP. HCM </p>
                            </div>
                        </div>
                        <div className="school-adress">
                            <div className="contact-icon">
                                <img src={shareIcon} alt='' />
                            </div>
                            <div className="contact-text">
                                <p><a href="#_">Website - Facebook</a></p>
                            </div>
                        </div>
                        <div className="school-adress">
                            <div className="contact-icon">
                                <img src={contactIcon} alt=''/>
                            </div>
                            <div className="contact-text">
                                <p>19110170@student.hcmute.edu.vn</p>
                                <p>19110200@student.hcmute.edu.vn</p>
                                <p>19110271@student.hcmute.edu.vn</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-footer">
                    @ {currentYear} <a className="link-bhq" href='#_'>HBQ Team</a> - Thiết kế & Phát triển bới HBQ Team -
                    HCMUTE
                </div>
            </div>
        </div>
    )
}
export default Footer;