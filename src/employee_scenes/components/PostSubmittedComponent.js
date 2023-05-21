import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import SinglePost from "./SinglePostComponent";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/Toast';

const PostSubmitted = () => {

  const { getResume, getPostSubmitedByResume, } = useContext(AuthContext)
  const { warn, success } = useToast();

  const [allResume, setAllResume] = useState([])
  const [currentResumeId, setCurrentResumeId] = useState(-1)
  const [listPostSubmited, setListPostSubmited] = useState([])

  const predictCV = async (cvId) => {
    const res = await getPostSubmitedByResume(cvId)
    if (res.success) {
      setListPostSubmited(res.data);
    }
    else {
      setListPostSubmited([]);
      warn("*Your profile has not applied for any jobs yet")
    } 
  }

  const getAllResume = async () => {
    const res = await getResume()
    if (res.success) {
      setAllResume(res.data);
      if (res.data.length !== 0) setCurrentResumeId(res.data[0].mediaId)
    }
  }

  function chuckPosts(arr) {
    const chunks = [];
    let i = 0;
    while (i < arr.length) {
      chunks.push(arr.slice(i, i + 3));
      i += 3;
    }
    return chunks;
  }

  const allPost = chuckPosts(listPostSubmited)

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

  useEffect(() => {
    getAllResume()
  }, [])

  const onChangeSelectResume = (event) => {
    setCurrentResumeId(event.target.value)
  }

  const predictClick = () => {
    predictCV(currentResumeId)
  }

  let postInResultBox
  if (listPostSubmited.length > 0) {
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
        <span>Post submitted</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="content-wrapper">
          <div className="select">
            <div className="label">Resume</div>
            <div className="row-flex">
              <select className="select-resume"
                onChange={onChangeSelectResume}>
                {allResume.length === 0 ?
                  (<option value="-1">You have not uploaded any profile yet</option>)
                  : (allResume.map((r, id) => (<option value={r.mediaId} key={id}>{r.name}</option>)))}
              </select>
              <div className="group-buttons">
                <div className="button" onClick={() => predictClick()}>
                  <i className="fa fa-list" aria-hidden="true"></i>
                  View
                </div>
              </div>
            </div>
          </div>
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

export default PostSubmitted;
