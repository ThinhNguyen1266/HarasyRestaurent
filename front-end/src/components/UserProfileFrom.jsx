import React, { useState, useEffect } from "react";

const customerFields = [
  { label: "Full Name", key: "fullName" },
  { label: "Phone Number", key: "phone" },
  { label: "Email Address", key: "email" },
  { label: "Date Of Birth", key: "dob" },
  { label: "VIP Points", key: "vipPoint" },
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

const ProfileForm = ({ profile, onUpdate }) => {
  const isStaffProfile = profile && profile.role !== undefined;
  const fields = isStaffProfile ? staffFields : customerFields;
  const isEditable = !isStaffProfile;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Call the update function passed as a prop
  };

  return (
    <div className="account-settings">
      <form className="settings-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="form-group" key={field.key}>
            <label>{field.label}</label>
            <input
              type={field.key === "email" ? "email" : "text"}
              value={formData[field.key] || ""}
              readOnly={field.readOnly || !isEditable}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
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
