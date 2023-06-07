import SingleUser from "./SingleUserComponent";
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import SinglePost from "./SinglePostComponent";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import swal from "sweetalert";

const RecruiterFollowed = () => {


  const { getEmpFollow } = useContext(AuthContext)

  const [allEmployer, setAllEmployer] = useState([])


  const getAllEmployer = async () => {
    const res = await getEmpFollow()
    if (res.status===200) {
      setAllEmployer(res.data);
    }
    else swal({
      title: "Error",
      icon: "warning",
      text: res.message,
      dangerMode: true,
    })
  }

  function chuckPosts(arr) {
    const chunks = [];
    let i = 0;
    while (i < arr.length) {
      chunks.push(arr.slice(i, i + 6));
      i += 6;
    }
    return chunks;
  }

  const allEmp = chuckPosts(allEmployer)

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
    getAllEmployer()
  }, [])

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
      You have not followed any employers yet, follow employers to receive the earliest information.
    </>)
  }

  return (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Recruiter followed</span>
      </div>
      <div className="free-space" id="free-space" style={{justifyContent:'normal'}}>
        <div className="content-wrapper">
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

export default RecruiterFollowed;
