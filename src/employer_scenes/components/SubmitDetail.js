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


const SubmitDetail = () => {

    let { id } = useParams();
    const { getCvSubmited, getPostById } = useContext(PostContext)
    const {warn, success} = useToast()

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    const [listSubmittion, setListSubmiition] = useState([])
    const [postCurrent, setPostCurrent] = useState({})
    const [isPredict, setIsPredict] = useState(false)
    const [isAppointment, setIsAppointment] = useState(false)
    const [jskIdSubmit, setJskSubmit] = useState(0)
    const [noteAppoint, setNoteAppoint] = useState('')
    const [appointmentTime, setAppointmentTime] = useState(minDate)

    const getSubmittion = async () => {
        const res = await getCvSubmited(id)
        if (res.success) setListSubmiition(res.data)
    }

    const getPostId = async () => {
        const res = await getPostById(id)
        if (res.success) setPostCurrent(res.data)
    }

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
                <SingleRowSubmit submit={sub} num={id} position={postCurrent.position} key={id} openAppointment={openAndSetId} />
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
        success('Created Appointment successfully!')
        setTimeout(() => {
            setIsAppointment(false)
          }, 2000)
    }

    const onChangeAppointmentDate = (event) => {
        setAppointmentTime(event.target.value)
    }

    return (<>
        <div style={{ width: "80%" }}>
            <div className="component-title">
                <span>Submitted details</span>
            </div>
            <div className="free-space" id="free-space" style={{ justifyContent: 'flex-start', paddingTop: '35px', paddingBottom: '2%' }}>
                <div className='row-title-status'>
                    <div className='title-and-expoet-btn'>
                        Maketing, sale staff <p>{'('}{listSubmittion.length}{' '}{'submits'}{')'}</p>
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
                    <div className='ex-button' style={{ width: "16%", height: "50px" }}>
                        <div style={{ marginRight: "20px", justifyContent: "center", display: "flex", width: "100%" }}>Export list</div>
                    </div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                    {/* <div className='name-post-report'>
                        {data.title}
                    </div>
                    <div><img src={addIcon} className='close-form-submit' alt='' onClick={() => { closeFormReport() }} /></div> */}
                </div>
                <div style={{ display: 'flex', height: '30px', fontSize: '1em', color: "#6c6c6c" }}>
                    {' * '}Let us know why you're reporting this post.
                </div>
                {/* <p style={{ color: '#ff453a', fontSize: '1em' }}> {mess}</p>
                <div className="group-buttons flex-row"
                    style={{ display: 'flex', justifyContent: 'end', marginTop: '20px', gap: '1em' }}>
                    <div className="button" onClick={() => submitReport()}>
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        SEND
                    </div>
                    <div className="button btn-close" onClick={() => { closeFormReport() }}>
                        <i className="fa fa-times" aria-hidden="true" style={{ height: '25px', width: 'auto', }}></i>
                        CLOSE
                    </div>
                </div> */}

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
                        <i className="fa fa-times" aria-hidden="true" style={{ height: '25px', width: 'auto', }}></i>
                        CLOSE
                    </div>
                </div>

            </div>
        </div>
    </>
    )
}
export default SubmitDetail