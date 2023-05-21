import "../../employee_scenes/css/Homepage.css";
import { useContext, useState } from 'react';
import banner1 from "../../assets/img/banner-home.png"
import banner2 from "../../assets/img/banner-home-or.png"
import banner3 from "../../assets/img/banner-home-or2.png"
import { GlobalContext } from '../../contexts/GlobalContext';


const Baner = () => {

    const { globalState: { cities } } = useContext(GlobalContext)

    const banner = [banner1, banner2, banner3]
    const [currentSlide, setCurrentSlide] = useState(0);

    function nextImage() {
        if (currentSlide + 1 >= banner.length) {
            setCurrentSlide(0);
        }
        else {
            setCurrentSlide(currentSlide + 1);
        }
    }


    const [searchInfo, setSearchInfo] = useState({
        keyword: '',
        cityId: 0,
    })
    const { keyword, cityId } = searchInfo

    const onChangeInputKeyword = (event) => setSearchInfo({
        ...searchInfo,
        keyword: event.target.value,
    })

    const onChangeSelectCity = (event) => setSearchInfo({
        ...searchInfo,
        cityId: event.target.value,
    })

    const onClickSearch = () => {
        let searchQuery = ''
        if (keyword.length > 0) {
            if (searchQuery.length === 0)
                searchQuery += `?keyword=${keyword}`
            else searchQuery += `&keyword=${keyword}`
        }
        if (cityId > 0) {
            if (searchQuery.length === 0)
                searchQuery += `?cityId=${cityId}`
            else searchQuery += `&cityId=${cityId}`
        }
        window.location.href = `/posts${searchQuery}`
    }

    let body = (
        <div className="banner-top">
            <img src={banner[currentSlide]} alt="Banner" />
            <div className="search-bar-home">
                <div className="mg-input-searchbar keyword-search-inhome">
                    <input className="input-search-homepage"
                        type="text"
                        name="keyword"
                        value={keyword}
                        placeholder="Enter jobs, skills,..."
                        onChange={onChangeInputKeyword}
                    />
                </div>
                <div className="mg-input-searchbar location-search-inhome">
                    <select className="input-search-homepage custom-select"
                        name="location"
                        placeholder="All location"
                        defaultValue={0}
                        onChange={onChangeSelectCity}>
                        <option value={0}>All location</option>
                        {cities.length !== 0 && cities.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="btn-search-inhome">
                    <div className="custome-btn-search" onClick={onClickSearch}>
                        <div className="icon-ssearch">
                        </div>
                        <span>Search</span>
                    </div>
                </div>
            </div>
        </div>
    )



    return (
        <>
            {body}
        </>
    )
}
export default Baner;