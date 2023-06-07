import React, { useEffect } from 'react'
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

    const removeVietnameseAccents = (str) => {
        const map = {
          'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
          'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
          'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
          'đ': 'd',
          'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
          'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
          'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
          'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
          'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
          'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
          'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
          'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
          'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
          'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
          'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
          'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
          'Đ': 'D',
          'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
          'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
          'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
          'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
          'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
          'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
          'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
          'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
          'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y'
        };
    
        return str.replace(/[^A-Za-z0-9]/g, function (x) {
          return map[x] || x;
        });
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
                                {removeVietnameseAccents(c.name)}
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