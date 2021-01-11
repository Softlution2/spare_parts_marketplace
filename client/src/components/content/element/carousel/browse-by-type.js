import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import axios from "axios";
import { cartypes } from "../../../../constants";

const options = {
  items: 4,
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
      items: 3
    },
    991:{
      items: 4
    }
  }
};

class BrowseByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagCounts: [],
    }
    this.getCountsByTag = this.getCountsByTag.bind(this);
  }

  componentDidMount() {
    axios.get("/api/info/get-listing-types")
    .then((res) => {
      this.setState({tagCounts: res.data.tagCounts});
    });
  }

  getCountsByTag(tag) {
    const { tagCounts } = this.state;
    let obj = tagCounts.find(o => o._id === tag);
    if (obj)
      return obj.count;
    return 0;
  }

  render() {
    return (
      <Fragment>
        <OwlCarousel options={options} className="browse-type-carousel owl-carousel" >
          {
            cartypes.map((value, key) => {
              return (                       
                <div className="carousel-single text-center" key={key}>
                  <div className="type-thumb">
                    <img src={`./assets/img/car-types/${value.value}.png`} alt="" />
                  </div>
                  <div className="type-action mb-3">
                    <NavLink to={`/buy-type-${value.value}`} className="btn btn-primary btn-md">
                      {value.label}
                    </NavLink>
                  </div>
                  <span>{this.getCountsByTag(value.value)} car{this.getCountsByTag(value.value) > 1 ? 's' : ''} for sale</span>
                </div>
              )
            })
          }
        </OwlCarousel>
      </Fragment>
    )
  }
}
export default BrowseByType
