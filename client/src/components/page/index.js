import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";

import { SectionTitle } from "../content/element/section-title";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import HomeListingGrid from "../content/element/card/home-listing-grid";
import FeaturedSellers from "../content/element/featured-sellers.js";
import Promise from "../content/element/promise";
import BrowseByCategory from "../content/element/browse-by-category";
import BrowseByMake from "../content/element/browse-by-make";
import Newsletter from "../content/element/newsletter";
import Footer from "../layout/footer";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seoTextExpand: false,
    };
    this.toggleSeoText = this.toggleSeoText.bind(this);
  }
  componentDidMount() {}
  
  toggleSeoText(e) {
    e.preventDefault();
    const { seoTextExpand } = this.state;
    this.setState({ seoTextExpand: !seoTextExpand });
  }
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <section className="intro-wrapper bgimage overlay overlay--dark">
          <div className="bg_image_holder">
            <img src="/assets/img/intro.jpg" alt="" />
          </div>
        </section>

        {/* Promise section start */}
        <section className="promise-wrapper">
          <div className="container">
            <div className="row">
              <Promise />
            </div>
          </div>
        </section>
        {/* Promise section end */}

        {/* Listing section start */}
        <section className="listing-cards section-padding">
          <div className="container">
            <SectionTitle
              title={`${t("home_spare_parts_best_sellers_title")}`}
              content={`${t("home_spare_parts_best_sellers_desc")}`}
            />
            <div className="row">
              <div className="home-listing-cards-wrapper col-lg-12">
                <div className="row listing-5cards-wrapper">
                  <HomeListingGrid size={3} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Listing section end */}

        {/* Featured Sellers section start */}
        <section className="browse-category-wrapper section-padding" style={ {backgroundColor: "#dceaf3"} }>
          <div className="container">
            <SectionTitle
              title="FEATURED SELLERS"
              content="Certified and verified trustworthy car parts sellers in the UAE"
            />
            <div className="row">
              <div className="listing-cards-wrapper col-lg-12">
                <div className="row">
                  <FeaturedSellers />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Sellers section end */}

        {/* Browse By Type section start */}
        <section className="browse-category-wrapper section-padding">
          <div className="container">
            <SectionTitle
              title={t("home_browse_by_category_title")}
              content={t("home_browse_by_category_content")}
            />
            <BrowseByCategory />
          </div>
        </section>
        {/* Browse By Type section end */}

        {/* Browse By Make section start */}
        <section className="browse-category-wrapper section-padding">
          <div className="container">
            <SectionTitle
              title={t("home_browse_by_make_title")}
              content={t("home_browse_by_make_content")}
            />
            <div className="row">
              <BrowseByMake />
            </div>
          </div>
        </section>
        {/* Browse By Make section end */}

        {/* Newsletter section start */}
        <section className="newsletter section-padding pb-4" style={ {backgroundColor: "#dceaf3"} }>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <SectionTitle
                  title="NEWSLETTER"
                  content="And benefit from our special offers"
                />
                <div className="row">
                  <Newsletter />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Newsletter section end */}

        <section className="section-padding mb-5">
          <div className="container">
            <h1 className="mb-4">Basobaas - Buy, Rent, Sell and Lease Property</h1>
            <div
              className={`home-seo-text ${
                this.state.seoTextExpand ? "expanded" : ""
              }`}
            >
              <a
                href="#!"
                className="read-more-less"
                onClick={this.toggleSeoText}
              >
                {this.state.seoTextExpand ? "Read Less" : "Read More"}
              </a>
              <h4>Autodistribution, votre spécialiste de la pièce auto</h4>
              <p>
                Depuis sa création, Autodistribution s’est imposé comme le
                leader de la vente de pièces auto. Avec plus de 5500
                collaborateurs en France, Autodistribution met au service de ses
                clients son expérience et son savoir-faire de la pièce
                multimarque automobile. Vous êtes un particulier ou un
                professionnel à la recherche d’une pièce automobile ? Grâce à
                notre site internet et fort de notre catalogue de plus de 300
                000 pièces auto, vous avez la possibilité de commander une pièce
                auto en ligne et de venir la récupérer immédiatement dans l’un
                de nos 350 points de vente.
              </p>
              <h4>Votre 1er magasin de pièce auto en ligne</h4>
              <p>
                Avec plus de 350 points de vente partout en France et un site
                internet dédié, vous pouvez commander n’importe quelle pièce
                automobile 24h/24 et 7j/7 et venir la récupérer immédiatement
                dans l’un de nos points de vente. Sélectionnez le magasin le
                plus proche de chez vous et découvrez si la pièce auto que vous
                recherchez est disponible. N’attendez plus pour acheter des
                pièces auto en ligne sur autodistribution.fr
              </p>
              <h4>Votre 1er magasin de pièce auto en ligne</h4>
              <p>
                Avec plus de 350 points de vente partout en France et un site
                internet dédié, vous pouvez commander n’importe quelle pièce
                automobile 24h/24 et 7j/7 et venir la récupérer immédiatement
                dans l’un de nos points de vente. Sélectionnez le magasin le
                plus proche de chez vous et découvrez si la pièce auto que vous
                recherchez est disponible. N’attendez plus pour acheter des
                pièces auto en ligne sur autodistribution.fr
              </p>
              <h4>Votre 1er magasin de pièce auto en ligne</h4>
              <p>
                Avec plus de 350 points de vente partout en France et un site
                internet dédié, vous pouvez commander n’importe quelle pièce
                automobile 24h/24 et 7j/7 et venir la récupérer immédiatement
                dans l’un de nos points de vente. Sélectionnez le magasin le
                plus proche de chez vous et découvrez si la pièce auto que vous
                recherchez est disponible. N’attendez plus pour acheter des
                pièces auto en ligne sur autodistribution.fr
              </p>
              <h4>Votre 1er magasin de pièce auto en ligne</h4>
              <p>
                Avec plus de 350 points de vente partout en France et un site
                internet dédié, vous pouvez commander n’importe quelle pièce
                automobile 24h/24 et 7j/7 et venir la récupérer immédiatement
                dans l’un de nos points de vente. Sélectionnez le magasin le
                plus proche de chez vous et découvrez si la pièce auto que vous
                recherchez est disponible. N’attendez plus pour acheter des
                pièces auto en ligne sur autodistribution.fr
              </p>
            </div>
          </div>
        </section>
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
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProp),
  withTranslation()
)(Index);
