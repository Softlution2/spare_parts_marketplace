import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import axios from "axios";

const options = {
  items: 6,
  dots: false,
  nav: true,
  navText: ['<span class="i la la-angle-left"></span>', '<span class="i la la-angle-right"></span>'],
  navElement: 'button',
  margin: 20,
  responsive: {
    0:{
      items: 1
    },
    575:{
      items: 2
    },
    767:{
      items: 4
    },
    991:{
      items: 6
    }
  }
};

class BrowseByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeList: [],
    }
  }

  componentDidMount() {
    axios.get("/api/info/get-listing-makes")
    .then((res) => {
      this.setState({makeList: res.data.makes});
    });
  }

  render() {
    const {makeList} = this.state;
    return (
      <Fragment>
        {
          makeList.length > 0  && (
            <OwlCarousel options={options} className="browse-make-carousel owl-carousel" >
            {
              makeList.map((value, key) => {
                return (                       
                  <div className="carousel-single text-center" key={key}>
                    <div className="type-thumb">
                      <img src={`./assets/img/make-logos/${value._id.toLowerCase().replace(" ", "-")}.png`} alt="" />
                    </div>
                    <div className="type-action mb-3">
                      <NavLink to={`/buy-parts-${value._id.toLowerCase().replace(" ", "-")}`} className="btn btn-primary btn-md">
                        {value._id}
                      </NavLink>
                    </div>
                    <span>{value.count} car{value.count > 1  ? 's' : ''} for sale</span>
                  </div>
                )
              })
            }
          </OwlCarousel>
          )
        }
      </Fragment>
    )
  }
}

export default BrowseByType;
