import "../css/search-page.css";
import TopBar from "../../components/global/TopBar";
import Footer from "../../components/global/Footer";
import bannerSearch from "../../assets/picture-banner/banner-search.png";
import roundheartIcon from "../../assets/icons/round-heart-icon.png";
import heartIcon from "../../assets/icons/heart-icon.png";
import updPic from "../../assets/picture-banner/update-cv.png";
import logoPost from "../../assets/icons/logo-company.png";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import swal from "sweetalert";
import Paging from "./PagingComponent";
import axios from "axios";
import { apiUrl } from "../../contexts/Constants";

const SearchPageComponent = () => {
  const {
    authState: { authloading, role },
  } = useContext(AuthContext);
  const {
    postState: { postFollow, postMostView },
    getPostByAnyFilter,
    followPost,
    unfollowPost,
  } = useContext(PostContext);
  const {
    globalState: { cities, industries },
  } = useContext(GlobalContext);

  const [searchParams, setSearchParams] = useSearchParams();
  // single-time read
  const params = Object.fromEntries([...searchParams]);
  /**
   * listPostResult
   * currentPage
   * data: []
   * limit
   * totalPage
   * success
   * message
   */
  const [listPostResult, setListPostResult] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  const [searchInfo, setSearchInfo] = useState({
    keyword: "",
    minSalary: "",
    method: "",
    position: "",
    experience: "",
    gender: "",
    startDate: "",
    industryId: "",
    cityId: "",
    sortBy: 1,
    sortDescending: true,
    limit: 12,
    page: 1,
  });
  const { minSalary, method, position, experience, gender, startDate, sortBy, sortDescending, limit, page, keyword, cityId, industryId } = searchInfo;

  const createSearchParam = (obj) => {
    let searchQuery = "";
    for (let prop in obj) {
      if (obj[prop]) {
        if (prop === "minSalary") {
          if (searchQuery.length === 0) searchQuery += `?min-salary=${obj[prop]}`;
          else searchQuery += `&min-salary=${obj[prop]}`;
        } else {
          if (searchQuery.length === 0) searchQuery += `?${prop}=${obj[prop]}`;
          else searchQuery += `&${prop}=${obj[prop]}`;
        }
      }
    }

    return searchQuery;
  };

  const getPostSearch = async (searchQR) => {
    setIsSearched(true);
    const res = await getPostByAnyFilter(searchQR);
    if (res.success) {
      setListPostResult(res);
    } else
      swal({
        title: "Error",
        icon: "warning",
        text: res.message,
        dangerMode: true,
      });
  };
  async function getData() {
    const res = await axios.get(`${apiUrl}/post?page=${page}&limit=${limit}`);
    if (res.data.success) {
      setListPostResult(res.data);
    }
  }

  const setBeginSearchInfo = (params) => {
    setSearchInfo({
      ...searchInfo,
      keyword: params.keyword !== undefined ? params.keyword : '',
      cityId: params.cityId !== undefined ? params.cityId : '',
      industryId: params.industryId !== undefined ? params.industryId : '',
    })
  }

  useEffect(() => {
    setBeginSearchInfo(params)
    getData();
  }, []);

  useEffect(() => {
    //Filter here
    const searchQuery = createSearchParam(searchInfo);
    getPostSearch(searchQuery);
  }, [searchInfo.page, searchInfo.limit, searchInfo.sortBy, searchInfo.sortDescending, searchInfo.minSalary, searchInfo.method,
  searchInfo.position,searchInfo.experience, searchInfo.gender, searchInfo.startDate]);

  const onClickSearch = () => {
    const searchQuery = createSearchParam(searchInfo);
    getPostSearch(searchQuery);
  };

  function padZero(number) {
    return number.toString().padStart(2, "0");
  }

  function getPastDate(days) {
    const today = new Date();
    const pastDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    const formatDate = `${pastDate.getFullYear()}-${padZero(pastDate.getMonth() + 1)}-${padZero(pastDate.getDate())}`;
    return formatDate;
  }
  const onFormSearchChange = (e) => {
    setSearchInfo({
      ...searchInfo,
      [e.target.name]: e.target.value,
    });
  };
  const setCurrentPage = (page) => {
    if (page >= 1 && page <= listPostResult.totalPage)
      setSearchInfo({
        ...searchInfo,
        page: page,
      });
  };

  const onClickClearSelection = () => {
    setSearchInfo({
      ...searchInfo,
      experience: "",
      minSalary: "",
      position: "",
      method: "",
      startDate: "",
      gender: "",
      sortBy: 1,
      sortDescending: true,
      limit: 12,
      page: 1,
      cityId: "",
      industryId: "",
      keyword: "",
    });
    getData();
  };

  const onClickUpdateProfile = () => {
    if (!authloading && role === "ROLE_USER") {
      navigate("/user/account/add-resume")
    } else if (!authloading && role === "ROLE_USER") {
      navigate("/employer/account")
    } else {
      navigate("/user/login");
    }
  };

  const checkFollow = (id, arr) => {
    const index = arr.findIndex((post) => post.id === id);
    if (index !== -1) return true;
    else return false;
  };

  function getDaysDiff(date) {
    const oneDay = 24 * 60 * 60 * 1000; // số miligiây trong 1 ngày
    const currentDate = new Date();
    const inputDate = new Date(date);
    const diffDays = Math.round(Math.abs((currentDate - inputDate) / oneDay));
    return diffDays;
  }

  const heartClick = async (id) => {
    if (authloading) {
      navigate("/user/login");
    } else {
      if (role === "ROLE_USER") {
        if (checkFollow(id, postFollow)) {
          const res = await unfollowPost(id);
          if (res.success) {
            swal({
              title: "Success",
              icon: "success",
              text: "The post has been removed from the favorites list.",
              dangerMode: false,
            });
          } else
            swal({
              title: "Error",
              icon: "warning",
              text: res.message,
              dangerMode: true,
            });
        } else {
          const res = await followPost(id);
          if (res.success) {
            swal({
              title: "Success",
              icon: "success",
              text: "The post has been added to the favorites list.",
              dangerMode: false,
            });
          } else
            swal({
              title: "Error",
              icon: "warning",
              text: res.message,
              dangerMode: true,
            });
        }
      }
    }
  };

  const onClickImagePost = (empId) => {
    navigate(`/recruiter/${empId}`);
  };

  const onClickPostTitle = (postId) => {
    navigate(`/post/${postId}`);
  };

  const getTypeJob = (type) => {
    if (type === "FULL_TIME") return "Full time";
    if (type === "PART_TIME") return "Part time";
    if (type === "INTERN") return "Intern";
  };

  const getPostDate = (date) => {
    const myDate = new Date(date);
    const day = ("0" + myDate.getDate()).slice(-2);
    const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    const year = myDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

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
    <>
      <TopBar />

      <div className="search-page">
        <img className="banner" src={bannerSearch} alt="" />
        <div className="search-bar">
          <div className="row-flex-horizon" style={{ marginBottom: "1em" }}>
            <input className="search-text" type="text" placeholder="Job title, position you want ..." value={keyword} name="keyword" onChange={onFormSearchChange} />
            <select className="search-select option-select-page-search" name="industryId" value={industryId} onChange={onFormSearchChange}>
              <option value="">All industries</option>
              {industries.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
            <select className="search-select option-select-page-search" name="cityId" value={cityId} onChange={onFormSearchChange}>
              <option value="">All areas</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {removeVietnameseAccents(c.name)}
                </option>
              ))}
            </select>

            <div
              className="button styling-btn-search"
              onClick={() => {
                onClickSearch();
              }}
            >
              <i className="fa fa-search" aria-hidden="true"></i>
              Search
            </div>
          </div>
          <div className="row-flex-horizon row-filter">
            <select className="search-select blue-border-select" name="experience" onChange={onFormSearchChange}>
              <option value="" selected={experience === ""}>
                All experience
              </option>
              <option value="NONE" selected={experience === "NONE"}>
                None
              </option>
              <option value="UNDER_ONE_YEAR" selected={experience === "UNDER_ONE_YEAR"}>
                Under one year
              </option>
              <option value="ONE_YEAR" selected={experience === "ONE_YEAR"}>
                One year
              </option>
              <option value="TWO_YEAR" selected={experience === "TWO_YEAR"}>
                Two year
              </option>
              <option value="THREE_YEAR" selected={experience === "THREE_YEAR"}>
                Three year
              </option>
              <option value="FOUR_YEAR" selected={experience === "FOUR_YEAR"}>
                Four year
              </option>
              <option value="FIVE_YEAR" selected={experience === "FIVE_YEAR"}>
                Five year
              </option>
              <option value="ABOVE_FIVE_YEAR" selected={experience === "ABOVE_FIVE_YEAR"}>
                Above five year
              </option>
            </select>
            <select className="search-select blue-border-select" name="minSalary" onChange={onFormSearchChange}>
              <option value="" selected={minSalary === ""}>
                Min wage
              </option>
              <option value="100" selected={minSalary === "100"}>
                100 USD
              </option>
              <option value="200" selected={minSalary === "200"}>
                200 USD
              </option>
              <option value="500" selected={minSalary === "500"}>
                500 USD
              </option>
              <option value="1000" selected={minSalary === "1000"}>
                1000 USD
              </option>
              <option value="2000" selected={minSalary === "2000"}>
                2000 USD
              </option>
              <option value="5000" selected={minSalary === "5000"}>
                5000 USD
              </option>
            </select>
            <select className="search-select blue-border-select" name="position" onChange={onFormSearchChange}>
              <option value="" selected={position === ""}>
                Position
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
            <select className="search-select blue-border-select" onChange={onFormSearchChange} name="method">
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
            <select className="search-select blue-border-select" name="startDate" onChange={onFormSearchChange}>
              <option value="" elected={startDate === ""}>
                Date created
              </option>
              <option value={getPastDate(1)} selected={startDate === getPastDate(1)}>
                1 Day ago
              </option>
              <option value={getPastDate(7)} selected={startDate === getPastDate(7)}>
                1 week ago
              </option>
              <option value={getPastDate(14)} selected={startDate === getPastDate(14)}>
                2 week ago
              </option>
              <option value={getPastDate(30)} selected={startDate === getPastDate(30)}>
                1 month ago
              </option>
              <option value={getPastDate(60)} selected={startDate === getPastDate(60)}>
                2 month ago
              </option>
              <option value={getPastDate(90)} selected={startDate === getPastDate(90)}>
                3 month ago
              </option>
            </select>
            <select className="search-select blue-border-select" name="gender" onChange={onFormSearchChange}>
              <option value="" selected={gender === ""}>
                Gender
              </option>
              <option value="MALE" selected={gender === "MALE"}>
                Male
              </option>
              <option value="FEMALE" selected={gender === "FEMALE"}>
                Female
              </option>
              <option value="NONE" selected={gender === "NONE"}>
                None
              </option>
            </select>

            <p className="clear-selection" onClick={onClickClearSelection}>
              Clear selection
            </p>
          </div>
        </div>
        {/* <div className='quantity-number-rusult'> Found <p> {listPostResult.data?.length} </p> jobs matching your request.</div> */}
        <div className="search-content">
          <div className="list-post">
            <div className="row-flex" style={{ justifyContent: "end" }}>
              <div>
                <label style={{ marginRight: "0.5em", fontSize: "0.8em" }}>Sort by</label>
                {/*
                 *         &nbsp;&nbsp;&nbsp;&nbsp; 1: by createDate - newest post <br>
                 *         &nbsp;&nbsp;&nbsp;&nbsp; 2: by salary <br>
                 *         &nbsp;&nbsp;&nbsp;&nbsp; 4: by number of recruit <br>
                 *         &nbsp;&nbsp;&nbsp;&nbsp; 8: by number of viewcount <br>
                 * */}
                <select className="search-select blue-border-select" style={{ borderRadius: "5px", padding: "0.7em" }} name="sortBy" onChange={onFormSearchChange} value={sortBy}>
                  <option value="1">Newest</option>
                  <option value="2">Salary</option>
                  <option value="8">View</option>
                </select>
              </div>
              <div>
                <label style={{ marginRight: "0.5em", fontSize: "0.8em" }}>Direction</label>
                <select className="search-select blue-border-select" onChange={onFormSearchChange} name="sortDescending" value={sortDescending} style={{ borderRadius: "5px", padding: "0.7em" }}>
                  <option value="false">ASC</option>
                  <option value="true">DESC</option>
                </select>
              </div>
              <div>
                <label style={{ marginRight: "0.5em", fontSize: "0.8em" }}>Page size</label>
                <select className="search-select blue-border-select" style={{ borderRadius: "5px", padding: "0.7em" }} name="limit" onChange={onFormSearchChange} value={limit}>
                  <option value={8}>8 Posts </option>
                  <option value={12}>12 Posts </option>
                  <option value={24}>24 Posts </option>
                </select>
              </div>
            </div>
            {listPostResult && listPostResult.data && listPostResult.data.length > 0 ? (
              listPostResult.data.map((p, id) => (
                <div className="cart" key={id}>
                  <img
                    className="avatar"
                    src={p.author.urlAvatar === null ? logoPost : p.author.urlAvatar}
                    alt=""
                    onClick={() => {
                      onClickImagePost(p.author.id);
                    }}
                  />
                  <div className="cart-info">
                    <p className="title" onClick={() => onClickPostTitle(p.id)}>
                      {p.title}
                    </p>
                    <div className="cart-description">{p.author.name}</div>
                    <div className="row-flex-horizon flex-wrap">
                      <div className="list-item-flex-start">
                        <div className="item">
                          <p>
                            {p.salary !== null ? p.salary : ""}
                            {p.currency}
                          </p>
                        </div>
                        <div className="item">
                          <p>{removeVietnameseAccents(p.city.name)}</p>
                        </div>
                        <div className="item">
                          <p>{getDaysDiff(p.createDate)} days ago</p>
                        </div>
                        <div className="item">
                          <p>{getDaysDiff(p.expirationDate)} days left</p>
                        </div>
                      </div>
                      <div
                        style={role !== "ROLE_EMPLOYER" ? { display: "block" } : { display: "none" }}
                        className="follow-post-in-search-page"
                        onClick={() => {
                          heartClick(p.id);
                        }}
                      >
                        {checkFollow(p.id, postFollow) ? (
                          <img src={heartIcon} alt="" style={{ height: "100%", width: "auto" }} />
                        ) : (
                          <img src={roundheartIcon} alt="" style={{ height: "100%", width: "auto" }} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>There are no posts macth!</>
            )}
            <Paging currentPage={listPostResult?.currentPage} totalPage={listPostResult?.totalPage} setCurrentPage={setCurrentPage} />
          </div>
          <div className="intro">
            <h3>May be you are interested</h3>
            {postMostView.length > 0 ? (
              <div className="cart-v1">
                <p className="title" style={{ cursor: "pointer" }} onClick={() => onClickPostTitle(postMostView[0].id)}>
                  {postMostView[0].title}
                </p>
                <div className="row-flex-horizon align-items-unset">
                  <img
                    className="avatar"
                    src={postMostView[0].author.urlAvatar !== null ? postMostView[0].author.urlAvatar : logoPost}
                    alt=""
                    style={{ borderRadius: "5px", height: "100px", cursor: "pointer" }}
                    onClick={() => onClickImagePost(postMostView[0].author.id)}
                  />
                  <div className="cart-info" style={{ width: "100%" }}>
                    <p className="method">{getTypeJob(postMostView[0].method)}</p>
                    <div className="cart-description">Company: {postMostView[0].author.name}</div>
                    <div className="row-flex-horizon" style={{ gap: "0.8em", alignItems: "center" }}>
                      <div className="item-v1 salary-item">
                        {postMostView[0].salary !== null ? postMostView[0].salary : ""}
                        {postMostView[0].currency}
                      </div>
                      <div className="item-v1 time-item">{getPostDate(postMostView[0].expirationDate)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {postMostView.length > 1 ? (
              <div className="cart-v1" style={{ width: "100%" }}>
                <p className="title" style={{ cursor: "pointer" }} onClick={() => onClickPostTitle(postMostView[1].id)}>
                  {postMostView[1].title}
                </p>
                <div className="row-flex-horizon align-items-unset">
                  <img
                    className="avatar"
                    src={postMostView[1].author.urlAvatar !== null ? postMostView[1].author.urlAvatar : logoPost}
                    alt=""
                    style={{ borderRadius: "5px", height: "100px", cursor: "pointer" }}
                    onClick={() => onClickImagePost(postMostView[1].author.id)}
                  />
                  <div className="cart-info" style={{ width: "100%" }}>
                    <p className="method">{getTypeJob(postMostView[1].method)}</p>
                    <div className="cart-description">Company: {postMostView[1].author.name}</div>
                    <div className="row-flex-horizon" style={{ gap: "0.8em", alignItems: "center" }}>
                      <div className="item-v1 salary-item">
                        {postMostView[1].salary !== null ? postMostView[1].salary : ""}
                        {postMostView[1].currency}
                      </div>
                      <div className="item-v1 time-item">{getPostDate(postMostView[1].expirationDate)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {postMostView.length > 2 ? (
              <div className="cart-v1">
                <p className="title" style={{ cursor: "pointer" }} onClick={() => onClickPostTitle(postMostView[2].id)}>
                  {postMostView[2].title}
                </p>
                <div className="row-flex-horizon align-items-unset">
                  <img
                    className="avatar"
                    src={postMostView[2].author.urlAvatar !== null ? postMostView[2].author.urlAvatar : logoPost}
                    alt=""
                    style={{ borderRadius: "5px", height: "100px", cursor: "pointer" }}
                    onClick={() => onClickImagePost(postMostView[2].author.id)}
                  />
                  <div className="cart-info" style={{ width: "100%" }}>
                    <p className="method">{getTypeJob(postMostView[2].method)}</p>
                    <div className="cart-description">Company: {postMostView[2].author.name}</div>
                    <div className="row-flex-horizon" style={{ gap: "0.8em", alignItems: "center" }}>
                      <div className="item-v1 salary-item">
                        {postMostView[2].salary !== null ? postMostView[2].salary : ""}
                        {postMostView[2].currency}
                      </div>
                      <div className="item-v1 time-item">{getPostDate(postMostView[2].expirationDate)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="flex-update-baner-in-search-page">
              <img className="banner-left" src={updPic} alt="" />
              <div className="upd-profile-btn">
                <div className="button" onClick={onClickUpdateProfile}>
                  Update Profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SearchPageComponent;
