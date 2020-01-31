import React from "react";
import HeroImage from '../../assets/img/hero_image.png';

export default () => (
  <div
    className="page-header header-filter clear-filter purple-filter"
    data-parallax="true"
    style={{ backgroundImage: `url(${HeroImage})` }}
  >
    <div className="container">
      <div className="row">
        <div className="col-md-8 ml-auto mr-auto">
          <div className="brand">
            <h1>Mini Book.</h1>
            <h3>An App for users to view their Profile...</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
);
