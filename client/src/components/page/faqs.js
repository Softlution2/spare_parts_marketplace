import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import { SectionTitle } from "../content/element/section-title";
import { Accordion2 } from '../content/element/accordion';

class Faqs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="Faqs" />

        <section className="faq-wrapper section-padding border-bottom pb-5">
          <div className="container">
            <SectionTitle
              title="Your Questions Answered"
              content="Eiusmod temporeum dicant partem scripserit"
            />

            <div className="row">
              <div className="col-lg-12">
                <div className="faq-contents">
                  <div className="atbd_content_module atbd_faqs_module">
                    <div className="atbd_content_module__tittle_area">
                      <div className="atbd_area_title">
                        <h4>
                          <span className="la la-question-circle"></span>
                          Lisiitng FAQ's
                        </h4>
                      </div>
                    </div>
                    <Accordion2 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </Fragment>
    );
  }
}

export default Faqs;
