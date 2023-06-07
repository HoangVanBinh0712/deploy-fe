import roundheartIcon from "../../assets/icons/round-heart-icon.png"
import heartIcon from "../../assets/icons/heart-icon.png"
import logoPost from "../../assets/icons/logo-company.png"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const SinglePost = ({ post, mediaId }) => {

  const { authState: { authloading, role } } = useContext(AuthContext)
  const { postState: { postFollow }, followPost, unfollowPost, } = useContext(PostContext)


  const aPost = post
  const navigate = useNavigate();

  const onClickImagePost = (empId) => {
    window.open(`/recruiter/${empId}`)
  }

  const onClickPostTitle = (postId) => {
    if (mediaId > 0)
      window.open(`/post/${postId}?mediaId=${mediaId}`)
    else
      window.open(`/post/${postId}`)
  }

  function getDaysDiff(date) {
    const oneDay = 24 * 60 * 60 * 1000; // số miligiây trong 1 ngày
    const currentDate = new Date();
    const inputDate = new Date(date);
    const diffDays = Math.round(Math.abs((currentDate - inputDate) / oneDay));
    return diffDays;
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
      <img className="avatar"
        style={{ border: 'none', padding: '0' }}
        src={aPost.author.urlAvatar === null ? logoPost : aPost.author.urlAvatar}
        alt=""
        onClick={() => { onClickImagePost(aPost.author.id) }} />
      <div className="cart-info">
        <p className="title" onClick={() => onClickPostTitle(aPost.id)}>{aPost.title}</p>
        <div className="cart-description">
          {aPost.author.name}
        </div>
        <div className="row-flex-horizon flex-wrap">
          <div className='list-item-flex-start'>
            <div className="item">
              <p>{aPost.salary !== null ? aPost.salary : ''}{aPost.currency}</p>
            </div>
            <div className="item">
              <p>{removeVietnameseAccents(aPost.city.name)}</p>
            </div>
            <div className="item">
              <p>{getDaysDiff(aPost.createDate)} days ago</p>
            </div>
            <div className="item">
              <p>{getDaysDiff(aPost.expirationDate)} days left</p>
            </div>
          </div>
          <div style={role !== "ROLE_EMPLOYER" ? { display: 'block' } : { display: 'none' }} className='follow-post-in-search-page'
            onClick={() => { heartClick(aPost.id) }}>
            {checkFollow(aPost.id, postFollow) ? (<img src={heartIcon} alt='' style={{ height: '100%', width: 'auto' }} />)
              : (<img src={roundheartIcon} alt='' style={{ height: '100%', width: 'auto' }} />)}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SinglePost;
