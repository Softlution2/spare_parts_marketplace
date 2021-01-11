import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';

class HowItWorks extends Component {

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <div className="col-lg-3">
          <div className="item">
              <img src="/assets/img/how-it-works/find_your_car.png"></img>
              <div className="title mt-4">
                  {t("home_how_it_works_card1_title")}
              </div>
              <div className="message mt-3">
                {t("home_how_it_works_card1_description")}
              </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
              <img src="/assets/img/how-it-works/test_drive.png"></img>
              <div className="title mt-4">
                {t("home_how_it_works_card2_title")}
              </div>
              <div className="message mt-3">
                {t("home_how_it_works_card2_description")}
              </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
              <img src="/assets/img/how-it-works/doorstep_delivery.png"></img>
              <div className="title mt-4">
               {t("home_how_it_works_card3_title")}
              </div>
              <div className="message mt-3">
               {t("home_how_it_works_card3_description")}
              </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
              <img src="/assets/img/how-it-works/worry_free_purchase.png"></img>
              <div className="title mt-4">
                {t("home_how_it_works_card4_title")}
              </div>
              <div className="message mt-3">
                {t("home_how_it_works_card4_description")}
              </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withTranslation()(HowItWorks);