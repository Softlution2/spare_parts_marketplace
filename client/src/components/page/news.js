import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { PageBanner } from "../content/element/page-banner";
import PreHeader from "../layout/pre-header";
import Header from '../layout/header';
import Footer from '../layout/footer';
import NewsGrid4 from '../content/element/card/news-blog-grid4';

const News = (props) => {
  return (
    <Fragment>
      {/* Header section start */}
      <PreHeader />
      <Header />
      {/* Header section end */}
      <PageBanner title="News" />
      <section className="blog-area blog-grid section-padding-strict section-bg">
        <div className="container">
          <div className="row">
              <NewsGrid4 blog={props.news} />                        
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    news : state.news,
  }
}
export default connect(mapStateToProps)(News);