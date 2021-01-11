import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Col, ModalFooter, Spinner } from "reactstrap";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";

const noAction = (e) => e.preventDefault();
function Dropzone(props) {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) => {
        file = Object.assign(file, {
          preview: URL.createObjectURL(file),
          processing: true,
        });
      });
      props.pushPhoto(acceptedFiles[0]);
    },
  });

  const { t } = props;

  return (
    <Fragment>
      <div
        {...getRootProps({
          className: "dropzone",
        })}
      >
        <input {...getInputProps()} />
        <p>
          <img
            src="/assets/img/upload-icon.png"
            width="50"
            height="50"
            alt="upload-icon"
          />
        </p>
        <p>{t("dropzone_upload_photo")} :</p>
        <Button color="dark" onClick={open}>
          {t("dropzone_upload_button")}
        </Button>
      </div>
    </Fragment>
  );
}

class CarRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isModal: false,
      document: null,
      details: null,
    };
    this.pushPhoto = this.pushPhoto.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  pushPhoto(file) {
    this.setState({document: file});
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("file", file);
    const apiUrl = `/api/info/car-recognition`;
    axios
      .post(
        apiUrl,
        formData,
        config
      )
      .then((res) => {
        let {details, document} = this.state;
        document.processing = false;
        details = res.data.details;
        this.setState({document, details, isModal: true});
      })
      .catch((error) => {
        console.log(error.response.data);
        // toast.error(JSON.stringify(error.response.data.message, null, 2));
      });
  }

  toggleModal() {
    let {isModal} = this.state;
    this.setState({isModal: !isModal});
  }

  render() {
    const {
      document,
      isModal,
      details,
    } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title={t("car_recog_title")} />
        <section className="vin-check-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
                <Dropzone t={t} pushPhoto={(file) => this.pushPhoto(file)} />
              </div>
              <div className="col-xl-6">
                <aside className="thumb-container">
                  {document && (
                    <div className="dz-thumb">
                      <div className="dz-thumb-inner">
                        <img
                          src={document.preview}
                          className="dz-img"
                          alt="preview"
                        />
                        {document.processing === true && (
                          <div className="photo-process d-flex justify-content-center align-items-center">
                            <Spinner color="danger" size="md" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
          <Modal
            isOpen={isModal}
            toggle={this.toggleModal}
            className="modal-dialog-centered"
          >
            <ModalHeader
              toggle={this.toggleModal}
              className="bg-primary"
            >
              <span className="text-white">{t("car_recog_success_text")}</span>
            </ModalHeader>
            <ModalBody className="text-center">
              {
                details && details.make && (
                  <FormGroup row>
                    <Col md="4">
                      <span>{t("car_recog_make")}: </span>
                    </Col>
                    <Col md="8">
                      <span>{details.make}</span>
                    </Col>
                  </FormGroup>
                )
              }
              
              {
                details && details.model && (
                  <FormGroup row>
                    <Col md="4">
                      <span>{t("car_recog_model")}: </span>
                    </Col>
                    <Col md="8">
                      <span>{details.model}</span>
                    </Col>
                  </FormGroup>
                )
              }
              
              {
                details && details.generation && (
                  <FormGroup row>
                    <Col md="4">
                      <span>{t("car_recog_generation")}: </span>
                    </Col>
                    <Col md="8">
                      <span>{details.generation}</span>
                    </Col>
                  </FormGroup>
                )
              }
              
              {
                details && details.year && (
                  <FormGroup row>
                    <Col md="4">
                      <span>{t("car_recog_year")}: </span>
                    </Col>
                    <Col md="8">
                      <span>{details.year}</span>
                    </Col>
                  </FormGroup>
                )
              }
              
              {
                details && details.colour && (
                  <FormGroup row>
                    <Col md="4">
                      <span>{t("car_recog_color")}: </span>
                    </Col>
                    <Col md="8">
                      <span>{details.colour}</span>
                    </Col>
                  </FormGroup>
                )
              }
              
              {
                details && details.plateNumber && (
                  <FormGroup row>
                    <Col md="4">
                      <span>{t("car_recog_plate_number")}: </span>
                    </Col>
                    <Col md="8">
                      <span>{details.plateNumber.toUpperCase()}</span>
                    </Col>
                  </FormGroup>
                )
              }
              
              {
                details && details.countries && (
                  <FormGroup row>
                    <Col md="4">
                      <span>{t("car_recog_countries")}: </span>
                    </Col>
                    <Col md="8">
                      <span>{details.countries}</span>
                    </Col>
                  </FormGroup>
                )
              }
              
              {
                details && details.provience && (
                  <FormGroup row>
                    <Col md="4">
                      <span>{t("car_recog_provenance")}: </span>
                    </Col>
                    <Col md="8">
                      <span>{details.provience}</span>
                    </Col>
                  </FormGroup>
                )
              }
            </ModalBody>
            <ModalFooter className="justify-content-center">
              <Button
                color="primary"
                onClick={this.toggleModal}
              >
                {t("car_recog_close")}
              </Button>
            </ModalFooter>
          </Modal>
            
        </section>
        <Footer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(CarRecognition);
