import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import SinglePost from "./SinglePostComponent";
import WaitingResponeButton from "../../components/WaitingResponeButton";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

const PredictJob = () => {

  const { getResume, predictResume, } = useContext(AuthContext)
  const { globalState: { industries } } = useContext(GlobalContext)

  const [allResume, setAllResume] = useState([])
  const [currentResumeId, setCurrentResumeId] = useState(-1)
  const [resumePre, SetResumePredict] = useState([])
  const [listPostPre, setListPostPre] = useState([])
  const [listIndustryPre, setlistIndustryPre] = useState([])
  const [isWaitingRes, setIsWaitingRes] = useState(false)

  const navigate = useNavigate()

  const predictCV = async (cvId) => {
    setIsWaitingRes(true)
    const res = await predictResume(cvId)
    if (res.success) {
      SetResumePredict(res.predictResult)
      setListPostPre(res.data);
      setlistIndustryPre(Object.keys(res.predictResult))
      swal({
        title: "Success",
        icon: "success",
        text: "Successfully! Now you can see your predictions for this CV.",
        dangerMode: false,
      })
    }
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
    setIsWaitingRes(false)
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

  const allPost = chuckPosts(listPostPre)

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

  const toPageSearch = (indusName) => {
    const indus = industries.find(item => item.name.toLowerCase() === indusName)
    if (indus !== undefined) navigate(`/posts?industryId=${indus.id}`)
    else swal({
      title: "Error",
      icon: "warning",
      text: 'This industry not found!',
      dangerMode: true,
    })
  }

  let postInResultBox
  if (listPostPre.length > 0) {
    postInResultBox = (<>
      {allPost[currentPage].map((p, id) => (
        <SinglePost post={p} key={id} mediaId={currentResumeId} />
      ))
      }
    </>
    )
  }
  else {
    postInResultBox = (<>
      There are no posts macth!
    </>
    )
  }

  return (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Predict Job</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="content-wrapper">
          <div className="select">
            <div className="label">Resume</div>
            <div className="row-flex">
              <select className="select-resume"
                defaultValue="-1" name="" id=""
                style={{ padding: "0.5em" }}
                onChange={onChangeSelectResume}>
                {allResume.length === 0 ?
                  (<option value="-1">You have not uploaded any profile yet</option>)
                  : (allResume.map((r, id) => (<option value={r.mediaId} key={id}>{r.name}</option>)))}

              </select>
              <div className="group-buttons" style={{ height: '40px', width: '100px' }}>
                {isWaitingRes ? (
                  <div className="button-waiting">
                    <WaitingResponeButton />
                  </div>
                ) : (
                  <div className="button" onClick={predictClick}>
                    <i className="fa fa-list" aria-hidden="true"></i>
                    Predict
                  </div>
                )}

              </div>
            </div>
          </div>

          <div className="predict-result">
            {listIndustryPre.length === 0 ? (
              <div className="single-result" style={{ width: "99%", justifyContent: "space-between" }}>
                <div className="value-text">You need to select a profile to be able to choose to see the predictions</div>
                {allResume.length === 0 ? (<a className="link-to-upload-nohave" href="/user/account/add-resume" style={{ textDecoration: 'none', color: "#0c62ad" }}>UpLoad Now</a>) : ("")}
              </div>) : (listIndustryPre.map((r, id) => (
                <div className="single-result" style={{ width: "32%" }} key={id}>
                  <div className="pipe" onClick={() => toPageSearch(r)} style={{ cursor: 'pointer' }}>
                    <div className="value text-in-value-bar" style={{ width: `${resumePre[r]}`/* , color: "red" */ }}>{r}</div>
                  </div>
                  <div className="value-text">{resumePre[r]}</div>
                </div>)
              ))
            }


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

export default PredictJob;
