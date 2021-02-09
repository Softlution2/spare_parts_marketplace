import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SearchLocationInput from "../../../common/SearchLocationInput";
import SimpleReactValidator from "simple-react-validator";
import { UpdateUserInfo } from "../../../../Store/action/loginActions";

class SellerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.login.avatar,
      email: props.login.email,
      phone: props.login.phone,
      emirate: props.login.details.emirate,
      company_name: props.login.details.company_name,
      company_address: props.login.details.company_address,
      trade_license_no: props.login.details.trade_license_no,
      trade_license_upload: props.login.details.trade_license_upload,
      submitLoading: false,
    };

    this.validator = new SimpleReactValidator();
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSelectedFile = this.setSelectedFile.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.openFileDlg = this.openFileDlg.bind(this);
  }

  uploadAvatar(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let avatar = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    this.setState({ avatar });
  }

  openFileDlg(e) {
    e.preventDefault();
    this.upload.click();
  }

  setAddress(address) {
    this.setState({ company_address: address });
  }

  handleSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  setSelectedFile(file, name) {
    this.setState({ [name]: file });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setState({ submitLoading: true });
      let formData = new FormData();
      let details = {
        emirate: this.state.emirate,
        company_address: this.state.company_address,
        company_name: this.state.company_name,
        trade_license_no: this.state.trade_license_no,
      };
      if (typeof this.state.trade_license_upload === "object")
        formData.append(
          "trade_license_upload",
          this.state.trade_license_upload
        );
      else details["trade_license_upload"] = this.state.trade_license_upload;
      details = JSON.stringify(details);
      formData.append("user_id", this.props.login._id);
      formData.append("details", details);
      if (this.state.avatar) formData.append("avatar", this.state.avatar);
      axios
        .post(`/api/users/update`, formData)
        .then((res) => {
          this.setState({ submitLoading: false });
          this.props.updateUserInfo(res.data);
          window.location.reload();
        })
        .catch((err) => {
          this.setState({ submitLoading: false });
          console.log(err);
          // this.setState({errMsg: err.response.data.message});
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const { avatar } = this.state;
    return (
      <Fragment>
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-5 mb-lg-0">
            <div className="user_pro_img_area">
              {avatar ? (
                <img
                  src={avatar.preview || avatar}
                  onClick={this.openFileDlg}
                  alt="avatar"
                />
              ) : (
                <img
                  src={`/assets/img/avatar.png`}
                  onClick={this.openFileDlg}
                  alt="avatar"
                />
              )}
              <div className="image-info">
                <h6>Profile Image</h6>
                <span>JPG or PNG 120x120 px</span>
              </div>
              <div className="custom-file-upload">
                <input
                  id="customUpload"
                  type="file"
                  ref={(ref) => (this.upload = ref)}
                  style={{ display: "none" }}
                  onChange={this.uploadAvatar}
                />
                <label
                  htmlFor="customUpload"
                  className="btn btn-sm btn-secondary text-white"
                  onClick={this.openFileDlg}
                >
                  Upload New Image
                </label>
              </div>
              {/* <button className="btn btn-sm btn-danger">Delete Image</button> */}
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="atbd_author_module">
              <div className="atbd_content_module">
                <div className="atbd_content_module__tittle_area">
                  <div className="atbd_area_title">
                    <h4>
                      <span className="la la-user"></span>
                      My Profile
                    </h4>
                  </div>
                </div>
                <div className="atbdb_content_module_contents">
                  <div className="user_info_wrap">
                    <div className="form-group">
                      <label htmlFor="emirate" className="form-label">
                        Emirate
                      </label>
                      <div className="select-basic">
                        <select
                          className="form-control"
                          name="emirate"
                          defaultValue={this.state.emirate}
                          id="emirate"
                          onChange={this.handleSelect}
                        >
                          <option value="" disabled>
                            Select Emirate
                          </option>
                          <option value="Abu Dhabi">Abu Dhabi</option>
                          <option value="Ajman">Ajman</option>
                          <option value="Dubai">Dubai</option>
                          <option value="Fujairah">Fujairah</option>
                          <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                          <option value="Sharjah">Sharjah</option>
                          <option value="Umm Al Quwain">Umm Al Quwain</option>
                        </select>
                      </div>
                      <div className="text-danger">
                        {this.validator.message(
                          "emirate",
                          this.state.emirate,
                          `required`
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="company-name" className="form-label">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="company-name"
                        placeholder="Enter Company Name"
                        value={this.state.company_name || ""}
                        name="company_name"
                        onChange={this.handleInput}
                        required
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "company_name",
                          this.state.company_name,
                          `required`
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="company-address" className="form-label">
                        Company Address
                      </label>
                      <SearchLocationInput
                        setAddress={this.setAddress}
                        defaultValue={this.state.company_address}
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "company_address",
                          this.state.company_address,
                          `required`
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="trade-license-no" className="form-label">
                        Trade License No
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="trade-license-no"
                        placeholder="Enter Trade Licnse No"
                        value={this.state.trade_license_no || ""}
                        name="trade_license_no"
                        onChange={this.handleInput}
                        required
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "trade_license_no",
                          this.state.trade_license_no,
                          `required`
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="trade-license-upload"
                        className="form-label"
                      >
                        Trade License Upload
                      </label>
                      {this.state.trade_license_upload &&
                        typeof this.state.trade_license_upload !== "object" && (
                          <p className="text-ellipse">
                            <a
                              href={this.state.trade_license_upload}
                              _target="blank"
                            >
                              {this.state.trade_license_upload}
                            </a>
                          </p>
                        )}
                      <input
                        type="file"
                        className="form-control"
                        id="trade-license-upload"
                        onChange={(e) =>
                          this.setSelectedFile(
                            e.target.files[0],
                            "trade_license_upload"
                          )
                        }
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "trade_license_upload",
                          this.state.trade_license_upload,
                          `required`
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        disabled={
                          this.state.submitLoading === false ? false : true
                        }
                        className="btn btn-primary btn-lg listing_submit_btn"
                        onClick={this.handleSubmit}
                      >
                        {this.state.submitLoading && (
                          <i className="las la-spinner la-spin mr-2"></i>
                        )}
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.list,
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    updateUserInfo: (data) => dispatch(UpdateUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(SellerProfile);
