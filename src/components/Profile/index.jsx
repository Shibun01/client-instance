import React from "react";
import "./index.css";
import { useSelector } from "react-redux";

const Profile = () => {
    const userItems = useSelector(state => state.auth.user);
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" alt="Profile" className="profile-picture" />
                <h1 className="profile-name"> {userItems.name}</h1>
            </div>
            <div className="profile-details">
                <h1><strong>Email:</strong> {userItems.email}</h1>
            </div>
        </div>
    );
};

export default Profile;
