import React, { Fragment } from "react";
import { PageBanner } from "../content/element/page-banner";
import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { connect } from "react-redux";

class RequestPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [{
        name: "",
        oem: "",
        partImg: "",
      }],
    }
    this.addPart = this.addPart.bind(this);
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


  render() {
    const { parts }  = this.state;
    return (
      <Fragment>
        {/* Header section start */}
        <PreHeader />
        <Header />
        {/* Header section end */}
        <PageBanner title="Request parts" />
        <section className="request-part-area section-padding-strict border-bottom">
          <div className="container-fluid">
            <form>
              <div className="form-group row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-3">
                      <label>Email:</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h2 className="text-warning mb-5">Your VIN Information</h2>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>VIN Number</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="vin_number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>VIN Image</label>
                    </div>
                    <div className="col-md-9">
                      <div className="vin-image-upload-wrapper">
                        <button className="vin-upload btn btn-primary">
                          <i className="la la-cloud-upload-alt"></i>
                        </button>
                        <p>Drop image here PNG, JPG, No more than 5 Mb.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <h2 className="text-warning mb-5">Your car model</h2>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>Make</label>
                    </div>
                    <div className="col-md-9">
                      <select className="form-control"></select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>Model</label>
                    </div>
                    <div className="col-md-9">
                      <select className="form-control"></select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>Year</label>
                    </div>
                    <div className="col-md-9">
                      <select className="form-control"></select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>Engine</label>
                    </div>
                    <div className="col-md-9">
                      <select className="form-control"></select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <h2 className="text-warning">The item you're looking for</h2>
              </div>
              {
                parts.length > 0 && parts.map((part, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-md-3">
                        <div className="form-group row">
                          <div className="col-md-3">
                            <label>Part Name:</label>
                          </div>
                          <div className="col-md-9">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group row">
                          <div className="col-md-3">
                            <label>OEM:</label>
                          </div>
                          <div className="col-md-9">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group row">
                          <div className="col-md-3">
                            <label>Part Image:</label>
                          </div>
                          <div className="col-md-9">
                            <div className="vin-image-upload-wrapper">
                              <button className="vin-upload btn btn-primary">
                                <i className="la la-cloud-upload-alt"></i>
                              </button>
                              <p>Drop image here PNG, JPG, No more than 5 Mb.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group text-right">
                          {
                            index !== 0 && (
                              <a href="#!" className="display-2 text-danger">
                                <i className="la la-trash"></i>
                              </a>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="form-group">
                <button className="btn btn-primary" onClick={this.addPart}>
                  + ADD MORE PARTS
                </button>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <textarea className="form-control" rows={5} placeholder="Write your comment"></textarea>
                </div>
              </div>
            </form>
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
