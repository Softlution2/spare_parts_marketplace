import React, { Fragment, Component } from "react";
import { withTranslation } from 'react-i18next';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import { SectionTitle } from "../content/element/section-title";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title={t("about_title")} />
        <section className="section-padding-strict">
          <div className="container">
            <SectionTitle title={t('about_mycar_africa')} content="" />
            <p>
              CARRO is an automotive marketplace that offers a full-stack
            service for all aspects of car ownership. By offering a
            trustworthy and transparent experience, CARRO challenges the
            traditional way of buying and selling cars through a proprietary
            pricing algorithm.
            </p>
            <p>Besides selling second-hand cars, CARRO
            provides services that offer a car owner everything they need
            throughout their car ownership journey. In 2019, CARRO introduced
            the First Car Subscription Service in Singapore. The new service
            aims to provide Singaporeans with a commitment-free car ownership
            experience, unlike the traditional.</p>
            <p> Carro’s technology-driven
            services leverage on innovation and technology to provide
            consumers with a seamless experience throughout. These include an
            in-house financing solution through its sister company Genie
            Financial Services and a suite of after-sales services such as an
            in-house car care workshop and Singapore’s first on-demand
            roadside recovery platform. </p>
            <h4 className="mb-4">Best Funded Automotive Marketplace</h4>
            <p>Founded in 2015, CARRO is Southeast Asia’s largest automotive marketplace for pre-owned cars, with the company having expanded to Thailand and Indonesia in 2017. Carro’s expansion coincides with exponential year-on-year growth, recording over US$100 million worth of transactions in 2016, with figures doubling to over US$250 million in 2017 and again doubling to US$500 million in 2018.</p>
            <p>In August 2019, CARRO closed their Series B funding round at US$90 million. The round was supported by notable names such as SoftBank Ventures Asia, EDBI Pte Ltd, Insignia Ventures Partners, B Capital Group and many more. Overall, CARRO has raised US$105 million since its inception. The funding has allowed the company to expand its presence across Southeast Asia and improve existing services in its automotive ecosystem.</p>
          </div>
        </section>
        <section className="section-padding-strict">
          <div className="container">
            <SectionTitle title={t("about_our_vision")} content="" />
            <p>
            We aim to lead the automotive and mobility solutions market by providing a better experience, democratising information and advancing the automotive industry.
            </p>
          </div>
        </section>
        <section className="section-padding-strict">
          <div className="container">
            <SectionTitle title={t("about_our_mission")} content="" />
            <p>
            To be the marketplace of choice for all automotive needs, providing customers with trustworthy alternatives for improving mobility. We'll catalyse change in the automotive ecosystem by driving higher standards, reshaping the industry with our solutions and empowering everybody with the experience they deserve.
            </p>
          </div>
        </section>

        <section className="section-padding-strict">
          <div className="container">
            <SectionTitle title={t("about_our_awards")} content="" />
            <p>
            Over the years, we’ve cemented our spot as Southeast Asia’s Largest Automotive Marketplace and received a host of local and international awards that recognises the excellent work and achievements we’ve accomplished in the region.
            </p>
            <p>
            These accomplishments recognise us as one of Singapore’s up-and-coming startups, which was further acknowledged by Singapore Business Review, as we were crowned the Hottest Startup in 2019.
            </p>
            <p>
            Following this achievement, we also brought home our first 2 marketing awards, winning a Silver PR Award for the Best Use of Technology in 2020 and a Silver Mobile Excellence Award for the Best E-commerce App in 2019, both presented by Marketing Magazine.
            </p>
            <p>
            Our amazing relationship with our investors, Insignia Ventures Partners, also earned us the VC Deal of the Year award given by Singapore Venture Capital and Private Equity Association (SVCA).
            </p>
            <p>
            In addition, our entrepreneurial spirit was recognised by The Business Times and OCBC Bank as we emerged as one of the finalists for the Emerging Enterprise Award. This was a great honour as we went head to head with unicorns throughout the region.
            </p>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default withTranslation()(AboutUs);
