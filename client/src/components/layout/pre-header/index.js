import React, { Component, Fragment, useContext } from "react";
import { WebSocketContext } from '../../../WebSocket';
import Modal from "react-awesome-modal";
import { Scrollbars } from 'react-custom-scrollbars';
import { withTranslation } from 'react-i18next'
import i18next from "i18next";

import { countryCodes } from "../../../constants";
import { getCountryCode } from "../../../utils";

const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  fr: { label: "Français", dir: "ltr", active: false },
  ar: { label: "العربية", dir: "rtl", active: false },
  pt: { label: "Portuguese", dir: "ltr", active: false },
  sw: { label: "Swahili", dir: "ltr", active: false },
  zh: { label: "中文", dir: "ltr", active: false }
};

class PreHeader extends Component {
  static contextType = WebSocketContext;
  constructor(props) {
    super(props);
    this.state = {
      countryModalOpen: false,
    }
    this.openCountryModal = this.openCountryModal.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }

  componentDidMount() {
    // console.log(this.context);
    // console.log(this.ws);
  }
  openCountryModal(e) {
    e.preventDefault();
    const { countryModalOpen } = this.state;
    this.setState({countryModalOpen: !countryModalOpen});
  }
  closeModal() {
    this.setState({countryModalOpen: false});
  }
  changeLang(e, lang) {
    e.preventDefault();
    localStorage.setItem("lang", lang);
    i18next.changeLanguage(lang);
  }

  render() {
    const { countryModalOpen } = this.state;
    const curCountry = getCountryCode();
    const curLang = localStorage.getItem("lang") || "en";
    const { t } = this.props;
    return (
      <section className="pre-header-wrapper">
        <div className="header-left d-none d-md-block">
          <span>{t("top_bar_text")} {getCountryCode().country}</span>
        </div>
        <div className="header-right">
          <div className="dropdown">
            <a
              href="#!"
              className="dropdown-toggle"
              type="button"
              onClick={this.openCountryModal}
            >
              <img src={`/assets/img/flags/${curCountry['code']}.svg`} className="mr-2"  width="20" />
              {curCountry['country']}
            </a>
          </div>
          <div className="dropdown">
            <a
              href="#!"
              className="dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {languageMap[curLang].label}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              {
                Object.keys(languageMap).map((item, index) => (
                  <a onClick={(e) => this.changeLang(e, item)} className="dropdown-item" href="#" key={index}>
                    {languageMap[item].label}
                  </a>
                ))
              }
            </div>
          </div>
          <div className="dropdown">
            <a
              href="#!"
              className="dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              USD
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a className="dropdown-item" href="#">
                AUD
              </a>
              <a className="dropdown-item" href="#">
                CAD
              </a>
              <a className="dropdown-item" href="#">
                RUB
              </a>
              <a className="dropdown-item" href="#">
                SGD
              </a>
            </div>
          </div>
        </div>
        <Modal visible={countryModalOpen} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div className="modal-header">
            {t("")}
            Choose your country
          </div>
          <Scrollbars style={{ height: '80vh' }}>
              <div className="country-list">
                {
                  countryCodes.map((code, index) => {
                    return (
                      <a href={`http://13.55.69.149`} key={index} className="country-item">
                        <img src={`/assets/img/flags/${code.code.toLowerCase()}.svg`} width="50" className="mr-3"></img>
                        <span>{code.country}</span>
                      </a>
                    )
                  })
                }
              </div>
          </Scrollbars>
        </Modal>
      </section>
    );
  }
}

export default withTranslation()(PreHeader);
