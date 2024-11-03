import React from "react";

// Define fields to display and if they are read-only
const customerFields = [
  { label: "Full Name", key: "fullName"},
  { label: "Phone Number", key: "phone"},
  { label: "Email Address", key: "email"},
  { label: "Date Of Birth", key: "dob"},
  { label: "VIP Points", key: "vipPoint"},
];

const staffFields = [
  { label: "Full Name", key: "fullName", readOnly: true },
  { label: "Phone Number", key: "phone", readOnly: true },
  { label: "Email Address", key: "email", readOnly: true },
  { label: "Branch Name", key: "branchName", readOnly: true },
  { label: "Bank Name", key: "bankName", readOnly: true },
  { label: "Bank Account", key: "bankAccount", readOnly: true },
  { label: "Salary", key: "salary", readOnly: true },
  { label: "Date Of Birth", key: "dob", readOnly: true },
];

const ProfileForm = ({ profile }) => {
  // Determine if the profile is for staff based on the presence of "role"
  const isStaffProfile = profile && profile.role !== undefined;
  const fields = isStaffProfile ? staffFields : customerFields;
  const isEditable = !isStaffProfile;

  return (
    <div className="account-settings">
      <form className="settings-form">
        {fields.map((field) => (
          <div className="form-group" key={field.key}>
            <label>{field.label}</label>
            <input
              type={field.key === "email" ? "email" : "text"}
              value={profile?.[field.key] || ""} // Use optional chaining with default value
              readOnly={!isEditable || field.readOnly}
            />
          </div>
        ))}
        {isEditable && (
          <button type="submit" className="update-btn">
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
