import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Button } from "reactstrap";

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
      props.pushPhoto(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
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

class VinCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      decodeType: "text",
      document: null,
      VINNumber: null,
      decodeResult: null,
    };
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.pushPhoto = this.pushPhoto.bind(this);
    this.decode = this.decode.bind(this);
  }

  handleChangeRadio(e) {
    noAction(e);
    this.setState({ decodeType: e.target.value });
  }

  handleChange(e) {
    noAction(e);
    this.setState({ VINNumber: e.target.value });
  }

  pushPhoto(file) {
    this.setState({ document: file });
  }

  decode(e) {
    noAction(e);
    const { decodeType } = this.state;
    this.setState({ isLoading: true });
    if (decodeType === "text") {
      const apiUrl = `/api/info/decode-vin-number?vin=${this.state.VINNumber}`;
      axios
        .post(apiUrl)
        .then((res) => {
          let decodeResult = JSON.parse(res.data.result);
          this.setState({ decodeResult, isLoading: false });
        })
        .catch((error) => {
          this.setState({ isLoading: false });
        });
    } else {
      let { document } = this.state;
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      formData.append("file", document);
      const apiUrl = `/api/info/deocde-vin-photo`;
      axios
        .post(apiUrl, formData, config)
        .then((res) => {
          let decodeResult = JSON.parse(res.data.result);
          this.setState({ decodeResult, isLoading: false });
          this.setState({ isLoading: false });
        })
        .catch((error) => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const {
      decodeType,
      document,
      VINNumber,
      decodeResult,
      isLoading,
    } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title={t("vin_check_title")} />
        <section className="vin-check-wrapper">
          <div className="container">
            <p className="text-center">
              {t("vin_check_heading")}
              <br />
              {t("vin_check_description")}
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <div className="custom-control custom-radio radio-outline radio-outline-primary mr-5">
                <input
                  type="radio"
                  name="decodeType"
                  className="custom-control-input"
                  id="text"
                  value="text"
                  onChange={this.handleChangeRadio}
                  checked={decodeType === "text"}
                />
                <label className="custom-control-label" htmlFor="text">
                  {t("vin_check_text")}
                </label>
              </div>
              <div className="custom-control custom-radio radio-outline radio-outline-primary">
                <input
                  type="radio"
                  name="decodeType"
                  className="custom-control-input"
                  id="document"
                  value="document"
                  onChange={this.handleChangeRadio}
                  checked={decodeType === "document"}
                />
                <label className="custom-control-label" htmlFor="document">
                  {t("vin_check_document")}
                </label>
              </div>
            </div>
            {decodeType === "text" ? (
              <Fragment>
                <div className="form-group">
                  <label>{t("vin_check_vin_number")}:</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder={t("vin_check_vin_number_placeholder")}
                    value={VINNumber || ""}
                    onChange={this.handleChange}
                  />
                </div>
              </Fragment>
            ) : (
              <Fragment>
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
                          </div>
                        </div>
                      )}
                    </aside>
                  </div>
                </div>
              </Fragment>
            )}

            {decodeResult && (
              <pre className="language-markup mt-5">
                {decodeResult.decode &&
                  decodeResult.decode.map((info, index) => {
                    if (!Array.isArray(info.value)) {
                      return (
                        <div className="row" key={index}>
                          <div className="col-sm-6">
                            <p>{info.label}</p>
                          </div>
                          <div className="col-sm-6">
                            <p>{info.value}</p>
                          </div>
                        </div>
                      );
                    }
                  })}
                {!decodeResult.decode && (
                  <>{JSON.stringify(decodeResult, null, 2)}</>
                )}
              </pre>
            )}

            <div className="text-center mt-5">
              <button
                className="btn btn-primary"
                onClick={this.decode}
                disabled={isLoading}
              >
                {isLoading && <i className="las la-spinner la-spin mr-2"></i>}
                {t("vin_check_decode")}
              </button>
            </div>
          </div>
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

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(VinCheck);
