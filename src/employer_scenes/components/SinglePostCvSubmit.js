import threeDotIcon from '../../assets/icons/3dot-icon.png'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { Link } from 'react-router-dom'

const SinglePostCvSubmit = ({ post, num }) => {

    const { getCvSubmited } = useContext(PostContext)

    const [isOpen, setIsOpen] = useState(false)
    const [numCv, setNumCv] = useState(0)

    const getCv = async () => {
        const res = await getCvSubmited(post.id)
        if (res.success) setNumCv(res.data.length)
    }

    useEffect(() => {
        getCv()
    }, [])

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

    const viewPost = () => {
        window.open(`/employer/post/${post.id}`, "_blank");
    }


    const statePost = (status) => {
        let body
        if (status === "ACTIVE")
            body = (<div className="btn-state-post-acpt"> Accepted</div>)
        if (status === "WAIT_FOR_ACCEPT")
            body = (<div className="btn-state-post-pending"> Pending</div>)
        if (status === "DELETED_BY_ADMIN")
            body = (<div className="btn-state-post-denied"> Unaccept</div>)
        if (status === "DELETED")
            body = (<div className="btn-state-post-denied"> Deleted</div>)
        return body
    }
    return (
        <div className="row-data-listpost">
            <div style={{ width: "25px", fontFamily: "Roboto-Light" }}>
                {num + 1}.
            </div>
            <div style={{ width: "30%", fontFamily: "Roboto-Light" }} className="limit-title-post">
                {post.title}
            </div>
            <div style={{ width: "12%", fontFamily: "Roboto-Light" }}>
                {getPostDate(post.createDate)}
            </div>
            <div style={{ width: "12%", fontFamily: "Roboto-Light" }}>
                {getPostDate(post.expirationDate)}
            </div>
            <div style={{ width: "8%", display: "flex", justifyContent: "center", fontFamily: "Roboto-Light" }}>
                {numCv}
            </div>
            <div style={{ width: "8%", display: "flex", justifyContent: "center", fontFamily: "Roboto-Light" }}>
                {post.viewCount}
            </div>
            <div style={{ width: "10%", display: "flex", justifyContent: "center", fontFamily: "Roboto-Light" }}>
                {statePost(post.status)}
            </div>
            <div style={{ width: "8%", position: 'relative' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseOver}>
                <div className="others-btn" >
                    <img src={threeDotIcon} alt='' className="three-dot-chose-post"></img>
                </div>
                {isOpen && (<>
                    <div style={{ position: 'absolute', width: '100%', zIndex: "5" }}>
                        {post.status !== 'ACTIVE' ? (
                            <Link to={`/employer/account/add-post?postId=${post.id}`} style={{ textDecoration: 'none', color: '#0c62ad' }}>
                                <div className="chose-active chose-update" style={{ marginLeft: "-15px" }}>
                                    View Post
                                </div>
                            </Link>
                        ) : (
                            <>
                                <div className="chose-active chose-update" style={{ marginLeft: "-15px", color: '#0c62ad' }} onClick={viewPost}>
                                    View Post
                                </div>
                                <Link to={`/employer/account/post-submitted/${post.id}`} style={{ textDecoration: 'none', color: '#0c62ad' }}>
                                    <div className="chose-active chose-update" style={{ marginLeft: "-15px" }}>
                                        Submited
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </>)}
            </div>
        </div >
    )
}
export default SinglePostCvSubmit;