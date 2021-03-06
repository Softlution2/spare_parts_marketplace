import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const makeList = [
  "audi", "bmw", "chevrolet", "ford", "honda", "hyundai", "infiniti", "kia", "landrover", "lexus", "mazda", "mercedes", "mitsubishi", "nissan", "toyota", "volkswagen"
];

class BrowseByMake extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Fragment>
        <div className="category-list">
        {
          makeList.map((make, index) => {
            return (
              <div className="category-card-wrapper" key={index}>
                <NavLink className="category-card" to={`/car-parts/${make.toLocaleLowerCase().replace(" ", "-")}`} style={{boxShadow: "none"}}>
                  <img src={`/assets/img/make-logos/spare-parts-${make.toLowerCase()}.svg`} alt="" />
                </NavLink>
              </div>
            )
          })
        }
        </div>
      </Fragment>
    )
  }
}

export default BrowseByMake;
