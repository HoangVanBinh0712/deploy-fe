import "../css/u-profile.css";
import { useParams } from "react-router-dom";
import TopBar from "../../components/global/TopBar";
import Footer from "../../components/global/Footer";

import cameraIcon from "../../assets/icons/camera-icon.png";
import logoIcon from "../../assets/icons/logo.png";
import checkIcon from "../../assets/icons/check-icon.png";
import locationIcon from "../../assets/icons/location-ping.png";
import threeDotIcon from "../../assets/icons/3dot-icon.png";
import cerIcon from "../../assets/icons/certificate-icon.png";
import actIcon from "../../assets/icons/activities.png";
import addIcon from "../../assets/icons/add-icon.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import coverImage from "../../assets/picture-banner/service-banner.png";
import axios from "axios";
import { apiUrl } from "../../contexts/Constants";
import swal from "sweetalert";

const EmployeeProfile = () => {
  let { id } = useParams();
  const { authState: { isAuthenticated, role },
    getUserProfileJSK, getUserProfileByAnyFilter, openRoomFromProfile,
    setOpenRoomFromProfile, } = useContext(AuthContext);

  const [jskInfo, setJskInfo] = useState({
    user: {
      id: 0,
      email: "",
      emailConfirm: false,
      name: "",
      phone: "",
      city: null,
      industry: null,
      urlAvatar: "",
      urlCover: "",
      address: "",
      description: "",
      role: "ROLE_USER",
      service: null,
      serviceExpirationDate: null,
    },
    achievements: [],
  });

  const [listJskRec, setListJskRec] = useState([]);

  useEffect(() => {
    const getJSK = async () => {
      const res = await getUserProfileJSK(id);
      setJskInfo(res);
      const key = res.user.industry !== null ? `?industryId=${res.user.industry.id}` : "";
      const resP = await getUserProfileByAnyFilter(key);
      if (resP.success) {
        setListJskRec(resP.data);
      }
    };
    getJSK();
    console.log("errff");
  }, []);

  const onClickAchiName = (url) => {
    if (url !== null && url !== undefined)
      window.open(url, "_blank");
    else  swal({ title: "Information", icon: "info", text: "No preview yet!" });
  };

  const getPostDate = (date) => {
    const myDate = new Date(date);
    const day = ("0" + myDate.getDate()).slice(-2);
    const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    const year = myDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getExpUser = (value) => {
    let body;
    if (value === "NONE") {
      body = <>Experience: None</>;
    }
    if (value === "UNDER_ONE_YEAR") {
      body = <>Experience: Under one year</>;
    }
    if (value === "ONE_YEAR") {
      body = <>Experience: One year</>;
    }
    if (value === "TWO_YEAR") {
      body = <>Experience: Two years</>;
    }
    if (value === "THREE_YEAR") {
      body = <>Experience: Three years</>;
    }
    if (value === "FOUR_YEAR") {
      body = <>Experience: Four years</>;
    }
    if (value === "FIVE_YEAR") {
      body = <>Experience: Five years</>;
    }
    if (value === "ABOVE_FIVE_YEAR") {
      body = <>Experience: Above five years</>;
    }
    return body;
  };

  const onClickJskImg = (id) => {
    window.open(`/employer/candidates/${id}`, "_blank");
  };

  return (
    <>
      <TopBar />
      <div className="background-grey-profile">
        <div className="body-container">
          <p id="notice">{`${jskInfo.user.name} information`}</p>
          <div className="profile-head">
            <div className="cover">
              <img className="cover-image" src={jskInfo.user.urlCover === null ? coverImage : jskInfo.user.urlCover} alt="" />

              {/* <div id="change-image" style={{ display: 'none' }}>
                                <img id="camera-icon" src={cameraIcon} alt='' />
                                <div>Change image</div>
                            </div> */}
            </div>
            <div className="profile-info">
              <div className="avatarTop">
                {/* <div className="transparent-camera" style={{ display: 'none' }}><img id="camera-icon" src={cameraIcon} alt='' /></div> */}
                <img className="avatar" src={jskInfo.user.urlAvatar === null ? logoIcon : jskInfo.user.urlAvatar} alt="" />
              </div>
              <div className="name-viewer-wrapper">
                <div className="name">
                  {jskInfo.user.name}
                  {isAuthenticated && role === "ROLE_EMPLOYER" && (
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
                        }else{
                          setOpenRoomFromProfile(null)
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
                  <div className="viewer-count" style={{ marginRight: "5px" }}>
                    {jskInfo.user.city === null ? "Not updated yet!" : jskInfo.user.city.name}
                  </div>
                  -
                  <div className="viewer-count" style={{ marginLeft: "5px" }}>
                    {jskInfo.user.industry === null ? "Not updated Industry yet!" : `Industry: ${jskInfo.user.industry.name}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-parent">
            <div className="left-side-content">
              <div className="info-area">
                <p className="area-title">Introduction</p>
                <div className="area-content" dangerouslySetInnerHTML={{ __html: jskInfo.user.description }}></div>
                <div className="edit-button" style={{ display: "none" }}></div>
              </div>
              <div id="employer-seen" className="info-area">
                <p className="area-title">May be you are interested</p>
                <div className="content-wrapper" style={{ display: "block" }}>
                  {listJskRec.length > 0 ? (
                    <>
                      {listJskRec.map((r, id) => (
                        <div className="employer-seen-info" key={id}>
                          <img
                            id="employer-logo"
                            src={r.user.urlAvatar !== null ? r.user.urlAvatar : logoIcon}
                            alt=""
                            style={{ border: "2px solid #cfcfcf" }}
                            onClick={() => onClickJskImg(r.user.id)}
                          />
                          <div className="info-employee-wrapper">
                            <div id="employer-seen-name" onClick={() => onClickJskImg(r.user.id)}>
                              {r.user.name}
                              <img id="tick" src={checkIcon} alt="" />
                            </div>
                            <div id="jsk-info">
                              <div className="square-content">{`City: ${r.user.city !== null ? r.user.city.name : "Updating"}`}</div>
                              <div className="square-content">{getExpUser(r.experience)}</div>
                              <div className="square-content">{`Position: ${r.position}`}</div>
                            </div>
                          </div>
                          <div id="day-viewed">{`Last modified: ${getPostDate(r.lastModified)}`}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="employer-seen-info">There are no similar candidates</div>
                  )}
                </div>
              </div>
            </div>
            <div className="right-side-content">
              <div className="info-area">
                <p className="area-title">Address</p>
                <p className="area-content">
                  <img id="location-ping" src={locationIcon} alt="" /> {jskInfo.user.address}
                </p>
                <div className="edit-button" style={{ display: "none" }}></div>
              </div>
              <div className="info-area" id="achivement-area">
                <div className="title-include-add">
                  <p className="area-title">Achievement</p>
                  <img id="add-button" src={addIcon} alt="" style={{ display: "none" }} />
                </div>
                <div className="area-content">
                  {jskInfo.achievements.length > 0 ? (
                    <>
                      {jskInfo.achievements.map((ach, id) => (
                        <>
                          {ach.type === "CERTIFICATE" ? (
                            <div className="achive-item" key={id}>
                              <img id="achive-icon" src={cerIcon} alt="" />
                              <div className="achive-name" onClick={() => onClickAchiName(ach.url)}>
                                {ach.name}
                              </div>
                              <img id="achive-more" src={threeDotIcon} alt="" style={{ display: "none" }} />
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    "No activity yet"
                  )}
                </div>
              </div>
              <div className="info-area" id="activities-area">
                <div className="title-include-add">
                  <p className="area-title">Activities</p>
                  <img id="add-button" src={addIcon} alt="" style={{ display: "none" }} />
                </div>
                <div className="area-content">
                  {jskInfo.achievements.length > 0 ? (
                    <>
                      {jskInfo.achievements.map((ach, id) => (
                        <>
                          {ach.type === "ACTIVITY" ? (
                            <div className="achive-item" key={id}>
                              <img id="clock-icon" src={actIcon} alt="" />
                              <div className="achive-name" id="activity-title">
                                <div id="activity-name" onClick={() => onClickAchiName(ach.url)}>
                                  {ach.name}
                                </div>
                                <div id="activity-time">{ach.createDate}</div>
                              </div>
                              <img id="achive-more" src={threeDotIcon} alt="" style={{ display: "none" }} />
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    "No activity yet"
                  )}
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
export default EmployeeProfile;
