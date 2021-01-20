import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const makeList = [
  "toyota", "infiniti", "nissan", "mazda", "isuzu", "lexus", "honda", "subaru", "suzuki", "mitsubishi"
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
                <NavLink className="category-card" to={`/buy-spare-parts-${make}`} style={{boxShadow: "none"}}>
                  <img src={`/assets/img/make-logos/${make.toLowerCase().replace(" ", "-")}.png`} alt="" />
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
