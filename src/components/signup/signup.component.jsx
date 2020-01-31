import React, { useState } from "react";
import { signInWIthGoogle } from "../../firebase/firebase.utils";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

const SignUp = () => {
  const [authDetails, setAuthDetails] = useState({
    displayName: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { displayName, email, password } = authDetails;

    try {
      setErrorMessage('');
      const { user } = await auth
                      .createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName });
      
      setAuthDetails({
        displayName: "",
        email: "",
        password: ""
      });
    } catch (e) {
      console.log("error", e);
      if(e.code) {
        setErrorMessage(e.message);
      }
    }
    setLoading(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setAuthDetails({ ...authDetails, [name]: value });
  };
  return (
    <div className="col-lg-4 col-md-6 ml-auto mr-auto">
      <div className="card card-login">
        <form className="form" onSubmit={handleSubmit}>
          <div className="card-header card-header-primary text-center">
            <h4 className="card-title">Sign Up</h4>
            <div className="social-line">
              <div
                onClick={signInWIthGoogle}
                className="btn btn-just-icon btn-link"
              >
                <i className="fa fa-google"></i>
              </div>
            </div>
          </div>

          {errorMessage ? (
            <div className="alert alert-danger">{errorMessage}</div>
          ) : (
            ""
          )}
          <div className="card-body">
            <span className="bmd-form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">face</i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name..."
                  name="displayName"
                  onChange={handleChange}
                  value={authDetails.displayName}
                  required
                />
              </div>
            </span>
            <span className="bmd-form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">mail</i>
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email..."
                  name="email"
                  onChange={handleChange}
                  value={authDetails.email}
                  required
                />
              </div>
            </span>
            <span className="bmd-form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">lock_outline</i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password..."
                  name="password"
                  onChange={handleChange}
                  value={authDetails.password}
                  required
                />
              </div>
            </span>
          </div>
          <div className="footer text-center">
            <button
              disabled={loading ? true : false}
              className="btn btn-primary btn-round"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
