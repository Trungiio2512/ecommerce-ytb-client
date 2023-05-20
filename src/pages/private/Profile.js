import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const Profile = (props) => {
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);
  return <div>Profile</div>;
};

Profile.propTypes = {};

export default Profile;
