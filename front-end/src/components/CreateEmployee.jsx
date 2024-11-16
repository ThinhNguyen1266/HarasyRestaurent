import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useStaffApi from "../hooks/api/UseStaffApi";
import uploadImage from "../services/uploadImage";
import { toast, ToastContainer } from "react-toastify";
import "../assets/styles/CreateEmployee.css";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { createStaff } = useStaffApi();

  const uploadImageMutate = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      toast.success("Image uploaded successfully!");
      handleCreateEmployee(data);
    },
    onError: (error) => {
      toast.error(`Failed to upload image: ${error.message}`);
    },
  });

  const saveEmployeeMutate = useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      toast.success("Employee created successfully!");
      navigate("/workforce");
    },
    onError: (error) => {
      toast.error(`Failed to create employee: ${error.message}`);
    },
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    fullName: "",
    phone: "",
    dob: "",
    branchId: "",
    role: "",
    bankName: "",
    bankAccount: "",
    pictureFile: "",
    salary: 0,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pictureFile") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        pictureFile: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreateEmployee = (pictureUrl) => {
    const payload = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      fullName: formData.fullName,
      phone: formData.phone,
      dob: formData.dob,
      branchId: formData.branchId,
      role: formData.role,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      picture: pictureUrl,
      salary: formData.salary,
    };

    console.log("Payload sent to API:", JSON.stringify(payload, null, 2));
    saveEmployeeMutate.mutate(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (formData.pictureFile) {
      uploadImageMutate.mutate(formData.pictureFile);
    } else {
      handleCreateEmployee("");
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-white">Create New Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Column 1 */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label text-white">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <div className="position-relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Confirm Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label text-white">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-select form-control"
                required
              >
                <option value="">Select Role</option>
                <option value="BRANCH_MANAGER">Branch Manager</option>
                <option value="WAITER">Waiter</option>
                <option value="CHEF">Chef</option>
                <option value="RECEPTIONIST">Receptionist</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Branch ID</label>
              <input
                type="number"
                name="branchId"
                value={formData.branchId}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Bank Account</label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Upload Picture</label>
              <input
                type="file"
                name="pictureFile"
                onChange={handleInputChange}
                className="form-control"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="d-flex g-2">
          <button type="submit" className="btn btn-primary mt-4 m">
            Create Employee
          </button>
          <button
            onClick={() => {
              navigate("/workforce");
            }}
            className="btn btn-danger mt-4 mx-5"
          >
            Cancel
          </button>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </form>
    </div>
  );
};

export default CreateEmployee;
