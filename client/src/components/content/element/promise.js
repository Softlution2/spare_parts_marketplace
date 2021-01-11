import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next'

class Promise extends Component {

    render() {
        const { iconColor, t } = this.props;
        return (
            <Fragment>
              <div className="col-lg-4">
                  <div className="item">
                      <div className="icon-img">
                          <img src={`/assets/img/icons/assured-${iconColor === 'blue' ? 'blue-' : ''}1.png`}></img>
                      </div>
                      <div className="title mt-2">
                          {t("home_promise_card1_title")}
                      </div>
                      <div className="message mt-2">
                        {t("home_promise_card1_description")}
                      </div>
                  </div>
              </div>
              <div className="col-lg-4">
                  <div className="item">
                      <div className="icon-img">
                      <img src={`/assets/img/icons/assured-${iconColor === 'blue' ? 'blue-' : ''}3.png`}></img>
                      </div>
                      <div className="title mt-2">
                        {t("home_promise_card2_title")}
                      </div>
                      <div className="message mt-2">
                        {t("home_promise_card2_description")}
                      </div>
                  </div>
              </div>
              <div className="col-lg-4">
                  <div className="item">
                      <div className="icon-img">
                      <img src={`/assets/img/icons/assured-${iconColor === 'blue' ? 'blue-' : ''}2.png`}></img>
                      </div>
                      <div className="title mt-2">
                        {t("home_promise_card3_title")}
                      </div>
                      <div className="message mt-2">
                        {t("home_promise_card3_description")}
                      </div>
                  </div>
              </div>
            </Fragment>
        )
    }
}

export default withTranslation()(Promise)