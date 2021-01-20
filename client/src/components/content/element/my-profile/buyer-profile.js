import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SearchLocationInput from "../../../common/SearchLocationInput";
import SimpleReactValidator from "simple-react-validator";
import { UpdateUserInfo } from "../../../../Store/action/loginActions";

class BuyerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.login.avatar,
      email: props.login.email,
      phone: props.login.phone,
      emirate: props.login.details.emirate,
      garage_type: props.login.details.garage_type,
      garage_name: props.login.details.garage_name,
      garage_address: props.login.details.garage_address,
      opening_hours: props.login.details.opening_hours,
      closing_hours: props.login.details.closing_hours,
      trade_license_no: props.login.details.trade_license_no,
      trade_license_upload: props.login.details.trade_license_upload,
      vat_registration_no: props.login.details.vat_registration_no,
      vat_certification_upload: props.login.details.vat_certification_upload,
      owner_manager_name: props.login.details.owner_manager_name,
      owner_manager_emirates_id: props.login.details.owner_manager_emirates_id,
      emirates_id: props.login.details.emirates_id,
      goods_receiver_name: props.login.details.goods_receiver_name,
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
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  setAddress(address) {
    this.setState({ garage_address: address });
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
        garage_type: this.state.garage_type,
        garage_name: this.state.garage_name,
        garage_address: this.state.garage_address,
        opening_hours: this.state.opening_hours,
        closing_hours: this.state.closing_hours,
        trade_license_no: this.state.trade_license_no,
        vat_registration_no: this.state.vat_registration_no,
        owner_manager_name: this.state.owner_manager_name,
        goods_receiver_name: this.state.goods_receiver_name,
      };
      formData.append("details", details);

      if (typeof this.state.trade_license_upload === "object")
        formData.append(
          "trade_license_upload",
          this.state.trade_license_upload
        );
      else details["trade_license_upload"] = this.state.trade_license_upload;

      if (typeof this.state.vat_certification_upload === "object")
        formData.append(
          "vat_certification_upload",
          this.state.vat_certification_upload
        );
      else
        details[
          "vat_certification_upload"
        ] = this.state.vat_certification_upload;

      if (typeof this.state.owner_manager_emirates_id === "object")
        formData.append(
          "owner_manager_emirates_id",
          this.state.owner_manager_emirates_id
        );
      else
        details[
          "owner_manager_emirates_id"
        ] = this.state.owner_manager_emirates_id;

      if (typeof this.state.emirates_id === "object")
        formData.append("emirates_id", this.state.emirates_id);
      else details["emirates_id"] = this.state.emirates_id;

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
          console.log(err);
          this.setState({ submitLoading: false });
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
                />
              ) : (
                <img
                  src={`/assets/img/avatar.png`}
                  onClick={this.openFileDlg}
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
                  className="btn btn-sm btn-secondary"
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
                      <label htmlFor="garage-address" className="form-label">
                        Garage Address
                      </label>
                      <SearchLocationInput
                        setAddress={this.setAddress}
                        defaultValue={this.state.garage_address}
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "garage_address",
                          this.state.garage_address,
                          `required`
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="garage-type" className="form-label">
                        Garage Type
                      </label>
                      <div className="select-basic">
                        <select
                          className="form-control"
                          name="garage_type"
                          defaultValue={this.state.garage_type}
                          id="garage-type"
                          onChange={this.handleSelect}
                        >
                          <option value="" disabled>
                            Select Garage Type
                          </option>
                          <option value="Authorized Garages">
                            Authorized Garages
                          </option>
                          <option value="Gained/Third-party Garages">
                            Gained/Third-party Garages
                          </option>
                          <option value="Independent Mom & Pop Garages">
                            Independent Mom & Pop Garages
                          </option>
                        </select>
                      </div>
                      <div className="text-danger">
                        {this.validator.message(
                          "garage_type",
                          this.state.garage_type,
                          `required`
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="garage-name" className="form-label">
                        Garage Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="garage-name"
                        placeholder="Enter Garage Name"
                        value={this.state.garage_name || ""}
                        name="garage_name"
                        onChange={this.handleInput}
                        required
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "garage_name",
                          this.state.garage_name,
                          `required`
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="opening-hours" className="form-label">
                        Opening Hours
                      </label>
                      <input
                        type="time"
                        id="opening-hours"
                        className="form-control directory_field"
                        value={this.state.opening_hours || ""}
                        name="opening_hours"
                        onChange={this.handleInput}
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "opening_hours",
                          this.state.opening_hours,
                          `required`
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="closing-hours" className="form-label">
                        Closing Hours
                      </label>
                      <input
                        type="time"
                        id="closing-hours"
                        className="form-control directory_field"
                        value={this.state.closing_hours || ""}
                        name="closing_hours"
                        onChange={this.handleInput}
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "closing_hours",
                          this.state.closing_hours,
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
                      <label
                        htmlFor="owner-manager-name"
                        className="form-label"
                      >
                        Owner/Manager Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="owner-manager-name"
                        placeholder="Enter Name"
                        value={this.state.owner_manager_name || ""}
                        name="owner_manager_name"
                        onChange={this.handleInput}
                        required
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "owner_manager_name",
                          this.state.owner_manager_name,
                          `required`
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="goods-receiver-name"
                        className="form-label"
                      >
                        Name of Goods Receiver
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="goods-receiver-name"
                        placeholder="Enter Name"
                        value={this.state.goods_receiver_name || ""}
                        name="goods_receiver_name"
                        onChange={this.handleInput}
                        required
                      />
                      <div className="text-danger">
                        {this.validator.message(
                          "goods_receiver_name",
                          this.state.goods_receiver_name,
                          `required`
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="vat-reg-no" className="form-label">
                        VAT Registration No
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vat-reg-no"
                        placeholder="Enter Registration No"
                        value={this.state.vat_registration_no || ""}
                        name="vat_registration_no"
                        onChange={this.handleInput}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="vat-cretificate-upload"
                        className="form-label"
                      >
                        VAT Certificate Upload
                      </label>
                      {this.state.vat_certification_upload &&
                        typeof this.state.vat_certification_upload !==
                          "object" && (
                          <p className="text-ellipse">
                            <a
                              href={this.state.vat_certification_upload}
                              _target="blank"
                            >
                              {this.state.vat_certification_upload}
                            </a>
                          </p>
                        )}
                      <input
                        type="file"
                        className="form-control"
                        id="vat-cretificate-upload"
                        onChange={(e) =>
                          this.setSelectedFile(
                            e.target.files[0],
                            "vat_certification_upload"
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="owner-manager-emirates-id"
                        className="form-label"
                      >
                        Owner/Manager Emirates ID / Passport No
                      </label>
                      {this.state.owner_manager_emirates_id &&
                        typeof this.state.owner_manager_emirates_id !==
                          "object" && (
                          <p className="text-ellipse">
                            <a
                              href={this.state.owner_manager_emirates_id}
                              _target="blank"
                            >
                              {this.state.owner_manager_emirates_id}
                            </a>
                          </p>
                        )}
                      <input
                        type="file"
                        className="form-control"
                        id="owner-manager-emirates-id"
                        onChange={(e) =>
                          this.setSelectedFile(
                            e.target.files[0],
                            "owner_manager_emirates_id"
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="emirates-id-upload"
                        className="form-label"
                      >
                        Emirates ID Upload
                      </label>
                      {this.state.emirates_id &&
                        typeof this.state.emirates_id !== "object" && (
                          <p className="text-ellipse">
                            <a href={this.state.emirates_id} _target="blank">
                              {this.state.emirates_id}
                            </a>
                          </p>
                        )}
                      <input
                        type="file"
                        className="form-control"
                        id="emirates-id-upload"
                        onChange={(e) =>
                          this.setSelectedFile(e.target.files[0], "emirates_id")
                        }
                      />
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
                        Submit
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

export default connect(mapStateToProps, mapDispatchToProp)(BuyerProfile);
