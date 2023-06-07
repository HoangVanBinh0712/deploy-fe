import { useContext, useEffect, useState } from "react";
import SingleRowPost from "./SingleRowPost";
import leftArrow from "../../assets/icons/left-arow-icon.png";
import rightArrow from "../../assets/icons/right-arow-grey-icon.png";
import swal from "sweetalert";
import { PostContext } from "../../contexts/PostContext";

const JobPostingComponent = () => {
  const { getEmpPost } = useContext(PostContext);

  const [filter, setFilter] = useState({
    method: "",
    position: "",
    status: "",
    sortBy: 8,
    sortDescending: true,
  });
  const { method, position, status, sortBy, sortDescending } = filter;
  const [allEmpPost, setAllEmpPost] = useState([]);
  const [postGroups, setPostGroups] = useState([]);
  const [postDisplay, setPostDisplay] = useState([]);

  const getallPost = async (keyword) => {
    const res = await getEmpPost(keyword);
    if (res.success) {
      setAllEmpPost(res.data);
      setPostDisplay(res.data);
      const arr = res.data;
      const statusGroups = arr.reduce((groups, item) => {
        const { status } = item;
        if (!groups[status]) {
          groups[status] = [];
        }
        groups[status].push(item);
        return groups;
      }, {});
      setPostGroups(statusGroups);
    }
  };

  const createSearchPararam = (obj) => {
    let searchQuery = "";
    searchQuery += "?limit=48";
    for (let prop in obj) {
      searchQuery += `&${prop}=${obj[prop]}`;
    }
    return searchQuery;
  };

  useEffect(() => {
    const keyword = createSearchPararam(filter);
    getallPost(keyword);
  }, [filter]);

  const post = postDisplay;

  function chuckPosts(arr, length) {
    const chunks = [];
    let i = 0;
    while (i < arr.length) {
      chunks.push(arr.slice(i, i + length));
      i += length;
    }
    return chunks;
  }

  const allPost = chuckPosts(post, 8);

  const [currentPage, setCurrentPage] = useState(0);

  const toPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const toNextPage = () => {
    if (currentPage < allPost.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toAnyPage = (page) => {
    setCurrentPage(page);
  };

  const onClickAllPost = () => {
    setPostDisplay(allEmpPost);
  };
  const onClickApprovePost = () => {
    if (postGroups.ACTIVE !== undefined) {
      setPostDisplay(postGroups.ACTIVE);
    } else
      swal({
        title: "Error",
        icon: "warning",
        text: "There are no posts in this category!",
        dangerMode: true,
      });
  };
  const onClickPendingPost = () => {
    if (postGroups.WAIT_FOR_ACCEPT !== undefined) {
      setPostDisplay(postGroups.WAIT_FOR_ACCEPT);
    } else
      swal({
        title: "Error",
        icon: "warning",
        text: "There are no posts in this category!",
        dangerMode: true,
      });
  };
  const onClickUnacceptPost = () => {
    if (postGroups.DELETED_BY_ADMIN !== undefined) {
      setPostDisplay(postGroups.DELETED_BY_ADMIN);
    } else
      swal({
        title: "Error",
        icon: "warning",
        text: "There are no posts in this category!",
        dangerMode: true,
      });
  };

  const onChangeSelectPost = (event) => {
    setFilter({
      ...filter,
      status: event.target.value,
    });
  };

  const onChangeSelectPosition = (event) => {
    setFilter({
      ...filter,
      position: event.target.value,
    });
  };

  const onChangeSelectType = (event) => {
    setFilter({
      ...filter,
      method: event.target.value,
    });
  };

  const onClickClearFilter = () => {
    setFilter({
      ...filter,
      method: "",
      position: "",
      status: "",
      sortBy: 8,
      sortDescending: true,
    });
  };
  const onFormSearchChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };
  const deletePost = () => {
    const keyword = createSearchPararam(filter);
    getallPost(keyword);
  };

  return (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Your job posting</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="overal-group-chose">
          <div className="title-group-overal group-manager-post-title">Overall:</div>
          <div
            className="title-group-overal group-manager-post"
            onClick={() => {
              onClickAllPost();
            }}
          >
            <div>
              <p>Total post</p>
              <span style={{ color: "#0c62ad", fontFamily: " Roboto-Medium" }}>{allEmpPost.length}</span>
            </div>
          </div>
          <div
            className="title-group-overal group-manager-post"
            onClick={() => {
              onClickApprovePost();
            }}
          >
            <div>
              <p>Approved</p>
              <span style={{ color: "#0c62ad", fontFamily: " Roboto-Medium" }}>{postGroups.ACTIVE !== undefined ? postGroups.ACTIVE.length : 0}</span>
            </div>
          </div>
          <div
            className="title-group-overal group-manager-post"
            onClick={() => {
              onClickPendingPost();
            }}
          >
            <div>
              <p>Pending</p>
              <span style={{ color: "#0c62ad", fontFamily: " Roboto-Medium" }}>{postGroups.WAIT_FOR_ACCEPT !== undefined ? postGroups.WAIT_FOR_ACCEPT.length : 0}</span>
            </div>
          </div>
          <div
            className="title-group-overal group-manager-post"
            onClick={() => {
              onClickUnacceptPost();
            }}
          >
            <div>
              <p>Denied</p>
              <span style={{ color: "#0c62ad", fontFamily: " Roboto-Medium" }}>{postGroups.DELETED_BY_ADMIN !== undefined ? postGroups.DELETED_BY_ADMIN.length : 0}</span>
            </div>
          </div>
        </div>
        <div className="select-filer-row">
          <div className="select-filer-group">
            <div className="title-filter">Filter:</div>
            <div className="select-item">
              <select onChange={onChangeSelectPost} defaultValue={""}>
                <option value={""} selected={status === ""}>
                  {" "}
                  All post
                </option>
                <option value={"ACTIVE"} selected={status === "ACTIVE"}>
                  {" "}
                  Approved post
                </option>
                <option value={"WAIT_FOR_ACCEPT"} selected={status === "WAIT_FOR_ACCEPT"}>
                  {" "}
                  Pending post
                </option>
                <option value={"DELETED_BY_ADMIN"} selected={status === "DELETED_BY_ADMIN"}>
                  {" "}
                  Denied post
                </option>
              </select>
            </div>
            <div className="select-item">
              <select onChange={onChangeSelectPosition} defaultValue={""}>
                <option value="" selected={position === ""}>
                  All position
                </option>
                <option value="Staff" selected={position === "Staff"}>
                  Staff
                </option>
                <option value="Leader" selected={position === "Leader"}>
                  Leader
                </option>
                <option value="Manager" selected={position === "Manager"}>
                  Manager
                </option>
                <option value="Deputy" selected={position === "Deputy"}>
                  Deputy
                </option>
                <option value="Vice_President" selected={position === "Vice_President"}>
                  Vice president
                </option>
                <option value="Branch_Manager" selected={position === "Branch_Manager"}>
                  Branch manager
                </option>
              </select>
            </div>
            <div className="select-item">
              <select onChange={onChangeSelectType} defaultValue={""}>
                <option value="" selected={method === ""}>
                  Type of work
                </option>
                <option value="FULL_TIME" selected={method === "FULL_TIME"}>
                  Full time
                </option>
                <option value="PART_TIME" selected={method === "PART_TIME"}>
                  Part time
                </option>
                <option value="INTERN" selected={method === "INTERN"}>
                  Intern
                </option>
              </select>
            </div>
            <div className="select-item">
              {/*
               *         &nbsp;&nbsp;&nbsp;&nbsp; 1: by createDate - newest post <br>
               *         &nbsp;&nbsp;&nbsp;&nbsp; 2: by salary <br>
               *         &nbsp;&nbsp;&nbsp;&nbsp; 4: by number of recruit <br>
               *         &nbsp;&nbsp;&nbsp;&nbsp; 8: by number of viewcount <br>
               * */}
              <select name="sortBy" onChange={onFormSearchChange} value={sortBy}>
                <option value="1">Newest</option>
                <option value="2">Salary</option>
                <option value="8">View</option>
              </select>
            </div>
            <div className="select-item">
              <select onChange={onFormSearchChange} name="sortDescending" value={sortDescending} >
                <option value="false">ASC</option>
                <option value="true">DESC</option>
              </select>
            </div>
            <div className="clear-select-item">
              <p onClick={() => onClickClearFilter()}>Clear selection </p>
            </div>
          </div>
          <div className="ex-button" style={{ width: "16%", height: "50px", display: "none" }}>
            <div style={{ marginRight: "20px", justifyContent: "center", display: "flex", width: "100%" }}>Export list</div>
          </div>
        </div>
        <div className="content-wrapper" style={{ height: "580px", padding: "0px", gap: "0" }}>
          <div className="col-title-listpost">
            <div style={{ width: "25px" }}>No.</div>
            <div style={{ width: "30%" }}>Post title</div>
            <div style={{ width: "12%" }}>Create date</div>
            <div style={{ width: "12%" }}>Expiration</div>
            <div style={{ width: "8%", display: "flex", justifyContent: "center" }}>Applied</div>
            <div style={{ width: "8%", display: "flex", justifyContent: "center" }}>Viewed</div>
            <div style={{ width: "10%", display: "flex", justifyContent: "center" }}>State</div>
            <div style={{ width: "8%", display: "flex", justifyContent: "end" }}>Others</div>
          </div>
          {postDisplay.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center" }}> You don't have any posts yet</div>
          ) : (
            allPost[currentPage].map((p, id) => <SingleRowPost post={p} key={id} num={id} resetStatus={deletePost} />)
          )}
        </div>
        <div className="paging-post" style={{ marginTop: "-10px" }}>
          <div className="circle-round" onClick={toPreviousPage}>
            <img src={leftArrow} alt="icon" style={{ height: "95%" }} />
          </div>
          {allPost.map((p, id) => (
            <div
              className="page-num-round"
              onClick={() => {
                toAnyPage(id);
              }}
              key={id}
              style={currentPage === id ? { backgroundColor: "#0c62ad", border: "2px solid #0c62ad" } : { backgroundColor: "#cfcfcf", border: "2px solid #cfcfcf" }}
            ></div>
          ))}
          <div className="circle-round" onClick={toNextPage}>
            <img src={rightArrow} alt="icon" style={{ height: "95%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobPostingComponent;
