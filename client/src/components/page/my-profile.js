import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Modal from "react-awesome-modal";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { toast, ToastContainer } from 'react-toastify';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import AddPhone from "../content/element/modal/add-phone";

import { UpdateUserInfo } from "../../Store/action/loginActions";

const noAction = (e) => e.preventDefault();

class AuthProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      name: props.login.name,
      location: props.login.location,
      email: props.login.email,
      modalIsOpen: false,
      phoneNumbers: props.login.phone,
    }
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.openFileDlg = this.openFileDlg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removePhone = this.removePhone.bind(this);
    this.openNewPhoneModal = this.openNewPhoneModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addPhoneNumbers = this.addPhoneNumbers.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  uploadAvatar(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let avatar = Object.assign(file, {
      preview: URL.createObjectURL(file)
    });
    this.setState({avatar});
  }
  openFileDlg(e) {
    e.preventDefault();
    this.upload.click();
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  removePhone(e, index) {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to remove phone number',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
          let { phoneNumbers } = this.state;
          phoneNumbers.splice(index, 1);
          this.setState({phoneNumbers});
          }
        },
        {
          label: 'No',
          onClick: () => {return;}
        }
      ]
    });
  }
  openNewPhoneModal(e) {
    e.preventDefault();
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  addPhoneNumbers(phone) {
    let { phoneNumbers } = this.state;
    phoneNumbers.push(phone);
    this.setState({phoneNumbers, modalIsOpen: false});
  }
  updateProfile(e) {
    e.preventDefault();
    const { name, avatar, location, email, phoneNumbers } = this.state;
    let formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("location", location);
    formData.append("phone", JSON.stringify(phoneNumbers));
    formData.append("user_id", this.props.login._id);
    if (avatar)
      formData.append("avatar", this.state.avatar);
    axios.post(`/api/users/update`, formData)
    .then((res) => {
      this.props.updateUserInfo(res.data);
      toast.success("Profile has been updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { avatar, name, location, email, modalIsOpen, phoneNumbers } = this.state;
    return (
      <Fragment>
      <PreHeader />
      <Header />
      <PageBanner title="My Profile"/>
      <section className="author-info-area section-padding-strict section-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 mb-5 mb-lg-0">
              <div className="user_pro_img_area">
                  {
                    avatar && (
                      <img src={avatar.preview} onClick={this.openFileDlg} />
                    )
                  }

                  {
                    !avatar && (
                      this.props.login.avatar ? (
                        <img src={`${this.props.login.avatar}`} onClick={this.openFileDlg} />
                      ) : (
                        <img src={`/assets/img/avatar.png`} onClick={this.openFileDlg} />
                      )
                    )
                  }
                  <div className="image-info">
                    <h6>Profile Image</h6>
                    <span>JPG or PNG 120x120 px</span>
                  </div>
                  <div className="custom-file-upload">
                    <input
                      id="customUpload"
                      type="file"
                      ref={(ref) => (this.upload = ref)}
                      style={{ display: "none" }}
                      onChange={this.uploadAvatar}
                    />
                    <label htmlFor="customUpload" className="btn btn-sm btn-secondary" onClick={this.openFileDlg}>Upload New Image</label>
                  </div>
                  {/* <button className="btn btn-sm btn-danger">Delete Image</button> */}
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="atbd_author_module">
                <div className="atbd_content_module">
                  <div className="atbd_content_module__tittle_area">
                    <div className="atbd_area_title">
                      <h4>
                        <span className="la la-user"></span>
                        My Profile
                      </h4>
                    </div>
                  </div>
                  <div className="atbdb_content_module_contents">
                    <div className="user_info_wrap">
                      <div className="form-group row">
                        <div className="col-lg-6">
                          <label>Name: </label>
                          <input type="text" className="form-control" value={name || ""} onChange={this.handleChange} name="name" />
                        </div>
                        <div className="col-lg-6">
                          <label>Email: </label>
                          <input type="email" className="form-control" value={email || ""} onChange={this.handleChange} name="email" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Location: </label>
                        <input type="text" className="form-control" value={location || ""} onChange={this.handleChange} name="location" />
                      </div>
                      <div className="form-group">
                        <label>Phone Numbers: </label>
                        <button className="btn btn-primary" onClick={this.openNewPhoneModal}>Add New Phone Number</button>
                        {
                          phoneNumbers.length > 0 && (
                            <table className="phone-number-list">
                              <tbody>
                                {
                                  phoneNumbers.map((phone, index) => (
                                      <tr key={index}>
                                        <td>{phone}</td>
                                        <td>
                                          <a href="#" onClick={(e) => this.removePhone(e, index)}>
                                            <i className="la la-ban"></i>
                                          </a>
                                        </td>
                                      </tr>
                                    )
                                  )
                                }
                              </tbody>
                            </table>
                          )
                        }
                      </div>
                      <div className="form-group">
                        <button className="btn btn-primary" onClick={this.updateProfile}>Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal visible={modalIsOpen} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <AddPhone addPhoneNumbers={this.addPhoneNumbers} />
        </Modal>
      </section>
      <ToastContainer />
      <Footer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.list,
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    updateUserInfo: (data) => dispatch(UpdateUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(AuthProfile);
