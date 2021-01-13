import React, { Fragment } from "react";
import { PageBanner } from "../content/element/page-banner";
import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { connect } from "react-redux";
import {
  Category,
  PopularPost,
  RecentPost,
  PopularTags,
  StayUpdate,
  ConnentFollow,
} from "../content/element/widget";
import DetailsContent from "../container/news-details";

const NewsDetails = (props) => {
  const id = props.match.params.id;
  const filter = Object.values(props.news).filter((value) => {
    return value.id === id;
  });
  return (
    <Fragment>
      {/* Header section start */}
      <PreHeader />
      <Header />
      {/* Header section end */}
      <PageBanner title="News Details" />

      <section className="blog-area section-padding-strict border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <DetailsContent contents={filter[0]} />
            </div>
            <div className="col-md-4 mt-5 mt-md-0">
              <div className="sidebar">
                {/* <!-- search widget --> */}
                <div className="widget-wrapper">
                  <div className="search-widget">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          className="fc--rounded"
                          placeholder="Search"
                        />
                        <button type="submit">
                          <i className="la la-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>

                  <Category />
                  <PopularPost blog={props.news} />
                  <RecentPost blog={props.news} />
                  <PopularTags />
                  <StayUpdate />
                  <ConnentFollow />
                </div>
                {/*<!-- ends: .widget-wrapper -->*/}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    news: state.news,
  };
};
export default connect(mapStateToProps)(NewsDetails);
