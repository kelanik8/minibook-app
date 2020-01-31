import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import HomePage from "./pages/homepage/homepage.component";
import SignSignup from "./pages/signin-signup/signin-signup.component";
import Profile from "./pages/profile/profile.component";
import EditProfile from "./pages/edit-profile/EditProfile.component";
import { auth } from "./firebase/firebase.utils";
import { createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { connect } from "react-redux";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  unsubscibeFromAuth = null;
  componentDidMount() {
    this.unsubscibeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          localStorage.getItem("app_uid", snapShot.id);
          this.props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        this.props.setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscibeFromAuth();
  }

  handleSignOut() {
    auth.signOut();
  }

  render() {
    return (
      <React.Fragment>
        <Header signOut={this.handleSignOut} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/profile' />) : (<SignSignup />)} />
          <Route exact path="/profile" render={() => this.props.currentUser ? (<Profile />) : (<Redirect to='/signin' />)} />
          <Route exact path="/edit-profile" render={() => this.props.currentUser ? (<EditProfile />) : (<Redirect to='/signin' />)} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
