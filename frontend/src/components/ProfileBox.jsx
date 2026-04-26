import React from "react";

const ProfileBox = ({ name }) => {
  return (
    <div className="profile-box">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="profile"
        className="profile-image"
      />
      <span>{name}</span>
    </div>
  );
};

export default ProfileBox;