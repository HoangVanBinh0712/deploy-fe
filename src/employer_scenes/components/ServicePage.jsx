import React from "react";
import "../css/service-page.css";
import TopBar from "../../components/global/TopBar";
import Footer from "../../components/global/Footer";

import serviceBaner from "../../assets/img/service-banner.png";
import homeService1 from "../../assets/img/home-services-1.png";
import homeService2 from "../../assets/img/home-service-2.png";
import vShapeIcon from "../../assets/icons/v-blue-shape.png";
import checkBoxIcon from "../../assets/icons/check-box-icon.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "../../contexts/Constants";
import swal from "sweetalert";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [showMadal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [amount, setAmount] = useState(1);
  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${apiUrl}/service`);
        if (res.data.success) setServices(res.data.data);
      } catch (e) {}
    }
    getData();
  }, []);

  const purchaseClick = async () => {
    try {
      const response = await axios.post(`${apiUrl}/pay?serviceId=${selectedService.id}&duration=${amount}`, {
        headers: {
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data.success) window.open(response.data.message);
      else {
        swal({
          title: "Information",
          text: response.data.message,
          icon: "error",
          dangerMode: true,
        });
      }
      setShowModal(false);
      setSelectedService(null);
      setAmount(1);
    } catch (e) {
      swal({
        title: "Information",
        text: "Some thing went wrong ! Try again",
        icon: "error",
        dangerMode: true,
      });
    }
  };

  return (
    <>
      <TopBar />

      <div style={{ width: "100%" }}>
        <img id="service-banner" src={serviceBaner} alt="" style={{ width: "100%", height: "auto" }} />
      </div>
      <div className="body-container" style={{ height: "auto" }}>
        <div id="arrow_wrapper">
          <img id="arrow_below_banner" src={vShapeIcon} alt="" />
          <div id="our_service_title">OUR SERVICES</div>
          <div id="our_service_explaination">
            We offer a variety of services that help recruiters connect with more talent, so they can connect with candidates faster
          </div>
        </div>

        <div id="service_list">
          {showMadal && (
            <div className="modal-wrapper">
              <div className="free-space" id="free-space">
                <div className="modal-title">
                  <span>Buy/Extend your service</span>
                </div>
                <div className="content-wrapper">
                  <div className="modal-label">Service: {selectedService.name}</div>
                  <div className="modal-label">
                    Price: {selectedService.price} {selectedService.currency}/Months
                  </div>
                  <div className="modal-label" style={{ color: "red" }}>
                    Total: {selectedService.price * amount} {selectedService.currency}
                  </div>
                  <div className="input-wrapper">
                    <div className="label">Number of months: </div>
                    <input className="coler-placeholder" type="number" min={1} name="amount" value={amount} onChange={onAmountChange}></input>
                  </div>

                  <div className="group-buttons">
                    <div
                      className="button cancel"
                      onClick={() => {
                        setShowModal(false);
                        setAmount(1);
                        setSelectedService(null);
                      }}
                    >
                      <i className="fa fa-times" aria-hidden="true"></i>
                      Cancel
                    </div>
                    <div className="button" onClick={purchaseClick}>
                      <i className="fa fa-check" aria-hidden="true"></i>Purchase
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {services.map((s, index) => (
            <>
              <div className="service_item_wrapper" key={index}>
                <div style={{ width: "50%", order: index % 2 === 0 ? "0" : "2" }}>
                  <img id="service_logo" src={homeService1} alt="" />
                </div>
                <div id="service_info" style={{ order: 1 }}>
                  <div id="service_name">{s.name}</div>
                  <div id="service_price">
                    {s.price} {s.currency}
                  </div>
                  <div id="service_duration_wrapper">
                    <div>Duration:</div>
                    <div id="service_duaration"> {s.postDuration} month</div>
                  </div>
                  <div id="service_value_list">
                    <div id="service_value_item">
                      <img id="service_checkbox" src={checkBoxIcon} alt="" />
                      <div id="service_value">100% Satisfaction Guaranteed.</div>
                    </div>
                    <div id="service_value_item">
                      <img id="service_checkbox" src={checkBoxIcon} alt="" />
                      <div id="service_value">Post jobs quickly and receive resumes immediately.</div>
                    </div>
                    <div id="service_value_item">
                      <img id="service_checkbox" src={checkBoxIcon} alt="" />
                      <div id="service_value">Manage your online profile easily.</div>
                    </div>
                    {s.canFilterCVSubmit && (
                      <div id="service_value_item">
                        <img id="service_checkbox" src={checkBoxIcon} alt="" />
                        <div id="service_value">Find candidates efficiently and quickly.</div>
                      </div>
                    )}
                    {s.canSearchCV && (
                      <div id="service_value_item">
                        <img id="service_checkbox" src={checkBoxIcon} alt="" />
                        <div id="service_value">Actively looking for candidates today</div>
                      </div>
                    )}
                  </div>
                  <div id="service_conclusion">{s.description}</div>
                  <div
                    className="button"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedService(s);
                    }}
                    style={{ marginTop: "1em" }}
                  >
                    Buy now
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicePage;
