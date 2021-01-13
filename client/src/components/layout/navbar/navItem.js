import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next'
class NavItem extends Component {
  render() {
    const { t } = this.props;
    return (
      <Fragment>            
        <ul className="navbar-nav">
          <li className="drop-mega">
            <NavLink to="/all-listings" >{t('menu_buy_parts')}</NavLink>
            <div className="mega-menu fadeIn animated">
              <div className="row">
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Service Parts</span>
                    <li><NavLink to="/all-listings">Oil Filters</NavLink></li>
                    <li><NavLink to="/all-listings">Oil</NavLink></li>
                    <li><NavLink to="/all-listings">Air Filters</NavLink></li>
                    <li><NavLink to="/all-listings">Fuel Filters</NavLink></li>
                    <li><NavLink to="/all-listings">AC Filters</NavLink></li>
                    <li><NavLink to="/all-listings">Spark Plugs</NavLink></li>
                    <li><NavLink to="/all-listings">Drive Belt</NavLink></li>
                    <li><NavLink to="/all-listings">Brake Parts</NavLink></li>
                    <li><NavLink to="/all-listings">Cabin Filters</NavLink></li>
                    <li><NavLink to="/all-listings">Glow plugs</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Engine Parts</span>
                    <li><NavLink to="/all-listings">Gasket Kit Engine</NavLink></li>
                    <li><NavLink to="/all-listings">Piston</NavLink></li>
                    <li><NavLink to="/all-listings">Piston Ring</NavLink></li>
                    <li><NavLink to="/all-listings">Main Bearing</NavLink></li>
                    <li><NavLink to="/all-listings">Begin Bearing</NavLink></li>
                    <li><NavLink to="/all-listings">Connecting Rods</NavLink></li>
                    <li><NavLink to="/all-listings">Cam Shaft</NavLink></li>
                    <li><NavLink to="/all-listings">Thrust Washer</NavLink></li>
                    <li><NavLink to="/all-listings">Timing Chain & Belt</NavLink></li>
                    <li><NavLink to="/all-listings">Idler</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Engine Cooling</span>
                    <li><NavLink to="/all-listings">Exapnsion Tanks</NavLink></li>
                    <li><NavLink to="/all-listings">Intercoolers</NavLink></li>
                    <li><NavLink to="/all-listings">Thermostats</NavLink></li>
                    <li><NavLink to="/all-listings">Fans & Parts</NavLink></li>
                    <li><NavLink to="/all-listings">Thermostat - Housing & Gaskets</NavLink></li>
                    <li><NavLink to="/all-listings">Oil Coolers & Car Oil Pipes</NavLink></li>
                    <li><NavLink to="/all-listings">Fan Clutches</NavLink></li>
                    <li><NavLink to="/all-listings">Radiator Caps</NavLink></li>
                    <li><NavLink to="/all-listings">Water Hoses & Clips</NavLink></li>
                    <li><NavLink to="/all-listings">Water Pumps & Gaskets</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Fuel Parts</span>
                    <li><NavLink to="/all-listings">Fuel Pump</NavLink></li>
                    <li><NavLink to="/all-listings">Injection System</NavLink></li>
                    <li><NavLink to="/all-listings">Carburetor</NavLink></li>
                    <li><NavLink to="/all-listings">Fuel lines</NavLink></li>
                    <li><NavLink to="/all-listings">Fuel tank</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Transmission Parts</span>
                    <li><NavLink to="/all-listings">Clutch Kits</NavLink></li>
                    <li><NavLink to="/all-listings">Flywheels</NavLink></li>
                    <li><NavLink to="/all-listings">Clutch Cables</NavLink></li>
                    <li><NavLink to="/all-listings">Clutch Parts</NavLink></li>
                    <li><NavLink to="/all-listings">Associated Parts</NavLink></li>
                    <li><NavLink to="/all-listings">CV Boot Kits</NavLink></li>
                    <li><NavLink to="/all-listings">Driveshafts</NavLink></li>
                    <li><NavLink to="/all-listings">Wheel Bearings & Hubs</NavLink></li>
                    <li><NavLink to="/all-listings">Seals</NavLink></li>
                    <li><NavLink to="/all-listings">Transmission Oil</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Clutch Parts</span>
                    <li><NavLink to="/all-listings">Clutch Cover</NavLink></li>
                    <li><NavLink to="/all-listings">Clutch Disc</NavLink></li>
                    <li><NavLink to="/all-listings">Clutch Bearing</NavLink></li>
                    <li><NavLink to="/all-listings">Pilot Bearing</NavLink></li>
                    <li><NavLink to="/all-listings">Clutch Cylinder UP/LW</NavLink></li>
                    <li><NavLink to="/all-listings">Clutch Cylinder Kit</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Lamp Items</span>
                    <li><NavLink to="/all-listings">Head lamp</NavLink></li>
                    <li><NavLink to="/all-listings">Tail lamp</NavLink></li>
                    <li><NavLink to="/all-listings">Fog lamp</NavLink></li>
                    <li><NavLink to="/all-listings">Reflector</NavLink></li>
                    <li><NavLink to="/all-listings">Internal lamp</NavLink></li>
                    <li><NavLink to="/all-listings">Headlights</NavLink></li>
                    <li><NavLink to="/all-listings">Rear Lights</NavLink></li>
                    <li><NavLink to="/all-listings">Indicators</NavLink></li>
                    <li><NavLink to="/all-listings">Driving & Fog Lamps</NavLink></li>
                    <li><NavLink to="/all-listings">Lenses & Other Parts</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Electricals</span>
                    <li><NavLink to="/all-listings">Starter</NavLink></li>
                    <li><NavLink to="/all-listings">Alternator</NavLink></li>
                    <li><NavLink to="/all-listings">Relay</NavLink></li>
                    <li><NavLink to="/all-listings">Sensors</NavLink></li>
                    <li><NavLink to="/all-listings">Valves</NavLink></li>
                    <li><NavLink to="/all-listings">Airbags</NavLink></li>
                    <li><NavLink to="/all-listings">Tire Pressure Sensors</NavLink></li>
                    <li><NavLink to="/all-listings">Starter Motors</NavLink></li>
                    <li><NavLink to="/all-listings">Alternators</NavLink></li>
                    <li><NavLink to="/all-listings">Switches & Sensors</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Suspension Parts</span>
                    <li><NavLink to="/all-listings">Lower Arm</NavLink></li>
                    <li><NavLink to="/all-listings">Ball Joint</NavLink></li>
                    <li><NavLink to="/all-listings">Link Rod</NavLink></li>
                    <li><NavLink to="/all-listings">Stabilizer Bush FR/RR</NavLink></li>
                    <li><NavLink to="/all-listings">Arm</NavLink></li>
                    <li><NavLink to="/all-listings">Shock FR/RR & Coil Spring</NavLink></li>
                    <li><NavLink to="/all-listings">Stabilizer Link RR</NavLink></li>
                    <li><NavLink to="/all-listings">Arm RR</NavLink></li>
                    <li><NavLink to="/all-listings">Shock Absorbers</NavLink></li>
                    <li><NavLink to="/all-listings">Bushes</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Steering Parts</span>
                    <li><NavLink to="/all-listings">Steering Box</NavLink></li>
                    <li><NavLink to="/all-listings">Steering Column</NavLink></li>
                    <li><NavLink to="/all-listings">Steering Wheel</NavLink></li>
                    <li><NavLink to="/all-listings">Steering Tie Rod</NavLink></li>
                    <li><NavLink to="/all-listings">Steering Box Seal Kit</NavLink></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-3">
                  <ul className="category-list">
                    <span>Body Parts</span>
                    <li><NavLink to="/all-listings">FR/RR Bumper parts</NavLink></li>
                    <li><NavLink to="/all-listings">Grill Parts</NavLink></li>
                    <li><NavLink to="/all-listings">Bonnet Parts</NavLink></li>
                    <li><NavLink to="/all-listings">Doors</NavLink></li>
                    <li><NavLink to="/all-listings">Under Shield</NavLink></li>
                    <li><NavLink to="/all-listings">Fenders</NavLink></li>
                    <li><NavLink to="/all-listings">Roof</NavLink></li>
                    <li><NavLink to="/all-listings">Spoiler</NavLink></li>
                    <li><NavLink to="/all-listings">Quarter Panel</NavLink></li>
                    <li><NavLink to="/all-listings">Body Moldings</NavLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <NavLink to="/sell-your-parts">{t('menu_sell_parts')}</NavLink>
          </li>
          <li>
            <NavLink to="/sellers">{t('menu_sellers')}</NavLink>
          </li>
          <li>
            <NavLink to="/news">{t('menu_news')}</NavLink>
          </li>
          
          <li className="dropdown has_dropdown">
            <a className="dropdown-toggle" href="# " id="drop1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {t('menu_more')}
            </a>
            <ul className="dropdown-menu" aria-labelledby="drop1">
              <li><NavLink to="/how-it-works">{t('menu_how_it_works')}</NavLink></li>
              <li><NavLink to="/about">{t('menu_about')}</NavLink></li>
              <li><NavLink to="/payment">{t('menu_payment')}</NavLink></li>
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