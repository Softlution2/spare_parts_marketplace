import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { PageBanner } from "../content/element/page-banner";
import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";

class Settings extends Component {
  render() {
    return (
      <Fragment>
        {/* Header section start */}
        <PreHeader />
        <Header />
        {/* Header section end */}
        <PageBanner title="Settings" />

        <section className="author-info-area section-padding-strict section-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 mb-5 mb-lg-0">
                <div className="user_pro_img_area">
                  <img src="./assets/img/author-profile.jpg" alt="" />
                  <div className="image-info">
                    <h6>Profile Image</h6>
                    <span>JPG or PNG 120x120 px</span>
                  </div>
                  <div className="custom-file-upload">
                    <input
                      type="file"
                      id="customFile"
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="customFile"
                      className="btn btn-sm btn-secondary"
                    >
                      Upload New Image
                    </label>
                  </div>
                  <button className="btn btn-sm btn-danger">
                    Delete Image
                  </button>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="atbd_author_module">
                  <div className="atbd_content_module">
                    <div className="atbd_content_module__tittle_area">
                      <div className="atbd_area_title">
                        <h4>
                          <span className="la la-user"></span>My Profile
                        </h4>
                      </div>
                    </div>
                    <div className="atbdb_content_module_contents">
                      <div className="user_info_wrap">
                        {/*<!--Full name-->*/}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="full_name" className="not_empty">
                                Full Name
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Full name"
                                id="full_name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="user_name" className="not_empty">
                                Username
                              </label>
                              <input
                                className="form-control"
                                id="user_name"
                                type="text"
                                disabled="disabled"
                                value="admin"
                              />
                              <p>(Username can not be changed)</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="first_name" className="not_empty">
                                First Name
                              </label>
                              <input
                                className="form-control"
                                id="first_name"
                                type="text"
                                name="user[first_name]"
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="last_name" className="not_empty">
                                Last Name
                              </label>
                              <input
                                className="form-control"
                                id="last_name"
                                type="text"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="req_email" className="not_empty">
                                Email (required)
                              </label>
                              <input
                                className="form-control"
                                id="req_email"
                                type="text"
                                placeholder="mail@example.com"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="phone" className="not_empty">
                                Cell Number
                              </label>
                              <input
                                className="form-control"
                                type="tel"
                                placeholder="Phone number"
                                id="phone"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="website" className="not_empty">
                                Website
                              </label>
                              <input
                                className="form-control"
                                id="website"
                                type="text"
                                placeholder="Website"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="address" className="not_empty">
                                Address
                              </label>
                              <input
                                className="form-control"
                                id="address"
                                type="text"
                                placeholder="Address"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="new_pass" className="not_empty">
                                New Password
                              </label>
                              <input
                                id="new_pass"
                                className="form-control"
                                type="password"
                                placeholder="Password"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="confirm_pass"
                                className="not_empty"
                              >
                                Confirm New Password
                              </label>
                              <input
                                id="confirm_pass"
                                className="form-control"
                                type="password"
                                placeholder="Re-enter Password"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="facebook" className="not_empty">
                                Facebook
                              </label>
                              <input
                                id="facebook"
                                className="form-control"
                                type="url"
                                placeholder="Facebook URL"
                              />
                              <p>Leave it empty to hide</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="twitter" className="not_empty">
                                Twitter
                              </label>
                              <input
                                id="twitter"
                                className="form-control"
                                type="url"
                                placeholder="Twitter URL"
                              />
                              <p>Leave it empty to hide</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="google" className="not_empty">
                                Google+
                              </label>
                              <input
                                id="google"
                                className="form-control"
                                type="url"
                                placeholder="Google+ URL"
                              />
                              <p>Leave it empty to hide</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="linkedIn" className="not_empty">
                                LinkedIn
                              </label>
                              <input
                                id="linkedIn"
                                className="form-control"
                                type="url"
                                placeholder="Linkedin URL"
                              />
                              <p>Leave it empty to hide</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="youtube" className="not_empty">
                                Youtube
                              </label>
                              <input
                                id="youtube"
                                className="form-control"
                                type="url"
                                placeholder="Youtube URL"
                              />
                              <p>Leave it empty to hide</p>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="bio" className="not_empty">
                                About Author
                              </label>
                              <textarea
                                className="wp-editor-area form-control"
                                rows="6"
                                autoComplete="off"
                                id="bio"
                                placeholder="Describe yourself"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        {/*<!--ends social info .row-->*/}
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="update_user_profile"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/*<!-- ends: .atbd_author_module -->*/}
              </div>
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
    list: state.list,
  };
};
export default connect(mapStateToProps)(Settings);
