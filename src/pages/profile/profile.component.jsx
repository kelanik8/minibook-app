/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import HeroImage from "../../assets/img/hero_image.png";
import ProfileImage from '../../assets/img/profile.jpg';
import { connect } from 'react-redux';

const Profile = ({user}) => {

  return (
    <div
      className="page-header header-filter"
      data-parallax="true"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div className="main main-raised" style={{
          margin: 'auto',
          marginTop: '250px',
          width: '80vw'
      }}>
        <div className="profile-content">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto mr-auto">
                <div className="profile">
                  <div className="avatar d-flex justify-content-center">
                    <div
                      alt="Circle Image"
                      className="img-raised rounded-circle img-fluid" style={{
                        height: '200px',
                        width: '200px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${user.photoURL})`,
                        position: 'relative',
                        top: '-40px'
                      }}
                    />
                  </div>
                  <div className="name text-center">
                    <h3 className="title text-black" style={{color: '#000'}}>{user.displayName}</h3>
                    <h6>{user.phoneNumber}</h6>
                    <h6>{user.address}</h6>
                    <h6>{user.email}</h6>
                    <h6>{user.dob}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="description text-center">
              <p>
              </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.currentUser
})

export default connect(mapStateToProps)(Profile);
