import arrowLeftIcon from "../../assets/picture-banner/arrow-left.png";
import arrowRightIcon from "../../assets/picture-banner/arrow-right.png";
import minPageIcon from "../../assets/icons/min-page.png";
import maxPageIcon from "../../assets/icons/max-page.png";

const Paging = ({ currentPage, totalPage, setCurrentPage }) => {
  return (
    <div className="paging">
      <div className="pagging-wrapper">
        <img
          className="page-item"
          src={minPageIcon}
          alt=""
          onClick={() => {
            setCurrentPage(1);
          }}
        ></img>
        <img
          className="page-item"
          src={arrowLeftIcon}
          alt=""
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        ></img>
        <div
          className="page-item"
          onClick={() => {
            setCurrentPage(currentPage);
          }}
        >
          {currentPage}
        </div>

        <img
          className="page-item"
          src={arrowRightIcon}
          alt=""
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        ></img>
        <img
          className="page-item"
          src={maxPageIcon}
          alt=""
          onClick={() => {
            setCurrentPage(totalPage);
          }}
        ></img>
      </div>
    </div>
  );
};

export default Paging;
