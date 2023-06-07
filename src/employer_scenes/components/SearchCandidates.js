import '../../employee_scenes/css/search-page.css'
import '../css/candidate.css'
import bannerSearch from '../../assets/picture-banner/banner-search.png'
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"
import SingleCandidateProfile from './SingleCandidateProfile'

import { useState, useContext, useEffect } from 'react'
import { useToast } from '../../contexts/Toast'
import { GlobalContext } from '../../contexts/GlobalContext'
import { AuthContext } from '../../contexts/AuthContext'
import swal from "sweetalert";

const SearchCandidates = () => {

    const { getUserProfileByAnyFilter, viewProfileJSK } = useContext(AuthContext)
    const { globalState: { cities, industries } } = useContext(GlobalContext)
    // single-time read
    const [listProfileResult, setListProfileResult] = useState([])

    const [searchInfo, setSearchInfo] = useState({
        keyword: '',
        method: '',
        position: '',
        experience: '',
        industryId: '',
        cityId: '',
    })
    const { method, position, experience } = searchInfo

    const [inputKeyword, setKeyword] = useState('')
    const [selectIndustry, setIndustry] = useState('')
    const [inputCity, setCity] = useState('')
    const [isSearched, setIsSearched] = useState(false)
    const onChangeInputKeyword = (event) => {
        setKeyword(event.target.value)
    }
    const onChangeSelectIndustry = (event) => {
        setIndustry(event.target.value)
    }
    const onChangeInputCity = (event) => {
        setCity(event.target.value)
    }

    const onClickSearch = () => {
        setSearchInfo({
            ...searchInfo,
            keyword: inputKeyword,
            cityId: inputCity,
            industryId: selectIndustry,
        })

    }

    const createSearchPararam = (obj) => {
        let searchQuery = '?limit=48'
        for (let prop in obj) {
            if (obj[prop].length > 0) {
                searchQuery += `&${prop}=${obj[prop]}`
            }
        }
        return searchQuery
    }

    const getCvSearch = async (searchQr) => {
        const res = await getUserProfileByAnyFilter(searchQr)
        if (res.success) {
            setListProfileResult(res.data)
            setAllPost(chuckPosts(res.data, 6))
        }
        else swal({
            title: "Error",
            icon: "warning",
            text: res.message,
            dangerMode: true,
        })
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


    const [allPost, setAllPost] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    useEffect(() => {
        const searchQuery = createSearchPararam(searchInfo)
        getCvSearch(searchQuery)
        if (searchQuery.length > 9) {
            setIsSearched(true)
        }
        else setIsSearched(false)
    }, [searchInfo])

    const onChangeExp = (event) => {
        setSearchInfo({
            ...searchInfo,
            experience: event.target.value,
        })
    }
    const onChangePosition = (event) => {
        setSearchInfo({
            ...searchInfo,
            position: event.target.value,
        })
    }
    const onChangeType = (event) => {
        setSearchInfo({
            ...searchInfo,
            method: event.target.value,
        })
    }

    const onClickClearSelection = () => {
        setSearchInfo({
            ...searchInfo,
            experience: '',
            position: '',
            method: '',
        })
    }

    const scrollTop = (position) => {
        window.scrollTo({ top: position, behavior: 'smooth' });
    };

    const toPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
        scrollTop(350)
    }
    const toNextPage = () => {
        if (currentPage < allPost.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const toAnyPage = (page) => {
        setCurrentPage(page)
    }

    const [isOpenProfile, setIsOpenProfile] = useState(false)

    const initCandidate = {
        url: "https://res.cloudinary.com/dh0hs3o2a/image/upload/v1673146190/qvi636rtvl7jlfhjnu5f.pdf",
        name: "CV Frontend",
        workExperiences: "TODO WEBSITE [ 01/11/2022 - 21/11/2022 ] Team member",
        skillsAndKnowledges: "Experience\nWork: 2 months internship at FPT software\nKnowledge of Java, C++, C#, JavaScirpt, OOP.\nDatabase: SQL Server, MySQL, MongoDB.\nTools: Git & Github, VSCode, Eclipse\nWeb: Java Spring, Java Servlet, React, NodeJs, Angular",
        user: {
            id: 1,
            email: "thebest11447@gmail.com",
            emailConfirm: false,
            name: "Hoang Van Binh",
            phone: "0422995300",
            city: {
                id: 1,
                name: "TP Hồ Chí Minh"
            },
            industry: {
                id: 3,
                name: "BANKING"
            },
        }
    }

    const [candidateInfo, setCandidateInfo] = useState(initCandidate)

    const onClickCvTitle = async (url, userId, mediaId) => {
        viewProfileJSK(userId, mediaId)
        window.open(url, "_blank");
    }

    const onClickOpenCandiInfo = (value) => {
        setCandidateInfo(value)
        setIsOpenProfile(true)
    }

    const onClickCloseForm = () => {
        setIsOpenProfile(false)
        setCandidateInfo(initCandidate)
    }
    return (
        <>
            <div className="search-page" style={{ width: "80%" }}>
                <img className="banner" src={bannerSearch} alt="" />
                <div className="search-bar" style={{ width: "100%" }}>
                    <div className="row-flex-horizon" style={{ marginBottom: '1em' }}>
                        <input className="search-text" type="text"
                            placeholder="Infomation, position you want ..."
                            value={inputKeyword}
                            onChange={onChangeInputKeyword} />
                        <select className="search-select option-select-page-search" onChange={onChangeSelectIndustry}>
                            <option value="" selected={selectIndustry === ''}>All industries</option>
                            {industries.map((i) => (
                                <option key={i.id} value={i.id} selected={selectIndustry === i.id}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                        <select className="search-select option-select-page-search" onChange={onChangeInputCity}>
                            <option value="" selected={inputCity === ''}>All areas</option>
                            {cities.map((c) => (
                                <option key={c.id} value={c.id} selected={inputCity === c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <div className="button styling-btn-search" onClick={() => { onClickSearch() }}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                            Search
                        </div>
                    </div>
                    <div className="row-flex-horizon row-filter" >
                        <select className="search-select blue-border-select" onChange={onChangeExp}>
                            <option value="" selected={experience === ''}>All experience</option>
                            <option value="NONE" selected={experience === 'NONE'}>None</option>
                            <option value="UNDER_ONE_YEAR" selected={experience === 'UNDER_ONE_YEAR'}>Under one year</option>
                            <option value="ONE_YEAR" selected={experience === 'ONE_YEAR'}>One year</option>
                            <option value="TWO_YEAR" selected={experience === 'TWO_YEAR'}>Two year</option>
                            <option value="THREE_YEAR" selected={experience === 'THREE_YEAR'}>Three year</option>
                            <option value="FOUR_YEAR" selected={experience === 'FOUR_YEAR'}>Four year</option>
                            <option value="FIVE_YEAR" selected={experience === 'FIVE_YEAR'}>Five year</option>
                            <option value="ABOVE_FIVE_YEAR" selected={experience === 'ABOVE_FIVE_YEAR'}>Above five year</option>
                        </select>

                        <select className="search-select blue-border-select" onChange={onChangePosition}>
                            <option value="" selected={position === ''}>Position</option>
                            <option value="Staff" selected={position === 'Staff'}>Staff</option>
                            <option value="Leader" selected={position === 'Leader'}>Leader</option>
                            <option value="Manager" selected={position === 'Manager'}>Manager</option>
                            <option value="Deputy" selected={position === 'Deputy'}>Deputy</option>
                            <option value="Vice_President" selected={position === 'Vice_President'}>Vice president</option>
                            <option value="Branch_Manager" selected={position === 'Branch_Manager'}>Branch manager</option>

                        </select>
                        <select className="search-select blue-border-select" onChange={onChangeType}>
                            <option value="" selected={method === ''}>Type of work</option>
                            <option value="FULL_TIME" selected={method === 'FULL_TIME'}>Full time</option>
                            <option value="PART_TIME" selected={method === 'PART_TIME'}>Part time</option>
                            <option value="INTERN" selected={method === 'INTERN'}>Intern</option>
                        </select>

                        <p className='clear-selection' onClick={onClickClearSelection}>Clear selection</p>
                    </div>

                </div>
                {isSearched ? (
                    <div className='quantity-number-rusult' style={{ width: "98%" }}> Found <p> {listProfileResult.length} </p> candidates matching your request.</div>
                ) : (
                    <div className='quantity-number-rusult' style={{ width: "98%" }}> We have <p> {listProfileResult.length} </p> candidates.</div>
                )}

                <div className="search-content" style={{ width: "100%" }}>
                    <div className="list-post" style={{ width: '100%' }}>
                        {listProfileResult.length > 0 ? (<>
                            {allPost[currentPage].map((a, id) => (
                                <SingleCandidateProfile data={a} key={id} openClick={onClickOpenCandiInfo} />
                            ))
                            }
                        </>) : (<></>)}
                        <div className="paging-post" style={{ marginTop: '15px' }}>
                            <div className="circle-round" onClick={toPreviousPage}>
                                <img src={leftArrow} alt='icon' />
                            </div>
                            {allPost.map((p, id) => (
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
            <div className='form-candidate-profile' onClick={(e) => {
                if (!document.getElementById('form-info-candidate-control').contains(e.target))
                    setIsOpenProfile(false)
            }} style={isOpenProfile ? { display: 'block' } : { display: 'none' }}>
                <div className='form-info-candidate-control' id='form-info-candidate-control'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                        <div style={{ color: '#0c62ad' }}>
                            {`${candidateInfo.user.name}'s Infomation`}
                        </div>
                        <div>
                            <i className="fa fa-times" aria-hidden="true"
                                style={{ height: '25px', width: 'auto', color: '#6c6c6c', cursor: 'pointer' }} onClick={() => onClickCloseForm()}>
                            </i>
                        </div>
                    </div>
                    <div className='name-candidate bs-info'>
                        <div style={{ marginRight: '10px', color: 'black', fontWeight: '500' }}>Name:</div>
                        {candidateInfo.user.name}
                    </div>
                    <div className='name-candidate bs-info'>
                        <div style={{ marginRight: '10px', color: 'black', fontWeight: '500' }}>Email:</div>
                        {candidateInfo.user.email}
                    </div>
                    <div className='name-candidate bs-info'>
                        <div style={{ marginRight: '10px', color: 'black', fontWeight: '500' }}>Phone:</div>
                        {candidateInfo.user.phone}
                    </div>
                    <div className='name-candidate' style={{ width: '20%', color: 'black', fontWeight: '500' }}>
                        {`Experiences:`}
                    </div>
                    <div className='exp-area'
                        dangerouslySetInnerHTML={{ __html: candidateInfo.workExperiences.length > 0 ? candidateInfo.workExperiences : '' }}>

                    </div>
                    <div className='name-candidate' style={{ width: '30%', color: 'black', fontWeight: '500' }}>
                        {`Skill and Knowledges:`}
                    </div>
                    <div className='exp-area'
                        dangerouslySetInnerHTML={{ __html: candidateInfo.skillsAndKnowledges.length > 0 ? candidateInfo.skillsAndKnowledges : '' }}>

                    </div>
                    <div style={{ display: 'flex', height: '30px', fontSize: '1em', color: "#6c6c6c", paddingLeft: '20px' }}>
                        {' * '}Click on profile name to view.
                    </div>
                    <div className="cart-description-profile" style={{ cursor: 'pointer', paddingLeft: '20px' }}
                        onClick={() => onClickCvTitle(candidateInfo.url, candidateInfo.user.id, candidateInfo.mediaId)}>
                        <i className="fa fa-file-text-o" aria-hidden="true" style={{ margin: '0 5px', color: '#0c62ad' }}></i>
                        {candidateInfo.name}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <div className="button btn-close" onClick={() => { onClickCloseForm() }}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                            CLOSE
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchCandidates;