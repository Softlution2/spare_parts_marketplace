import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { CrossStorageClient } from "cross-storage";
import { LogOut } from "../Store/action/logoutAction";
import { LogInAc } from "../Store/action/loginActions";
import { checkAuthenticated, getDomain } from "../utils";
import equal from 'fast-deep-equal'

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
