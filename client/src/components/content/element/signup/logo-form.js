import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import { LogInAc } from "../../../../Store/action/loginActions";
import { SetVerifyPassed, SetSignupStep, Initialize } from "../../../../Store/action/signupActions";
import axios from "axios";

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
    formData.append("email", this.props.signup.email);
    formData.append("user_name", this.props.signup.name);
    formData.append("location", this.props.signup.location);
    formData.append("password", this.props.signup.password);
    formData.append("phone", this.props.signup.phone);
    formData.append("method", this.props.signup.verifyMethod);
    axios.post(`/api/users/signup`, formData)
    .then((res) => {
      this.props.login(res.data);
      window.location.reload();
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
        <h2 className="welcome">{t("auth_welcome")}</h2>
        <p className="text-center mt-3">
          {t("auth_give_us_some_details")}
        </p>
        <form action="/" className="avatar-form">
          <div className="form-group">
            {
              avatar && avatar.preview ? (
                <img src={avatar.preview} width="90" height="90" alt="User Avatar" />
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
            onClick={(e) => this.props.setSignupStep(3)}
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
        <p className="footer-text">
          
          By doing this, i agree to{" "}
          <a href="/terms">Terms</a> and{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signup: state.signup,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    setVerifyPassed: (data) => dispatch(SetVerifyPassed(data)),
    login: (data) => dispatch(LogInAc(data)),
    setSignupStep: (step) => dispatch(SetSignupStep(step)),
    initialize: () => dispatch(Initialize()),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(LogoForm);
