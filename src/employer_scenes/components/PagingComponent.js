import arrowLeftIcon from "../../assets/picture-banner/arrow-left.png";
import arrowRightIcon from "../../assets/picture-banner/arrow-right.png";

const Paging = () => {
  return (
    <div className="paging">
      <div className="pagging-wrapper">
        <img className="page-item" src={arrowLeftIcon} alt=""></img>
        <div className="page-item">1</div>
        <div className="page-item">2</div>
        <div className="page-item">3</div>
        <div className="page-item">4</div>
        <div className="page-item">5</div>
        <img className="page-item" src={arrowRightIcon} alt=""></img>
      </div>
    </div>
  );
};

export default Paging;
