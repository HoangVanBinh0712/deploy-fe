import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/Toast';


const AddResume = () => {

    const { addResume } = useContext(AuthContext)
    const { warn, success } = useToast();

    const [history, setHistory] = useState('');
    const handleHistoryChange = (newValue) => {
        setHistory(newValue);
    }

    const [skill, setSkill] = useState('');
    const handleSkillChange = (newValue) => {
        setSkill(newValue);
    }

    const [name, setName] = useState('');
    const onChangeNameinput = (event) => setName(event.target.value)

    const [isPublic, setIsPublic] = useState(false);
    const onChangeIsPublicinput = (event) => setIsPublic(event.target.value)

    const [experience, setExperience] = useState("NONE");
    const onChangeExperienceinput = (event) => setExperience(event.target.value)

    const [position, setPosition] = useState('Staff');
    const onChangePositioninput = (event) => setPosition(event.target.value)

    const [method, setMethod] = useState('INTERN');
    const onChangeMethodinput = (event) => setMethod(event.target.value)

    const fileToBase64 = (file, cb) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(null, reader.result);
        };
        reader.onerror = function (error) {
            cb(error, null);
        };
    };

    const [cV, setCV] = useState(null)
    const fileCvInput = useRef(null);

    const handleChangeCvClick = () => {
        fileCvInput.current.click();
    };
    const handleChoseFileCv = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
            return;
        }
        const file = target.files[0];
        fileToBase64(file, (err, result) => {
            if (result) setCV(file)
        });

    };

    const [mess, setMess] = useState('')

    const onClickConfirm = async () => {
        if (name.length === 0 || cV === null) {
            setMess("*Required...")
            setTimeout(() => {
                setMess("")
            }, 5000)
        }
        else {
            const info = {
                name: name,
                isPublic: isPublic,
                workExperiences: history,
                skillsAndKnowledges: skill,
                experience: experience,
                position: position,
                method: method,
            }
            const res = await addResume(info, cV)
            if (res.success) {
                success(res.message)
            }
            else warn(res.message)
        }
    }

    const onClickCancel = async () => {
        const confirm = window.confirm("Are you sure you want to cancel, the information you changed will not be saved?");
        if (confirm) {
            setHistory('')
            setSkill('')
            setName('')
            setExperience('NONE')
            setPosition("Staff")
            setMethod('INTERN')
            setIsPublic(false)
            setCV(null)
        }
    }

    return (
        <div style={{ width: "80%" }}>
            <div className="component-title">
                <span>Add Resume</span>
            </div>
            <div className="free-space" id="free-space">
                <div className="content-wrapper">

                    <div className="input-wrapper">
                        <div className="label">Name</div>
                        <input className="coler-placeholder"
                            type="text"
                            onChange={onChangeNameinput}
                            placeholder={mess}
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
                                <option value="NONE" selected={experience==="NONE"}>No Experience</option>
                                <option value="UNDER_ONE_YEAR" selected={experience==="UNDER_ONE_YEAR"}>Under 1 Year</option>
                                <option value="ONE_YEAR" selected={experience==="ONE_YEAR"}>1 Year</option>
                                <option value="TWO_YEAR" selected={experience==="TWO_YEAR"}>2 Years</option>
                                <option value="THREE_YEAR" selected={experience==="THREE_YEAR"}>3 Years</option>
                                <option value="FOUR_YEAR" selected={experience==="FOUR_YEAR"}>4 Years</option>
                                <option value="FIVE_YEAR" selected={experience==="FIVE_YEAR"}>5 Years</option>
                                <option value="ABOVE_FIVE_YEAR" selected={experience==="ABOVE_FIVE_YEAR"}>5+ Years</option>
                            </select>
                        </div>
                    </div>
                    <div className="double-select">
                        <div className="select">
                            <div className="label">Expected Position</div>
                            <select name="" id="" onChange={onChangePositioninput}>
                                <option value="Staff" selected={position==="Staff"}>Staff</option>
                                <option value="Leader" selected={position==="Leader"}>Leader</option>
                                <option value="Manager" selected={position==="Manager"}>Manager</option>
                                <option value="Deputy" selected={position==="Deputy"}>Deputy</option>
                                <option value="Vice_President" selected={position==="Vice_President"}>Vice President</option>
                                <option value="Interns" selected={position==="Interns"}>Interns</option>
                                <option value="Branch_Manager" selected={position==="Branch_Manager"}>Branch Manager</option>
                            </select>
                        </div>
                        <div className="select">
                            <div className="label">Working method</div>
                            <select name="" id="" onChange={onChangeMethodinput}>
                                <option value="INTERN" selected={method==='INTERN'}>Intern</option>
                                <option value="FULL_TIME" selected={method==='FULL_TIME'}>Full-time</option>
                                <option value="PART_TIME" selected={method==='PART_TIME'}>Part-time</option>
                            </select>
                        </div>
                    </div>
                    <small>Give us more details !</small>
                    <div className="text-area-group">
                        <div className="label">Your work history</div>
                        <ReactQuill value={history} onChange={handleHistoryChange} style={{}} />
                    </div>

                    <div className="text-area-group">
                        <div className="label">Your skills</div>
                        <ReactQuill value={skill} onChange={handleSkillChange} style={{}} />
                    </div>

                    <div className="label">Resume pdf</div>
                    <div className="button" onClick={handleChangeCvClick}>
                        <i className="fa fa-upload" aria-hidden="true"></i>
                        Upload file
                        <input
                            ref={fileCvInput}
                            id="file-upload"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleChoseFileCv}
                        />
                    </div>
                    <small>Format for PDF only.</small>

                    <div className="group-buttons">
                        <div className="button" onClick={onClickConfirm}>

                            <i className="fa fa-floppy-o" aria-hidden="true"></i>

                            Confirm
                        </div>
                        <div className="button cancel" onClick={onClickCancel}>

                            <i className="fa fa-times" aria-hidden="true"></i>

                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddResume;