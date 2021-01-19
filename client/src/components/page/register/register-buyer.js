import React, { Fragment, Component } from "react";
import { withTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import { compose } from "redux";
import axios from "axios";
import Header from "../../layout/header";
import PreHeader from "../../layout/pre-header";
import Footer from "../../layout/footer";
import { PageBanner } from "../../content/element/page-banner";
import SearchLocationInput from "../../common/SearchLocationInput";
import SimpleReactValidator from "simple-react-validator";
import { LogInAc } from "../../../Store/action/loginActions";

class RegisterBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emirate: null,
      garage_type: null,
      garage_name: null,
      garage_address: null,
      opening_hours: null,
      closing_hours: null,
      trade_license_no: null,
      trade_license_upload: null,
      vat_registration_no: null,
      vat_certification_upload: null,
      owner_manager_name: null,
      owner_manager_emirates_id: null,
      emirates_id: null,
      goods_receiver_name: null,
      submitLoading: false,
    };
    this.validator = new SimpleReactValidator();
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSelectedFile = this.setSelectedFile.bind(this);
    this.setAddress = this.setAddress.bind(this);
  }

  componentDidMount() {
    if (!this.props.signup.accountType) {
      this.props.history.push("/register");
      return;
    }
    if (!this.props.signup.email) {
      this.props.history.push("/register/verify-email");
      return;
    }
    if (!this.props.signup.phone)
    {
      this.props.history.push("/register/verify-phone");
      return;
    }
    if (!this.props.signup.password) {
      this.props.history.push("/register/password");
      return;
    }
  }
  setAddress(address) {
    this.setState({garage_address: address});
  }

  handleSelect(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  setSelectedFile(file, name) {
    this.setState({[name]: file});
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setState({submitLoading: true});
      let formData = new FormData();
      formData.append("password", this.props.signup.password);
      formData.append("email", this.props.signup.email);
      formData.append("phone", this.props.signup.phone);
      console.log(this.props.signup);
      formData.append("role", "SELLER");
      const details = JSON.stringify({
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
      });
      formData.append("details", details);
      formData.append("trade_license_upload", this.state.trade_license_upload);
      if (this.state.vat_certification_upload)
        formData.append("vat_certification_upload", this.state.vat_certification_upload);
      if (this.state.owner_manager_emirates_id)
        formData.append("owner_manager_emirates_id", this.state.owner_manager_emirates_id);
      if (this.state.emirates_id)
        formData.append("emirates_id", this.state.emirates_id);
      axios.post(`/api/users/signup`, formData)
      .then((res) => {
        this.setState({submitLoading: false});
        this.props.login(res.data);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        this.setState({submitLoading: false});
        // this.setState({errMsg: err.response.data.message});
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }


  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="CREATE A BUYER ACCOUNT" />

        <section className="add-listing-wrapper border-bottom section-bg section-padding-strict">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="atbd_content_module">
                  <div className="atbd_content_module__tittle_area">
                    <div className="atbd_area_title">
                      <h4>
                        <span className="la la-user"></span>Mandatory Information
                      </h4>
                    </div>
                  </div>
                  <div className="atbdb_content_module_contents mb-5">
                    <form action="/">
                      <div className="form-group">
                        <label htmlFor="emirate" className="form-label">
                          Emirate
                        </label>
                        <div className="select-basic">
                          <select className="form-control" name="emirate" defaultValue={""} id="emirate" onChange={this.handleSelect}>
                            <option value="" disabled>Select Emirate</option>
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
                        <SearchLocationInput setAddress={this.setAddress} />
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
                          <select className="form-control" name="garage_type" defaultValue={""}  id="garage-type" onChange={this.handleSelect}>
                            <option value="" disabled>Select Garage Type</option>
                            <option value="Authorized Garages">Authorized Garages</option>
                            <option value="Gained/Third-party Garages">Gained/Third-party Garages</option>
                            <option value="Independent Mom & Pop Garages">Independent Mom & Pop Garages</option>
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
                        <label htmlFor="trade-license-upload" className="form-label">
                          Trade License Upload
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="trade-license-upload"
                          onChange={(e) => this.setSelectedFile(e.target.files[0], "trade_license_upload")}
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
                        <label htmlFor="owner-manager-name" className="form-label">
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
                        <label htmlFor="goods-receiver-name" className="form-label">
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
                    </form>
                  </div>
                  {/*<!-- ends: .atbdb_content_module_contents -->*/}
                </div>
                {/*<!-- ends: .atbd_content_module -->*/}
              </div>
              {/*<!-- ends: .col-lg-10 -->*/}
              
              <div className="col-lg-10 offset-lg-1">
                <div className="atbd_content_module">
                  <div className="atbd_content_module__tittle_area">
                    <div className="atbd_area_title">
                      <h4>
                        <span className="la la-user"></span>Optional Information
                      </h4>
                    </div>
                  </div>
                  <div className="atbdb_content_module_contents mb-5">
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
                        <label htmlFor="vat-cretificate-upload" className="form-label">
                          VAT Certificate Upload
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="vat-cretificate-upload"
                          onChange={(e) => this.setSelectedFile(e.target.files[0], "vat_certification_upload")}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="owner-manager-emirates-id" className="form-label">
                          Owner/Manager Emirates ID / Passport No
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="owner-manager-emirates-id"
                          onChange={(e) => this.setSelectedFile(e.target.files[0], "owner_manager_emirates_id")}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="emirates-id-upload" className="form-label">
                          Emirates ID Upload
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="emirates-id-upload"
                          onChange={(e) => this.setSelectedFile(e.target.files[0], "emirates_id")}
                        />
                      </div>

                      <div className="atbd_term_and_condition_area custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="listing_t"
                          value="1"
                          id="listing_t"
                        />
                        <label
                          htmlFor="listing_t"
                          className="not_empty custom-control-label"
                        >
                          I Agree with all{" "}
                          <NavLink to="/terms">
                            Terms & Conditions
                          </NavLink>
                        </label>
                      </div>
                      <div className="btn_wrap list_submit m-top-25">
                        <button
                          type="submit"
                          disabled={this.state.submitLoading === false ? false : true}
                          className="btn btn-primary btn-lg listing_submit_btn"
                          onClick={this.handleSubmit}
                        >
                          {this.state.submitLoading && <i className="las la-spinner la-spin mr-2"></i>}
                          Submit
                        </button>
                      </div>
                      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*<!-- ends: .add-listing-wrapper -->*/}
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signup: state.signup,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    login: (data) => dispatch(LogInAc(data)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(RegisterBuyer);

