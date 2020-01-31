import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HeroImage from "../../assets/img/hero_image.png";
import { updateUserProfileDocument } from "../../firebase/firebase.utils";

const EditProfile = ({ user }) => {

  let [userDetails, setUserDetails] = useState({
    displayName: '',
    phoneNumber: '',
    address: '',
    email: '',
    dob: '',
    photoURL: ''
  });

  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
        setUserDetails({
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email,
            dob: user.dob,
            photoURL: user.photoURL
        });
    //   return () => {
    //   };
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    const { displayName, phoneNumber, address, email, dob, photoURL } = userDetails;

    try {
      setErrorMessage("");

      await updateUserProfileDocument(user, {
        displayName,
        phoneNumber,
        address,
        email,
        dob,
        photoURL
      });
    } catch (e) {
      console.log("error", e);
      if (e.code) {
        setErrorMessage(e.message);
      }
    }
    setLoading(false);
  };

  const handleChange = event => {
    const {name, value} = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  return (
    <div
      className="page-header header-filter"
      data-parallax="true"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div
        className="main main-raised"
        style={{
          margin: "auto",
          marginTop: "250px",
          width: "80vw"
        }}
      >
        <div className="container mt-5">
          <div className="row">
            <div className="profile-content" style={{ width: "100%" }}>
              <div className="container">
                <form onSubmit={handleSubmit}>
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
                          className="form-control form-control-lg"
                          placeholder="Photo Url..."
                          name="photoURL"
                          onChange={handleChange}
                          value={userDetails.photoURL}
                          required
                        />
                      </div>
                    </span> <br />
                    <span className="bmd-form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">face</i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Name..."
                          name="displayName"
                          onChange={handleChange}
                          value={userDetails.displayName}
                          required
                        />
                      </div>
                    </span>
                    <br />
                    <span className="bmd-form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">phone</i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="phone number..."
                          name="phoneNumber"
                          onChange={handleChange}
                          value={userDetails.phoneNumber}
                          required
                        />
                      </div>
                    </span>
                    <br />
                    <span className="bmd-form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">map</i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="address..."
                          name="address"
                          onChange={handleChange}
                          value={userDetails.address}
                          required
                        />
                      </div>
                    </span>
                    <br />
                    <span className="bmd-form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="material-icons">date_range</i>
                          </span>
                        </div>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          placeholder="date of birth..."
                          name="dob"
                          onChange={handleChange}
                          value={userDetails.dob}
                          required
                        />
                      </div>
                    </span>
                    <br />
                  </div>
                  <div className="footer text-center">
                    <button
                      disabled={loading ? true : false}
                      className="btn btn-primary btn-round"
                    >
                      {loading ? "Loading..." : "Edit Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.currentUser
});

export default connect(mapStateToProps)(EditProfile);
