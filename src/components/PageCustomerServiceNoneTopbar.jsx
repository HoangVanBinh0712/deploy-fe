import './css/cus-service.css'
import fbIcon from "../assets/icons/face-icon.png"
import insIcon from "../assets/icons/ins-icon.jpg"

const PageCustomerServices = () => {
  return (
    <div className="free-space-ser" style={{margin:'10px 6%', gap: '30px'}}>
            <div className="contact-ser" style={{display:'flex', justifyContent:'center'}}>
                <h2>Contact Us</h2>
            </div>
            <div style={{display:'inline-grid', gap:'10px'}}>
                <p className="title-Service">FAQ's</p>
                <p className="content-Service">1.What methods of payment do you accept?</p>
                <p className="content-Service">{'->'} We accept payment by paypal.</p>
                <p className="content-Service">2.What time does the website work?</p>
                <p className="content-Service">{'->'} The website is up and running 24/7 to provide the fastest customer service and support.</p>
            </div>
            <div style={{display:'inline-grid', gap:'10px'}}>
                <p className="title-Service">BHQ Career Website Infomation</p>
                <p className="content-Service">Established in 2023, with technological development and technical progress. 
                    Website BHQ career will be a useful technology application solution for human life in general and recruitment in particular. 
                    The website itself will become the bridge between businesses and employers.</p>
            </div>
            <div style={{display:'inline-grid', gap:'10px'}}>
                <p className="title-Service">Support</p>
                <p className="content-Service">
                For quick support, get in touch directly through our social media pages. There is always an operator to support you.
                </p>
                <div className="gr-social">
                <a className="icon-fb" href="https://www.facebook.com/profile.php?id=100076529407000">
                     <img src={fbIcon} alt="fb-pic" height="300px" width="300px"/>
                     <p className="fb-title">Facebook</p>
                     </a>
                <a className="icon-ig" href="https://www.instagram.com/tbao_01/">
                     <img src={insIcon} alt="fb-pic" height="300px" width="300px"/>
                     <p className="fb-title">Instagram</p>
                     </a>
                </div>
            </div>
            <div style={{display:'inline-grid', gap:'10px'}}>
                <p className="title-Service">Corporate Mailing Address</p>
                <p className="content-Service">Headquarters in Vietnam</p>
                <p className="content-Service">Mail Contact: BHQcareer@gmail.vn.com</p>
            </div>
        </div>
  )
}
export default PageCustomerServices;