import SingleUser from "./SingleUserComponent";
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/Toast';

const ResumeViewer = () => {

  const { getResume, getEmpViewCv, } = useContext(AuthContext)
  const { warn, success } = useToast();

  const [allResume, setAllResume] = useState([])
  const [currentResumeId, setCurrentResumeId] = useState(-1)
  const [allEmployer, setAllEmployer] = useState([])

  const getAllEmployer = async (mediaId) => {
    const res = await getEmpViewCv(mediaId)
    if (res.success) {
      setAllEmployer(res.data);
    }
    else warn(res.message)
  }

  const getAllResume = async () => {
    const res = await getResume()
    if (res.success) {
      setAllResume(res.data);
      if (res.data.length !== 0) setCurrentResumeId(res.data[0].mediaId)
    }
  }

  function chuckArray(arr) {
    const chunks = [];
    let i = 0;
    while (i < arr.length) {
      chunks.push(arr.slice(i, i + 6));
      i += 6;
    }
    return chunks;
  }

  const allEmp = chuckArray(allEmployer)

  const [currentPage, setCurrentPage] = useState(0)

  const toPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  const toNextPage = () => {
    if (currentPage < allEmp.length - 1) {
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

  const viewClick = () => {
    getAllEmployer(currentResumeId)
  }

  let postInResultBox
  if (allEmployer.length > 0) {
    postInResultBox = (<>
      {allEmp[currentPage].map((emp, id) => (
        <SingleUser user={emp} refeshEmp={()=>getAllEmployer()} key={id} />
      ))
      }
    </>
    )
  }
  else {
    postInResultBox = (<>
      No employer has viewed your cv yet !
    </>)
  }

  return (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Resume viewer</span>
      </div>
      <div className="free-space" id="free-space" style={{justifyContent:'normal'}}>
        <div className="content-wrapper">
          <div className="select">
            <div className="label">Resume</div>
            <div style={{color:'#6c6c6c', fontSize:'20px', marginBottom:'5px'}}>Please select your CV to see how many employers have seen your resume</div>
            <div className="row-flex">
              <select className="select-resume" name="" id=""
                onChange={onChangeSelectResume}>
                {allResume.length === 0 ?
                  (<option value="-1">You have not uploaded any profile yet</option>)
                  : (allResume.map((r, id) => (<option value={r.mediaId} key={id}>{r.name}</option>)))}
              </select>
              <div className="group-buttons">
                <div className="button" onClick={()=>viewClick()}>
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
            {allEmp.map((p, id) => (
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

export default ResumeViewer;
