import React, { Fragment, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import Lightbox from 'react-image-lightbox';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-image-lightbox/style.css';

function Gallery(props) {

  const [isOpen, setOpen] = useState(false);
  const [photoIndex, setCurIndex] = useState(0);

  const openLightbox = (e, index) => {
    e.preventDefault();
    setCurIndex(index);
    setOpen(true);
  }

  const photos = props.photos;

  return (
    <Fragment>
    <div className="atbd_content_module atbd_listing_gallery">
      <div className="detail_main_area">
        <Carousel
          interval="5000"
          transitionTime="500"
          dynamicHeight={true}
          showStatus={true}
          thumbWidth={175}
          statusFormatter={(current, total) =>
            <>
            <i className="la la-camera"></i>
            <span>{current} / {total}</span>
            </>
          }
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                className="arrow-btn"
                onClick={onClickHandler}
                title={label}
                style={{ left: 0, borderRadius: '0 8px 8px 0' }}
              >
                <i className="la la-angle-left"></i>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                className="arrow-btn"
                onClick={onClickHandler}
                title={label}
                style={{ right: 0, borderRadius: '8px 0 0 8px' }}
              >
                <i className="la la-angle-right"></i>
              </button>
            )
          }
        >
          {
            photos.map((photo, index) => (
              <div key={index} style={{position: 'relative'}}>
                <img src={`${photo}`} alt="Photo" />
                <span className="photo-preview" onClick={(e) => openLightbox(e, index)}>
                  <i className="la la-expand"></i>
                </span>
              </div>
            ))
          }
        </Carousel>
        {isOpen && (
          <Lightbox
            mainSrc={`${photos[photoIndex]}`}
            nextSrc={`${photos[(photoIndex + 1) % photos.length]}`}
            prevSrc={`${photos[(photoIndex + photos.length - 1) % photos.length]}`}
            onCloseRequest={() => setOpen(false)}
            onMovePrevRequest={() =>
              setCurIndex((photoIndex + photos.length - 1) % photos.length)
            }
            onMoveNextRequest={() =>
              setCurIndex((photoIndex + 1) % photos.length)
            }
          />
        )}
      </div>
    </div>
    </Fragment>
  );
}

export default Gallery;
