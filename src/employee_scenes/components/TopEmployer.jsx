import React from 'react'

import tamLogo from "../../assets/picture-banner/tma-logo.png"

const TopEmployer = ({listCompanies}) => {

  return (
    <div className="top-emp-homepage">
        <div className="top-emp-title">
            Top Employers
        </div>
        <div className="list-emp-homepage">
            {listCompanies.map((emp,id)=>(
                <img src={emp.urlAvatar===null?tamLogo:emp.urlAvatar} className="logo-top-emp" alt='logo' key={id}/>
                ))}
        </div>
    </div>
  )
}
export default TopEmployer;