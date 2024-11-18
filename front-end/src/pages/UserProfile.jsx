import React from "react";
import "../assets/styles/UserProfile.css";
import ProfileForm from "../components/UserProfileFrom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/BranchManagement.css";
import useAuth from "../hooks/useAuth";
import useAccountApi from "../hooks/api/useAccountApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { getProfile } = useAccountApi();

  const { data: userprofile = [] } = useQuery({
    queryKey: ["userprofile"],
    queryFn: () => getProfile(),
    onError: (error) => toast.error(`Failed to fetch staff: ${error.message}`),
  });
  console.log("profile log", user);
  console.log("api log", userprofile);
  const handleRefetch = () => {
    queryClient.invalidateQueries(["userprofile"]);
    console.log("refetch run");
  };


  return (
    <div className="d-flex align-items-center">
      <div className="profile-page w-100">
        <div className="profile-content">
          <div className="profile-sidebar" key={userprofile?.id}>
            <div className="profile-info">
              {user?.role && (
                <img
                  src={userprofile.picture}
                  alt="Profile Avatar"
                  className="profile-avatar"
                />
              )}
              <h2 className="profile-fullname">{userprofile?.fullName}</h2>
            </div>
            {user?.role ? (
              <div className="profile-stats">
                <div>
                  {userprofile.role !== "ADMIN" && (
                    <>
                      <p className="stat">
                        ID <span className="stat-value">{userprofile.id}</span>
                      </p>
                      <p className="stat">
                        Branch{" "}
                        <span className="stat-value">
                          {userprofile.branchName}
                        </span>
                      </p>
                    </>
                  )}
                  <p className="stat">
                    Role <span className="stat-value">{userprofile.role}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="profile-stats">
                <p className="stat">
                  <span className="stat-value m-0 text-white">
                    {userprofile.email}
                  </span>
                </p>
                <p className="stat">
                  Phone <span className="stat-value">{userprofile.phone}</span>
                </p>
                <p className="stat">
                  Point{" "}
                  <span className="stat-value">{userprofile.vipPoint}</span>
                </p>
              </div>
            )}
          </div>
          {/* Profile Form */}
          <ProfileForm profile={userprofile} refetch={handleRefetch} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
