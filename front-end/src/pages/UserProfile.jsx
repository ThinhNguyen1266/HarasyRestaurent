import React, { useState } from "react";
import "../assets/styles/UserProfile.css";
import ProfileForm from "../components/UserProfileFrom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/BranchManagement.css";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import useAccountApi from "../hooks/api/useAccountApi";

const Profile = () => {
  const { getProfile } = useAccountApi();
  const { data: accountProfile = [], isLoading } = useQuery({
    queryKey: ["accountProfile"],
    queryFn: getProfile,
    onError: (error) => {
      toast.error(`Failed to fetch branches: ${error.message}`);
    },
  });

  return (
    <div className="d-flex align-items-center">
      <div className="profile-page">
        <div className="profile-content">

          
            <div className="profile-sidebar" key={accountProfile.id}>
              
          {/* Sidebar Profile Info */}
                <div className="profile-info">
                  <img
                    src="https://via.placeholder.com/100" // Placeholder avatar
                    alt="User Avatar"
                    className="profile-avatar"
                  />
                  <h2 className="profile-fullname">
                    {accountProfile.fullName}
                  </h2>
                </div>
                {/* text api */}
          {accountProfile.role && (
                <div className="profile-stats">
                  <div>
                    <p className="stat">
                      ID <span className="stat-value">{accountProfile.id}</span>
                    </p>
                    <p className="stat">
                      Role{" "}
                      <span className="stat-value">{accountProfile.role}</span>
                    </p>
                    <p className="stat">
                      Branch{" "}
                      <span className="stat-value">
                        {accountProfile.branchName}
                      </span>
                    </p>
                  </div>
                </div>
          )}
          
          </div>

          {/* Profile Form */}
          <ProfileForm profile={accountProfile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
