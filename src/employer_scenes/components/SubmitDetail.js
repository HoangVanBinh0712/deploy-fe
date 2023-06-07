import { useParams } from 'react-router-dom';
import '../css/submites-sc.css'
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import addIcon from '../../assets/icons/add-icon.png'
import ReactQuill from 'react-quill';
import { SingleRowSubmit } from './SingleRowSubmit'
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { useToast } from '../../contexts/Toast';
import { AuthContext } from '../../contexts/AuthContext';
import swal from "sweetalert";

const SubmitDetail = () => {

    let { id } = useParams();
    const { authState: { user }, createAppointment } = useContext(AuthContext)
    const { getCvSubmited, getPostById } = useContext(PostContext)

    const personnalityArr = [
        { name: 'INTJ', desc: 'Imaginative and strategic thinkers, with a plan for everything' },
        { name: 'INTP', desc: 'Innovative inventor; insatiable thirst for knowledge' },
        { name: 'ENTJ', desc: 'Imaginative, strong willed, and always able to find a way' },
        { name: 'ENTP', desc: 'Smart and curious who cannot resist an intellectual challenge' },
        { name: 'INFJ', desc: 'Quiet, inspiring, tireless idealist' },
        { name: 'INFP', desc: 'Poetic, kind and altruistic, eager to help a good cause' },
        { name: 'ENFJ', desc: 'Charismatic and inspiring, able to mesmerize listeners' },
        { name: 'ENFP', desc: 'Enthusiastic, creative and free spirited; always finds a reason to smile' },
        { name: 'ISTJ', desc: 'Practical and fact-minded; reliable' },
        { name: 'ISFJ', desc: 'Dedicated and warm protector; ready to defend their loved ones' },
        { name: 'ESTJ', desc: 'Great at managing things or people, excellent administrators' },
        { name: 'ESFJ', desc: 'Caring, social, popular with people; always eager to help' },
        { name: 'ISTP', desc: 'Bold and practical experimenters' },
        { name: 'ISFP', desc: 'Flexible and charming artist; always looking for new experiences' },
        { name: 'ESTP', desc: 'abcSmart, energetic, and very perceptive; loves living on the edge' },
        { name: 'ESFP', desc: 'Spontaneous and enthusiastic; life of the party' },
    ]

    const findPersonalityDesc = (name) => {
        const result = personnalityArr.find(personality => personality.name === name);
        return result ? result.desc : null;
    }
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    const [listSubmittion, setListSubmiition] = useState([])
    const [postCurrent, setPostCurrent] = useState({})
    const [isPredict, setIsPredict] = useState(false)
    const [predictData, setPredictData] = useState('')
    const [isAppointment, setIsAppointment] = useState(false)
    const [jskIdSubmit, setJskSubmit] = useState(0)
    const [noteAppoint, setNoteAppoint] = useState('')
    const [appointmentTime, setAppointmentTime] = useState(minDate)

    const getSubmittion = async () => {
        const res = await getCvSubmited(id)
        if (res.success) setListSubmiition(res.data.reverse())
    }

    const getPostId = async () => {
        const res = await getPostById(id)
        if (res.success) setPostCurrent(res.data)
    }

    const getAppointmentTime = (date) => {
        const myDate = new Date(date);
        const day = ("0" + myDate.getDate()).slice(-2);
        const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
        const year = myDate.getFullYear();
        const hour = myDate.getHours().toString().padStart(2, '0');
        const min = myDate.getMinutes().toString().padStart(2, '0');
        const sc = myDate.getSeconds().toString().padStart(2, '0');


        return `${year}-${month}-${day} ${hour}:${min}:${sc}`;
    };

    function chuckPosts(arr, len) {
        const chunks = [];
        let i = 0;
        while (i < arr.length) {
            chunks.push(arr.slice(i, i + len));
            i += len;
        }
        return chunks;
    }

    const openAndSetId = (id) => {
        setIsAppointment(true)
        setJskSubmit(id)
    }

    const openPredictPersonal = (data) => {
        setPredictData(data)
        setIsPredict(true)
    }

    const allSubmit = chuckPosts(listSubmittion, 8)

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        getSubmittion()
        getPostId()
    }, [])

    let listData
    if (listSubmittion.length > 0) {
        listData = (<>
            {allSubmit[currentPage].map((sub, id) => (
                <SingleRowSubmit submit={sub} num={id} position={postCurrent.position} key={id} openAppointment={openAndSetId} predict={openPredictPersonal} />
            ))
            }
        </>)
    }
    else listData = (
        <div className="row-data-listpost">
            No candidate has applied for this job yet!
        </div>
    )

    const statePost = (status) => {
        let body
        if (status === "ACTIVE")
            body = (<div className='selected-create-appointment state-green'>
                <i className="fa fa-check-circle-o" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                Accepted
            </div>)
        else if (status === "WAIT_FOR_ACCEPT")
            body = (<div className='selected-create-appointment state-yellow'>
                <i className="fa fa-exclamation-circle" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                Pending
            </div>)
        else if (status === "DELETED_BY_ADMIN")
            body = (<div className='selected-create-appointment state-red'>
                <i className="fa fa-times-circle" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                Unaccept
            </div>)
        else {
            body = (<div className='selected-create-appointment state-green'>
                <i className="fa fa-check-circle-o" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                Accepted
            </div>)
        }
        return body
    }

    const toPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const toNextPage = () => {
        if (currentPage < allSubmit.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const toAnyPage = (page) => {
        setCurrentPage(page)
    }

    const onChangeNoteAppointment = (value) => {
        setNoteAppoint(value)
    }

    const closeAppointmentForm = () => {
        setIsAppointment(false)
    }

    const onClickCreateAppoint = async () => {
        const info = {
            empId: user.id,
            userId: jskIdSubmit,
            note: noteAppoint,
            startTime: appointmentTime,
        }
        const res = await createAppointment(info)
        if (res.success)
            swal({
                title: "Success",
                icon: "success",
                text: "Created Appointment successfully!",
                dangerMode: false,
            })
        setIsAppointment(false)
    }

    const onChangeAppointmentDate = (event) => {
        setAppointmentTime(getAppointmentTime(event.target.value))
    }

    return (<>
        <div style={{ width: "80%" }}>
            <div className="component-title">
                <span>Submitted details</span>
            </div>
            <div className="free-space" id="free-space" style={{ justifyContent: 'flex-start', paddingTop: '35px', paddingBottom: '2%' }}>
                <div className='row-title-status'>
                    <div className='title-and-expoet-btn'>
                        {postCurrent.title} <p>{'('}{listSubmittion.length}{' '}{'submits'}{')'}</p>
                    </div>
                    {statePost(postCurrent.status)}
                </div>
                <div className='sort-by-date-export-btn'>
                    <div className='select-date'>
                        Sort:
                        <select >
                            <option> Submited time</option>
                        </select>
                    </div>
                    {/* <div className='ex-button' style={{ width: "16%", height: "50px" }}>
                        <div style={{ marginRight: "20px", justifyContent: "center", display: "flex", width: "100%" }}>Export list</div>
                    </div> */}
                </div>
                <div className="content-wrapper" style={{ height: "580px", padding: "0px", gap: "0" }}>
                    <div className="col-title-listpost" style={{ fontWeight: 500 }}>
                        <div style={{ width: "25px" }}>
                            No.
                        </div>
                        <div style={{ width: "30%" }}>
                            Name profile
                        </div>
                        <div style={{ width: "25%" }}>
                            Position apply
                        </div>
                        <div style={{ width: "12%" }}>
                            Submited time
                        </div>
                        <div style={{ width: "12%", display: "flex", justifyContent: "center" }}>
                            Attached Profile
                        </div>
                        <div style={{ width: "8%", display: "flex", justifyContent: "end" }}>
                            Others
                        </div>
                    </div>
                    {listData}
                </div>
                <div className="paging-post" style={{ marginTop: '15px' }}>
                    <div className="circle-round" onClick={toPreviousPage}>
                        <img src={leftArrow} alt='icon' />
                    </div>
                    {allSubmit.map((p, id) => (
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


        <div className='form-submit-cv' style={isPredict ? { display: 'block' } : { display: 'none' }}>
            <div className='form-submit-report-control'>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '40px' }}>
                    <div style={{ color: '#0c62ad', fontWeight: 600 }}>
                        Information about job seekers
                    </div>
                    <div><img src={addIcon} className='close-form-submit' alt='' onClick={() => { setIsPredict(false) }} /></div>
                </div>
                <div style={{ display: 'flex', height: '30px', fontSize: '1em', color: "#6c6c6c" }}>
                    {' * '}Here is the introduction that the candidate wants to show you.
                </div>
                <p style={{ color: '#000', fontSize: '1em', fontWeight: 500 }}> Introduction:</p>
                <div dangerouslySetInnerHTML={{ __html: predictData.coverLetter }}
                    style={{ height: '250px', overflowY: 'auto', border: '1px solid #6c6c6c', borderRadius: '3px', padding: '10px' }}></div>
                <p style={{ color: '#000', fontSize: '1em', fontWeight: 500, paddingTop: '20px' }}>
                    Personality is guessed based on the cover letter:
                </p>
                <div style={{ color: '#0c62ad', padding: '0 10px' }}>
                    {`${predictData.personality}: ${findPersonalityDesc(predictData.personality)}`}
                </div>
                {/* <div style={{ color: '#000', fontSize: '1em', fontWeight: 500, paddingTop: '20px', display:'flex' }}>
                    Percentage that matches your job: 
                    <p style={{ color: '#0c62ad' }}>{predictData.matchPercent} %</p>
                </div> */}
                <div className="group-buttons flex-row"
                    style={{ display: 'flex', justifyContent: 'end', marginTop: '20px', gap: '1em' }}>

                    <div className="button btn-close" onClick={() => { setIsPredict(false) }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                        CLOSE
                    </div>
                </div>

            </div>
        </div>



        <div className='form-submit-cv' style={isAppointment ? { display: 'block' } : { display: 'none' }}>
            <div className='form-submit-report-control'>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                    <div className='note-title'>
                        Note
                    </div>
                    <div><img src={addIcon} className='close-form-submit' alt='' onClick={() => { closeAppointmentForm() }} /></div>
                </div>
                <div style={{ display: 'flex', height: '30px', fontSize: '1em', color: "#6c6c6c" }}>
                    {' * '}Give the candidate some necessary information, or requirements for the candidate.
                </div>
                <ReactQuill value={noteAppoint} onChange={onChangeNoteAppointment} />
                <div style={{ display: 'flex', height: '30px', fontSize: '1em', color: "#6c6c6c" }}>
                    {' * '}Select a date for the meeting.
                </div>
                <input type="date" name="title"
                    className='input-time-appointment'
                    min={minDate}
                    id="inp-add-post-page"
                    onChange={onChangeAppointmentDate}
                ></input>
                <div className="group-buttons flex-row"
                    style={{ display: 'flex', justifyContent: 'end', marginTop: '20px', gap: '1em' }}>
                    <div className="button" onClick={() => onClickCreateAppoint()}>
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        SEND
                    </div>
                    <div className="button btn-close" onClick={() => { closeAppointmentForm() }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                        CLOSE
                    </div>
                </div>

            </div>
        </div>
    </>
    )
}
export default SubmitDetail