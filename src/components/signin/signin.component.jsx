import React, { useState } from "react";
import { auth, signInWIthGoogle } from "../../firebase/firebase.utils";

const SignIn = () => {
  const [authDetails, setAuthDetails] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      setErrorMessage("");
      const { email, password } = authDetails;

      await auth.signInWithEmailAndPassword(email, password);
      setAuthDetails({
        email: '',
        password: ''
      });
    } catch (e) {
      console.error("error", e);
      if (e.code == 'auth/user-not-found') {
        setErrorMessage('Invalid User/E-mail');
      } else {
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
            <h4 className="card-title">Login</h4>
            <div className="social-line">
              <button
                onClick={signInWIthGoogle}
                type="button"
                className="btn btn-just-icon btn-link"
              >
                <i className="fa fa-google"></i>
              </button>
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
                    <i className="material-icons">mail</i>
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email..."
                  onChange={handleChange}
                  value={authDetails.email}
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
                  name="password"
                  className="form-control"
                  placeholder="Password..."
                  onChange={handleChange}
                  value={authDetails.password}
                />
              </div>
            </span>
          </div>
          <div className="footer text-center">
            <button disabled={loading} className="btn btn-primary btn-round">
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
