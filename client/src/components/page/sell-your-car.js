import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withTranslation } from 'react-i18next';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import UploadCarPhoto from "../content/element/upload-car-photo";
import CarDetails from "../content/element/car-details";
import UserDetails from "../content/element/user-details";
import {
  Initialize,
  SetSellingStep,
  SetUploadedCars,
  SetFeaturedCar,
  SetCarDetails,
} from "../../Store/action/sellingAction";

const noAction = (e) => e.preventDefault();

const steps = [
  "Upload the photos of your car",
  "Car Details & Description",
  "Fill user details out",
];

const requiredDetails = [
  "make",
  "model",
  "price",
  "year",
  "color",
  "transmission",
  "mileage",
  "description",
];

class SellYourCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSuccess: false,
      invalidCarDetails: [],
    }
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  goNext(e) {
    noAction(e);
    let { currentStep } = this.props.selling;
    if (currentStep == 0) {
      let { photos } = this.props.selling;
      if (Object.keys(photos).filter((x) => photos[x] !== null).length == 0)
        return;
      this.setState({isLoading: true});
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      photos.map((photo, index) => {
        if (photo.featured === true)
          formData.append('featured_photo', photo);
        else
          formData.append('photo', photo);
      });
      const apiUrl = `/api/selling/upload-photos`;
      axios
        .post(apiUrl, formData, config)
        .then((res) => {
          this.props.setFeaturedCar(res.data.featured_car);
          this.props.setOtherCars(res.data.other_cars);
          this.props.setCarDetails(res.data.vehicle_details);
          this.setState({isLoading: false});
          this.props.setStep(currentStep + 1);
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        });
    }
    else if (currentStep === 1) {
      this.setState({isLoading: true});
      let { carDetails } = this.props.selling;
      let { invalidCarDetails } = this.state;
      invalidCarDetails = [];
      for (var key in carDetails) {
        if (requiredDetails.includes(key) && carDetails[key] === null) {
          invalidCarDetails.push(key);
        }
      }
      this.setState({isLoading: false});
      if (invalidCarDetails.length == 0) {
        this.props.setStep(currentStep + 1);
      }
      else {
        this.setState({invalidCarDetails});
      }
    }
    else if (currentStep === 2) {
      this.setState({isLoading: true});
      let {uploadedPhotos, featuredPhoto, carDetails} = this.props.selling;
      let currentUser = localStorage.getItem("login");
      const apiUrl = `/api/selling/add-listing`;
      axios
        .post(apiUrl, {photos: uploadedPhotos, featured_photo: featuredPhoto, ...carDetails, user_id: JSON.parse(currentUser)._id})
        .then((res) => {
          this.setState({isLoading: false});
          this.props.initializeSelling();
          this.props.history.push("/thankyou");
        })
        .catch((error) => {
          console.log(error.response);
          this.setState({isLoading: false});
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(error.response.data);
        });
    }
  }

  goPrev(e) {
    noAction(e);
    let { currentStep } = this.props.selling;
    this.props.setStep(currentStep - 1);
  }

  render() {
    let { currentStep } = this.props.selling;
    let { isLoading, invalidCarDetails } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="Sell your car" />
        <section className="sell-car-wrapper">
          <div className="sell-car-header">
            <div className="container">
              <div className="d-flex justify-content-between">
                <h4>{steps[currentStep]}</h4>
                <span>{t("step")} {currentStep + 1}/3</span>
              </div>
            </div>
          </div>
          <div className="sell-car-content">
            <div className="container">
              {currentStep === 0 && <UploadCarPhoto />}
              {currentStep === 1 && <CarDetails validators ={invalidCarDetails} />}
              {currentStep === 2 && <UserDetails />}
            </div>
          </div>
          {
            !(currentStep === 2 && !this.props.login) && (
              <div className="sell-car-footer">
                <div className="container">
                  <button
                    className="btn btn-md outline-primary mr-2"
                    onClick={this.goPrev}
                  disabled={currentStep === 0 ? true : false}
                  >
                    {t("sell_car_prev_button")}
                  </button>
                  <button
                    className="btn btn-md btn-primary"
                    onClick={this.goNext}
                    disabled={isLoading || (currentStep === 2 && !this.props.login) ? true : false}
                  >
                    {isLoading && (
                      <i className="las la-spinner la-spin mr-2"></i>
                    )}
                    {t("sell_car_next_button")}
                  </button>
                </div>
              </div>
            )
          }
        </section>
        <ToastContainer />
        <Footer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    selling: state.selling,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setStep: (step) => dispatch(SetSellingStep(step)),
    setCarDetails: (details) => dispatch(SetCarDetails(details)),
    setOtherCars: (photos) => dispatch(SetUploadedCars(photos)),
    setFeaturedCar: (photo) => dispatch(SetFeaturedCar(photo)),
    initializeSelling: () => dispatch(Initialize()),
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(SellYourCar);
