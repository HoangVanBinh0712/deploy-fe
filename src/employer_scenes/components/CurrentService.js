import { useContext } from "react"
import {Link} from 'react-router-dom'
import CurrentServiceItem from "./CurrentServiceItem";
import { AuthContext } from "../../contexts/AuthContext";

const CurrentService = () => {

    const {authState:{user} } = useContext(AuthContext)

    return (
        <div style={{ width: "80%" }}>
            <div className="component-title">
                <span>Your Current Service</span>
            </div>
            <div className="free-space" id="free-space" style={{justifyContent:'start'}}>
                <div className="content-wrapper" 
                style={{ height: "260px", padding: "40px 0 0 0", gap: "0", boxShadow: 'none', }}>
                    <CurrentServiceItem user={user} />
                </div>
                <div className="view-more-ser">
                    <Link to='/employer/home' style={{textDecoration:'none'}}><p>View more services {'>>'}</p></Link>
                </div>
            </div>
        </div>
    )
}
export default CurrentService