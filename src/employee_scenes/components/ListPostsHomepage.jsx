import React from 'react'
import { useState, useContext } from 'react'

import roundheartIcon from "../../assets/icons/round-heart-icon.png"
import heartIcon from "../../assets/icons/heart-icon.png"
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import logoPost from "../../assets/icons/logo-company.png"
import { PostContext } from '../../contexts/PostContext'
import { AuthContext } from '../../contexts/AuthContext'
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom'

const ListPostsHomepage = ({ title, isHaveAi, listPosts }) => {

    const { authState: { authloading, role } } = useContext(AuthContext)
    const { postState: { postFollow }, followPost, unfollowPost } = useContext(PostContext)
    const navigate = useNavigate();

    const post = listPosts

    function chuckPosts(arr) {
        const chunks = [];
        let i = 0;
        while (i < arr.length) {
            chunks.push(arr.slice(i, i + 6));
            i += 6;
        }
        return chunks;
    }

    const allPost = chuckPosts(post)

    const [currentPage, setCurrentPage] = useState(0)

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

    const checkFollow = (id, arr) => {
        const index = arr.findIndex(post => post.id === id);
        if (index !== -1) return true
        else return false
    }

    const heartClick = async (id) => {
        if (authloading) {
            navigate('/user/login')
        }
        else {
            if (role === "ROLE_USER") {
                if (checkFollow(id, postFollow)) {
                    const res = await unfollowPost(id)
                    if (res.success) {
                        swal({
                            title: "Success",
                            icon: "success",
                            text: "The post has been removed from the favorites list.",
                            dangerMode: false,
                        })
                    }
                    else swal({
                        title: "Error",
                        icon: "warning",
                        text: res.message,
                        dangerMode: true,
                    })
                }
                else {
                    const res = await followPost(id)
                    if (res.success) {
                        swal({
                            title: "Success",
                            icon: "success",
                            text: "The post has been added to the favorites list.",
                            dangerMode: false,
                        })

                    }
                    else swal({
                        title: "Error",
                        icon: "warning",
                        text: res.message,
                        dangerMode: true,
                    })
                }
            }
        }
    }

    const onClickToAllPost = () => {
        navigate("/posts");
    }

    let postInBox
    if (post.length > 0) {
        postInBox = (<>
            {allPost[currentPage].map((p, id) => (
                <div className="post-item" key={id}>
                    <div className="logo-emp-post">
                        <a href={`/recruiter/${p.author.id}`}><img src={p.author.urlAvatar === null ? logoPost : p.author.urlAvatar} className="img-inpost-homepage" alt="logo" /></a>
                    </div>
                    <div className="info-post-homepage">
                        <div style={{width:'100%'}}>
                            <div className="post-title-homepage">
                                <a href={`/post/${p.id}`}>{p.title}</a>
                            </div>
                            <div className="type-of-work">
                                {p.method === "FULL_TIME" ? "Full time" : "Part time"}
                            </div>
                            <div className="locationg-company-homepage">
                                {p.location}
                            </div>
                        </div>
                        <div className="follow-post-heart">
                            <div className="heart-icon" style={role !== "ROLE_EMPLOYER" ? { display: 'block' } : { display: 'none' }} onClick={() => heartClick(p.id)}>
                                {checkFollow(p.id, postFollow) ? (<img className="icon-hear-follow" src={heartIcon} alt="heart icon" />)
                                    : (<img className="icon-hear-follow" src={roundheartIcon} alt="heart icon" />)}
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </>
        )
    }
    else if (!isHaveAi) {
        postInBox = (<>
            There are no posts yet!
        </>
        )
    }
    else {
        postInBox = (<>
            You need to login and upload your profile so we can recommend suitable jobs for you.
        </>
        )
    }

    let body
    if (isHaveAi) {
        body = (
            <div className="hot-job-homepage">
                <div className="hot-job-homepage-titlebox">
                    <div className="post-bx-title-ai">
                        {title}
                    </div>
                    <div className="round-recommend">
                        Recommended by HBQ AI
                    </div>
                    <div className="post-bx-viewall-ai" >
                        <div style={{ cursor: 'pointer' }} onClick={() => { onClickToAllPost() }}>{`View all >>`}</div>
                    </div>
                </div>
                <div className="list-posts-homepage">
                    {postInBox}

                </div>
                <div className="paging-post" >
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
        )
    }

    else {
        body = (
            <div className="hot-job-homepage">
                <div className="hot-job-homepage-titlebox">
                    <div className="post-bx-title">
                        {title}
                    </div>
                    <div className="post-bx-viewall" >
                        <div style={{ cursor: 'pointer' }} onClick={() => { onClickToAllPost() }}>{`View all >>`}</div>
                    </div>
                </div>
                <div className="list-posts-homepage">
                    {postInBox}

                </div>
                <div className="paging-post">
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
        )
    }




    return (
        <>
            {body}
        </>
    )
}
export default ListPostsHomepage;