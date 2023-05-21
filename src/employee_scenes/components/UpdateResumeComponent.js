import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/Toast';

const UpdateResume = () => {
  const { updateResume, getResume, deleteResume } = useContext(AuthContext)
  const { warn, success } = useToast();

  const [allResume, setAllResume] = useState([])

  const [mediaId, setMediaId] = useState(-1)
  const [isPublic, setIsPublic] = useState(false)
  const [name, setName] = useState('')
  const [workExperiences, setWorkExperiences] = useState('')
  const [skillsAndKnowledges, setSkillsAndKnowledges] = useState('')
  const [experience, setExperience] = useState("NONE")
  const [position, setPosition] = useState("Staff")
  const [method, setMethod] = useState("FULL_TIME")

  const getAllResume = async () => {
    const res = await getResume()
    if (res.success) {
      setAllResume(res.data);
      if (res.data.lenght !== 0) {
        setMediaId(res.data[0].mediaId)
        setIsPublic(res.data[0].isPublic)
        setName(res.data[0].name)
        setWorkExperiences(res.data[0].workExperiences)
        setSkillsAndKnowledges(res.data[0].skillsAndKnowledges)
        setExperience(res.data[0].experience)
        setPosition(res.data[0].position)
        setMethod(res.data[0].method)
      }
    }

  }

  useEffect(() => {
    getAllResume()

  }, [])

  const handleHistoryChange = (newValue) => {
    setWorkExperiences(newValue)
  }

  const handleSkillChange = (newValue) => {
    setSkillsAndKnowledges(newValue)
  }

  const onChangeNameinput = (event) => setName(event.target.value)
  const onChangeIsPublicinput = (event) => setIsPublic(event.target.value)
  const onChangeExperienceinput = (event) => setExperience(event.target.value)
  const onChangePositioninput = (event) => setPosition(event.target.value)
  const onChangeMethodinput = (event) => setMethod(event.target.value)

  const onChangeSelectResume = (event) => {
    const result = allResume.find(item => item.mediaId == event.target.value);
    if (result !== undefined) {
      setMediaId(result.mediaId)
      setIsPublic(result.isPublic)
      setName(result.name)
      setWorkExperiences(result.workExperiences)
      setSkillsAndKnowledges(result.skillsAndKnowledges)
      setExperience(result.experience)
      setPosition(result.position)
      setMethod(result.method)
    }
  }

  const onClickConfirm = async () => {
    if (mediaId !== -1) {
      const confirm = window.confirm("Are you sure you want to update infomation of this resume?");
      if (confirm) {
        const currentResume = {
          mediaId: mediaId,
          isPublic: isPublic,
          name: name,
          workExperiences: workExperiences,
          skillsAndKnowledges: skillsAndKnowledges,
          experience: experience,
          position: position,
          method: method,
        }
        const res = await updateResume(currentResume)
        if (res.success) {
          success(res.message)
        }
        else warn(res.message)
      }
    }
  }

  const onClickCancel = () => {
    const confirm = window.confirm("Are you sure you want to cancel, the information you changed will not be saved?");
    if (confirm) {
      const result = allResume.find(item => item.mediaId == mediaId);
      if (result !== undefined) {
        setMediaId(result.mediaId)
        setIsPublic(result.isPublic)
        setName(result.name)
        setWorkExperiences(result.workExperiences)
        setSkillsAndKnowledges(result.skillsAndKnowledges)
        setExperience(result.experience)
        setPosition(result.position)
        setMethod(result.method)
      }
    }
  }

  const onClickDelete = async () => {
    if (mediaId !== -1) {
      const confirm = window.confirm("Are you sure you want to delete this resume?");
      if (confirm) {
        const res= await deleteResume(mediaId)
        if (res.success) {
          success(res.message)
        }
        else warn(res.message)
      }
    }
  }



  return (
    <div style={{ width: "80%" }}>
      <div className="component-title">
        <span>Update Resume</span>
      </div>
      <div className="free-space" id="free-space">
        <div className="content-wrapper">
          <div className="select">
            <div className="label">Resume</div>
            <select name="" id="" defaultValue="-1" onChange={onChangeSelectResume}>
              {allResume.length === 0 ?
                (<option value="-1">You have not uploaded any profile yet</option>)
                : (allResume.map((r, id) => (<option value={r.mediaId} key={id}>{r.name}</option>)))}

            </select>
          </div>
          <div className="input-wrapper">
            <div className="label">Name</div>
            <input className="coler-placeholder"
              type="text"
              onChange={onChangeNameinput}
              placeholder=''
              value={name}>

            </input>
          </div>
          <div className="double-select">
            <div className="select">
              <div className="label">Public</div>
              <select name="isPublic" id="" onChange={onChangeIsPublicinput}>
                <option value="true" selected={isPublic}>True</option>
                <option value="false" selected={!isPublic}>False</option>
              </select>
            </div>
            <div className="select">
              <div className="label">Experience</div>
              <select name="experience" id="" onChange={onChangeExperienceinput}>
                <option value="NONE" selected={experience === "NONE"}>No Experience</option>
                <option value="UNDER_ONE_YEAR" selected={experience === "UNDER_ONE_YEAR"}>Under 1 Year</option>
                <option value="ONE_YEAR" selected={experience === "ONE_YEAR"}>1 Year</option>
                <option value="TWO_YEAR" selected={experience === "TWO_YEAR"}>2 Years</option>
                <option value="THREE_YEAR" selected={experience === "THREE_YEAR"}>3 Years</option>
                <option value="FOUR_YEAR" selected={experience === "FOUR_YEAR"}>4 Years</option>
                <option value="FIVE_YEAR" selected={experience === "FIVE_YEAR"}>5 Years</option>
                <option value="ABOVE_FIVE_YEAR" selected={experience === "ABOVE_FIVE_YEAR"}>5+ Years</option>
              </select>
            </div>
          </div>
          <div className="double-select">
            <div className="select">
              <div className="label">Expected Position</div>
              <select name="" id="" onChange={onChangePositioninput}>
                <option value="Staff" selected={position === "Staff"}>Staff</option>
                <option value="Leader" selected={position === "Leader"}>Leader</option>
                <option value="Manager" selected={position === "Manager"}>Manager</option>
                <option value="Deputy" selected={position === "Deputy"}>Deputy</option>
                <option value="Vice_President" selected={position === "Vice_President"}>Vice President</option>
                <option value="Interns" selected={position === "Interns"}>Interns</option>
                <option value="Branch_Manager" selected={position === "Branch_Manager"}>Branch Manager</option>
              </select>
            </div>
            <div className="select">
              <div className="label">Working method</div>
              <select name="" id="" onChange={onChangeMethodinput}>
                <option value="INTERN" selected={method === 'INTERN'}>Intern</option>
                <option value="FULL_TIME" selected={method === 'FULL_TIME'}>Full-time</option>
                <option value="PART_TIME" selected={method === 'PART_TIME'}>Part-time</option>
              </select>
            </div>
          </div>
          <small>Give us more details !</small>
          <div className="text-area-group">
            <div className="label">Your work history</div>
            <ReactQuill value={workExperiences} onChange={handleHistoryChange} style={{}} />
          </div>

          <div className="text-area-group">
            <div className="label">Your skills</div>
            <ReactQuill value={skillsAndKnowledges} onChange={handleSkillChange} style={{}} />
          </div>
          <div className="group-buttons">
            <div className="button" onClick={onClickConfirm}>
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
              Confirm
            </div>
            <div className="button cancel" onClick={onClickCancel}>
              <i className="fa fa-times" aria-hidden="true"></i>
              Cancel
            </div>
            <div className="button delete" onClick={onClickDelete}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateResume;
