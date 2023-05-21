import React from 'react'

const SearchComponent = () => {

    
  return (
    <div class="app">
      <image src="/picture-banner/banner-search.png"></image>
      <div class="d-flex justify-content-evenly align-items-end mt-4">
        <div class="card card-search">
          <div class="card-body">
            <div class="search-filter">
              <div class="search-a d-flex justify-content-around">
                <input
                  class="input-search"
                  type="text"
                  placeholder="Job title, position you want to apply for..."
                />
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All industries
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All areas
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All cities
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <button type="button" class="btn btn-primary">Search</button>
              </div>
              <div class="d-flex justify-content-around mt-4">
                <h4>Filter:</h4>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All experience
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All salary
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All levels
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Type of work
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Time
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Gender
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                  </ul>
                </div>
                <a href="">Clear selection</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-evenly align-items-end mt-4">
        Found 3,154 jobs matching your request
      </div>
      <div class="d-flex justify-content-evenly align-items-end mt-4">
        <div class="card card-search mt-4">
          <div class="card-body">
            <div class="container text-center">
              <div class="row g-2">
                <div class="col-8">
                  <div>
                    <div class="d-flex recruitment-information">
                      <div class="logo">
                        <image
                          class="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div class="information">
                        <h3 class="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                          <i class="fa-solid fa-check"></i>
                        </h3>
                        <h5 class="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" class="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" class="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" class="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" class="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3 recruitment-information">
                      <div class="logo">
                        <image
                          class="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div class="information">
                        <h3 class="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 class="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" class="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" class="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" class="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" class="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3 recruitment-information">
                      <div class="logo recruitment-information">
                        <image
                          class="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div class="information">
                        <h3 class="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 class="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" class="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" class="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" class="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" class="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3 recruitment-information">
                      <div class="logo recruitment-information">
                        <image
                          class="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div class="information">
                        <h3 class="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 class="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" class="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" class="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" class="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" class="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3 recruitment-information">
                      <div class="logo recruitment-information">
                        <image
                          class="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div class="information">
                        <h3 class="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 class="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" class="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" class="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" class="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" class="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3 recruitment-information">
                      <div class="logo recruitment-information">
                        <image
                          class="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div class="information">
                        <h3 class="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 class="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" class="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" class="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" class="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" class="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3 recruitment-information">
                      <div class="logo recruitment-information">
                        <image
                          class="logo-image"
                          src="/picture-banner/logo.png"
                        ></image>
                      </div>
                      <div class="information">
                        <h3 class="title-information">
                          Tuyển Nhân Viên Làm Fulltime (Lương cứng 8-10 Triệu +
                          Hoa Hồng) Upto 25 Triệu/Tháng
                        </h3>
                        <h5 class="text-start company-name">
                          CÔNG TY TNHH ABC
                        </h5>
                        <div>
                          <button type="button" class="btn btn-light">
                            15 triệu
                          </button>
                          <button type="button" class="btn btn-light">
                            Tp HCM
                          </button>
                          <button type="button" class="btn btn-light">
                            Cập nhập 1 ngày trước
                          </button>
                          <button type="button" class="btn btn-light">
                            Hạn ứng tuyển: còn 10 ngày
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-3">
                    <h4>Maybe you are interested</h4>
                    <div class="interested-informartion">
                      <h4 class="interested-title">
                        TUYỂN THỰC TẬP SINH SINH VIÊN NGÀNH CNTT...
                      </h4>
                      <div class="d-flex">
                        <div>
                          <image
                            class="logo-image"
                            src="/picture-banner/tma-logo.png"
                          ></image>
                        </div>
                        <div>
                          <button type="button" class="btn btn-primary">
                            Bán thời gian
                          </button>
                          <h4 class="interested-company-name">
                            Công ty: Công ty TNHH Giải Pháp Phần Mềm Tường Minh
                          </h4>
                          <div class="d-flex justify-content-between">
                            <p>12 triệu</p>
                            <p>30/05/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="interested-informartion mt-3">
                      <h4 class="interested-title">
                        TUYỂN THỰC TẬP SINH SINH VIÊN NGÀNH CNTT...
                      </h4>
                      <div class="d-flex">
                        <div>
                          <image
                            class="logo-image"
                            src="/picture-banner/tma-logo.png"
                          ></image>
                        </div>
                        <div>
                          <button type="button" class="btn btn-primary">
                            Bán thời gian
                          </button>
                          <h4 class="interested-company-name mt-2">
                            Công ty: Công ty TNHH Giải Pháp Phần Mềm Tường Minh
                          </h4>
                          <div class="d-flex justify-content-between mt-4">
                            <p>12 triệu</p>
                            <p>30/05/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="interested-informartion mt-3">
                      <h4 class="interested-title">
                        TUYỂN THỰC TẬP SINH SINH VIÊN NGÀNH CNTT...
                      </h4>
                      <div class="d-flex">
                        <div>
                          <image
                            class="logo-image"
                            src="/picture-banner/tma-logo.png"
                          ></image>
                        </div>
                        <div>
                          <button type="button" class="btn btn-primary">
                            Bán thời gian
                          </button>
                          <h4 class="interested-company-name">
                            Công ty: Công ty TNHH Giải Pháp Phần Mềm Tường Minh
                          </h4>
                          <div class="d-flex justify-content-between">
                            <p>12 triệu</p>
                            <p>30/05/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3">
                      <button
                        type="button"
                        class="btn btn-primary upload-profile"
                      >
                        Upload Profile
                      </button>
                      <image
                        class="image-update-cv"
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