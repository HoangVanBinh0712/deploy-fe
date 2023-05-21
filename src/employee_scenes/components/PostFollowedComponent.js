import SinglePost from "./SinglePostComponent";
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import { useState, useContext } from 'react';
import { PostContext } from "../../contexts/PostContext";

const PostFollowed = () => {
  const { postState: { postFollow }, } = useContext(PostContext)

  function chuckPosts(arr) {
    const chunks = [];
    let i = 0;
    while (i < arr.length) {
      chunks.push(arr.slice(i, i + 3));
      i += 3;
    }
    return chunks;
  }

  const allPost = chuckPosts(postFollow)

  const [currentPage, setCurrentPage] = useState(0)

  const toPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  const toNextPage = () => {
    if (currentPage < allPost.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const toAnyPage = (page) => {
    setCurrentPage(page)
  }
  let postInResultBox
  if (postFollow.length > 0) {
    postInResultBox = (<>
      {allPost[currentPage].map((p, id) => (
        <SinglePost post={p} key={id} />
      ))
      }
    </>
    )
  }
  else {
    postInResultBox = (<>
      Select your profile to view your submition.
    </>)
  }

  return (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Post followed</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="content-wrapper">
          {postInResultBox}
          <div className="paging-post" style={{ marginTop: '15px' }}>
            <div className="circle-round" onClick={toPreviousPage}>
              <img src={leftArrow} alt='icon' />
            </div>
            {allPost.map((p, id) => (
              <div className="page-num-round" onClick={() => { toAnyPage(id) }} key={id}
                style={currentPage === id ? { backgroundColor: "#0c62ad", border: "2px solid #0c62ad" } : { backgroundColor: "#cfcfcf", border: "2px solid #cfcfcf" }}
              >

              </div>
            ))}
            <div className="circle-round" onClick={toNextPage}>
              <img src={rightArrow} alt='icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFollowed;
