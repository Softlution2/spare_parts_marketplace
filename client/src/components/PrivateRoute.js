import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route } from "react-router-dom";
import { LogOut } from "../Store/action/logoutAction";
import { LogInAc } from "../Store/action/loginActions";
import { checkAuthenticated } from "../utils";

const PrivateRoute = ({ component: Component, login, logOutdata, loginAction, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = JSON.parse(localStorage.getItem("login"));
        if (currentUser && !checkAuthenticated(currentUser.token))
          logOutdata(null);
          
        return <Component {...props} />;
      }}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    logOutdata: (login) => dispatch(LogOut(login)),
    loginAction: (login) => dispatch(LogInAc(login))
  };
};
export default connect(mapStateToProps, mapDispatchToProp)(PrivateRoute);
