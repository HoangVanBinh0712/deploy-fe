import React from 'react'
import '../css/service-page.css'
import TopBar from '../../components/global/TopBar'
import Footer from '../../components/global/Footer'

import serviceBaner from '../../assets/img/service-banner.png'
import homeService1 from '../../assets/img/home-services-1.png'
import homeService2 from '../../assets/img/home-service-2.png'
import vShapeIcon from '../../assets/icons/v-blue-shape.png'
import checkBoxIcon from '../../assets/icons/check-box-icon.png'

const ServicePage = () => {
    return (
        <>
            <TopBar />
            <div style={{ width: '100%' }}>
                <img id="service-banner" src={serviceBaner} alt='' style={{ width: '100%', height: 'auto' }} />
            </div>
            <div class="body-container" style={{ height: 'auto' }}>
                <div id="arrow_wrapper">
                    <img id="arrow_below_banner" src={vShapeIcon} alt='' />
                    <div id="our_service_title">OUR SERVICES</div>
                    <div id="our_service_explaination">We offer a variety of services that help recruiters connect with more talent, so they can connect with candidates faster</div>
                </div>
                <div id="service_list">
                    <div class="service_item_wrapper">
                        <div style={{width:'50%'}}>
                            <img id="service_logo" src={homeService1} alt='' />
                        </div>
                        <div id="service_info">
                            <div id="service_name">Basic Service</div>
                            <div id="service_price">10.00 USD</div>
                            <div id="service_duration_wrapper">
                                <div>Duration:</div>
                                <div id="service_duaration"> 1 month</div>
                            </div>
                            <div id="service_value_list">
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">100% Satisfaction Guaranteed.</div>
                                </div>
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">Post jobs quickly and receive resumes immediately.</div>
                                </div>
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">Manage your online profile easily.</div>
                                </div>
                            </div>
                            <div id="service_conclusion">Basic service will allow employer to post a job recruitment and allow job seeker to submit their Resume to the post</div>
                            <button id="btn_buy_now">Buy now</button>
                        </div>
                    </div>

                    <div class="service_item_wrapper">
                        <div id="service_info" >
                            <div id="service_name">Basic Service</div>
                            <div id="service_price">10.00 USD</div>
                            <div id="service_duration_wrapper">
                                <div>Duration:</div>
                                <div id="service_duaration"> 1 month</div>
                            </div>
                            <div id="service_value_list">
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">100% Satisfaction Guaranteed</div>
                                </div>
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">Post jobs quickly and receive resumes immediately.</div>
                                </div>
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">Manage your online profile easily.</div>
                                </div>
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">Find candidates efficiently and quickly.</div>
                                </div>
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">Actively looking for candidates today</div>
                                </div>
                            </div>
                            <div id="service_conclusion">Premium service will allow employer to post a job recruitment and allow job seeker to submit their Resume to the post. Beside that employer are able to search for job seeker public resume and filter resume submit to their job recruitment.</div>
                            <button id="btn_buy_now">Buy now</button>
                        </div>
                        <div style={{width:'50%'}}>
                            <img id="service_logo" src={homeService2} alt='' />
                        </div>
                    </div>


                    <div class="service_item_wrapper">
                    <div style={{width:'50%'}}>
                            <img id="service_logo" src={homeService1} alt='' />
                        </div>
                        <div id="service_info">
                            <div id="service_name">Basic Service</div>
                            <div id="service_price">10.00 USD</div>
                            <div id="service_duration_wrapper">
                                <div>Duration:</div>
                                <div id="service_duaration"> 1 month</div>
                            </div>
                            <div id="service_value_list">
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">100% Satisfaction Guaranteed</div>
                                </div>
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">Post jobs quickly and receive resumes immediately.</div>
                                </div>
                                <div id="service_value_item">
                                    <img id="service_checkbox" src={checkBoxIcon} alt='' />
                                    <div id="service_value">Manage your online profile easily.</div>
                                </div>
                            </div>
                            <div id="service_conclusion">Basic service will allow employer to post a job recruitment and allow job seeker to submit their Resume to the post.</div>
                            <button id="btn_buy_now" >Buy now</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ServicePage;