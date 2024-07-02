import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import LogoutSVG from "../../utils/svgs/Common/LogoutSVG";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
    const userItems = useSelector(state => state.auth.user);
    const logout = (path) => {
        window.location.replace(path);
    }

    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" alt="Profile" className="profile-picture" />
                <h1 className="profile-name"> {userItems.name}</h1>
            </div>
            <div className="profile-details">
                <h1><strong>Email:</strong> {userItems.email}</h1>
            </div>
            {!isDesktop && (
            <div className="profile-details profile-logout"> 
               <h1 className="profile-logout-icon"><strong>Logout</strong></h1> <span onClick={() => logout('/login')}><LogoutSVG /></span>
            </div>

            )}
        </div>
    );
};

export default Profile;
