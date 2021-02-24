import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import { CardBarChart2, EChartCard, Card, CardBody } from "./style";
import ChartjsAreaChart from "../content/element/chart/chartjs-area-chart";

class MyDashboard extends Component {
  componentDidMount() {}

  render() {
    const { isLoading } = this.props.list;
    const { t } = this.props;
    return (
      <Fragment>
        <LoadingOverlay active={isLoading} spinner text={t("loading_listing")}>
          <PreHeader />
          <Header class="menu--light" />
          <PageBanner title={"My Dashboard"} />
          <section className="dashboard-wrapper section-bg pt-5 pb-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <Card>
                    <CardBody>
                      <EChartCard>
                        <div className="card-chunk">
                          <CardBarChart2>
                            <h1>2</h1>
                            <span>Buyers</span>
                            <p>
                              <span className="growth-upward">
                                <i className="la la-arrow-up" /> 25%
                              </span>
                              <span>Since last week</span>
                            </p>
                          </CardBarChart2>
                        </div>
                      </EChartCard>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-md-6">
                  <Card>
                    <CardBody>
                      <EChartCard>
                        <div className="card-chunk">
                          <CardBarChart2>
                            <h1>3</h1>
                            <span>Buyers</span>
                            <p>
                              <span className="growth-downward">
                              <i className="la la-arrow-down" /> 45%
                              </span>
                              <span>Since last week</span>
                            </p>
                          </CardBarChart2>
                        </div>
                      </EChartCard>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Card>
                    <CardBody>
                      <ChartjsAreaChart />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </LoadingOverlay>
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
  return {};
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(MyDashboard);
