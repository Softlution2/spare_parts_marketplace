import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { withTranslation } from 'react-i18next';
import * as Icon from "react-feather";
import { useDropzone } from "react-dropzone";

import { SetPhotos } from "../../../Store/action/sellingAction";

function Dropzone(props) {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    maxFiles: 10,
    multiple: true,
    onDrop: (acceptedFiles) => {
      let files = acceptedFiles.map((file) => {
        return Object.assign(
          file, {
            preview: URL.createObjectURL(file),
            featured: false,
          }
        )
      })
      props.pushPhotos(files);
    },
  });
  const { t } = props;
  return (
    <Fragment>
      <div
        {...getRootProps({
          className: "dropzone",
        })}
      >
        <input {...getInputProps()} />
        <p>
          <img src="/assets/img/upload-icon.png" width="50" height="50" alt="upload-icon" />
        </p>
        <p>{t("dropzone_upload_photo")} :</p>
        <Button color="dark" onClick={open}>
          {t("dropzone_upload_button")}
        </Button>
      </div>
    </Fragment>
  );
}

class UploadCarPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIntialized: false,
      photos: [],
      currentStep: 0,
      isLoading: false,
      currentKey: null,
    };
    this.pushPhotos = this.pushPhotos.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.setFeaturePhoto = this.setFeaturePhoto.bind(this);
  }

  componentDidMount() {
    let initialPhotos = this.props.selling.photos;
    this.setState({ photos: initialPhotos }, () => {
      this.setState({ isIntialized: true });
    });
  }

  handleRemove(e, index) {
    e.preventDefault();
    let {photos} = this.state;
    photos.splice(index, 1);
    this.setState({photos});
  }

  pushPhotos(files) {
    this.props.addPhotos(files);
    files[0]['featured'] = true;
    this.setState({photos: files});
  }

  setFeaturePhoto(e, index) {
    e.preventDefault();
    let {photos} = this.state;
    photos = photos.map((photo, k) => {
      if (k === index)
        photo.featured = true;
      else
        photo.featured = false;
      return photo;
    })
    this.setState({photos});
    this.props.addPhotos(photos);
  }

  render() {
    let { photos, isIntialized } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <div className="row">
          <div className="col-lg-6">
            <Dropzone
              t={t}
              pushPhotos={(files) =>
                this.pushPhotos(files)
              }
            />
          </div>
          <div className="col-lg-6">
            <aside className="thumb-container">
              {isIntialized && photos.map((photo, index) => {
                return (
                  <div className={`dz-thumb ${photo.featured === true ? 'featured-car' : ''}`} key={index}>
                    <div className={`dz-thumb-inner`} onClick={(e) => this.setFeaturePhoto(e, index)}>
                      <img
                        src={photo.preview}
                        className="dz-img"
                        alt="Car Photo"
                      />
                      
                      <div className="photo-remove-action">
                        <a
                          href="#!"
                          className="button ml-2"
                          onClick={(e) => this.handleRemove(e, index)}
                        >
                          <Icon.XCircle
                            color="white"
                            size={24}
                            className="fonticon-wrap"
                            id={`remove-${index}`}
                          />
                          <UncontrolledTooltip
                            placement="top"
                            target={`remove-${index}`}
                          >
                            {t("remove")}
                          </UncontrolledTooltip>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </aside>
          </div>
        </div>
    </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selling: state.selling,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    addPhotos: (photos) => dispatch(SetPhotos(photos)),
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(UploadCarPhoto);