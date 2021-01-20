import React, { Fragment, Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink } from 'react-router-dom'
import axios from "axios";
import Header from "../../layout/header";
import PreHeader from "../../layout/pre-header";
import Footer from "../../layout/footer";
import { PageBanner } from "../../content/element/page-banner";
import SearchLocationInput from "../../common/SearchLocationInput";
import SimpleReactValidator from "simple-react-validator";
import { LogInAc } from "../../../Store/action/loginActions";

class RegisterSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emirate: null,
      company_name: null,
      company_address: null,
      trade_license_no: null,
      trade_license_upload: null,
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
    this.setState({company_address: address});
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
      formData.append("role", "SELLER");
      const details = JSON.stringify({
        emirate: this.state.emirate,
        company_address: this.state.company_address,
        company_name: this.state.company_name,
        trade_license_no: this.state.trade_license_no,
      });
      formData.append("details", details);
      formData.append("trade_license_upload", this.state.trade_license_upload);
      axios.post(`/api/users/signup`, formData)
      .then((res) => {
        this.setState({submitLoading: false});
        this.props.login(res.data);
        window.location.href = "/";
      })
      .catch((err) => {
        this.setState({submitLoading: false});
        console.log(err);
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
        <PageBanner title="CREATE A SELLER ACCOUNT" />

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
                        <SearchLocationInput setAddress={this.setAddress} defaultValue={""} />
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
                          {this.state.  submitLoading && <i className="las la-spinner la-spin mr-2"></i>}
                          Submit
                        </button>
                      </div>
                      
                    </form>
                  </div>
                  {/*<!-- ends: .atbdb_content_module_contents -->*/}
                </div>
                {/*<!-- ends: .atbd_content_module -->*/}
              </div>
              {/*<!-- ends: .col-lg-10 -->*/}
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
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(RegisterSeller);