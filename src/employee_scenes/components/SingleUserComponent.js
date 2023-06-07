import { useContext, useEffect, useState } from "react";
import logoIcon from "../../assets/picture-banner/logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import swal from "sweetalert";

const SingleUser = ({ user, refeshEmp }) => {

  const { getEmpFollow, followEmp, unFollowEmp } = useContext(AuthContext)

  const emp = user

  const [listEmpFollow, setList] = useState([])

  const getAllEmployer = async () => {
    const res = await getEmpFollow()
    if (res.status === 200) {
      setList(res.data);
    }
  }
  console.log(user,emp,emp.user);
  useEffect(() => {
    getAllEmployer()
  }, [])

  function getTimeAgo(time) {
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    const inputTime = new Date(time).getTime();
    const currentTime = new Date().getTime();
    const timeAgo = (currentTime - inputTime) / 1000;

    if (timeAgo < minute) {
      const seconds = Math.floor(timeAgo / 1000);
      return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    } else if (timeAgo < hour) {
      const minutes = Math.floor(timeAgo / minute);
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (timeAgo < day) {
      const hours = Math.floor(timeAgo / hour);
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (timeAgo < month) {
      const days = Math.floor(timeAgo / day);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (timeAgo < year) {
      const months = Math.floor(timeAgo / month);
      return `${months} month${months === 1 ? "" : "s"} ago`;
    } else {
      const years = Math.floor(timeAgo / year);
      return `${years} year${years === 1 ? "" : "s"} ago`;
    }
  }

  const checkFollow = (id, arr) => {
    const index = arr.findIndex(e => e.user?.id === id);
    if (index !== -1) return true
    else return false
  }

  const onClickHeart = async (id) => {
    if (checkFollow(id, listEmpFollow)) {
      const res = await unFollowEmp(emp.user.id)
      if (res.success) {
        swal({
          title: "Success",
          icon: "success",
          text: "The post has been removed from the favorites list.",
          dangerMode: false,
        })
        refeshEmp()
      }
      else swal({
        title: "Error",
        icon: "warning",
        text: res.message,
        dangerMode: true,
      })
    }
    else {
      const res = await followEmp(emp.user.id)
      if (res.success) {
        swal({
          title: "Success",
          icon: "success",
          text: "The post has been added to the favorites list.",
          dangerMode: false,
        })
        refeshEmp()
      }
      else swal({
        title: "Error",
        icon: "warning",
        text: res.message,
        dangerMode: true,
      })
    }
  }

  const onClickEmp = (empId) => {
    window.location.href = `/recruiter/${empId}`
  }

  return (
    <div className="cart">
      <img className="avatar"
        style={{ height: '100px', width: '100px', padding: '0' }}
        src={emp.user.urlAvatar!==null ? emp.user.urlAvatar : logoIcon} alt=""
        onClick={() => onClickEmp(emp.user.id)}
      >
      </img>
      <div className="cart-info" style={{ display: '-webkit-box' }}>
        <div style={{ width: '83%', display: 'flex', alignItems: 'center' }}>
          <div>
            <p className="title" style={{ color: "#0c62ad" }} onClick={() => onClickEmp(emp.user.id)}>
              {emp.user.name}
              <i className="fa fa-check-circle-o" aria-hidden="true" style={{ marginLeft: '10px', color: '#0c62ad' }}></i>
            </p>
            <div className="cart-description" style={{ marginTop: '20px' }}>
              {emp.user.address}
            </div>
          </div>
        </div>
        <div style={{ width: '15%', display: 'grid' }}>
          <div>
            {getTimeAgo(emp.date)}
          </div>
          <div className="row-flex" style={{ justifyContent: 'end', color: ' #0c62ad' }}>
            {checkFollow(emp.user.id, listEmpFollow) ? (
              <i className="fa fa-heart" aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => onClickHeart(emp.user.id)}></i>)
              : (
                <i className="fa fa-heart-o" aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => onClickHeart(emp.user.id)}></i>
              )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
