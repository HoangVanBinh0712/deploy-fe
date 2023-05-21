import React, { useState } from 'react'
import certificateIcon from '../../assets/icons/certificate-blue-icon.png'

const SingleAchivement = ({ achive, onUpdateClick, onDeleteClick }) => {
    
    const [isOpen, setIsOpen] = useState(false)

    const onMouseEnter = ()=>{
        setIsOpen(true)
    }
    const onMouseOver = ()=>{
        setIsOpen(false)
    }

    const onClickUpdate=()=>{
        onUpdateClick(achive)
    }
    const onClickDelete=()=>{
        onDeleteClick(achive.id)
    }

    var date= new Date(achive.createDate)

    return (
        <div className="achivement-item">
            <div className="image-url">
                <img src={achive.imageUrl===null?certificateIcon:achive.imageUrl}
                    alt=" " />
            </div>
            <div className='achive-info'>
                <div className="inffo-achive name-achive">{achive.name}</div>
                
                <div className="inffo-achive box-type-achive" style={achive.type==="ACTIVITY"?{ border: "1px solid green" }:{ border: "1px solid #f0c165" }}>
                    <p>{achive.type}</p>
                </div>
                <div className="inffo-achive">Proof url:
                    <a href={achive.url}
                        target="blank">Click to view</a>
                </div>
                <div className="inffo-achive">Created Date:{" "}{date.getDate()}{"-"}{date.getMonth()}{"-"}{date.getFullYear()} </div>
            </div>
            <div className="mana-achive" onMouseEnter={onMouseEnter} onMouseLeave={onMouseOver}>
                {isOpen && (<>
                    <div className="chose-active chose-update" onClick={onClickUpdate}> Update</div>
                    <div className="chose-active chose-delete" onClick={onClickDelete}> Delete</div>
                </>)}
            </div>
        </div>
    )
}
export default SingleAchivement