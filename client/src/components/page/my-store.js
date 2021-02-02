import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import SimpleReactValidator from "simple-react-validator";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";

class MyStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      description: null,
      socialLinks: [{ name: "", link: "" }],
      openingHours: {
        saturday: { start_time: null, close_time: null, clsoed: false },
        sunday: { start_time: null, close_time: null, clsoed: false },
        monday: { start_time: null, close_time: null, clsoed: false },
        tuesday: { start_time: null, close_time: null, clsoed: false },
        wednesday: { start_time: null, close_time: null, clsoed: false },
        thursday: { start_time: null, close_time: null, clsoed: false },
        friday: { start_time: null, close_time: null, clsoed: false },
      }
    };
    this.validator = new SimpleReactValidator();
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.openFileDlg = this.openFileDlg.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.addSocialLink = this.addSocialLink.bind(this);
    this.removeSocialLink = this.removeSocialLink.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onMarkClosed = this.onMarkClosed.bind(this);
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

  handleDescriptionChange(val) {
    this.setState({ description: val });
  }

  addSocialLink(e) {
    e.preventDefault();
    let { socialLinks } = this.state;
    socialLinks.push({ name: "", link: "" });
    this.setState({socialLinks});
  }

  removeSocialLink(e, index) {
    e.preventDefault();
    if (index === 0) return;
    let { socialLinks } = this.state;
    socialLinks.splice(index, 1);
    this.setState({socialLinks});
  }

  handleSelect(e, index) {
    let { socialLinks } = this.state;
    socialLinks[index]["name"] = e.target.value;
    this.setState({socialLinks});
  }

  handleChangeLink(e, index) {
    let { socialLinks } = this.state;
    socialLinks[index]["link"] = e.target.value;
    this.setState({socialLinks});
  }

  handleChangeTime(e, week, type) {
    e.preventDefault();
    let { openingHours } = this.state;
    openingHours[week][type] = e.target.value;
    this.setState({openingHours});
  }

  onMarkClosed(e, week) {
    let { openingHours } = this.state;
    openingHours[week]["clsoed"] = e.target.checked;
  }

  updateProfile(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    let formData = new FormData();
    formData.append("social_links", JSON.stringify(this.state.socialLinks));
    formData.append("opening_hours", JSON.stringify(this.state.openingHours));
    formData.append("description", this.state.description);
    formData.append("seller", this.props.login._id);
    
    axios.post("/api/store/new", {
      social_links: JSON.stringify(this.state.socialLinks),
      opening_hours: JSON.stringify(this.state.openingHours),
      description: this.state.description,
      seller: this.props.login._id
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ submitting: false });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ submitting: false });
      })
  }

  render() {
    const { socialLinks, submitting } = this.state;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="My Store" />
        <section className="edit-store-wrapper border-bottom section-bg section-padding-strict">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="atbd_content_module">
                  <div className="atbd_content_module__tittle_area">
                    <div className="atbd_area_title">
                      <h4>
                        <span className="la la-user"></span>General Information
                      </h4>
                    </div>
                  </div>
                  <div className="atbdb_content_module_contents">
                    <form action="/">
                      <div className="form-group">
                        <label htmlFor="title" className="form-label">
                          Description
                        </label>
                        <ReactQuill theme="snow" value={this.state.description} onChange={this.handleDescriptionChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Social Information</label>
                        <div id="social_info_sortable_container">
                          <div className="directorist atbdp_social_field_wrapper">
                            {
                              socialLinks.map((social, index) => {
                                return (
                                  <div
                                    className="row m-bottom-20"
                                    id={"social-form-fields" + index}
                                    key={index}
                                  >
                                    <div className="col-sm-4">
                                      <div className="form-group">
                                        <div className="select-basic">
                                          <select className="form-control" onChange={(e) => this.handleSelect(e, index)}>
                                            <option value="behance"> Behance</option>
                                            <option value="dribbble">
                                              {" "}
                                              Dribbble
                                            </option>
                                            <option value="facebook">
                                              {" "}
                                              Facebook
                                            </option>
                                            <option value="flickr"> Flickr</option>
                                            <option value="github"> Github</option>
                                            <option value="google-plus">
                                              {" "}
                                              Google+
                                            </option>
                                            <option value="instagram">
                                              {" "}
                                              Instagram
                                            </option>
                                            <option value="linkedin">
                                              {" "}
                                              LinkedIn
                                            </option>
                                            <option value="pinterest">
                                              {" "}
                                              Pinterest
                                            </option>
                                            <option value="reddit"> Reddit</option>
                                            <option value="snapchat-ghost">
                                              {" "}
                                              Snapchat
                                            </option>
                                            <option value="soundcloud">
                                              {" "}
                                              SoundCloud
                                            </option>
                                            <option value="stack-overflow">
                                              {" "}
                                              StackOverFLow
                                            </option>
                                            <option value="tumblr"> Tumblr</option>
                                            <option value="twitter"> Twitter</option>
                                            <option value="vimeo"> Vimeo</option>
                                            <option value="vine"> Vine</option>
                                            <option value="youtube"> Youtube</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <input
                                          type="url"
                                          className="form-control directory_field atbdp_social_input"
                                          placeholder="eg. http://example.com"
                                          required=""
                                          onChange={(e) => this.handleChangeLink(e, index)}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-2">
                                      <span
                                        className="removeSocialField btn-danger"
                                        id={"removeSocial" + index}
                                        title="Remove this item"
                                        onClick={(e) => this.removeSocialLink(e, index)}
                                      >
                                        <i className="la la-times"></i>
                                      </span>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                        <button className="copy-btn btn btn-sm btn-secondary" onClick={this.addSocialLink}>
                          <i className="la la-plus"></i> Add New
                        </button>
                      </div>

                      {/*<!-- ends: .form-group -->*/}
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
                        <span className="la la-calendar-check-o"></span>{" "}
                        Opening/Business Hour Information
                      </h4>
                    </div>
                  </div>
                  <div className="atbdb_content_module_contents">
                    <div className="business-hour">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label
                              htmlFor="bdbh_saturday"
                              className="atbd_day_label form-label"
                            >
                              Saturday
                            </label>
                            <div className="row atbd_row_bg">
                              <div className="col-sm-6">
                                <label
                                  htmlFor="bdbh_saturday"
                                  className="not_empty"
                                >
                                  Start time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_saturday"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "saturday", "start_time")}
                                />
                              </div>
                              <div className="col-sm-6 mt-3 mt-sm-0">
                                <label
                                  htmlFor="bdbh_saturday_cls"
                                  className="not_empty"
                                >
                                  Close time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_saturday_cls"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "saturday", "close_time")}
                                />
                              </div>
                            </div>
                            <div className="atbd_mark_as_closed custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="enable247hour"
                                value="1"
                                id="sat_cls"
                                onChange={(e) => this.onMarkClosed(e, "saturday")}
                              />
                              <label
                                htmlFor="sat_cls"
                                className="not_empty custom-control-label"
                              >
                                {" "}
                                Mark as Closed{" "}
                              </label>
                            </div>
                          </div>
                          {/*<!-- ends: .form-group -->*/}
                          <div className="form-group">
                            <label
                              htmlFor="bdbh_sunday"
                              className="atbd_day_label form-label"
                            >
                              Sunday
                            </label>
                            <div className="row atbd_row_bg">
                              <div className="col-sm-6">
                                <label
                                  htmlFor="bdbh_sunday"
                                  className="not_empty"
                                >
                                  Start time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_sunday"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "sunday", "start_time")}
                                />
                              </div>
                              <div className="col-sm-6 mt-3 mt-sm-0">
                                <label
                                  htmlFor="bdbh_sunday_cls"
                                  className="not_empty"
                                >
                                  Close time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_sunday_cls"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "sunday", "close_time")}
                                />
                              </div>
                            </div>
                            <div className="atbd_mark_as_closed custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="enable247hour"
                                value="1"
                                id="sun_cls"
                                onChange={(e) => this.onMarkClosed(e, "sunday")}
                              />
                              <label
                                htmlFor="sun_cls"
                                className="not_empty custom-control-label"
                              >
                                {" "}
                                Mark as Closed{" "}
                              </label>
                            </div>
                          </div>
                          {/*<!-- ends: .form-group -->*/}
                          <div className="form-group">
                            <label
                              htmlFor="bdbh_monday"
                              className="atbd_day_label form-label"
                            >
                              Monday
                            </label>
                            <div className="row atbd_row_bg">
                              <div className="col-sm-6">
                                <label
                                  htmlFor="bdbh_monday"
                                  className="not_empty"
                                >
                                  Start time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_monday"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "monday", "start_time")}
                                />
                              </div>
                              <div className="col-sm-6 mt-3 mt-sm-0">
                                <label
                                  htmlFor="bdbh_monday_cls"
                                  className="not_empty"
                                >
                                  Close time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_monday_cls"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "monday", "close_time")}
                                />
                              </div>
                            </div>
                            <div className="atbd_mark_as_closed custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="enable247hour"
                                value="1"
                                id="mon_cls"
                                onChange={(e) => this.onMarkClosed(e, "monday")}
                              />
                              <label
                                htmlFor="mon_cls"
                                className="not_empty custom-control-label"
                              >
                                {" "}
                                Mark as Closed{" "}
                              </label>
                            </div>
                          </div>
                          {/*<!-- ends: .form-group -->*/}
                          <div className="form-group">
                            <label
                              htmlFor="bdbh_tuesday"
                              className="atbd_day_label form-label"
                            >
                              Tuesday
                            </label>
                            <div className="row atbd_row_bg">
                              <div className="col-sm-6">
                                <label
                                  htmlFor="bdbh_tuesday"
                                  className="not_empty"
                                >
                                  Start time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_tuesday"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "tuesday", "start_time")}
                                />
                              </div>
                              <div className="col-sm-6 mt-3 mt-sm-0">
                                <label
                                  htmlFor="bdbh_tuesday_cls"
                                  className="not_empty"
                                >
                                  Close time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_tuesday_cls"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "tuesday", "close_time")}
                                />
                              </div>
                            </div>
                            <div className="atbd_mark_as_closed custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="enable247hour"
                                value="1"
                                id="tue_cls"
                                onChange={(e) => this.onMarkClosed(e, "tuesday")}
                              />
                              <label
                                htmlFor="tue_cls"
                                className="not_empty custom-control-label"
                              >
                                {" "}
                                Mark as Closed{" "}
                              </label>
                            </div>
                          </div>
                          {/*<!-- ends: .form-group -->*/}
                          <div className="form-group">
                            <label
                              htmlFor="bdbh_wednesday"
                              className="atbd_day_label form-label"
                            >
                              Wednesday
                            </label>
                            <div className="row atbd_row_bg">
                              <div className="col-sm-6">
                                <label
                                  htmlFor="bdbh_wednesday"
                                  className="not_empty"
                                >
                                  Start time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_wednesday"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "wednesday", "start_time")}
                                />
                              </div>
                              <div className="col-sm-6 mt-3 mt-sm-0">
                                <label
                                  htmlFor="bdbh_wednesday_cls"
                                  className="not_empty"
                                >
                                  Close time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_wednesday_cls"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "wednesday", "close_time")}
                                />
                              </div>
                            </div>
                            <div className="atbd_mark_as_closed custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="enable247hour"
                                value="1"
                                id="wed_cls"
                                onChange={(e) => this.onMarkClosed(e, "wednesday")}
                              />
                              <label
                                htmlFor="wed_cls"
                                className="not_empty custom-control-label"
                              >
                                {" "}
                                Mark as Closed{" "}
                              </label>
                            </div>
                          </div>
                          {/*<!-- ends: .form-group -->*/}
                          <div className="form-group">
                            <label
                              htmlFor="bdbh_thursday"
                              className="atbd_day_label form-label"
                            >
                              Thursday
                            </label>
                            <div className="row atbd_row_bg">
                              <div className="col-sm-6">
                                <label
                                  htmlFor="bdbh_thursday"
                                  className="not_empty"
                                >
                                  Start time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_thursday"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "thursday", "start_time")}
                                />
                              </div>
                              <div className="col-sm-6 mt-3 mt-sm-0">
                                <label
                                  htmlFor="bdbh_thursday_cls"
                                  className="not_empty"
                                >
                                  Close time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_thursday_cls"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "thursday", "close_time")}
                                />
                              </div>
                            </div>
                            <div className="atbd_mark_as_closed custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="enable247hour"
                                value="1"
                                id="thu_cls"
                                onChange={(e) => this.onMarkClosed(e, "thursday")}
                              />
                              <label
                                htmlFor="thu_cls"
                                className="not_empty custom-control-label"
                              >
                                {" "}
                                Mark as Closed{" "}
                              </label>
                            </div>
                          </div>
                          {/*<!-- ends: .form-group -->*/}
                          <div className="form-group">
                            <label
                              htmlFor="bdbh_friday"
                              className="atbd_day_label form-label"
                            >
                              Friday
                            </label>
                            <div className="row atbd_row_bg">
                              <div className="col-sm-6">
                                <label
                                  htmlFor="bdbh_friday"
                                  className="not_empty"
                                >
                                  Start time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_friday"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "friday", "start_time")}
                                />
                              </div>
                              <div className="col-sm-6 mt-3 mt-sm-0">
                                <label
                                  htmlFor="bdbh_friday_cls"
                                  className="not_empty"
                                >
                                  Close time
                                </label>
                                <input
                                  type="time"
                                  id="bdbh_friday_cls"
                                  className="form-control directory_field"
                                  onChange={(e) => this.handleChangeTime(e, "friday", "close_time")}
                                />
                              </div>
                            </div>
                            <div className="atbd_mark_as_closed custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                name="enable247hour"
                                value="1"
                                id="fri_cls"
                                onChange={(e) => this.onMarkClosed(e, "friday")}
                              />
                              <label
                                htmlFor="fri_cls"
                                className="not_empty custom-control-label"
                              >
                                {" "}
                                Mark as Closed{" "}
                              </label>
                            </div>
                          </div>
                          {/*<!-- ends: .form-group -->*/}
                        </div>
                        {/*<!--ends col-md-6 col-sm-12-->*/}
                      </div>
                      {/*<!--ends .row-->*/}
                    </div>
                  </div>
                  {/*<!-- ends: .atbdb_content_module_contents -->*/}
                </div>
                {/*<!-- ends: .atbd_content_module -->*/}
              </div>
              {/*<!-- ends: .col-lg-10 -->*/}
              <div className="col-lg-10 offset-lg-1 text-center">
                <div className="btn_wrap list_submit m-top-25">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg listing_submit_btn"
                    disabled={submitting}
                    onClick={this.updateProfile}
                  >
                    {
                      submitting && (
                        <i className="las la-spinner la-spin mr-2"></i>
                      )
                    }
                    Update Profile
                  </button>
                </div>
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
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProp)(MyStore);
