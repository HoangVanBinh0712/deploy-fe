import { useContext, useEffect, useState } from "react"
import SinglePostCvSubmit from "./SinglePostCvSubmit";
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import { PostContext } from "../../contexts/PostContext";

const CandidatesProfile = () => {

    const { getEmpPost } = useContext(PostContext)

    const [filter, setFilter]= useState({
        method:'',
        position:'',
        status:''
    })
    const {method, position, status}=filter
    const [postDisplay, setPostDisplay] = useState([])

    const getallPost = async (keyword) => {
        const res = await getEmpPost(keyword)
        if (res.success) {
            setPostDisplay(res.data.reverse())
        }
    }

    const createSearchPararam = (obj) => {
        let searchQuery = ''
        searchQuery += '?limit=48'
        for (let prop in obj) {
            searchQuery += `&${prop}=${obj[prop]}`
        }
        return searchQuery
    }

    useEffect(() => {
        const keyword = createSearchPararam(filter)
        getallPost(keyword)
    }, [filter])

    const post = postDisplay

    function chuckPosts(arr, length) {
        const chunks = [];
        let i = 0;
        while (i < arr.length) {
            chunks.push(arr.slice(i, i + length));
            i += length;
        }
        return chunks;
    }

    const allPost = chuckPosts(post, 8)

    const [currentPage, setCurrentPage] = useState(0)

    const toPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const toNextPage = () => {
        if (currentPage < allPost.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const toAnyPage = (page) => {
        setCurrentPage(page)
    }

    const onChangeSelectPost = (event) => {
        setFilter({
            ...filter,
            status:event.target.value
        })
    }

    const onChangeSelectPosition = (event) => {
        setFilter({
            ...filter,
            position:event.target.value
        })
    }

    const onChangeSelectType = (event) => {
        setFilter({
            ...filter,
            method:event.target.value
        })
    }

    const onClickClearFilter = ()=>{
        setFilter({
            ...filter,
            method:'',
            position:'',
            status:'',
        })
    }


    return (
        <div style={{ width: "80%" }}>
            <div className="component-title">
                <span>Your job posting</span>
            </div>
            <div className="free-space" id="free-space" style={{paddingTop:'20px'}}>
                <div className='select-filer-row'>
                    <div className='select-filer-group'>
                        <div className='title-filter'>
                            Filter:
                        </div>
                        <div className='select-item'>
                            <select onChange={onChangeSelectPost} defaultValue={''}>
                                <option value={''} selected={status === ''}> All post</option>
                                <option value={'ACTIVE'} selected={status === 'ACTIVE'}> Approved post</option>
                                <option value={'WAIT_FOR_ACCEPT'} selected={status === 'WAIT_FOR_ACCEPT'}> Pending post</option>
                                <option value={'DELETED_BY_ADMIN'} selected={status === 'DELETED_BY_ADMIN'}> Denied post</option>
                            </select>
                        </div>
                        <div className='select-item'>
                            <select onChange={onChangeSelectPosition} defaultValue={''}>
                                <option value="" selected={position === ''}>All position</option>
                                <option value="Staff" selected={position === 'Staff'}>Staff</option>
                                <option value="Leader" selected={position === 'Leader'}>Leader</option>
                                <option value="Manager" selected={position === 'Manager'}>Manager</option>
                                <option value="Deputy" selected={position === 'Deputy'}>Deputy</option>
                                <option value="Vice_President" selected={position === 'Vice_President'}>Vice president</option>
                                <option value="Branch_Manager" selected={position === 'Branch_Manager'}>Branch manager</option>
                            </select>
                        </div>
                        <div className='select-item'>
                            <select onChange={onChangeSelectType} defaultValue={''}>
                                <option value="" selected={method === ''}>Type of work</option>
                                <option value="FULL_TIME" selected={method === 'FULL_TIME'}>Full time</option>
                                <option value="PART_TIME" selected={method === 'PART_TIME'}>Part time</option>
                                <option value="INTERN" selected={method === 'INTERN'}>Intern</option>
                            </select>
                        </div>
                        <div className='clear-select-item'>
                            <p onClick={()=>onClickClearFilter()}>Clear selection </p>
                        </div>
                    </div>
                    {/* <div className='ex-button' style={{ width: "16%", height: "50px", display:'none' }}>
                        <div style={{ marginRight: "20px", justifyContent: "center", display: "flex", width: "100%" }}>Export list</div>
                    </div> */}
                </div>
                <div className="content-wrapper" style={{ height: "580px", padding: "0px", gap: "0" }}>
                    <div className="col-title-listpost">
                        <div style={{ width: "25px" }}>
                            No.
                        </div>
                        <div style={{ width: "30%" }}>
                            Post title
                        </div>
                        <div style={{ width: "12%" }}>
                            Create date
                        </div>
                        <div style={{ width: "12%" }}>
                            Expiration
                        </div>
                        <div style={{ width: "8%", display: "flex", justifyContent: "center" }}>
                            Applied
                        </div>
                        <div style={{ width: "8%", display: "flex", justifyContent: "center" }}>
                            Viewed
                        </div>
                        <div style={{ width: "10%", display: "flex", justifyContent: "center" }}>
                            State
                        </div>
                        <div style={{ width: "8%", display: "flex", justifyContent: "end" }}>
                            Others
                        </div>
                    </div>
                    {postDisplay.length === 0 ? (
                        <div style={{ display: "flex", justifyContent: "center" }}> You don't have any posts yet</div>)
                        : (allPost[currentPage].map((p, id) => (
                            <SinglePostCvSubmit post={p} key={id} num={id}/>))
                        )
                    }

                </div>
                <div className="paging-post" style={{ marginTop: '-10px' }}>
                    <div className="circle-round" onClick={toPreviousPage}>
                        <img src={leftArrow} alt='icon' style={{ height: "95%" }} />
                    </div>
                    {allPost.map((p, id) => (
                        <div className="page-num-round" onClick={() => { toAnyPage(id) }} key={id}
                            style={currentPage === id ? { backgroundColor: "#0c62ad", border: "2px solid #0c62ad" } : { backgroundColor: "#cfcfcf", border: "2px solid #cfcfcf" }}
                        >

                        </div>
                    ))}
                    <div className="circle-round" onClick={toNextPage}>
                        <img src={rightArrow} alt='icon' style={{ height: "95%" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CandidatesProfile