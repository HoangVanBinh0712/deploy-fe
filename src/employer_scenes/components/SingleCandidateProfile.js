import { useContext, useEffect, useState } from "react";
import logoPost from "../../assets/icons/logo.png";
import { AuthContext } from "../../contexts/AuthContext";

const SingleCandidateProfile = ({ data, openClick }) => {

  const { viewProfileJSK } = useContext(AuthContext)
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
      mediaId: data.mediaId,
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
  }, [data]);

  const onClickImagePost = (empId) => {
    window.open(`/employer/candidates/${empId}`, "_blank");
  };

  const onClickProfileBtn = (candidateInfo) => {
    openClick(candidateInfo);
  };

  const onClickCvTitle = async (url, userId, mediaId) => {
    viewProfileJSK(userId, mediaId)
    window.open(url, "_blank");
  }

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

  const removeVietnameseAccents = (str) => {
    const map = {
      'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
      'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
      'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
      'đ': 'd',
      'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
      'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
      'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
      'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
      'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
      'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
      'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
      'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
      'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
      'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
      'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
      'Đ': 'D',
      'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
      'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
      'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
      'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
      'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
      'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
      'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
      'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
      'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y'
    };

    return str.replace(/[^A-Za-z0-9]/g, function (x) {
      return map[x] || x;
    });
  }

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
            <p className="title" onClick={() => onClickCvTitle(candidateInfo.url, candidateInfo.user.id, candidateInfo.mediaId)} style={{ color: "#0c62ad" }}>
              {candidateInfo.name}
            </p>
          </div>
          <div className="btn-view" onClick={() => onClickProfileBtn(candidateInfo)}>
            View profile
          </div>
        </div>
        <div className="cart-description-profile" style={{ cursor: "pointer" }}
          onClick={() => onClickImagePost(candidateInfo.user.id)}>
          <i className="fa fa-file-text-o" aria-hidden="true" style={{ margin: "0 5px", color: "#0c62ad" }}></i>
          {candidateInfo.user.name} - <small style={{ fontSize: "1em", color: "black", fontWeight:400 }}>Last modified: {getPostDate(candidateInfo.lastModified)}</small>
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
              <p>{candidateInfo.user.city !== null ?removeVietnameseAccents(candidateInfo.user.city.name) : "Location: Not update"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCandidateProfile;
