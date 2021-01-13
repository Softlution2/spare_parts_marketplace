import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Index from "./page/index";
import AllListing from "./page/all-listing";
import SellerListings from "./page/seller-listings";
import ListingDetails from "./page/listing-details";
import SellYourCar from "./page/sell-your-car";
import Thankyou from "./page/thank-you";
import MyProfile from "./page/my-profile";
import MyListing from "./page/my-listing";
import MyFavorites from "./page/my-favorites";
import MyCallbacks from "./page/my-callbacks";
import Chats from "./page/chats";
import AboutUs from "./page/about-us";
import ContactUs from "./page/contact-us";
import Privacy from "./page/privacy";
import Terms from "./page/terms";
import News from "./page/news";
import NewsDetails from "./page/news-details";
import Sellers from "./page/sellers";
import SellerDetails from "./page/seller-details";
import Faqs from "./page/faqs";
import "../i18n";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/all-listings" component={AllListing} />
          <Route path="/buy-type-:tag" component={AllListing} />
          <Route path="/buy-parts-:make" component={AllListing} />
          <Route path="/listing-details/buy-parts-:info" component={ListingDetails} />
          <Route path="/seller-listings/:id" component={SellerListings} />
          <Route path="/sell-your-parts" component={SellYourCar} />
          <Route path="/news" component={News} />
          <Route path="/news-details:id" component={NewsDetails} />
          <Route path="/sellers" component={Sellers} />
          <Route path="/seller-details" component={SellerDetails} />

          <Route path="/my-profile" component={MyProfile} />
          <Route path="/my-listing" component={MyListing} />
          <Route path="/my-favorites" component={MyFavorites} />
          <Route path="/my-callbacks" component={MyCallbacks} />
          <Route path="/chats" component={Chats} />
          <Route path="/about-us" component={AboutUs} />
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
