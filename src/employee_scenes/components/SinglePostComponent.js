import roundheartIcon from "../../assets/icons/round-heart-icon.png"
import heartIcon from "../../assets/icons/heart-icon.png"
import logoPost from "../../assets/icons/logo.png"
import { useToast } from "../../contexts/Toast";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";

const SinglePost = ({ post }) => {

  const { authState: { authloading, role } } = useContext(AuthContext)
  const { postState: { postFollow }, followPost, unfollowPost, } = useContext(PostContext)
  const { warn, success } = useToast()

  const aPost = post

  const onClickImagePost = (empId) => {
    window.location.href = `/recruiter/${empId}`
  }

  const onClickPostTitle = (postId) => {
    window.location.href = `/post/${postId}`
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
      window.location.href = 'user/login'
    }
    else {
      if (role === "ROLE_USER") {
        if (checkFollow(id, postFollow)) {
          const res = await unfollowPost(id)
          if (res.success) {
            success('The post has been removed from the favorites list.')
          }
          else warn(res.message)
        }
        else {
          const res = await followPost(id)
          if (res.success) {
            success('The article has been added to favorites.')
          }
          else warn(res.message)
        }
      }
    }
  }


  return (
    <div className="cart">
      <img className="avatar"
      style={{border:'none', padding:'0'}}
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
              <p>{aPost.location}</p>
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
