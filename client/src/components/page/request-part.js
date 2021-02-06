import React, { Fragment } from "react";
import { PageBanner } from "../content/element/page-banner";
import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { connect } from "react-redux";
import Select from "react-select";

class RequestPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [{
        name: "",
        oem: "",
        partImg: "",
      }],
      makes: [],
      models: [],
    }
    this.addPart = this.addPart.bind(this);
    this.removePart = this.removePart.bind(this);
  }

  componentDidMount() {

  }

  addPart(e) {
    e.preventDefault();
    let { parts } = this.state;
    parts.push({
      name: "",
      oem: "",
      partImg: ""
    });
    this.setState({parts});
  }

  removePart(e, index) {
    e.preventDefault();
    if (index === 0) return;
    let { parts } = this.state;
    // console.log(index);
    parts.splice(index, 1);
    // console.log(parts, index);
    this.setState({parts});
  }


  render() {
    const { parts }  = this.state;
    return (
      <Fragment>
        {/* Header section start */}
        <PreHeader />
        <Header />
        {/* Header section end */}
        <PageBanner title="Request parts" />
        
        <section className="edit-store-wrapper border-bottom section-bg section-padding-strict">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="atbd_content_module">
                  <div className="atbd_content_module__tittle_area">
                    <div className="atbd_area_title">
                      <h4>
                        <span className="la la-user"></span>CUSTOMER INFORMATION
                      </h4>
                    </div>
                  </div>
                  <div className="atbdb_content_module_contents">
                    <form action="/">
                      <div className="form-group">
                        <label className="form-label">Your Name</label>
                        <input type="text" className="form-control" name="name" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Your Email</label>
                        <input type="email" className="form-control" name="email" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Your Phone</label>
                        <input type="text" className="form-control" name="phone" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Your Company</label>
                        <input type="text" className="form-control" name="company" />
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
                        <span className="la la-calendar-check-o"></span>VEHICLE INFORMATION
                      </h4>
                    </div>
                  </div>
                  <div className="atbdb_content_module_contents">
                    <form action="/">
                      <div className="form-group">
                        <label className="form-label">VIN Number</label>
                        <input type="text" className="form-control" name="vin_number" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">VIN Image</label>
                        <input type="file" className="form-control" name="vin_image" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Car Make</label>
                        <Select
                          name="make"
                          options={[]}
                          isMulti={true}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Car Model</label>
                        <Select
                          name="model"
                          options={[]}
                          isMulti={true}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Car Vision</label>
                        <Select
                          name="vision"
                          options={[]}
                          isMulti={true}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Car Year</label>
                        <Select
                          name="year"
                          options={[]}
                          isMulti={true}
                        />
                      </div>
                    </form>
                  </div>
                  {/*<!-- ends: .atbdb_content_module_contents -->*/}
                </div>
                {/*<!-- ends: .atbd_content_module -->*/}
              </div>
              <div className="col-lg-10 offset-lg-1">
                <div className="atbd_content_module">
                  <div className="atbd_content_module__tittle_area">
                    <div className="atbd_area_title">
                      <h4>
                        <span className="la la-calendar-check-o"></span>PARTS INFORMATION
                      </h4>
                    </div>
                  </div>
                  <div className="atbdb_content_module_contents">
                    <form action="/">
                      <table>
                        <thead>
                          <tr>
                            <td className="form-label" width={'25%'}>Part Name</td>
                            <td className="form-label" width={'25%'}>OEM</td>
                            <td className="form-label" width={'25%'}>Part Image</td>
                            <td></td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            parts.map((part, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <input type="text" className="form-control" />
                                  </td>
                                  <td>
                                    <input type="text" className="form-control" />
                                  </td>
                                  <td>
                                    <div class="custom-file-upload">
                                      <input type="file" id={`customFile${index}`} style={{display: 'none'}} />
                                      <label for={`customFile${index}`} class="btn btn-sm btn-secondary">
                                        <i className="la la-cloud-upload-alt" />
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="removeSocialField btn-danger" onClick={(e) => this.removePart(e, index)}>
                                      <i className="la la-times"></i>
                                    </span>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                      <div className="form-group">
                        <button className="btn btn-sm btn-secondary" onClick={this.addPart}>
                          Add More Parts
                        </button>
                      </div>
                    </form>
                  </div>
                  {/*<!-- ends: .atbdb_content_module_contents -->*/}
                </div>
                {/*<!-- ends: .atbd_content_module -->*/}
              </div>

              <div className="col-lg-10 offset-lg-1 text-center">
                <div className="btn_wrap list_submit m-top-25">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg listing_submit_btn"
                    // disabled={submitting}
                    // onClick={this.updateProfile}
                  >
                    {
                      // submitting && (
                        // <i className="las la-spinner la-spin mr-2"></i>
                      // )
                    }
                    Update Profile
                  </button>
                </div>
              </div>
              {/*<!-- ends: .col-lg-10 -->*/}
            </div>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(RequestPart);
