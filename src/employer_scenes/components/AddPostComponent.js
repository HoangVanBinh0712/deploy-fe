import { useContext, useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
import WaitingResponeButton from "../../components/WaitingResponeButton";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useSearchParams, useNavigate } from 'react-router-dom'
import swal from "sweetalert";

const AddPostComponent = () => {

  const { authState: { user }, getPostByIdByEmp, updatePostByIdByEmp } = useContext(AuthContext);
  const { createPost } = useContext(PostContext)
  const {
    globalState: { industries },
  } = useContext(GlobalContext);
  const [mess, setMess] = useState('')
  const [isWaitingRes, setIsWaitingRes] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const initialPostInfo = {
    title: "",
    description: "",
    method: "FULL_TIME",
    position: "Staff",
    experience: "NONE",
    gender: "NONE",
    requirement: "",
    benifit: "",
    contact: user !== null ? user.phone : '',
    salary: 0,
    currency: "VND",
    location: user !== null ? user.address : '',
    recruit: 1,
    expirationDate: minDate,
    industry: user !== null ? user.industry.id : 0,
    city: user !== null ? user.city.id : 0,
  }

  const [isUpdatePost, setIsUpdatePost] = useState(false)

  const [title, setTitle] = useState(initialPostInfo.title)
  const [description, setDescription] = useState(initialPostInfo.description)
  const [method, setMethod] = useState(initialPostInfo.method)
  const [position, setPosition] = useState(initialPostInfo.position)
  const [experience, setExperience] = useState(initialPostInfo.experience)
  const [gender, setGender] = useState(initialPostInfo.gender)
  const [requirement, setRequirement] = useState(initialPostInfo.requirement)
  const [benifit, setBenifit] = useState(initialPostInfo.benifit)
  const [salary, setSalary] = useState(initialPostInfo.salary)
  const [currency, setCurrency] = useState(initialPostInfo.currency)
  const [recruit, setRecruit] = useState(initialPostInfo.recruit)
  const [expirationDate, setExpirationDate] = useState(initialPostInfo.expirationDate)
  const [industry, setIndustry] = useState(initialPostInfo.industry)

  const getPostByIDEmp = async (id) => {
    const res = await getPostByIdByEmp(id)
    console.log(res)
    if (res.success) {
      setTitle(res.data.title)
      setDescription(res.data.description)
      setMethod(res.data.method)
      setPosition(res.data.position)
      setExperience(res.data.experience)
      setGender(res.data.gender)
      setRequirement(res.data.requirement)
      setBenifit(res.data.benifit)
      setSalary(res.data.salary)
      setCurrency(res.data.currency)
      setRecruit(res.data.recruit)
      setExpirationDate(res.data.expirationDate)
      setIndustry(res.data.industry)
    }
  }

  const handleDescChange = (newValue) => {
    setDescription(newValue)
  }
  const handleRequirementChange = (newValue) => {
    setRequirement(newValue)
  }
  const handleBenifitChange = (newValue) => {
    setBenifit(newValue)
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const onChangeWokType = (event) => {
    setMethod(event.target.value)
  }

  const onChangegenderType = (event) => {
    setGender(event.target.value)
  }

  const onChangeCurencyType = (event) => {
    setCurrency(event.target.value)
  }

  const onChangeSalary = (event) => {
    setSalary(event.target.value)
  }

  const onChangeRecruiter = (event) => {
    setRecruit(event.target.value)
  }

  const onChangePosition = (event) => {
    setPosition(event.target.value)
  }

  const onChangeExp = (event) => {
    setExperience(event.target.value)
  }

  const onChangeExpiration = (event) => {
    setExpirationDate(event.target.value)
  }

  const onChangeIndustry = (event) => {
    setIndustry(event.target.value)
  }

  useEffect(() => {
    if (params.postId !== undefined) {
      setIsUpdatePost(true)
      getPostByIDEmp(params.postId)
    }
  }, [])

  const checkPostInfo = (pInfo) => {
    if (pInfo.title.length === 0 || pInfo.description.length === 0 || pInfo.requirement.length === 0 || pInfo.benifit.length === 0)
      return false
    return true
  }

  const onSaveClick = async () => {
    setIsWaitingRes(true)
    const postInfo = {
      title: title,
      description: description,
      method: method,
      position: position,
      experience: experience,
      gender: gender,
      requirement: requirement,
      benifit: benifit,
      contact: user !== null ? user.phone : '',
      salary: salary,
      currency: currency,
      location: user !== null ? user.address : '',
      recruit: recruit,
      expirationDate: expirationDate,
      industry: industry,
      city: user !== null ? user.city.id : 0,
    }
    if (checkPostInfo(postInfo)) {
      const res = await createPost(postInfo)
      if (res.success) {
        swal({
          title: "Success",
          icon: "success",
          text: "Created new post successfully",
          dangerMode: false,
        })
        setTitle(initialPostInfo.title)
        setDescription(initialPostInfo.description)
        setMethod(initialPostInfo.method)
        setPosition(initialPostInfo.position)
        setExperience(initialPostInfo.experience)
        setGender(initialPostInfo.gender)
        setRequirement(initialPostInfo.requirement)
        setBenifit(initialPostInfo.benifit)
        setSalary(initialPostInfo.salary)
        setCurrency(initialPostInfo.currency)
        setRecruit(initialPostInfo.recruit)
        setExpirationDate(initialPostInfo.expirationDate)
      }
      else swal({
        title: "Error",
        icon: "warning",
        text: res.message,
        dangerMode: true,
      })
    }
    else {
      setMess("*Required...")
      setTimeout(() => {
        setMess("")
      }, 5000)
    }
    setIsWaitingRes(false)
  }

  const onUpdatePostClick = async () => {
    setIsWaitingRes(true)
    const postInfo = {
      title: title,
      description: description,
      method: method,
      position: position,
      experience: experience,
      gender: gender,
      requirement: requirement,
      benifit: benifit,
      contact: user !== null ? user.phone : '',
      salary: salary,
      currency: currency,
      location: user !== null ? user.address : '',
      recruit: recruit,
      expirationDate: expirationDate,
      industry: industry,
      city: user !== null ? user.city.id : 0,
    }
    if (checkPostInfo(postInfo)) {
      const res = await updatePostByIdByEmp(params.postId, postInfo)
      if (res.success) {
        swal({
          title: "Success",
          icon: "success",
          text: "Created new post successfully",
          dangerMode: false,
        })
        setTitle(initialPostInfo.title)
        setDescription(initialPostInfo.description)
        setMethod(initialPostInfo.method)
        setPosition(initialPostInfo.position)
        setExperience(initialPostInfo.experience)
        setGender(initialPostInfo.gender)
        setRequirement(initialPostInfo.requirement)
        setBenifit(initialPostInfo.benifit)
        setSalary(initialPostInfo.salary)
        setCurrency(initialPostInfo.currency)
        setRecruit(initialPostInfo.recruit)
        setExpirationDate(initialPostInfo.expirationDate)
      }
      else swal({
        title: "Error",
        icon: "warning",
        text: res.message,
        dangerMode: true,
      })
    }
    else {
      setMess("*Required...")
      setTimeout(() => {
        setMess("")
      }, 5000)
    }
    setIsWaitingRes(false)
    setIsUpdatePost(false)
  }

  const onCancelClick = () => {
    swal({
      title: "Are you sure you want to cancel?",
      icon: "info",
      text: "The information you changed will not be saved",
      buttons: {
        cancel: "Cancel",
        confirm: "Yes"
      },
    }).then((click) => {
      if (click) {
        setTitle(initialPostInfo.title)
        setDescription(initialPostInfo.description)
        setMethod(initialPostInfo.method)
        setPosition(initialPostInfo.position)
        setExperience(initialPostInfo.experience)
        setGender(initialPostInfo.gender)
        setRequirement(initialPostInfo.requirement)
        setBenifit(initialPostInfo.benifit)
        setSalary(initialPostInfo.salary)
        setCurrency(initialPostInfo.currency)
        setRecruit(initialPostInfo.recruit)
        setExpirationDate(initialPostInfo.expirationDate)
        setIndustry(initialPostInfo.industry)
        if (isUpdatePost)
          navigate(-1)
      }
    });
  };

  let body;
  body = (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Fill in the information to create a new post</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="content-wrapper">
          <div style={{ display: 'flex' }}>
            <div className="input-wrapper">
              <div className="label">Title</div>
              <input type="text" name="title" id="inp-add-post-page" className="coler-placeholder"
                value={title}
                placeholder={mess}
                style={{ width: '98%' }}
                onChange={onChangeTitle}>

              </input>
            </div>
            <div className="input-wrapper">
              <div className="label">Industry</div>
              <select id="inp-add-post-page" className="coler-placeholder" onChange={onChangeIndustry} defaultValue={industry}>
                <option key={""} value="">
                  Select Industry
                </option>
                {industries.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-area-group">
            <div className="label">Description <p style={{ color: '#ff453a' }}>{' '}{mess}</p></div>
            <ReactQuill value={description} onChange={handleDescChange} className="coler-placeholder" />
          </div>

          <div className="row">
            <div className="left" style={{ width: '48%' }}>
              <div className="text-area-group" style={{ marginBottom: '10px' }}>
                <div className="label">Requirement <p style={{ color: '#ff453a' }}>{' '}{mess}</p></div>
                <ReactQuill
                  value={requirement}
                  onChange={handleRequirementChange}
                  style={{}}
                />
              </div>
              <b style={{ color: '#0c62ad' }}>Working type</b>
              <div className="row" style={{ justifyContent: 'flex-start', marginBottom: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="type2"
                    name="type"
                    value="FULL_TIME"
                    style={{ width: '15%' }}
                    defaultChecked
                    checked={method === "FULL_TIME"}
                    onChange={onChangeWokType}
                  />
                  <label htmlFor="type2" style={{ width: '120px', marginLeft: '5px', fontSize: '16px' }}>Full time</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="type1"
                    name="type"
                    value="PART_TIME"
                    style={{ width: '15%' }}
                    checked={method === "PART_TIME"}
                    onChange={onChangeWokType}
                  />
                  <label htmlFor="type1" style={{ width: '120px', marginLeft: '5px', fontSize: '16px' }}>Part time</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="type3"
                    name="type"
                    value="INTERN"
                    style={{ width: '15%' }}
                    checked={method === "INTERN"}
                    onChange={onChangeWokType}
                  />
                  <label htmlFor="type3" style={{ width: '120px', marginLeft: '5px', fontSize: '16px' }}>Intern</label>
                </div>
              </div>
              <b style={{ color: '#0c62ad' }}>Gender</b>
              <div className="row" style={{ justifyContent: 'flex-start', marginBottom: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="gender1"
                    name="gender"
                    value="MALE"
                    style={{ width: '15%' }}
                    checked={gender === "MALE"}
                    onChange={onChangegenderType}
                  />
                  <label htmlFor="gender1" style={{ width: '120px', marginLeft: '5px', fontSize: '16px' }}>Male</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="gender2"
                    name="gender"
                    value="FEMALE"
                    style={{ width: '15%' }}
                    checked={gender === "FEMALE"}
                    onChange={onChangegenderType}
                  />
                  <label htmlFor="gender2" style={{ width: '120px', marginLeft: '5px', fontSize: '16px' }}>Female</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="gender3"
                    name="gender"
                    value="NONE"
                    style={{ width: '15%' }}
                    defaultChecked
                    checked={gender === "NONE"}
                    onChange={onChangegenderType}
                  />
                  <label htmlFor="gender3" style={{ width: '130px', marginLeft: '5px', fontSize: '16px' }}>No require</label>
                </div>
              </div>
              <b style={{ color: '#0c62ad' }}>Currency</b>
              <div className="row" style={{ justifyContent: 'flex-start', marginBottom: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="currency1"
                    name="currency"
                    value="VND"
                    style={{ width: '15%' }}
                    defaultChecked
                    checked={currency === "VND"}
                    onChange={onChangeCurencyType}
                  />
                  <label htmlFor="currency1" style={{ width: '120px', marginLeft: '5px', fontSize: '16px' }}>VNĐ</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="currency2"
                    name="currency"
                    value="USD"
                    style={{ width: '15%' }}
                    checked={currency === "USD"}
                    onChange={onChangeCurencyType}
                  />
                  <label htmlFor="currency2" style={{ width: '120px', marginLeft: '5px', fontSize: '16px' }}>USD</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="currency3"
                    name="currency"
                    value="AGREEMENT"
                    style={{ width: '15%' }}
                    checked={currency === "AGREEMENT"}
                    onChange={onChangeCurencyType}
                  />
                  <label htmlFor="currency3" style={{ width: '120px', marginLeft: '5px', fontSize: '16px' }}>Agreement</label>
                </div>
              </div>
              <div className="input-wrapper" style={{ width: '100%' }}>
                <div className="label">Salary</div>
                <input type="number" name="title" value={salary} disabled={currency === "AGREEMENT"}
                  id="inp-add-post-page"
                  onChange={onChangeSalary}
                ></input>
              </div>
            </div>
            <div className="right" style={{ width: '48%' }}>
              <div className="text-area-group" style={{ marginBottom: '10px' }}>
                <div className="label">Benefit <p style={{ color: '#ff453a' }}>{' '}{mess}</p></div>
                <ReactQuill
                  value={benifit}
                  onChange={handleBenifitChange}
                  style={{}}
                />
              </div>
              <div className="select" style={{ width: '100%', marginBottom: '10px' }}>
                <div className="label">Position</div>
                <select name="position" id="inp-add-post-page" onChange={onChangePosition}>
                  <option value="Staff" selected={position === 'Staff'}>Staff</option>
                  <option value="Leader" selected={position === 'Leader'}>Leader</option>
                  <option value="Manager" selected={position === 'Manager'}>Manager</option>
                  <option value="Deputy" selected={position === 'Deputy'}>Deputy</option>
                  <option value="Vice_President" selected={position === 'Vice_President'}>Vice president</option>
                  <option value="Branch_Manager" selected={position === 'Branch_Manager'}>Branch manager</option>
                </select>
              </div>
              <div className="select" style={{ width: '100%', marginBottom: '10px' }} >
                <div className="label">Experience</div>
                <select name="industry" id="inp-add-post-page" onChange={onChangeExp}>
                  <option value="NONE" selected={experience === 'NONE'}>None</option>
                  <option value="UNDER_ONE_YEAR" selected={experience === 'UNDER_ONE_YEAR'}>Under one year</option>
                  <option value="ONE_YEAR" selected={experience === 'ONE_YEAR'}>One year</option>
                  <option value="TWO_YEAR" selected={experience === 'TWO_YEAR'}>Two year</option>
                  <option value="THREE_YEAR" selected={experience === 'THREE_YEAR'}>Three year</option>
                  <option value="FOUR_YEAR" selected={experience === 'FOUR_YEAR'}>Four year</option>
                  <option value="FIVE_YEAR" selected={experience === 'FIVE_YEAR'}>Five year</option>
                  <option value="ABOVE_FIVE_YEAR" selected={experience === 'ABOVE_FIVE_YEAR'}>Above five year</option>
                </select>
              </div>
              <div className="input-wrapper" style={{ width: '100%', marginBottom: '10px' }}>
                <div className="label">Recruit</div>
                <input type="number" name="title" value={recruit}
                  id="inp-add-post-page"
                  onChange={onChangeRecruiter}
                ></input>
              </div>
              <div className="input-wrapper" style={{ width: '100%' }}>
                <div className="label">Expiration date</div>
                <input type="date" name="title" value={expirationDate}
                  min={minDate}
                  id="inp-add-post-page"
                  onChange={onChangeExpiration}
                ></input>
              </div>
            </div>
          </div>

          <div className="group-buttons">
            {isWaitingRes ? (
              <div className="button-waiting">
                <WaitingResponeButton />
              </div>
            ) : (<>
              {isUpdatePost ? (
                <div className="button" onClick={() => onUpdatePostClick}>
                  <i className="fa fa-floppy-o" aria-hidden="true"></i>
                  Update
                </div>
              ) : (
                <div className="button" onClick={onSaveClick}>
                  <i className="fa fa-floppy-o" aria-hidden="true"></i>
                  Create
                </div>
              )}
            </>
            )}
            <div className="button cancel" onClick={onCancelClick}>
              <i className="fa fa-times" aria-hidden="true"></i>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{body}</>;
};

export default AddPostComponent;
