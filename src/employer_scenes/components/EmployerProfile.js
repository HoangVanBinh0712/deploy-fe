import '../css/emp-profile.css'
import { useParams, useLocation } from 'react-router-dom';
import TopBar from '../../components/global/TopBar';
import Footer from '../../components/global/Footer';

import earthIcon from '../../assets/icons/earth-icon.png'
import logoIcon from '../../assets/icons/logo.png'
import copyicon from '../../assets/icons/copy-icon.png'
import locationIcon from '../../assets/icons/location-ping.png'
import toweIcon from '../../assets/icons/tower-icon.png'
import heartIcon from '../../assets/icons/round-heart-icon.png'
import heartBleIcon from '../../assets/icons/heart-icon.png'
import faceIcon from '../../assets/icons/face-icon.png'
import messIcon from '../../assets/icons/messenger-icon.png'
import checkIcon from '../../assets/icons/check-icon.png'
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/Toast';
import { PostContext } from '../../contexts/PostContext';

const EmployerProfile = () => {

    let { id } = useParams();
    
    const { authState: { isAuthenticated, role }, getEmpFollow, getEmployerProfile, followEmp, unFollowEmp }
        = useContext(AuthContext)
    const { postState: { postFollow }, getPostByAnyFilter, unfollowPost, followPost } = useContext(PostContext)
    const { warn, success } = useToast()

    const location = useLocation();
    const currentUrl = location.pathname;

    const [empInfo, setEmpInfo] = useState({})
    const [isFollow, setIsFollow] = useState(false)
    const [employerPost, setEmployerPost] = useState([])

    const checkFollow = (id, arr) => {
        const index = arr.findIndex(e => e.user?.id === id);
        if (index !== -1) return true
        else return false
    }

    const getSetFollow = async () => {
        if (isAuthenticated && role === "ROLE_USER") {
            const res = await getEmpFollow()
            if (res.status === 200) {
                setIsFollow(checkFollow(Number(id), res.data));
            }
        }
    }

    const getEmpPosts = async () => {
        const res = await getPostByAnyFilter(`?authorId=${id}`)
        if (res.success) {
            setEmployerPost(res.data)
        }
        console.log(res)
    }

    const getEmpInfo = async () => {
        const res = await getEmployerProfile(id)
        if (res.status === 200) {
            setEmpInfo(res.data);
        }
    }

    function chuckPosts(arr, len) {
        const chunks = [];
        let i = 0;
        while (i < arr.length) {
            chunks.push(arr.slice(i, i + len));
            i += len;
        }
        return chunks;
    }

    const allPost = chuckPosts(employerPost, 3)

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        getSetFollow()
        getEmpInfo()
        getEmpPosts()
    }, [])

    function handleCopyClick() {
        const copyText = window.location.href;
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.setAttribute("value", copyText);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }

    const onClicUnfollow = async (id) => {
        const res = await unFollowEmp(id)
        if (res.success) {
            success('The recruiter has been removed from the favorites list.')
            setIsFollow(false)
        }
        else warn(res.message)
    }

    const onClicFollow = async (id) => {
        const res = await followEmp(id)
        if (res.success) {
            success('The recruiter has been added to favorites.')
            setIsFollow(true)
        }
        else warn(res.message)
    }

    const toPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const toNextPage = () => {
        if (currentPage < allPost.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const toAnyPage = (page) => {
        setCurrentPage(page)
    }

    function getDaysDiff(date) {
        const oneDay = 24 * 60 * 60 * 1000; // số miligiây trong 1 ngày
        const currentDate = new Date();
        const inputDate = new Date(date);
        const diffDays = Math.round(Math.abs((currentDate - inputDate) / oneDay));
        return diffDays;
    }

    const heartClick = async (id) => {
        if (!isAuthenticated) {
            window.location.href = 'user/login'
        }
        else {
            if (role === "ROLE_USER") {
                if (checkFollow(id, postFollow)) {
                    const res = await unfollowPost(id)
                    if (res.success) {
                        success('The post has been removed from the favorites list.')
                    }
                    else warn(res.message)
                }
                else {
                    const res = await followPost(id)
                    if (res.success) {
                        success('The article has been added to favorites.')
                    }
                    else warn(res.message)
                }
            }
        }
    }

    let listEmpPost
    if (employerPost.length > 0) {
        listEmpPost = (
            <div id="employer-seen" className="info-area" style={{ minHeight: '400px' }}>
                <p className="area-title">Recruitment</p>
                <div className="content-wrapper" style={{ display: 'block' }}>
                    {allPost[currentPage].map((p, id) => (
                        <div className="employer-seen-info" style={{ padding: "10px" }} key={id}>
                            <img id="employer-logo" src={logoIcon} alt='' style={{ width: "20%" }} />
                            <div className="info-employee-wrapper">
                                <div id="employer-seen-name" style={{ fontFamily: "Arial", color: "#000" }}>
                                    {p.title}
                                    <img id="tick" src={checkIcon} alt='' />
                                </div>
                                <div id="company-name" style={{ fontFamily: "Arial", fontWeight: 'regular' }}>{p.author.name}</div>
                                <div className="keyword-wrapper" style={{ fontFamily: "Arial", fontWeight: 'regular' }}>
                                    <div className="keyword" id="fist-keyword">
                                        {p.salary !== null ? p.salary : ''}{' '}{p.currency}
                                    </div>
                                    <div className="keyword">{p.city.name}</div>
                                    <div className="keyword">{getDaysDiff(p.createDate)} days ago</div>
                                    <div className="keyword">{getDaysDiff(p.expirationDate)} days left</div>
                                </div>
                                <div className='favorite-info'>
                                    {isAuthenticated && role === "ROLE_USER" ? (<>
                                        {checkFollow(p.id, postFollow) ? (
                                            <img src={heartBleIcon} alt='' className="favorite" onClick={() => { heartClick(p.id) }} />
                                        ) : (
                                            <img src={heartIcon} alt='' className="favorite" onClick={() => { heartClick(p.id) }} />
                                        )}
                                    </>) : (<></>)}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="paging-post" style={{ marginTop: '15px' }}>
                        <div className="circle-round" onClick={toPreviousPage}>
                            <img src={leftArrow} alt='icon' />
                        </div>
                        {allPost.map((p, id) => (
                            <div className="page-num-round" onClick={() => { toAnyPage(id) }} key={id}
                                style={currentPage === id ? { backgroundColor: "#0c62ad", border: "2px solid #0c62ad" } : { backgroundColor: "#cfcfcf", border: "2px solid #cfcfcf" }}
                            >

                            </div>
                        ))}
                        <div className="circle-round" onClick={toNextPage}>
                            <img src={rightArrow} alt='icon' />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    else listEmpPost = (
        <div id="employer-seen" className="info-area" style={{ minHeight: '400px' }}>
            <p className="area-title">Recruitment</p>
            <div className="content-wrapper" style={{ display: 'block' }}>
                This recruiter has no job postings yet!
            </div>
        </div>
    )

    return (
        <>
            <TopBar />
            <div className='background-grey-profile'>
                <div className="body-container">
                    <p id="notice">{empInfo.name !== undefined ? empInfo.name : ''} information</p>
                    <div className="profile-head">
                        <div className="cover"></div>
                        <div className="profile-info">
                            <div className="avatarTop"></div>
                            <div className="name-viewer-wrapper">
                                <div className="name">{empInfo.name !== undefined ? empInfo.name : ''}</div>
                                <div className="company-short-info">
                                    <div className="wrapped-title">
                                        <img src={earthIcon} alt='' id="company-icon" />
                                        <div className="info">https://google.com</div>
                                    </div>
                                    <div className="wrapped-title" id="total-empl-wrap">
                                        <img src={toweIcon} alt='' id="company-icon" />
                                        <div className="info">50 - 100 employees</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isAuthenticated && role === "ROLE_USER" ? (<>
                            {isFollow ? (
                                <div className="follow-company" onClick={() => onClicUnfollow()}>Unfollow company</div>
                            ) : (
                                <div className="follow-company" onClick={() => onClicFollow()}>Follow company</div>
                            )}
                        </>) : (<></>)}

                    </div>
                    <div className="content-parent">
                        <div className="left-side-content">
                            <div className="info-area">
                                <p className="area-title">Company Introduction</p>
                                <div className="area-content" dangerouslySetInnerHTML={{ __html: empInfo.description !== undefined ? empInfo.description : '' }}>
                                </div>
                            </div>
                            {listEmpPost}
                        </div>
                        <div className="right-side-content">
                            <div className="info-area">
                                <p className="area-title">Location</p>
                                <p className="area-content"><img id="location-ping" src={locationIcon} alt='' /> {empInfo.address !== undefined ? empInfo.address : ''}</p>
                            </div>
                            <div className="info-area" id="achivement-area">
                                <div className="title-include-add">
                                    <p className="area-title">Share company</p>
                                </div>
                                <div className="area-content" id="share-company">
                                    <div style={{ fontFamily: 'Arial', fontSize: "22px" }}>Copy link:</div>
                                    <div className="link-area">
                                        <div className="paste-link">http://ten-deploy{currentUrl}</div>
                                        <div style={{ width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img className="copy-icon" src={copyicon} alt='' onClick={() => handleCopyClick()} />
                                        </div>
                                    </div>
                                    <div style={{ fontFamily: 'Arial', fontSize: "22px" }}>Share with:</div>
                                    <div className="social-media">
                                        <img className="media-icon" src={faceIcon} alt='' />
                                        <img className="media-icon" src={messIcon} alt='' />
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
export default EmployerProfile