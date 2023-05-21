import { useContext, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/Toast";
import { PostContext } from "../../contexts/PostContext";

const AddPostComponent = () => {

  const { authState: { user }, } = useContext(AuthContext);
  const { createPost } = useContext(PostContext)
  const { warn, success } = useToast();
  const [mess, setMess] = useState('')

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

  const checkPostInfo = (pInfo) => {
    if (pInfo.title.length === 0 || pInfo.description.length === 0 || pInfo.requirement.length === 0 || pInfo.benifit.length === 0)
      return false
    return true
  }

  const onSaveClick = async () => {
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
      industry: user !== null ? user.industry.id : 0,
      city: user !== null ? user.city.id : 0,
    }
    if (checkPostInfo(postInfo)) {
      const res = await createPost(postInfo)
      if (res.success) {
        success("Created new post successfully!")
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
      else warn(res.message)
    }
    else {
      setMess("*Required...")
      setTimeout(() => {
        setMess("")
      }, 5000)
    }
  }

  const onCancelClick = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel, the information you changed will not be saved?"
    );
    if (confirm) {
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
  };

  let body;
  body = (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Fill in the information to create a new post</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="content-wrapper">
          <div className="input-wrapper">
            <div className="label">Title</div>
            <input type="text" name="title" id="inp-add-post-page" className="coler-placeholder"
              value={title}
              placeholder={mess}
              style={{ width: '48%' }}
              onChange={onChangeTitle}>

            </input>
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
                    onChange={onChangeWokType}
                  />
                  <label for="type2" style={{ width: '120px', marginLeft: '5px', }}>Full time</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="type1"
                    name="type"
                    value="PART_TIME"
                    style={{ width: '15%' }}
                    onChange={onChangeWokType}
                  />
                  <label for="type1" style={{ width: '120px', marginLeft: '5px', }}>Part time</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="type3"
                    name="type"
                    value="INTERN"
                    style={{ width: '15%' }}
                    onChange={onChangeWokType}
                  />
                  <label for="type3" style={{ width: '120px', marginLeft: '5px', }}>Intern</label>
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
                    onChange={onChangegenderType}
                  />
                  <label for="gender1" style={{ width: '120px', marginLeft: '5px', }}>Male</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="gender2"
                    name="gender"
                    value="FEMALE"
                    style={{ width: '15%' }}
                    onChange={onChangegenderType}
                  />
                  <label for="gender2" style={{ width: '120px', marginLeft: '5px', }}>Female</label>
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
                    onChange={onChangegenderType}
                  />
                  <label for="gender3" style={{ width: '130px', marginLeft: '5px', }}>No require</label>
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
                    value="30"
                    style={{ width: '15%' }}
                    defaultChecked
                    onChange={onChangeCurencyType}
                  />
                  <label for="currency1" style={{ width: '120px', marginLeft: '5px', }}>VNĐ</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="currency2"
                    name="currency"
                    value="USD"
                    style={{ width: '15%' }}
                    onChange={onChangeCurencyType}
                  />
                  <label for="currency2" style={{ width: '120px', marginLeft: '5px', }}>USD</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                  <input
                    className="inp-radio-add-post-page"
                    type="radio"
                    id="currency3"
                    name="currency"
                    value="AGGREEMENT"
                    style={{ width: '15%' }}
                    onChange={onChangeCurencyType}
                  />
                  <label for="currency3" style={{ width: '120px', marginLeft: '5px', }}>Aggreement</label>
                </div>
              </div>
              <div className="input-wrapper" style={{ width: '100%' }}>
                <div className="label">Salary</div>
                <input type="number" name="title" value={salary}
                  id="inp-add-post-page"
                  onChange={onChangeSalary}
                ></input>
              </div>
            </div>
            <div className="right" style={{ width: '48%' }}>
              <div className="text-area-group" style={{ marginBottom: '10px' }}>
                <div className="label">Benifit <p style={{ color: '#ff453a' }}>{' '}{mess}</p></div>
                <ReactQuill
                  value={benifit}
                  onChange={handleBenifitChange}
                  style={{}}
                />
              </div>
              <div className="select" style={{ width: '100%' }}>
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
              <div className="select" style={{ width: '100%' }} >
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
              <div className="input-wrapper" style={{ width: '100%' }}>
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
            <div className="button" onClick={onSaveClick}>
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
              Create
            </div>
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
