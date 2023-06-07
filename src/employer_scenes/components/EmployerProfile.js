import "../css/emp-profile.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import TopBar from "../../components/global/TopBar";
import Footer from "../../components/global/Footer";
import coverImage from "../../assets/picture-banner/service-banner.png";
import logoIcon from "../../assets/icons/logo-company.png";
import copyicon from "../../assets/icons/copy-icon.png";
import locationIcon from "../../assets/icons/location-ping.png";
import heartIcon from "../../assets/icons/round-heart-icon.png";
import heartBleIcon from "../../assets/icons/heart-icon.png";
import faceIcon from "../../assets/icons/face-icon.png";
import messIcon from "../../assets/icons/messenger-icon.png";
import checkIcon from "../../assets/icons/check-icon.png";
import leftArrow from "../../assets/icons/left-arow-icon.png";
import rightArrow from "../../assets/icons/right-arow-grey-icon.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/Toast";
import { PostContext } from "../../contexts/PostContext";
import axios from "axios";
import { apiUrl } from "../../contexts/Constants";
import swal from "sweetalert";

const EmployerProfile = () => {
  let { id } = useParams();

  const {
    authState: { isAuthenticated, user, role },
    getEmpFollow,
    getEmployerProfile,
    followEmp,
    unFollowEmp,
    openRoomFromProfile,
    setOpenRoomFromProfile,
  } = useContext(AuthContext);
  const {
    postState: { postFollow },
    getPostByAnyFilter,
    unfollowPost,
    followPost,
  } = useContext(PostContext);

  const location = useLocation();
  const currentUrl = location.pathname;

  const [empInfo, setEmpInfo] = useState({});
  const [isFollow, setIsFollow] = useState(false);
  const [employerPost, setEmployerPost] = useState([]);

  const checkFollow = (id, arr) => {
    const index = arr.findIndex((e) => e.user?.id === id);
    if (index !== -1) return true;
    else return false;
  };

  const checkPostFollow = (id, arr) => {
    const index = arr.findIndex((e) => e.id === id);
    if (index !== -1) return true;
    else return false;
  };

  const getSetFollow = async () => {
    if (isAuthenticated && role === "ROLE_USER") {
      const res = await getEmpFollow();
      if (res.status === 200) {
        setIsFollow(checkFollow(Number(id), res.data));
      }
    }
  };

  const getEmpPosts = async () => {
    const res = await getPostByAnyFilter(`?authorId=${id}`);
    if (res.success) {
      setEmployerPost(res.data);
    }
  };

  const getEmpInfo = async () => {
    const res = await getEmployerProfile(id);
    if (res.status === 200) {
      setEmpInfo(res.data);
    }
  };

  function chuckPosts(arr, len) {
    const chunks = [];
    let i = 0;
    while (i < arr.length) {
      chunks.push(arr.slice(i, i + len));
      i += len;
    }
    return chunks;
  }

  const allPost = chuckPosts(employerPost, 3);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getSetFollow();
    getEmpInfo();
    getEmpPosts();
  }, []);

  function handleCopyClick() {
    const copyText = window.location.href;
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.setAttribute("value", copyText);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    swal({
      title: "Success",
      icon: "success",
      text: "Copied!",
      dangerMode: false,
    });
  }

  const onClicUnfollow = async (id) => {
    const res = await unFollowEmp(id);
    if (res.success) {
      swal({
        title: "Success",
        icon: "success",
        text: "The recruiter has been removed from the favorites list.",
        dangerMode: false,
      });
      setIsFollow(false);
    } else
      swal({
        title: "Error",
        icon: "warning",
        text: res.message,
        dangerMode: true,
      });
  };

  const onClicFollow = async (id) => {
    const res = await followEmp(id);
    if (res.success) {
      swal({
        title: "Success",
        icon: "success",
        text: "The recruiter has been added to favorites list.",
        dangerMode: false,
      });
      setIsFollow(true);
    } else
      swal({
        title: "Error",
        icon: "warning",
        text: res.message,
        dangerMode: true,
      });
  };

  const toPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const toNextPage = () => {
    if (currentPage < allPost.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toAnyPage = (page) => {
    setCurrentPage(page);
  };

  function getDaysDiff(date) {
    const oneDay = 24 * 60 * 60 * 1000; // số miligiây trong 1 ngày
    const currentDate = new Date();
    const inputDate = new Date(date);
    const diffDays = Math.round(Math.abs((currentDate - inputDate) / oneDay));
    return diffDays;
  }

  const heartClick = async (id) => {
    if (!isAuthenticated) {
      navigate("/user/login");
    } else {
      if (role === "ROLE_USER") {
        if (checkPostFollow(id, postFollow)) {
          const res = await unfollowPost(id);
          if (res.success) {
            swal({
              title: "Success",
              icon: "success",
              text: "The post has been removed from the favorites list.",
              dangerMode: false,
            });
          } else
            swal({
              title: "Error",
              icon: "warning",
              text: res.message,
              dangerMode: true,
            });
        } else {
          const res = await followPost(id);
          if (res.success) {
            swal({
              title: "Success",
              icon: "success",
              text: "The post has been added to favorites list.",
              dangerMode: false,
            });
          } else
            swal({
              title: "Error",
              icon: "warning",
              text: res.message,
              dangerMode: true,
            });
        }
      }
    }
  };

  const onClickPostTitle = (id) => {
    navigate(`/post/${id}`);
  };

  let listEmpPost;
  if (employerPost.length > 0) {
    listEmpPost = (
      <div id="employer-seen" className="info-area" style={{ minHeight: "400px" }}>
        <p className="area-title">Recruitment</p>
        <div className="content-wrapper" style={{ display: "block" }}>
          {allPost[currentPage].map((p, id) => (
            <div className="employer-seen-info" style={{ padding: "10px" }} key={id}>
              <img id="employer-logo" src={p.author.urlAvatar === null ? logoIcon : p.author.urlAvatar} alt="" style={{ width: "16%", cursor: "default" }} />
              <div className="info-employee-wrapper">
                <div id="employer-seen-name" style={{ fontFamily: "Arial", color: "#000" }} onClick={() => onClickPostTitle(p.id)}>
                  {p.title}
                  <img id="tick" src={checkIcon} alt="" />
                </div>
                <div id="company-name" style={{ fontFamily: "Arial", fontWeight: "regular" }}>
                  {p.author.name}
                </div>
                <div className="keyword-wrapper" style={{ fontFamily: "Arial", fontWeight: "regular" }}>
                  <div className="keyword" id="fist-keyword">
                    {p.salary !== null ? p.salary : ""} {p.currency}
                  </div>
                  <div className="keyword">{p.city.name}</div>
                  <div className="keyword">{getDaysDiff(p.createDate)} days ago</div>
                  <div className="keyword">{getDaysDiff(p.expirationDate)} days left</div>
                </div>
                <div className="favorite-info">
                  {isAuthenticated && role === "ROLE_USER" ? (
                    <>
                      {checkPostFollow(p.id, postFollow) ? (
                        <img
                          src={heartBleIcon}
                          alt=""
                          className="favorite"
                          onClick={() => {
                            heartClick(p.id);
                          }}
                        />
                      ) : (
                        <img
                          src={heartIcon}
                          alt=""
                          className="favorite"
                          onClick={() => {
                            heartClick(p.id);
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="paging-post" style={{ marginTop: "15px" }}>
            <div className="circle-round" onClick={toPreviousPage}>
              <img src={leftArrow} alt="icon" />
            </div>
            {allPost.map((p, id) => (
              <div
                className="page-num-round"
                onClick={() => {
                  toAnyPage(id);
                }}
                key={id}
                style={currentPage === id ? { backgroundColor: "#0c62ad", border: "2px solid #0c62ad" } : { backgroundColor: "#cfcfcf", border: "2px solid #cfcfcf" }}
              ></div>
            ))}
            <div className="circle-round" onClick={toNextPage}>
              <img src={rightArrow} alt="icon" />
            </div>
          </div>
        </div>
      </div>
    );
  } else
    listEmpPost = (
      <div id="employer-seen" className="info-area" style={{ minHeight: "400px" }}>
        <p className="area-title">Recruitment</p>
        <div className="content-wrapper" style={{ display: "block" }}>
          This recruiter has no job postings yet!
        </div>
      </div>
    );

  return (
    <>
      <TopBar />
      <div className="background-grey-profile">
        <div className="body-container">
          <p id="notice">{empInfo.name !== undefined ? empInfo.name : ""} information</p>
          <div className="profile-head">
            <div className="cover">
              <img className="cover-image" src={empInfo.urlCover === null ? coverImage : empInfo.urlCover} alt="" />
            </div>
            <div className="profile-info">
              <div className="avatarTop">
                <img className="avatar" src={empInfo.urlAvatar === null ? logoIcon : empInfo.urlAvatar} alt="" />
              </div>
              <div className="name-viewer-wrapper">
                <div className="name">
                  {empInfo.name !== undefined ? empInfo.name : ""}
                  {isAuthenticated && role === "ROLE_USER" && (
                    <div
                      style={{ fontSize: "0.8em" }}
                      onClick={async () => {
                        if (!openRoomFromProfile) {
                          try {
                            const response = await axios.get(`${apiUrl}/chat/single-chat-room/${id}`);
                            if (response) {
                              setOpenRoomFromProfile(response.data.id);
                              setTimeout(() => {
                                setOpenRoomFromProfile(null);
                              }, 3000);
                            }
                          } catch (error) {
                            swal({ text: "we are sory for the inconvinient !", icon: "error", title: "Error" });
                          }
                        } else {
                          setOpenRoomFromProfile(null);
                        }
                      }}
                    >
                      <div className="button">
                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                        Chat now !
                      </div>
                    </div>
                  )}
                </div>
                <div className="viewer-info">
                  <div className="viewer-icon"></div>
                  <div className="viewer-count">{empInfo.city === null ? "Not updated yet!" : empInfo.city?.name}</div>
                </div>
              </div>
            </div>
            {isAuthenticated && role === "ROLE_USER" ? (
              <>
                {isFollow ? (
                  <div className="follow-company" style={{ backgroundColor: "coral" }} onClick={() => onClicUnfollow(id)}>
                    Unfollow company
                  </div>
                ) : (
                  <div className="follow-company" onClick={() => onClicFollow(id)}>
                    Follow company
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="content-parent">
            <div className="left-side-content">
              <div className="info-area">
                <p className="area-title">Company Introduction</p>
                <div className="area-content" dangerouslySetInnerHTML={{ __html: empInfo.description !== undefined ? empInfo.description : "" }}></div>
              </div>
              {listEmpPost}
            </div>
            <div className="right-side-content">
              <div className="info-area">
                <p className="area-title">Location</p>
                <p className="area-content">
                  <img id="location-ping" src={locationIcon} alt="" /> {empInfo.address !== undefined ? empInfo.address : ""}
                </p>
              </div>
              <div className="info-area" id="achivement-area">
                <div className="title-include-add">
                  <p className="area-title">Share company</p>
                </div>
                <div className="area-content" id="share-company">
                  <div style={{ fontFamily: "Arial", fontSize: "22px" }}>Copy link:</div>
                  <div className="link-area">
                    <div className="paste-link">http://localhost:3000{currentUrl}</div>
                    <div style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img className="copy-icon" src={copyicon} alt="" onClick={() => handleCopyClick()} />
                    </div>
                  </div>
                  {/*  <div style={{ fontFamily: "Arial", fontSize: "22px" }}>Share with:</div>
                  <div className="social-media">
                    <img className="media-icon" src={faceIcon} alt="" />
                    <img className="media-icon" src={messIcon} alt="" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default EmployerProfile;
