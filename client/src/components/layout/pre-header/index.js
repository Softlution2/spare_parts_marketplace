import React, { Component } from "react";
import { WebSocketContext } from '../../../WebSocket';
import { withTranslation } from 'react-i18next'
import i18next from "i18next";


const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  ar: { label: "العربية", dir: "rtl", active: false },
};

class PreHeader extends Component {
  static contextType = WebSocketContext;
  constructor(props) {
    super(props);
    this.state = {
    }
    this.changeLang = this.changeLang.bind(this);
  }

  componentDidMount() {
    // console.log(this.context);
    // console.log(this.ws);
  }
  changeLang(e, lang) {
    e.preventDefault();
    localStorage.setItem("lang", lang);
    i18next.changeLanguage(lang);
  }

  render() {
    const curLang = localStorage.getItem("lang") || "en";
    const { t } = this.props;
    return (
      <section className="pre-header-wrapper">
      <div className="header-left d-none d-md-block">
        <span>{t("top_bar_text")}</span>
      </div>
        <div className="header-right">
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
                  <a onClick={(e) => this.changeLang(e, item)} className="dropdown-item" href="#!" key={index}>
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
              AED
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a className="dropdown-item" href="#!">
                SAR
              </a>
              <a className="dropdown-item" href="#!">
                OMR
              </a>
              <a className="dropdown-item" href="#!">
                QAR
              </a>
              <a className="dropdown-item" href="#!">
                BHD
              </a>
              <a className="dropdown-item" href="#!">
                USD
              </a>
              <a className="dropdown-item" href="#!">
                EUR
              </a>
              <a className="dropdown-item" href="#!">
                CNY
              </a>
              <a className="dropdown-item" href="#!">
                JPY
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation()(PreHeader);
