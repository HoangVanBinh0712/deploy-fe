import { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import TopBar from "./global/TopBar";
import Footer from "./global/Footer";
import ReactQuill from "react-quill";
import "./css/postdetail.css";

import logoIcon from "../assets/icons/logo-company.png";
import salaryIcon from "../assets/icons/money-blue-icon.png";
import accIcon from "../assets/icons/account-icon.png";
import workIcon from "../assets/icons/work-blue-icon.png";
import certIcon from "../assets/icons/certificate-blue-icon.png";
import genderIcon from "../assets/icons/gender-icon.png";
import chartIcon from "../assets/icons/chart-icon.png";
import questionIcon from "../assets/picture-banner/question.png";
import pingIcon from "../assets/icons/location-ping.png";
import addIcon from "../assets/icons/add-icon.png";
import WaitingResponeButton from "./WaitingResponeButton";
import { AuthContext } from "../contexts/AuthContext";
import { PostContext } from "../contexts/PostContext";
import swal from "sweetalert";
import eyeIcon from '../assets/icons/eye-icon20px.png'

const PostDetails = () => {
  let { id } = useParams();
  const {
    authState: { isAuthenticated, role, user },
    getResume,
    deleteSubmitedResume,
    submitResume,
    checkSubmitedResume,
    reportPost,
  } = useContext(AuthContext);
  const {
    postState: { postFollow },
    getPostById,
    followPost,
    unfollowPost,
  } = useContext(PostContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // single-time read
  const params = Object.fromEntries([...searchParams]);

  const data = {
    id: 0,
    title: "",
    description: "",
    method: "",
    position: "",
    experience: "",
    gender: "",
    requirement: "",
    benifit: "",
    contact: "",
    salary: null,
    currency: "",
    location: "",
    recruit: 0,
    createDate: "2023-01-07 10:56:01",
    expirationDate: "2023-06-06 00:00:00",
    author: {
      id: 0,
      email: "",
      emailConfirm: true,
      name: "",
      phone: "",
      city: {
        id: 1,
        name: "TP Hồ Chí Minh",
      },
      industry: {
        id: 1,
        name: "IT",
      },
      urlAvatar: null,
      urlCover: null,
      address: "",
      description: "",
      role: "",
      service: {
        id: 0,
        name: "",
        description: "",
        type: "",
        price: 0,
        currency: "",
        postDuration: 2,
        active: true,
        canSearchCV: true,
        canFilterCVSubmit: true,
      },
      serviceExpirationDate: "2025-01-07 00:00:00",
    },
    industry: {
      id: 1,
      name: "IT",
    },
    city: {
      id: 1,
      name: "TP Hồ Chí Minh",
    },
    status: "ACTIVE",
    viewCount: 7,
    service: {
      id: 3,
      name: "Premiun Serivce",
      description:
        "Premium service will allow employer to post a job recruitment and allow job seeker to submit their Resume to the post. Beside that employer are able to search for job seeker public resume and filter resume submit to their job recruitment.",
      type: "PREMIUM",
      price: 30,
      currency: "USD",
      postDuration: 2,
      active: true,
      canSearchCV: true,
      canFilterCVSubmit: true,
    },
  };

  const [isSubmitFormOpen, setSubmitForm] = useState(false);
  const [isReportFormOpen, setReportForm] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [allResume, setAllResume] = useState([]);
  const [dataPost, setDataPost] = useState(data);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isWaitingRes, setIsWaitingRes] = useState(false)

  const getAllResume = async () => {
    const res = await getResume();
    if (res.success) {
      setAllResume(res.data);
    }
  };

  const getDataPost = async () => {
    const res = await getPostById(id);
    if (res.success) {
      setDataPost(res.data);
    }
    console.log(res)
  };

  const checkSubmit = async () => {
    const res = await checkSubmitedResume(id);
    if (res.data !== null) {
      setSelectValue(res.data.mediaId);
      setIsSubmited(true);
    }
    setIsSubmited(false);
  };

  useEffect(() => {
    getDataPost();
    if (isAuthenticated && role === "ROLE_USER") {
      getAllResume();
      checkSubmit();
      setIsFollowed(checkFollow(id, postFollow))
    }
  }, [user]);

  const getPostDate = (date) => {
    const myDate = new Date(date);
    const day = ("0" + myDate.getDate()).slice(-2);
    const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    const year = myDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getTypeJob = (type) => {
    if (type === "FULL_TIME") return "Full time";
    if (type === "PART_TIME") return "Part time";
    if (type === "INTERN") return "Intern";
  };

  const getGender = (gen) => {
    if (gen === "MALE") return "Male";
    if (gen === "FEMALE") return "Female";
    if (gen === "NONE") return "Not required";
  };

  const getExp = (exp) => {
    if (exp === "NONE") return "Not required";
    if (exp === "UNDER_ONE_YEAR") return "Under 1 year";
    if (exp === "ONE_YEAR") return "1 year";
    if (exp === "TWO_YEAR") return "2 years";
    if (exp === "THREE_YEAR") return "3 years";
    if (exp === "FOUR_YEAR") return "4 years";
    if (exp === "FIVE_YEAR") return "5 years";
    if (exp === "ABOVE_FIVE_YEAR") return "Over 5 years";
  };

  function handleCopyClick() {
    const copyText = window.location.href;
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.setAttribute("value", copyText);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    swal({ title: "Success", icon: "success", text: "Copied successfully!" });
  }

  const [selectValue, setSelectValue] = useState(params.mediaId !== undefined?params.mediaId:0);
  const [coverLetter, setCoverLetter] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [mess, setMess] = useState("");

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const onChangeCoverletter = (value) => {
    setCoverLetter(value);
  };

  const onChangeReportMessage = (value) => {
    setReportMessage(value);
  };

  const applyClick = () => {
    if (isAuthenticated && role === "ROLE_USER") {
      setSubmitForm(true);
    } else navigate("/user/login");
  };

  const addCvClick = () => {
    navigate("/user/account/add-resume");
  }
  const closeFormClick = () => {
    setSubmitForm(false);
  };

  const reportClick = () => {
    if (isAuthenticated) setReportForm(true);
    else navigate("/user/login");
  };

  const closeFormReport = () => {
    setReportForm(false);
  };

  const submitCvClick = async () => {
    setIsWaitingRes(true)
    const info = {
      postId: id,
      mediaId: selectValue,
      coverLetter: coverLetter,
    };
    console.log(info);
    if (coverLetter.length > 30) {
      const res = await submitResume(info);
      if (res.success) {
        swal({ title: "Success", icon: "success", text: "Applied successfully!" });

        setSubmitForm(false);
      } else swal({ title: "Error", icon: "error", text: res.message });
    } else {
      setMess("*Cover letter must have more than 30 characters");
      setTimeout(() => {
        setMess("");
      }, 5000);
    }
    setIsWaitingRes(false)
  };

  const deleteCvSubmitedClick = async () => {
    const info = {
      postId: id,
      mediaId: selectValue,
    };
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      const res = await deleteSubmitedResume(info);
      if (res.success) {
        swal({ title: "Success", icon: "success", text: "Unapplied successfully!" });
        setIsSubmited(false);
      } else swal({ title: "Error", icon: "error", text: res.message });
    }
  };

  const submitReport = async () => {
    const info = {
      name: user.name,
      phone: user.phone,
      email: user.email,
      reportContent: reportMessage,
      postId: Number(id),
    };
    if (reportMessage.length > 30) {
      const res = await reportPost(info);
      if (res.success) {
        swal({ title: "Success", icon: "success", text: "Applied successfully!" });

        setSubmitForm(false);
      } else swal({ title: "Error", icon: "error", text: res.message });
    } else {
      setMess("*Desciption must have more than 30 characters");
      setTimeout(() => {
        setMess("");
      }, 5000);
    }
  };
  const checkFollow = (id, arr) => {
    return arr.some((post) => post.id == id);

  };

  const savePostClick = async (id) => {
    if (!isAuthenticated) {
      navigate("/user/login");
    } else {
      if (role === "ROLE_USER") {
        if (isFollowed) {
          const res = await unfollowPost(id);
          if (res.success) {
            setIsFollowed(false);
            swal({ title: "The post has been removed from the favorites list.", icon: "success" });
          } else swal({ title: "Error", icon: "error", text: res.message });
        } else {
          const res = await followPost(id);
          if (res.success) {
            setIsFollowed(true);
            swal({ title: "The article has been added to favorites.", icon: "success" });
          } else swal({ title: "Error", icon: "error", text: res.message });
        }
      }
    }
  };

  const ocClickToNTDProfile = () => {
    console.log(data);
    window.location.href = `/recruiter/${dataPost.author.id}`;
  };

  const getResumeName = (id) => {
    const resume = allResume.find((item) => item.mediaId === Number(id))
    if (resume !== undefined) return resume.name;
    return '';
  }

  return (
    <>
      <TopBar />
      <div className="post-detail">
        <div className="post-title-intop">{dataPost.title}</div>
        <div className="post">
          <a href={`/recruiter/${dataPost.author.id}`}>
            <img className="avatar" src={dataPost.author.urlAvatar === null ? logoIcon : dataPost.author.urlAvatar} alt="" />
          </a>
          <div className="post-info">
            <p className="title">{dataPost.title}</p>
            <div className="post-description" onClick={() => ocClickToNTDProfile()} style={{ cursor: "pointer" }}>
              {dataPost.author.name}
            </div>
            <div className="post-deadline-submit">Deadline for submission: {getPostDate(dataPost.expirationDate)}</div>
            <div className="count-view-post">

              {dataPost.viewCount}<img src={eyeIcon} alt="" />
            </div>
          </div>
          {role !== "ROLE_EMPLOYER" ? (
            <div className="group-buttons">
              {isSubmited ? (
                <div
                  className="button"
                  onClick={() => {
                    deleteCvSubmitedClick();
                  }}
                >
                  <i className="fa fa-undo" aria-hidden="true"></i>
                  UNAPPLY
                </div>
              ) : (
                <div
                  className="button"
                  onClick={() => {
                    applyClick();
                  }}
                >
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                  APPLY
                </div>
              )}
              {isFollowed ? (
                <div className="button btn-save" onClick={() => savePostClick(id)}>
                  <i className="fa fa-heart" aria-hidden="true"></i>
                  UNSAVE
                </div>
              ) : (
                <div className="button btn-save" onClick={() => savePostClick(id)}>
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                  SAVE
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="recruitment">
          <div className="recruitment-title">Recruitment</div>
          <div className="content-wrapper">
            <h1 style={{ fontSize: "1.4em" }}>Details</h1>
            <div className="row-space-between">
              <div className="left-group">
                <h3 style={{ fontWeight: "600" }}>Overall</h3>
                <div className="row-flex">
                  <div className="item" style={{ backgroundColor: "inherit" }}>
                    <div className="icon-wrapper">
                      <img src={salaryIcon} alt="" />
                    </div>
                    <div className="item-detail">
                      <h4>Salary</h4>
                      <p>
                        {dataPost.salary !== null ? dataPost.salary : ""} {dataPost.currency}
                      </p>
                    </div>
                  </div>
                  <div className="item" style={{ backgroundColor: "inherit" }}>
                    <div className="icon-wrapper">
                      <img src={accIcon} alt="" />
                    </div>
                    <div className="item-detail">
                      <h4>Quantity</h4>
                      <p>{dataPost.recruit} people</p>
                    </div>
                  </div>
                  <div className="item" style={{ backgroundColor: "inherit" }}>
                    <div className="icon-wrapper">
                      <img src={workIcon} alt="" />
                    </div>
                    <div className="item-detail">
                      <h4>Type of work</h4>
                      <p>{getTypeJob(dataPost.method)}</p>
                    </div>
                  </div>
                  <div className="item" style={{ backgroundColor: "inherit" }}>
                    <div className="icon-wrapper">
                      <img src={certIcon} alt="" />
                    </div>
                    <div className="item-detail">
                      <h4>Level</h4>
                      <p>{dataPost.position}</p>
                    </div>
                  </div>
                  <div className="item" style={{ backgroundColor: "inherit" }}>
                    <div className="icon-wrapper">
                      <img src={genderIcon} alt="" />
                    </div>
                    <div className="item-detail">
                      <h4>Gender</h4>
                      <p>{getGender(dataPost.gender)}</p>
                    </div>
                  </div>
                  <div className="item" style={{ backgroundColor: "inherit" }}>
                    <div className="icon-wrapper">
                      <img src={chartIcon} alt="" />
                    </div>
                    <div className="item-detail">
                      <h4>Experience</h4>
                      <p>{getExp(dataPost.experience)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-group">
                <h3>Share Recruitment</h3>
                <div className="row-flex">
                  <p style={{ width: "80%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Copy link: {window.location.href}</p>

                  <div className="button-copy" onClick={() => handleCopyClick()}>
                    <i className="fa fa-clone" aria-hidden="true"></i>
                  </div>
                </div>
                {/* <p>Share with:</p>
                <div className="row-flex justify-start">
                  <img src="https://tse2.mm.bing.net/th?id=OIP.55DCXbXlKDgEBoZhKxpzLAHaHa&pid=Api&P=0" alt="" />
                  <img src="https://clipground.com/images/png-messenger-5.png" alt="" />
                </div> */}
              </div>
            </div>
            <div className="row-space-between">
              <div className="list-left-group">
                <div className="left-group">
                  <h3 style={{ fontWeight: "600" }}>Workplace</h3>
                  <div className="workplace-inpost-detail"> {dataPost.location}</div>
                </div>
                <div className="detail">
                  <h3 style={{ fontSize: "1.2em" }}>Description</h3>
                  <div dangerouslySetInnerHTML={{ __html: dataPost?.description }} style={{ fontSize: "1em" }}></div>
                </div>
                <div className="detail">
                  <h3 style={{ fontSize: "1.2em" }}>Requirement</h3>
                  <div dangerouslySetInnerHTML={{ __html: dataPost?.requirement }} style={{ fontSize: "1em" }}></div>
                </div>
                <div className="detail">
                  <h3 style={{ fontSize: "1.2em" }}>Benefit</h3>
                  <div dangerouslySetInnerHTML={{ __html: dataPost?.benifit }} style={{ fontSize: "1em" }}></div>
                </div>
                <div className="detail">
                  <h3 style={{ fontSize: "1.2em" }}>How to apply</h3>
                  <p style={{ fontSize: "1em" }}>
                    Candidates apply online by clicking <span style={{ color: "#0c62ad" }}>Apply</span> below
                  </p>
                  {role !== "ROLE_EMPLOYER" ? (
                    <div className="group-buttons flex-row">
                      {isSubmited ? (
                        <div
                          className="button"
                          onClick={() => {
                            deleteCvSubmitedClick();
                          }}
                        >
                          <i className="fa fa-undo" aria-hidden="true"></i>
                          UNAPPLY
                        </div>
                      ) : (
                        <div
                          className="button"
                          onClick={() => {
                            applyClick();
                          }}
                        >
                          <i className="fa fa-paper-plane" aria-hidden="true"></i>
                          APPLY
                        </div>
                      )}
                      {isFollowed ? (
                        <div className="button btn-save" aria-hidden="true" onClick={() => savePostClick(id)}>
                          <i className="fa fa-heart" ></i>
                          UNSAVE
                        </div>
                      ) : (
                        <div className="button btn-save" onClick={() => savePostClick(id)}>
                          <i className="fa fa-heart-o" aria-hidden="true" ></i>
                          SAVE
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="post-deadline-submit">Deadline for submission: {getPostDate(dataPost.expirationDate)}</div>
                </div>
              </div>
              <div className="list-right-group">
                <div className="right-group">
                  <h3 style={{ marginLeft: "-10px" }}>Report Recruitment</h3>
                  <p style={{ fontSize: "1em" }}>If you find that this job posting is incorrect or has one of the following symptoms, please report it to us.</p>
                  <img src={questionIcon} alt="" />
                  <div
                    className="button"
                    onClick={() => {
                      reportClick();
                    }}
                  >
                    Report
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2em", fontWeight: 700 }}>Industry</h3>
                  <div className="mark">{dataPost.industry.name}</div>
                  <h3 style={{ fontSize: "1.2em", fontWeight: 700 }}>Area</h3>
                  <div className="mark">{dataPost.city.name}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-footer">
            <h1 style={{ fontSize: "1.4em", fontWeight: "600" }}>
              {dataPost.author.name} information
              <span>
                <a href={`/recruiter/${dataPost.author.id}`}>View company {" >>"}</a>
              </span>
            </h1>

            <div className="row-flex flex-column">
              <div className="item">
                <div className="icon-wrapper">
                  <img src={accIcon} alt="" />
                </div>
                <div className="item-detail">
                  <h4>Company Size</h4>
                  <p>100 people</p>
                </div>
              </div>
              <div className="item">
                <div className="icon-wrapper">
                  <img src={pingIcon} alt="" height='1.6em' />
                </div>
                <div className="item-detail">
                  <h4>Headquarters</h4>
                  <p>{dataPost.author.address}</p>
                </div>
              </div>
            </div>
            <div className="footer-line">
              <img src={workIcon} alt="" />
              <h3 style={{ fontSize: "1.2em", fontWeight: 600 }}>Jobs with the company</h3>
              <span>
                <a href={`/recruiter/${dataPost.author.id}`} style={{ fontSize: "1.2em", color: "#0c62ad" }}>
                  View More
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="form-submit-cv" style={isSubmitFormOpen ? { display: "block" } : { display: "none" }}>
        <div className="form-submit-cv-control">
          <div style={{ display: "flex", justifyContent: "space-between", height: "50px" }}>
            <div className="name-post-submit">{dataPost.title}</div>
            <div>
              <img
                src={addIcon}
                className="close-form-submit"
                alt=""
                onClick={() => {
                  closeFormClick();
                }}
              />
            </div>
          </div>
          <select className="select-submit-cv-form" value={selectValue} onChange={handleSelectChange} disabled={params.mediaId !== undefined}>
            {params.mediaId !== undefined ? (<option value={params.mediaId}>{getResumeName(params.mediaId)}</option>) : (
              <>
                <option value="0">Chose one CV for your submition</option>
                {allResume.length === 0 ? (
                  <option value="-1">You have not uploaded any profile yet</option>
                ) : (
                  allResume.map((r, id) => (
                    <option value={r.mediaId} key={id}>
                      {r.name}
                    </option>
                  ))
                )}
              </>
            )}
          </select>
          <div style={{ display: "flex", height: "30px", fontSize: "1em", color: "#6c6c6c" }}>
            {" * "}Please write a paragraph to introduce yourself so that the employer can get to know you better!
          </div>
          <ReactQuill value={coverLetter} onChange={onChangeCoverletter} />
          <p style={{ color: "#ff453a", fontSize: "1em" }}> {mess}</p>
          <div className="group-buttons flex-row" style={{ display: "flex", justifyContent: "end", marginTop: "1.2em", gap: "1em" }}>
            {allResume.length === 0 ? (
              <div className="button" onClick={() => addCvClick()}>
                <i className="fa fa-file" aria-hidden="true"></i>
                Add Resume
              </div>
            ) : (<>
              {isWaitingRes ? (
                <div className="button-waiting">
                  <WaitingResponeButton />
                </div>
              ) : (
                <div className="button" onClick={() => submitCvClick()} >
                  <i className="fa fa-paper-plane" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}></i>
                  APPLY
                </div>
              )}
            </>)}
            <div
              className="button btn-close"
              onClick={() => {
                closeFormClick();
              }}
            >
              <i className="fa fa-times" aria-hidden="true" style={{ height: "25px", width: "auto", alignItems: 'center', display: 'flex' }}></i>
              CLOSE
            </div>
          </div>
        </div>
      </div>
      <div className="form-submit-cv" style={isReportFormOpen ? { display: "block" } : { display: "none" }}>
        <div className="form-submit-report-control">
          <div style={{ display: "flex", justifyContent: "space-between", height: "50px" }}>
            <div className="name-post-report">{dataPost.title}</div>
            <div>
              <img
                src={addIcon}
                className="close-form-submit"
                alt=""
                onClick={() => {
                  closeFormReport();
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", height: "30px", fontSize: "1em", color: "#6c6c6c" }}>{" * "}Let us know why you're reporting this post.</div>
          <ReactQuill value={reportMessage} onChange={onChangeReportMessage} />
          <p style={{ color: "#ff453a", fontSize: "1em" }}> {mess}</p>
          <div className="group-buttons flex-row" style={{ display: "flex", justifyContent: "end", marginTop: "1.2em", gap: "1em" }}>
            <div className="button" onClick={() => submitReport()}>
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
              SEND
            </div>
            <div
              className="button btn-close"
              onClick={() => {
                closeFormReport();
              }}
            >
              <i className="fa fa-times" aria-hidden="true" style={{ height: "25px", width: "auto" }}></i>
              CLOSE
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetails;
