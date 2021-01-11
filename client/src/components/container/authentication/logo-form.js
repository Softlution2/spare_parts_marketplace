import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import axios from "axios";
import { toast } from 'react-toastify';
import { withTranslation } from 'react-i18next';

import { SetSellingAuthStep, SetUserDetails } from "../../../Store/action/sellingAction";
import { LogInAc } from "../../../Store/action/loginActions";

const noAction = (e) => e.preventDefault();
class LogoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      errMsg: null,
    };
    this.registerUser = this.registerUser.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.openFileDlg = this.openFileDlg.bind(this);
  }

  setStateFromInput(e) {
    noAction(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  registerUser(e) {
    noAction(e);
    let formData = new FormData();
    formData.append("avatar", this.state.avatar);
    formData.append("email", this.props.selling.authIdentity.email);
    formData.append("user_name", this.props.selling.authDetails.name);
    formData.append("location", this.props.selling.authDetails.location);
    formData.append("password", this.props.selling.authPassword);
    formData.append("phone", this.props.selling.authIdentity.phone);
    formData.append("method", this.props.selling.authMethod);
    axios.post(`/api/users/signup`, formData)
    .then((res) => {
      const user = res.data;
      toast.success("Registered successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.login(user);
      this.props.setUserDetails({name: user.name, location: user.location, phone: user.phone});
    })
    .catch((err) => {
      this.setState({errMsg: err.response.data.message});
    });
  }

  uploadFile(e) {
    noAction(e);
    let {avatar} = this.state;
    let file = e.target.files[0];
    avatar = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    this.upload.value = null;
    this.setState({ avatar });
  }

  openFileDlg(e) {
    noAction(e);
    this.upload.click();
  }

  render() {
    let { avatar,errMsg } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <form action="/" className="avatar-form">
          <div className="form-group">
            {
              avatar && avatar.preview ? (
                <img src={avatar.preview} width="90" height="90" alt="User avatar" />
              ) : (
                <i className="la la-user"></i>
              )
            }
          </div>
          <div className="form-group">
            <a href="#!" onClick={this.openFileDlg}>{t("auth_change_your_photo")}</a>
            <input
              id="customUpload"
              type="file"
              ref={(ref) => (this.upload = ref)}
              style={{ display: "none" }}
              onChange={this.uploadFile}
            />
          </div>
          {
            errMsg && (
              <p className="text-danger text-center">
                {errMsg}
              </p>
            )
          }
          <button
            type="button"
            onClick={(e) => this.props.setAuthStep(3)}
            className="btn btn-continue  mr-2"
          >
            {t("auth_previous")}
          </button>
          <button
            type="submit"
            onClick={this.registerUser}
            className="btn btn-continue"
          >
            {t("auth_register")}
          </button>
        </form>
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
    login: (data) => dispatch(LogInAc(data)),
    setAuthStep: (step) => dispatch(SetSellingAuthStep(step)),
    setUserDetails: (details) => dispatch(SetUserDetails(details)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(LogoForm);
