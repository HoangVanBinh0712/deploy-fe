import { useContext, useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import logoIcon from "../../assets/picture-banner/logo.png";
import WaitingResponeButton from "../../components/WaitingResponeButton";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import swal from "sweetalert";

const UserPersonalInfo = () => {
  const {
    authState: { user },
    getUser,
    updateUserInfo, setUser
  } = useContext(AuthContext);
  const {
    globalState: { cities, industries },
  } = useContext(GlobalContext);

  const [userInfo, setUserinfor] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    cityId: "1",
    industryId: "1",
    urlCover: null,
    urlAvatar: null,
  });
  const { email, name, phone, address, cityId, industryId, urlCover, urlAvatar } = userInfo;
  const [isUpdate, setIsUpdate] = useState(false)
  const [isWaitingRes, setIsWaitingRes] = useState(false)

  const [description, setDesc] = useState("");
  const handleDescChange = (newValue) => {
    setDesc(newValue);
  };

  const onChangeUserInfo = (event) =>
    setUserinfor({
      ...userInfo,
      [event.target.name]: event.target.value,
    });

  const getUserInfo = async () => {
    const userData = await getUser("user");
    setUserinfor({
      ...userInfo,
      email: userData !== null ? userData.email : "",
      name: userData !== null ? userData.name : "",
      phone: userData.phone !== null ? userData.phone : "",
      address: userData !== null ? userData.address : "",
      cityId: userData.city !== null ? userData.city.id : "1",
      industryId: userData.industry !== null ? userData.industry.id : "1",
      urlCover: userData.urlCover !== null ? userData.urlCover : null,
      urlAvatar: userData.urlAvatar !== null ? userData.urlAvatar : null,
    });
    userData !== null ? setDesc(userData.description) : setDesc("");
  };

  const [userImage, setUserImage] = useState({
    avatar: null,
    cover: null,
  });
  const { avatar, cover } = userImage;

  useEffect(() => {
    getUserInfo();
  }, []);

  const fileAvtInput = useRef(null);
  const fileCoverInput = useRef(null);
  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const handleChangeAvtClick = () => {
    fileAvtInput.current.click();
  };
  const handleChoseFileAvt = ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }
    const file = target.files[0];
    fileToBase64(file, (err, result) => {
      if (result) {
        setUserImage({
          ...userImage,
          avatar: file,
        });
      }
    });
    setUserinfor({
      ...userInfo,
      urlAvatar: URL.createObjectURL(file),
    });
  };

  const handleChangeCoverClick = () => {
    fileCoverInput.current.click();
  };
  const handleChoseFileCover = ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }
    const file = target.files[0];
    fileToBase64(file, (err, result) => {
      if (result) {
        setUserImage({
          ...userImage,
          cover: file,
        });
      }
    });
    setUserinfor({
      ...userInfo,
      urlCover: URL.createObjectURL(file),
    });
  };

  const onUpdateUserClick = async () => {
    setIsWaitingRes(true)
    try {
      const infoData = { email, name, phone, address, cityId, industryId, description };
      const reponseData = await updateUserInfo(infoData, avatar, cover);
      if (reponseData.success) {
        swal({
          title: "Success",
          icon: "success",
          text: "Updated information Successfully!",
          dangerMode: false,
        })
        setUser(reponseData.data)
        setIsUpdate(false)

      } else {
        swal({
          title: "Error",
          icon: "warning",
          text: reponseData.message,
          dangerMode: true,
        })
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
    setIsWaitingRes(false)
  };

  const onCancelClick = () => {
    swal({
      title: "Are you sure you want to cancel?",
      icon: "info",
      text: "The information you changed will not be saved",
      buttons: {
        cancel: "Cancel",
        confirm: "Yes"
      },
    }).then((click) => {
      if (click) {
        getUserInfo();
        setIsUpdate(false)
      }
    });

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

  let body;
  body = (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Profile</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="cover-and-avatar">
          <div
            className="cover"
            id="avatar-user"
            style={
              urlCover !== null
                ? { backgroundImage: `url("${urlCover}")` }
                : { backgroundImage: "url('http://2.bp.blogspot.com/-mIBnH7Yu8t8/T44dEX94J2I/AAAAAAAAEXE/Vzn-4Obtjis/s1600/Love+Facebook+Covers.png')" }
            }
          >
            <div className="button btn-cover background-opacity" onClick={handleChangeCoverClick}>
              <i className="fa fa-upload" aria-hidden="true"></i>
              Upload image
              <input ref={fileCoverInput} id="file-upload" disabled={!isUpdate} type="file" accept=".jpg,.jpeg,.png" style={{ display: "none" }} onChange={handleChoseFileCover} />
            </div>
          </div>
          <div className="avatar-wrapper">
            <div className="avatar">
              <h3>Avatar</h3>
              <img src={urlAvatar !== null ? urlAvatar : logoIcon} alt=""></img>
            </div>
            <div className="uploads">
              <div className="button" onClick={handleChangeAvtClick}>
                <i className="fa fa-upload" aria-hidden="true"></i>
                Upload image
                <input ref={fileAvtInput} id="file-upload" disabled={!isUpdate} type="file" accept=".jpg,.jpeg,.png" style={{ display: "none" }} onChange={handleChoseFileAvt} />
              </div>
              <div className="description">Format for .JPG, .JPEG, .PNG and size is not bigger than 300 KB.</div>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="row">
            <div className="input-wrapper">
              <div className="label">Email</div>
              <input type="email" name="email" value={email} disabled={true}></input>
            </div>
            <div className="input-wrapper">
              <div className="label">Name</div>
              <input type="text" name="name" value={name} disabled={!isUpdate} onChange={onChangeUserInfo}></input>
            </div>
          </div>
          <div className="row">
            <div className="input-wrapper">
              <div className="label">Phone</div>
              <input type="text" name="phone" value={phone} disabled={!isUpdate} onChange={onChangeUserInfo}></input>
            </div>
            <div className="input-wrapper">
              <div className="label">Address</div>
              <input type="text" name="address" value={address} disabled={!isUpdate} onChange={onChangeUserInfo}></input>
            </div>
          </div>
          <div className="text-area-group">
            <div className="label">Description</div>
            <ReactQuill value={description} onChange={handleDescChange} readOnly={!isUpdate} style={{}} />
          </div>
          <div className="double-select">
            <div className="select">
              <div className="label">Location</div>
              <select name="cityId" value={cityId} id="" disabled={!isUpdate} onChange={onChangeUserInfo}>
                {cities.lenght !== 0 ? (
                  cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {removeVietnameseAccents(c.name)}
                    </option>
                  ))
                ) : (
                  <>
                    <option key={""} value="" defaultChecked>
                      Select City Location
                    </option>
                    <option value="">Tp Hồ Chí Minh</option>
                    <option value="">Đà Nẵng</option>
                    <option value="">Hà Nội</option>
                  </>
                )}
              </select>
            </div>
            <div className="select">
              <div className="label">Industry</div>
              <select name="industryId" value={industryId} disabled={!isUpdate} onChange={onChangeUserInfo}>
                {industries.lenght !== 0 ? (
                  industries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option key={""} value="" defaultChecked>
                      Select Industry
                    </option>
                    <option value="">Finance</option>
                    <option value="">Banking</option>
                    <option value="">Social Media</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="group-buttons">
            {isUpdate ? (
              <>
                {isWaitingRes ? (
                  <div className="button-waiting">
                    <WaitingResponeButton />
                  </div>
                ) : (
                  <div className="button" onClick={onUpdateUserClick}>
                    <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    Confirm
                  </div>)}
                <div className="button cancel" onClick={onCancelClick}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                  Cancel
                </div>
              </>
            ) : (
              <div className="button al-content-btn" onClick={() => setIsUpdate(true)}>
                <i className="fa fa-file-text-o" aria-hidden="true" ></i>
                Edit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return <>{body}</>;
};

export default UserPersonalInfo;
