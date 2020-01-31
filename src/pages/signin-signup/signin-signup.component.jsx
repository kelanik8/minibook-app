import React from "react";
import HeroImage from "../../assets/img/hero_image.png";
import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';
import './signin-signup.styles.scss';

class SignSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div
        className="page-header header-filter clear-filter purple-filter"
        data-parallax="true"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="container mt-5">
          <div className="row">
            <SignIn />
            <SignUp />
          </div>
        </div>
      </div>
    );
  }
}

export default SignSignup;
