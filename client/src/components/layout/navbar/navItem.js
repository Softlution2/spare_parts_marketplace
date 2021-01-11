import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next'
class NavItem extends Component {
  render() {
    const { t } = this.props;
    return (
      <Fragment>            
        <ul className="navbar-nav">
          <li>
            <NavLink to="/all-listings" >{t('menu_buy_car')}</NavLink>
          </li>
          <li>
            <NavLink to="/sell-your-car">{t('menu_sell_car')}</NavLink>
          </li>
          <li>
            <NavLink to="/car-insurance">{t('menu_insurance')}</NavLink>
          </li>
          <li>
            <NavLink to="/car-finance">{t('menu_finance')}</NavLink>
          </li>
          
          <li className="dropdown has_dropdown">
            <a className="dropdown-toggle" href="# " id="drop1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {t('menu_more')}
            </a>
            <ul className="dropdown-menu" aria-labelledby="drop1">
              <li><NavLink to="/car-vin-check">{t('menu_vin_check')}</NavLink></li>
              <li><NavLink to="/car-valuation">{t('menu_free_car_valuation')}</NavLink></li>
              <li><NavLink to="/car-plate-recognition">{t('menu_plate_recognition')}</NavLink></li>
              <li><NavLink to="/car-recognition">{t('menu_car_recognition')}</NavLink></li>
              <li><NavLink to="/about-us">{t('menu_about')}</NavLink></li>
              <li><NavLink to="/contact">{t('menu_contact')}</NavLink></li>
              {/* <!-- dropdowns example --> */}                            
            </ul>
          </li>
        </ul>
      </Fragment>
    )
  }
}

export default withTranslation()(NavItem);