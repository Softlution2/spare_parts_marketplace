import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
const noAction = e => e.preventDefault();
class BlogGrid4 extends Component {
  render() {
    const { blog } = this.props;        
    return (
      <Fragment>
      {
        Object.values(blog).slice(4, 10).map((value, key) => {
          const { imgSrc, title, date, content, id } = value;                    
          return (                       
            <div className="col-lg-4 col-md-6" key={key}>
              <div className="grid-single mb-5">
                <div className="card post--card shadow-sm">
                  <figure>
                    <NavLink to={"/news-details"+id}><img src={imgSrc} alt="" /></NavLink>
                  </figure>
                  <div className="card-body">
                    <h6><NavLink to={"/news-details"+id}>{title.split('').slice(0, 30)}</NavLink></h6>
                    <ul className="post-meta d-flex list-unstyled">
                        <li>{date}</li>
                        <li>in <NavLink to={"/news-details"+id} onClick={noAction}>Industry</NavLink></li>
                    </ul>
                    <p>{content}</p>
                  </div>
                </div>
              </div>
            </div>              
            )
        })
      }
      </Fragment>
    )
  }
}

export default BlogGrid4
