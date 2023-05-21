import { useContext, useEffect, useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import logoIcon from "../../assets/picture-banner/logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useToast } from "../../contexts/Toast";

const EmployerInfo = () => {

  const { authState: { user }, getUser, updateEmpInfo } = useContext(AuthContext)
  const { globalState: { cities, industries } } = useContext(GlobalContext)
  const { warn, success } = useToast();

  const [userInfo, setUserinfor] = useState({
    email: user !== null ? user.email : "",
    name: user !== null ? user.name : "",
    phone: user !== null ? user.phone : '',
    address: user !== null ? user.address : "",
    cityId: user !== null ? user.city.id : '',
    industryId: user !== null ? user.industry.id : "",
    urlCover: user !== null ? user.urlCover : null,
    urlAvatar: user !== null ? user.urlAvatar : null,
  })
  const { email, name, phone, address, cityId, industryId, urlCover, urlAvatar } = userInfo

  const [desc, setDesc] = useState('');
  const handleDescChange = (newValue) => {
    setDesc(newValue);
  }

  const onChangeUserInfo = (event) =>
    setUserinfor({
      ...userInfo,
      [event.target.name]: event.target.value,
    });

  const getUserInfo = async () => {
    const userData = await getUser('employer');
    setUserinfor({
      ...userInfo,
      email: userData !== null ? userData.email : "",
      name: userData !== null ? userData.name : "",
      phone: userData !== null ? userData.phone : '',
      address: userData !== null ? userData.address : "",
      cityId: userData !== null ? userData.city.id : '',
      industryId: userData !== null ? userData.industry.id : "",
      urlCover: userData !== null ? userData.urlCover : null,
      urlAvatar: userData !== null ? userData.urlAvatar : null,
    })
    userData !== null ? setDesc(userData.description) : setDesc("")

  }

  const [userImage, setUserImage] = useState({
    avatar: null,
    cover: null,
  })
  const { avatar, cover } = userImage

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
      urlAvatar: URL.createObjectURL(file)
    })
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
      urlCover: URL.createObjectURL(file)
    })
  };

  const onUpdateUserClick = async (event) => {
    try {
      const infoData = { email, name, phone, address, cityId, industryId, description:desc }
      const reponseData = await updateEmpInfo(infoData, avatar, cover)
      if (reponseData.success) {
        success('Update information successfully!')
      }
      else {
        warn(reponseData.message)
      }

    }
    catch (error) {
      if (error.response) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  }

  const onCancelClick = () => {
    const confirm = window.confirm("Are you sure you want to cancel, the information you changed will not be saved?");
    if (confirm) {
      getUserInfo()
    }
  }

  let body
  body = (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Profile</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="cover-and-avatar">
          <div className="cover" id="avatar-user" style={urlCover !== null ? { backgroundImage: `url("${urlCover}")` }
            : { backgroundImage: "url('http://2.bp.blogspot.com/-mIBnH7Yu8t8/T44dEX94J2I/AAAAAAAAEXE/Vzn-4Obtjis/s1600/Love+Facebook+Covers.png')" }}>
            <div className="button btn-cover background-opacity" onClick={handleChangeCoverClick}>
              <i className="fa fa-upload" aria-hidden="true"></i>
              Upload image
              <input
                ref={fileCoverInput}
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={handleChoseFileCover}
              />
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
                <input
                  ref={fileAvtInput}
                  id="file-upload"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  style={{ display: "none" }}
                  onChange={handleChoseFileAvt}
                />
              </div>
              <div className="description">
                Format for .JPG, .JPEG, .PNG and size is not bigger than 300 KB.
              </div>
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
              <input type="text" name="name" value={name} onChange={onChangeUserInfo}></input>
            </div>
          </div>
          <div className="row">
            <div className="input-wrapper">
              <div className="label">Phone</div>
              <input type="text" name="phone" value={phone} onChange={onChangeUserInfo}></input>
            </div>
            <div className="input-wrapper">
              <div className="label">Address</div>
              <input type="text" name="address" value={address} onChange={onChangeUserInfo}></input>
            </div>
          </div>
          <div className="text-area-group">
            <div className="label">Description</div>
            <ReactQuill value={desc} onChange={handleDescChange} style={{}} />
          </div>
          <div className="double-select">
            <div className="select">
              <div className="label">Location</div>
              <select name="city" id="" onChange={onChangeUserInfo}>
                {cities.lenght !== 0 ?
                  (cities.map((c) => (
                    <option key={c.id} value={c.id} selected={cityId === c.id}>
                      {c.name}
                    </option>
                  )))
                  : (<>
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
              <select name="industry" id="" onChange={onChangeUserInfo}>
                {industries.lenght !== 0 ?
                  (industries.map((c) => (
                    <option key={c.id} value={c.id} selected={industryId === c.id}>
                      {c.name}
                    </option>
                  )))
                  : (<>
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
            <div className="button" onClick={onUpdateUserClick}>
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
              Confirm
            </div>
            <div className="button cancel" onClick={onCancelClick}>
              <i className="fa fa-times" aria-hidden="true"></i>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {body}
    </>
  );
};

export default EmployerInfo;
