import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import SellerListings from "./page/seller-listings";
import ListingDetails from "./page/listing-details";
import Thankyou from "./page/thank-you";
import MyProfile from "./page/my-profile";
import MyListing from "./page/my-listing";
import MyFavorites from "./page/my-favorites";
import MyCallbacks from "./page/my-callbacks";
import Chats from "./page/chats";

import Index from "./page/index";
import AllListing from "./page/all-listing";
import Register from "./page/register/index";
import RegisterSeller from "./page/register/register-seller";
import RegisterBuyer from "./page/register/register-buyer";
import VerifyEmail from "./page/register/verify-email";
import VerifyPhone from "./page/register/verify-phone";
import PasswordForm from "./page/register/password-form";
import AddParts from "./page/add-parts";
import HowItWorks from "./page/how-it-works";
import AboutUs from "./page/about-us";
import ContactUs from "./page/contact-us";
import Faqs from "./page/faqs";
import Privacy from "./page/privacy";
import Terms from "./page/terms";
import News from "./page/news";
import NewsDetails from "./page/news-details";
import Sellers from "./page/sellers";
import SellerDetails from "./page/seller-details";
import BecomeBuyer from "./page/become-buyer";
import BecomeSeller from "./page/become-seller";

import "../i18n";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = JSON.parse(localStorage.getItem("login"));
        if (!currentUser || currentUser.role !== "SELLER") {
          // localStorage.clear();
          return (
            <Redirect
              to={{ pathname: "/register", state: { from: props.location } }}
            />
          );
        }
        // authorised so return component
        return <Component {...props} />;
      }}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/seller" component={RegisterSeller} />
          <Route path="/register/buyer" component={RegisterBuyer} />
          <Route path="/register/verify-email" component={VerifyEmail} />
          <Route path="/register/verify-phone" component={VerifyPhone} />
          <Route path="/register/password" component={PasswordForm} />

          <PrivateRoute path="/sell-your-parts" component={AddParts} />
          <Route path="/all-listings" component={AllListing} />
          <Route path="/buy-spare-parts:make" component={AllListing} />
          <Route path="/spare-part-details/:info" component={ListingDetails} />
          

          <Route path="/seller-listings/:id" component={SellerListings} />
          <Route path="/news" component={News} />
          <Route path="/news-details:id" component={NewsDetails} />
          <Route path="/sellers" component={Sellers} />
          <Route path="/seller-details/:id" component={SellerDetails} />

          <Route path="/my-profile" component={MyProfile} />
          <Route path="/my-listing" component={MyListing} />
          <Route path="/my-favorites" component={MyFavorites} />
          <Route path="/my-callbacks" component={MyCallbacks} />
          <Route path="/chats" component={Chats} />

          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/become-buyer" component={BecomeBuyer} />
          <Route path="/become-seller" component={BecomeSeller} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/terms" component={Terms} />
          <Route path="/faqs" component={Faqs} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/thankyou" component={Thankyou} />
        </Switch>
      </Router>
    );
  }
}
export default App;
