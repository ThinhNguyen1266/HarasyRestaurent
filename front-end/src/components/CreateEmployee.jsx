import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import useStaffApi from "../hooks/api/UseStaffApi";
import uploadImage from "../services/uploadImage";
import useAuth from "../hooks/useAuth";
import "../assets/styles/CreateEmployee.css";

const CreateEmployee = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { userbranchId } = location.state || {};
  const { createStaff } = useStaffApi();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    fullName: "",
    phone: "",
    dob: "",
    branchId: userbranchId,
    role: "",
    bankName: "",
    bankAccount: "",
    pictureFile: "",
    salary: 0,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleCreateEmployee = (pictureUrl) => {
    saveEmployeeMutate.mutate({
      ...formData,
      picture: pictureUrl || "",
    });
  };

  const uploadImageMutate = useMutation({
    mutationFn: uploadImage,
    onSuccess: handleCreateEmployee,
    onError: (error) => toast.error(`Failed to upload image: ${error.message}`),
  });

  const saveEmployeeMutate = useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      toast.success("Employee created successfully!");
      navigate(`/workforce/${userbranchId}`);
    },
    onError: (error) =>
      toast.error(`Failed to create employee: ${error.message}`),
  });

  const handleInputChange = ({ target: { name, value, files } }) => {
    if (name === "pictureFile") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, pictureFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (formData.username.includes(" ")) {
      toast.error("Username cannot contain spaces!");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    if (!formData.fullName.trim()) {
      toast.error("Full name is required!");
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be 10 digits and numeric!");
      return false;
    }

    if (formData.salary <= 0) {
      toast.error("Salary must be greater than zero!");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    const today = new Date();
    const dob = new Date(formData.dob);

    // Calculate the age
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      toast.error("At least 18 years old!");
      return false;
    }

    if (!formData.pictureFile) {
      toast.error("Please upload a picture!");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      formData.pictureFile
        ? uploadImageMutate.mutate(formData.pictureFile)
        : handleCreateEmployee("");
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-white">Create New Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Column 1 */}
          <div className="col-12 col-md-6">
            {["username", "email", "fullName", "phone"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-white">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            ))}

            {["password", "confirmPassword"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-white">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <div className="position-relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="col-12 col-md-6">
            {["dob", "role", "bankName", "bankAccount", "salary"].map(
              (field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-white">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  {field === "role" ? (
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="form-select form-control"
                      required
                    >
                      <option value="">Select Role</option>
                      {user.role === "ADMIN" && (
                        <option value="BRANCH_MANAGER">Branch Manager</option>
                      )}
                      <option value="WAITER">Waiter</option>
                      <option value="CHEF">Chef</option>
                      <option value="RECEPTIONIST">Receptionist</option>
                    </select>
                  ) : (
                    <input
                      type={
                        field === "dob"
                          ? "date"
                          : field === "salary"
                          ? "number"
                          : "text"
                      }
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  )}
                </div>
              )
            )}

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
          <button type="submit" className="btn btn-primary mt-4">
            Create Employee
          </button>
          <button
            onClick={() => navigate(`/workforce/${userbranchId}`)}
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
