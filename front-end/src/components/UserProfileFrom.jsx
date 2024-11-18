import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useAccountApi from "../hooks/api/useAccountApi";
import "../assets/styles/UserProfile.css";

const customerFields = [
  { label: "Full Name", key: "fullName" },
  { label: "Date Of Birth", key: "dob", type: "date" },
];

const staffFields = [
  { label: "User Name", key: "username", readOnly: true },
  { label: "Phone Number", key: "phone", readOnly: true },
  { label: "Email Address", key: "email", readOnly: true },
  { label: "Branch Name", key: "branchName", readOnly: true },
  { label: "Bank Name", key: "bankName", readOnly: true },
  { label: "Bank Account", key: "bankAccount", readOnly: true },
  { label: "Salary", key: "salary", readOnly: true },
  { label: "Date Of Birth", key: "dob", type: "date", readOnly: true },
];

const ProfileForm = ({ profile, refetch }) => {
  const isStaffProfile = profile && profile.role !== undefined;
  const fields = isStaffProfile ? staffFields : customerFields;
  const isEditable = !isStaffProfile;
  const [formData, setFormData] = useState({});

  const { updateCusProfile } = useAccountApi();

  const updateCusMutation = useMutation({
    mutationFn: updateCusProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });

  useEffect(() => {
    if (profile) {
      let formattedDob = "";
      if (profile.dob) {
        const dobParts = profile.dob.split("-");
        if (dobParts.length === 3) {
          formattedDob = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`;
        }
      }

      setFormData({
        ...profile,
        dob: formattedDob, // Set the formatted dob
      });
    }
  }, [profile]);

  const filteredFields = fields.filter((field) => {
    const fieldValue = profile[field.key];
    if (field.key === "salary") {
      return fieldValue != null && fieldValue !== 0;
    }
    return fieldValue != null; // Filter out null or undefined values
  });

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCusMutation.mutate(formData, {
      onSuccess: () => {
        setTimeout(() => {
          refetch(); // Run refetch after 1 second
        }, 1000);
      },
    });
  };

  return (
    <div className="account-settings">
      <form className="settings-form" onSubmit={handleSubmit}>
        {filteredFields.map((field) => (
          <div className="form-group" key={field.key}>
            <label>{field.label}</label>
            <input
              type={field.type || (field.key === "dob" ? "date" : "text")}
              value={formData[field.key] || ""}
              readOnly={field.readOnly || !isEditable}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className={field.readOnly ? "readonly-input" : ""}
              max={
                field.key === "dob"
                  ? new Date().toISOString().split("T")[0]
                  : undefined
              } // Add max attribute for dob
            />
          </div>
        ))}
        {isEditable && (
          <button
            type="submit"
            className="update-btn"
            disabled={updateCusMutation.isLoading}
          >
            {updateCusMutation.isLoading ? "Updating..." : "Update"}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
