import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/UserProfile.css";
import ProfileForm from "../components/UserProfileFrom";
import useAccountApi from "../hooks/api/useAccountApi";

const Profile = () => {
  const { getProfile } = useAccountApi();
  const {
    data: accountProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accountProfile"],
    queryFn: getProfile,
    onError: (error) => {
      toast.error(`Failed to fetch profile: ${error.message}`);
    },
  });

  // Local state to manage profile data
  const [localData, setLocalData] = useState({});

  // Effect to update localData when accountProfile is fetched
  useEffect(() => {
    if (accountProfile) {
      setLocalData(accountProfile);
    }
  }, [accountProfile]);

  // Update function to be passed to ProfileForm
  const handleUpdate = (updatedProfile) => {
    setLocalData(updatedProfile);
    toast.success("Profile updated successfully!");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading indicator while fetching data
  }

  if (error) {
    return <div>Error loading profile data</div>; // Error handling
  }

  return (
    <div className="d-flex align-items-center">
      <div className="profile-page">
        <div className="profile-content">
          <div className="profile-sidebar" key={localData.id}>
            <div className="profile-info">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                alt="Profile Avatar"
                className="profile-avatar"
              />
              <h2 className="profile-fullname">{localData.fullName}</h2>
            </div>
            {localData.role && (
              <div className="profile-stats">
                <div>
                  <p className="stat">
                    ID <span className="stat-value">{localData.id}</span>
                  </p>
                  <p className="stat">
                    Role <span className="stat-value">{localData.role}</span>
                  </p>
                  <p className="stat">
                    Branch{" "}
                    <span className="stat-value">{localData.branchName}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Profile Form */}
          <ProfileForm profile={localData} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
