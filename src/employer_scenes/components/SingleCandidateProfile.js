import { useEffect, useState } from "react";
import logoPost from "../../assets/icons/logo.png";

const SingleCandidateProfile = ({ data, openClick }) => {
  const initCandidate = {
    url: "",
    name: "",
    workExperiences: "",
    skillsAndKnowledges: "",
    user: {
      id: 0,
      email: "",
      emailConfirm: false,
      name: "",
      phone: "",
      city: {
        id: 0,
        name: "",
      },
      industry: {
        id: 0,
        name: "",
      },
    },
  };
  const [candidateInfo, setCandidateInfo] = useState(initCandidate);

  useEffect(() => {
    const candidateData = {
      url: data.url,
      name: data.name,
      workExperiences: data.workExperiences,
      skillsAndKnowledges: data.skillsAndKnowledges,
      lastModified: data.lastModified,
      method: data.method,
      position: data.position,
      experience: data.experience,
      user: {
        id: data.user.id,
        email: data.user.email,
        emailConfirm: data.user.emailConfirm,
        name: data.user.name,
        phone: data.user.name,
        city: data.user.city,
        industry: data.user.industry,
        urlAvatar: data.user.urlAvatar
      },
    };

    setCandidateInfo(candidateData);
  }, []);

  const onClickImagePost = (empId) => {
    window.open(`/employer/candidates/${empId}`, "_blank");
  };

  const onClickProfileBtn = (candidateInfo) => {
    openClick(candidateInfo);
  };

  const onClickCvTitle = (url) => {
    window.open(url, "_blank");
  };

  const getTypeJob = (type) => {
    if (type === "FULL_TIME") return "Full time";
    if (type === "PART_TIME") return "Part time";
    if (type === "INTERN") return "Intern";
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

  return (
    <div className="cart">
      <img
        className="avatar"
        src={candidateInfo.user.urlAvatar === null ? logoPost : candidateInfo.user.urlAvatar}
        alt=""
        onClick={() => {
          onClickImagePost(candidateInfo.user.id);
        }}
      />
      <div className="cart-info">
        <div className="gr-name-btn-view">
          <div>
            <p className="title" onClick={() => onClickImagePost(candidateInfo.user.id)} style={{ color: "#0c62ad" }}>
              {candidateInfo.user.name}
            </p>
          </div>
          <div className="btn-view" onClick={() => onClickProfileBtn(candidateInfo)}>
            View profile
          </div>
        </div>
        <div className="cart-description-profile" style={{ cursor: "pointer" }} onClick={() => onClickCvTitle(candidateInfo.url)}>
          <i className="fa fa-file-text-o" aria-hidden="true" style={{ margin: "0 5px", color: "#0c62ad" }}></i>
          {candidateInfo.name} - <small style={{ fontSize: "1em", color: "black" }}>Last modified: {getPostDate(candidateInfo.lastModified)}</small>
        </div>
        <div className="row-flex-horizon flex-wrap">
          <div className="list-item-flex-start">
            <div className="item">
              <p>{getExpUser(candidateInfo.experience)}</p>
            </div>
            <div className="item">
              <p>Position: {candidateInfo.position}</p>
            </div>
            <div className="item">
              <p>{getTypeJob(candidateInfo.method)}</p>
            </div>
            <div className="item">
              <p>{candidateInfo.user.city !== null ? candidateInfo.user.city.name : "Location: Not update"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCandidateProfile;
