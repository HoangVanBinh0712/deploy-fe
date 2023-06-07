import React from 'react'

const SearchComponent = () => {

    
  return (
    <div className="app">
      <image src="/picture-banner/banner-search.png"></image>
      <div className="d-flex justify-content-evenly align-items-end mt-4">
        <div className="card card-search">
          <div className="card-body">
            <div className="search-filter">
              <div className="search-a d-flex justify-content-around">
                <input
                  className="input-search"
                  type="text"
                  placeholder="Job title, position you want to apply for..."
                />
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All industries
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All areas
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All cities
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <button type="button" className="btn btn-primary">Search</button>
              </div>
              <div className="d-flex justify-content-around mt-4">
                <h4>Filter:</h4>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All experience
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All salary
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All levels
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Type of work
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Time
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Gender
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <a href="">Clear selection</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-evenly align-items-end mt-4">
        Found 3,154 jobs matching your request
      </div>
      <div className="d-flex justify-content-evenly align-items-end mt-4">
        <div className="card card-search mt-4">
          <div className="card-body">
            <div className="container text-center">
              <div className="row g-2">
                <div className="col-8">
                  <div>
                    <div className="d-flex recruitment-information">
                      <div className="logo">
                        <image
                          className="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div className="information">
                        <h3 className="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                          <i className="fa-solid fa-check"></i>
                        </h3>
                        <h5 className="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" className="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" className="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" className="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" className="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-3 recruitment-information">
                      <div className="logo">
                        <image
                          className="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div className="information">
                        <h3 className="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 className="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" className="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" className="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" className="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" className="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-3 recruitment-information">
                      <div className="logo recruitment-information">
                        <image
                          className="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div className="information">
                        <h3 className="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 className="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" className="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" className="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" className="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" className="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-3 recruitment-information">
                      <div className="logo recruitment-information">
                        <image
                          className="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div className="information">
                        <h3 className="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 className="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" className="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" className="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" className="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" className="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-3 recruitment-information">
                      <div className="logo recruitment-information">
                        <image
                          className="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div className="information">
                        <h3 className="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 className="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" className="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" className="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" className="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" className="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-3 recruitment-information">
                      <div className="logo recruitment-information">
                        <image
                          className="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div className="information">
                        <h3 className="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 className="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" className="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" className="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" className="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" className="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-3 recruitment-information">
                      <div className="logo recruitment-information">
                        <image
                          className="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div className="information">
                        <h3 className="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 className="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" className="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" className="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" className="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" className="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3">
                    <h4>Maybe you are interested</h4>
                    <div className="interested-informartion">
                      <h4 className="interested-title">
                        TUYỂN THỰC TẬP SINH SINH VIÊN NGÀNH CNTT...
                      </h4>
                      <div className="d-flex">
                        <div>
                          <image
                            className="logo-image"
                            src="/picture-banner/tma-logo.png"
                          ></image>
                        </div>
                        <div>
                          <button type="button" className="btn btn-primary">
                            Bán thời gian
                          </button>
                          <h4 className="interested-company-name">
                            Công ty: Công ty TNHH Giải Pháp Phần Mềm Tường Minh
                          </h4>
                          <div className="d-flex justify-content-between">
                            <p>12 triệu</p>
                            <p>30/05/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="interested-informartion mt-3">
                      <h4 className="interested-title">
                        TUYỂN THỰC TẬP SINH SINH VIÊN NGÀNH CNTT...
                      </h4>
                      <div className="d-flex">
                        <div>
                          <image
                            className="logo-image"
                            src="/picture-banner/tma-logo.png"
                          ></image>
                        </div>
                        <div>
                          <button type="button" className="btn btn-primary">
                            Bán thời gian
                          </button>
                          <h4 className="interested-company-name mt-2">
                            Công ty: Công ty TNHH Giải Pháp Phần Mềm Tường Minh
                          </h4>
                          <div className="d-flex justify-content-between mt-4">
                            <p>12 triệu</p>
                            <p>30/05/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="interested-informartion mt-3">
                      <h4 className="interested-title">
                        TUYỂN THỰC TẬP SINH SINH VIÊN NGÀNH CNTT...
                      </h4>
                      <div className="d-flex">
                        <div>
                          <image
                            className="logo-image"
                            src="/picture-banner/tma-logo.png"
                          ></image>
                        </div>
                        <div>
                          <button type="button" className="btn btn-primary">
                            Bán thời gian
                          </button>
                          <h4 className="interested-company-name">
                            Công ty: Công ty TNHH Giải Pháp Phần Mềm Tường Minh
                          </h4>
                          <div className="d-flex justify-content-between">
                            <p>12 triệu</p>
                            <p>30/05/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="btn btn-primary upload-profile"
                      >
                        Upload Profile
                      </button>
                      <image
                        className="image-update-cv"
                        src="/picture-banner/update-cv.png"
                      ></image>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
export default SearchComponent;