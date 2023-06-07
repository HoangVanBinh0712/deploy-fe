import { useContext, useEffect, useState, useRef } from "react";
import cameraIcon from "../../assets/picture-banner/camera.png";
import SingleAchivement from "./SingleAchivement";
import WaitingResponeButton from "../../components/WaitingResponeButton";
import { AuthContext } from "../../contexts/AuthContext";
import swal from "sweetalert";


const UserAchievement = () => {
  const { getUserAchive, updateUserAchive, createUserAchive, deleteUserAchive } = useContext(AuthContext);

  const [dataAchive, setDataAchive] = useState([]);
  const [isWaitingRes, setIsWaitingRes] = useState(false)


  const getDataAchive = async () => {
    const responseAchive = await getUserAchive();
    setDataAchive(responseAchive);
  };

  useEffect(() => {
    getDataAchive();
  }, []);

  const [currentAchive, setCurrentAchive] = useState({
    id: "",
    name: "",
    type: "ACTIVITY",
    url: "",
    imageUrl: "",
  });
  const { id, name, type, url, imageUrl } = currentAchive;

  const onChangeAchicve = (event) =>
    setCurrentAchive({
      ...currentAchive,
      [event.target.name]: event.target.value,
    });

  const [image, setImage] = useState(null);

  const fileAchiveInput = useRef(null);

  const handleChangeAvtClick = () => {
    fileAchiveInput.current.click();
  };
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

  const handleChoseFileCover = ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }
    const file = target.files[0];
    fileToBase64(file, (err, result) => {
      if (result) {
        setImage(file);
      }
    });
    setCurrentAchive({
      ...currentAchive,
      imageUrl: URL.createObjectURL(file),
    });
  };

  const childSetCurrentAchive = (childAchive) => {
    console.log(childAchive);
    setCurrentAchive({
      ...currentAchive,
      id: childAchive.id,
      name: childAchive.name,
      type: childAchive.type,
      url: childAchive.url,
      imageUrl: childAchive.imageUrl,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onupdateUserAchiveClick = async (event) => {
    setIsWaitingRes(true)
    const infoData = { name, type, url };
    const imageData = image;
    const response = await updateUserAchive(id, infoData, imageData);
    if (response.success) {
      swal({
        title: "Success",
        icon: "success",
        text: "Updated achivement Successfully!",
        dangerMode: false,
      })
      getDataAchive();
    } else {
      swal({
        title: "Error",
        icon: "warning",
        text: response.message,
        dangerMode: true,
      })
    }
    setIsWaitingRes(false)
  };

  const createNewAchive = async (event) => {
    setIsWaitingRes(true)
    const infoData = { name, type, url };
    const imageData = image;
    if (name.length === 0 || type.length === 0 || url === 0) {
      swal({
        title: "Error",
        icon: "warning",
        text: 'Information cannot be left blank!',
        dangerMode: true,
      })
    }
    else {
      const response = await createUserAchive(infoData, imageData);
      if (response.success) {
        swal({
          title: "Success",
          icon: "success",
          text: "Created achivement Successfully!",
          dangerMode: false,
        })
        getDataAchive();
      } else {
        swal({
          title: "Error",
          icon: "warning",
          text: response.message,
          dangerMode: true,
        })
      }
    }
    setIsWaitingRes(false)
  };

  const onChildDeleteClick = async (idACh) => {
    const confirm = window.confirm("Are you sure you want to delete this Achivement?");
    if (confirm) {
      const response = await deleteUserAchive(idACh);
      if (response.success) {
        swal({
          title: "Success",
          icon: "success",
          text: "Deleted achivement Successfully!",
          dangerMode: false,
        })
        setDataAchive(dataAchive.filter((a) => a.id !== id));
      } else {
        swal({
          title: "Error",
          icon: "warning",
          text: response.message,
          dangerMode: true,
        })
      }
    }
  };

  const onClickDeleteButton = async () => {
    if (id === null) {
      swal({
        title: "Information",
        icon: "info",
        text: "You need to choose an achievement",
        dangerMode: true,
      })
    } else {
      const confirm = window.confirm("Are you sure you want to delete this Achivement?");
      if (confirm) {
        const response = await deleteUserAchive(id);
        if (response.success) {
          swal({
            title: "Success",
            icon: "success",
            text: "Deleted achivement Successfully!",
            dangerMode: false,
          })
          setDataAchive(dataAchive.filter((a) => a.id !== id));
        } else {
          swal({
            title: "Error",
            icon: "warning",
            text: response.message,
            dangerMode: true,
          })
        }
      }
    }
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
        setCurrentAchive({
          ...currentAchive,
          id: "",
          name: "",
          type: "ACTIVITY",
          url: "",
          imageUrl: "",
        })
      }
    });
  };

  return (
    <>
      <div style={{ width: "80%" }}>
        <div className="component-title">
          <span>Achievement</span>
        </div>
        <div className="free-space" id="free-space">
          <div className="content-wrapper">
            <div className="image-wrapper">
              <img src={imageUrl === "" ? cameraIcon : imageUrl} alt="" className="big-icon"></img>
              <div className="uploads">
                <div className="button" onClick={handleChangeAvtClick}>
                  <i className="fa fa-upload" aria-hidden="true"></i>
                  Upload image
                  <input
                    ref={fileAchiveInput}
                    id="file-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={handleChoseFileCover}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="input-wrapper">
              <div className="label">Name</div>
              <input type="text" placeholder="Achievement name" name="name" value={name} onChange={onChangeAchicve}></input>
            </div>
            <div className="row">
              <div className="select">
                <div className="label">Type</div>
                <select name="type" id="" onChange={onChangeAchicve}>
                  <option value="ACTIVITY" selected={type === "ACTIVITY"}>
                    Activity
                  </option>
                  <option value="CERTIFICATE" selected={type === "CERTIFICATE"}>
                    Certificate
                  </option>
                </select>
              </div>
              <div className="input-wrapper">
                <div className="label">Url</div>
                <input type="text" placeholder="URL to your achievement" name="url" value={url} onChange={onChangeAchicve}></input>
              </div>
            </div>

            <div className="group-buttons">
              {isWaitingRes ? (
                <div className="button-waiting">
                  <WaitingResponeButton />
                </div>
              ) : (
                <div className="button" onClick={id === "" ? createNewAchive : onupdateUserAchiveClick}>
                  <i className="fa fa-floppy-o" aria-hidden="true"></i>
                  Confirm
                </div>
              )}
              <div className="button cancel" onClick={onCancelClick}>
                <i className="fa fa-times" aria-hidden="true"></i>
                Cancel
              </div>

              <div className="button delete" onClick={onClickDeleteButton}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
                Delete
              </div>
            </div>
          </div>
          <div className="content-wrapper">
            {dataAchive.length === 0 ? (
              <div className="achivement-item"> You don't have any activities or certificates yet</div>
            ) : (
              dataAchive.map((a) => <SingleAchivement achive={a} onUpdateClick={childSetCurrentAchive} onDeleteClick={onChildDeleteClick} key={a.id} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default UserAchievement;
