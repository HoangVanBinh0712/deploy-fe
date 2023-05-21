import '../css/search-page.css'
import TopBar from '../../components/global/TopBar'
import Footer from '../../components/global/Footer'
import bannerSearch from '../../assets/picture-banner/banner-search.png'
import roundheartIcon from "../../assets/icons/round-heart-icon.png"
import heartIcon from "../../assets/icons/heart-icon.png"
import updPic from '../../assets/picture-banner/update-cv.png'
import logoPost from "../../assets/icons/logo.png"
import leftArrow from "../../assets/icons/left-arow-icon.png"
import rightArrow from "../../assets/icons/right-arow-grey-icon.png"


import { useSearchParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { useToast } from '../../contexts/Toast'
import { PostContext } from '../../contexts/PostContext'
import { GlobalContext } from '../../contexts/GlobalContext'
import { AuthContext } from '../../contexts/AuthContext'

const SearchPageComponent = () => {

    const { authState: { authloading, role } } = useContext(AuthContext)
    const { postState: { postFollow, postMostView }, getPostByAnyFilter, followPost, unfollowPost, } = useContext(PostContext)
    const { globalState: { cities, industries } } = useContext(GlobalContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const { warn, success } = useToast()
    // single-time read
    const params = Object.fromEntries([...searchParams]);
    const [listPostReult, setListPostResult] = useState([])

    const [searchInfo, setSearchInfo] = useState({
        keyword: '',
        minSalary: '',
        method: '',
        position: '',
        experience: '',
        gender: '',
        startDate: '',
        industryId: '',
        cityId: '',
    })
    const { minSalary, method, position, experience, gender, startDate } = searchInfo

    const [inputKeyword, setKeyword] = useState('')
    const [selectIndustry, setIndustry] = useState('')
    const [inputCity, setCity] = useState('')
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

        console.log(inputKeyword, inputCity, selectIndustry)

    }

    const setBeginSearchInfo = (params) => {
        setSearchInfo({
            ...searchInfo,
            keyword: params.keyword !== undefined ? params.keyword : '',
            cityId: params.cityId !== undefined ? params.cityId : '',
        })
        setKeyword(params.keyword !== undefined ? params.keyword : '')
        setCity(params.cityId !== undefined ? params.cityId : '')
    }


    const createSearchPararam = (obj) => {
        let searchQuery = ''
        for (let prop in obj) {
            if (obj[prop].length > 0) {
                if (prop === 'minSalary') {
                    if (searchQuery.length === 0)
                        searchQuery += `?min-salary=${obj[prop]}`
                    else searchQuery += `&min-salary=${obj[prop]}`
                }
                else {
                    if (searchQuery.length === 0)
                        searchQuery += `?${prop}=${obj[prop]}`
                    else searchQuery += `&${prop}=${obj[prop]}`
                }
            }
        }
        return searchQuery
    }

    const getPostSearch = async (searchQR) => {
        const res = await getPostByAnyFilter(searchQR)
        if (res.success) {
            setListPostResult(res.data)
        }
        else warn(res.message)
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

    const allPost = chuckPosts(listPostReult, 8)

    const [currentPage, setCurrentPage] = useState(0)

    const [isMounted, setisMounted] = useState(true)

    useEffect(() => {
        if (isMounted) {
            setBeginSearchInfo(params)
            const searchQuery = createSearchPararam(params)
            getPostSearch(searchQuery)
            setisMounted(false)
        }
        else {
            const searchQuery = createSearchPararam(searchInfo)
            getPostSearch(searchQuery)
        }

    }, [searchInfo])

    function getPastDate(days) {
        const today = new Date();
        const pastDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
        const formatDate = `${pastDate.getFullYear()}-${pastDate.getMonth()}-${pastDate.getDay()}`
        return formatDate;
    }

    const onChangeExp = (event) => {
        setSearchInfo({
            ...searchInfo,
            experience: event.target.value,
        })
    }
    const onChangeSalary = (event) => {
        setSearchInfo({
            ...searchInfo,
            minSalary: event.target.value,
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
    const onChangeDateCreate = (event) => {
        setSearchInfo({
            ...searchInfo,
            startDate: event.target.value,
        })
    }
    const onChangeGender = (event) => {
        setSearchInfo({
            ...searchInfo,
            gender: event.target.value,
        })
    }

    const onClickClearSelection = () => {
        setSearchInfo({
            ...searchInfo,
            experience: '',
            minSalary: '',
            position: '',
            method: '',
            startDate: '',
            gender: '',
        })
    }

    const onClickUpdateProfile = () => {
        if (!authloading && role === "ROLE_USER") {
            window.location.href = '/user/account/add-resume'
        }
        else if (!authloading && role === "ROLE_USER") {
            window.location.href = '/employer/account'
        }
        else {
            window.location.href = '/user/login'
        }
    }

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

    const checkFollow = (id, arr) => {
        const index = arr.findIndex(post => post.id === id);
        if (index !== -1) return true
        else return false
    }

    function getDaysDiff(date) {
        const oneDay = 24 * 60 * 60 * 1000; // số miligiây trong 1 ngày
        const currentDate = new Date();
        const inputDate = new Date(date);
        const diffDays = Math.round(Math.abs((currentDate - inputDate) / oneDay));
        return diffDays;
    }

    const heartClick = async (id) => {
        if (authloading) {
            window.location.href = 'user/login'
        }
        else {
            if (role === "ROLE_USER") {
                if (checkFollow(id, postFollow)) {
                    const res = await unfollowPost(id)
                    if (res.success) {
                        success('The post has been removed from the favorites list.')
                    }
                    else warn(res.message)
                }
                else {
                    const res = await followPost(id)
                    if (res.success) {
                        success('The article has been added to favorites.')
                    }
                    else warn(res.message)
                }
            }
        }
    }

    const onClickImagePost = (empId) => {
        window.location.href = `/recruiter/${empId}`
    }

    const onClickPostTitle = (postId) => {
        window.location.href = `/post/${postId}`
    }

    const getTypeJob = (type) => {
        if (type === "FULL_TIME")
            return 'Full time'
        if (type === "PART_TIME")
            return 'Part time'
        if (type === "INTERN")
            return 'Intern'
    }

    const getPostDate = (date) => {
        const myDate = new Date(date);
        const day = ("0" + myDate.getDate()).slice(-2);
        const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
        const year = myDate.getFullYear();

        return (`${day}/${month}/${year}`)
    }

    let postInResultBox
    if (listPostReult.length > 0) {
        postInResultBox = (<>
            {allPost[currentPage].map((p, id) => (
                <div className="cart" key={id}>
                    <img className="avatar"
                        src={p.author.urlAvatar === null ? logoPost : p.author.urlAvatar}
                        alt=""
                        onClick={() => {onClickImagePost(p.author.id)}} />
                    <div className="cart-info">
                        <p className="title" onClick={() => onClickPostTitle(p.id)}>{p.title}</p>
                        <div className="cart-description">
                            {p.author.name}
                        </div>
                        <div className="row-flex-horizon flex-wrap">
                            <div className='list-item-flex-start'>
                                <div className="item">
                                    <p>{p.salary !== null ? p.salary : ''}{p.currency}</p>
                                </div>
                                <div className="item">
                                    <p>{p.location}</p>
                                </div>
                                <div className="item">
                                    <p>{getDaysDiff(p.createDate)} days ago</p>
                                </div>
                                <div className="item">
                                    <p>{getDaysDiff(p.expirationDate)} days left</p>
                                </div>
                            </div>
                            <div style={role !== "ROLE_EMPLOYER" ? { display: 'block' } : { display: 'none' }} className='follow-post-in-search-page'
                                onClick={() => { heartClick(p.id) }}>
                                {checkFollow(p.id, postFollow) ? (<img src={heartIcon} alt='' style={{ height: '100%', width: 'auto' }} />)
                                    : (<img src={roundheartIcon} alt='' style={{ height: '100%', width: 'auto' }} />)}
                            </div>
                        </div>

                    </div>
                </div>
            ))
            }
        </>
        )
    }
    else {
        postInResultBox = (<>
            There are no posts macth!
        </>
        )
    }

    return (
        <>
            <TopBar />

            <div className="search-page">

                <img className="banner" src={bannerSearch} alt="" />
                <div className="search-bar">
                    <div className="row-flex-horizon" style={{ marginBottom: '1em' }}>
                        <input className="search-text" type="text"
                            placeholder="Job title, position you want ..."
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
                            <i className="fa fa-search" aria-hidden="true" style={{ color: 'white' }}></i>
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
                        <select className="search-select blue-border-select" onChange={onChangeSalary}>
                            <option value="" selected={minSalary === ''}>Min wage</option>
                            <option value="100" selected={minSalary === '100'}>100 USD</option>
                            <option value="200" selected={minSalary === '200'}>200 USD</option>
                            <option value="500" selected={minSalary === '500'}>500 USD</option>
                            <option value="1000" selected={minSalary === '1000'}>1000 USD</option>
                            <option value="2000" selected={minSalary === '2000'}>2000 USD</option>
                            <option value="5000" selected={minSalary === '5000'}>5000 USD</option>
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
                        <select className="search-select blue-border-select" onChange={onChangeDateCreate}>
                            <option value="" elected={startDate === ''}>Date created</option>
                            <option value={getPastDate(1)} selected={startDate === getPastDate(1)}>1 Day ago</option>
                            <option value={getPastDate(7)} selected={startDate === getPastDate(7)}>1 week ago</option>
                            <option value={getPastDate(14)} selected={startDate === getPastDate(14)}>2 week ago</option>
                            <option value={getPastDate(30)} selected={startDate === getPastDate(30)}>1 month ago</option>
                            <option value={getPastDate(60)} selected={startDate === getPastDate(60)}>2 month ago</option>
                            <option value={getPastDate(90)} selected={startDate === getPastDate(90)}>3 month ago</option>
                        </select>
                        <select className="search-select blue-border-select" onChange={onChangeGender}>
                            <option value="" selected={gender === ''}>Gender</option>
                            <option value="MALE" selected={gender === 'MALE'}>Male</option>
                            <option value="FEMALE" selected={gender === 'FEMALE'}>Female</option>
                            <option value="NONE" selected={gender === 'NONE'}>None</option>
                        </select>

                        <p className='clear-selection' onClick={onClickClearSelection}>Clear selection</p>
                    </div>

                </div>
                <div className='quantity-number-rusult'> Found <p> {listPostReult.length} </p> jobs matching your request.</div>
                <div className="search-content">
                    <div className="list-post">
                        {postInResultBox}
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
                    <div className="intro">
                        <h3>May be you are interested</h3>
                        {postMostView.length > 0 ? (
                            <div className="cart-v1">
                                <p className="title" style={{ cursor: "pointer" }}
                                    onClick={() => onClickPostTitle(postMostView[0].id)}>
                                    {postMostView[0].title}</p>
                                <div className="row-flex-horizon align-items-unset">
                                    <img className="avatar"
                                        src={postMostView[0].author.urlAvatar !== null ? postMostView[0].author.urlAvatar : logoPost}
                                        alt=""
                                        style={{ borderRadius: '5px', height: '100px', cursor: "pointer" }}
                                        onClick={() => onClickImagePost(postMostView[0].author.id)} />
                                    <div className="cart-info">
                                        <p className="method">{getTypeJob(postMostView[0].method)}</p>
                                        <div className="cart-description">
                                            Công ty: {' '}{postMostView[0].author.name}
                                        </div>
                                        <div className="row-flex-horizon" style={{ gap: '0.8em', alignItems: 'center' }}>
                                            <div className="item-v1 salary-item">
                                                {postMostView[0].salary !== null ? postMostView[0].salary : ''}{postMostView[0].currency}
                                            </div>
                                            <div className="item-v1 time-item">
                                                {getPostDate(postMostView[0].expirationDate)}
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (<></>)}
                        {postMostView.length > 1 ? (
                            <div className="cart-v1">
                                <p className="title" style={{ cursor: "pointer" }}
                                    onClick={() => onClickPostTitle(postMostView[1].id)}>
                                    {postMostView[1].title}</p>
                                <div className="row-flex-horizon align-items-unset">
                                    <img className="avatar"
                                        src={postMostView[1].author.urlAvatar !== null ? postMostView[1].author.urlAvatar : logoPost}
                                        alt=""
                                        style={{ borderRadius: '5px', height: '100px', cursor: "pointer" }}
                                        onClick={() => onClickImagePost(postMostView[1].author.id)} />
                                    <div className="cart-info">
                                        <p className="method">{getTypeJob(postMostView[1].method)}</p>
                                        <div className="cart-description">
                                            Công ty: {' '}{postMostView[1].author.name}
                                        </div>
                                        <div className="row-flex-horizon" style={{ gap: '0.8em', alignItems: 'center' }}>
                                            <div className="item-v1 salary-item">
                                                {postMostView[1].salary !== null ? postMostView[1].salary : ''}{postMostView[1].currency}
                                            </div>
                                            <div className="item-v1 time-item">
                                                {getPostDate(postMostView[1].expirationDate)}
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (<></>)}
                        {postMostView.length > 2 ? (
                            <div className="cart-v1">
                                <p className="title" style={{ cursor: "pointer" }} onClick={() => onClickPostTitle(postMostView[2].author.id)}>
                                    {postMostView[2].title}
                                </p>
                                <div className="row-flex-horizon align-items-unset">
                                    <img className="avatar"
                                        src={postMostView[2].author.urlAvatar !== null ? postMostView[2].author.urlAvatar : logoPost}
                                        alt=""
                                        style={{ borderRadius: '5px', height: '100px', cursor: "pointer" }}
                                        onClick={() => onClickImagePost(postMostView[2].id)}
                                    />
                                    <div className="cart-info">
                                        <p className="method">{getTypeJob(postMostView[2].method)}</p>
                                        <div className="cart-description">
                                            Công ty: {' '}{postMostView[2].author.name}
                                        </div>
                                        <div className="row-flex-horizon" style={{ gap: '0.8em', alignItems: 'center' }}>
                                            <div className="item-v1 salary-item">
                                                {postMostView[2].salary !== null ? postMostView[2].salary : ''}{postMostView[2].currency}
                                            </div>
                                            <div className="item-v1 time-item">
                                                {getPostDate(postMostView[2].expirationDate)}
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (<></>)}


                        <div className='flex-update-baner-in-search-page'>
                            <img className="banner-left" src={updPic} alt="" />
                            <div className='upd-profile-btn'>
                                <div className='button' onClick={onClickUpdateProfile}> Update Profile</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default SearchPageComponent;