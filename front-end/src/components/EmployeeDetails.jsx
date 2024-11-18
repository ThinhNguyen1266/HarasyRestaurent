import React, { useState, useEffect } from "react";
import {
  FiEdit2,
  FiPower,
  FiAlertCircle,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useStaffApi from "../hooks/api/UseStaffApi";
import uploadImage from "../services/uploadImage";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useBranchApi from "../hooks/api/useBranchApi";
import "../assets/styles/EmployeeDetail.css";

const EmployeeDetails = ({
  employee,
  onClose,
  isEditing,
  onEdit,
  onDelete,
  refetch,
}) => {
  const { getBranchesStaff } = useBranchApi();
  const { data: branches = [] } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranchesStaff,
    onError: (error) => {
      toast.error(`Failed to fetch branches: ${error.message}`);
    },
  });

  const { updateStaff, updateEmployeeStatus } = useStaffApi();
  const queryClient = useQueryClient();
  const [editedEmployee, setEditedEmployee] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [newStatus, setNewStatus] = useState("ACTIVE");

  useEffect(() => {
    if (employee) {
      setEditedEmployee({ ...employee });
      setNewStatus(employee.status); // Set initial status
    } else {
      setEditedEmployee({
        role: "",
        branchId: "",
        bankName: "",
        bankAccount: "",
        picture: "",
        salary: 0,
        status: "ACTIVE", // default to ACTIVE
      });
    }
  }, [employee]);

  const updateStaffMutation = useMutation({
    mutationFn: updateStaff,
    onSuccess: () => {
      queryClient.invalidateQueries("staffList");
      toast.success("Employee updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update employee: ${error.message}`);
    },
  });

  const handleStatusToggle = () => {
    const toggledStatus = newStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setNewStatus(toggledStatus); // Update local state
  };

  const handleSave = () => {
    if (isUploading) {
      toast.warn("Please wait for the image upload to complete.");
      return;
    }
    if (editedEmployee) {
      // Update status on save if it was changed
      const updatedEmployee = { ...editedEmployee, status: newStatus };
      updateStaffMutation.mutate(updatedEmployee);
      refetch(); // Call refetch after saving
      onClose(); // Close the modal
    } else {
      toast.error("No employee data to save");
    }
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${employee.fullName}? This action cannot be undone.`
    );
    if (isConfirmed) {
      const updatedEmployee = { ...editedEmployee, status: "DELETED" };
      updateStaffMutation.mutate(updatedEmployee);
      refetch(); // Call refetch after saving
      onClose(); // Close the modal
    }
  };
  // Update status when the modal closes (or some other trigger)
  const handleClose = () => {
    if (newStatus !== editedEmployee.status) {
      const updatedEmployee = { ...editedEmployee, status: newStatus };
      updateStaffMutation.mutate(updatedEmployee); // Update status if changed
      refetch(); // Call refetch when closing
    }
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-white rounded">
          <div className="modal-header">
            <h2 className="modal-title text-white">{employee.fullName}</h2>
            <button
              onClick={handleClose}
              className="btn-close btn-close-white"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {isEditing ? (
              <EditingForm
                editedEmployee={editedEmployee}
                setEditedEmployee={setEditedEmployee}
                onSave={handleSave}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
                branches={branches}
                newStatus={newStatus}
                handleStatusToggle={handleStatusToggle}
              />
            ) : (
              <ViewDetails
                employee={employee}
                onEdit={onEdit}
                onStatusToggle={handleStatusToggle}
                currentStatus={newStatus}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EditingForm = ({
  editedEmployee,
  setEditedEmployee,
  onSave,
  isUploading,
  setIsUploading,
  branches,
  newStatus,
  handleStatusToggle,
}) => {
  const [previewUrl, setPreviewUrl] = useState(editedEmployee.picture || null);
  const { user } = useAuth();

  const uploadImageMutate = useMutation({
    mutationFn: uploadImage,
    onMutate: () => setIsUploading(true),
    onSuccess: (data) => {
      setEditedEmployee((prev) => ({ ...prev, picture: data }));
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error(`Failed to upload image`);
      setIsUploading(false);
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      uploadImageMutate.mutate(file);
    }
  };

  return (
    <>
      {["role", "bankName", "bankAccount", "salary"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label text-light">{field}</label>
          {field === "role" ? (
            <select
              value={editedEmployee[field] || ""}
              onChange={(e) =>
                setEditedEmployee({
                  ...editedEmployee,
                  [field]: e.target.value,
                })
              }
              className="form-select bg-secondary text-white border-secondary"
            >
              <option value="">Select Role</option>
              {user.role === "ADMIN" && (
                <option value="BRANCH_MANAGER">Branch Manager</option>
              )}
              <option value="WAITER">Waiter</option>
              <option value="CHEF">Chef</option>
              <option value="RECEPTIONIST">Receptionist</option>
            </select>
          ) : field === "bankName" ||
            field === "bankAccount" ||
            field === "salary" ? (
            <input
              type={field === "salary" ? "number" : "text"}
              value={editedEmployee[field] || ""}
              onChange={(e) =>
                setEditedEmployee({
                  ...editedEmployee,
                  [field]: e.target.value,
                })
              }
              className="form-control bg-secondary text-white border-secondary"
            />
          ) : null}
        </div>
      ))}

      {/* Conditionally render the branch field only for admins */}
      {user.role === "ADMIN" && (
        <div className="mb-3">
          <label className="form-label text-light">Select Branch</label>
          <select
            value={editedEmployee.branchId || ""}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                branchId: e.target.value,
              })
            }
            className="form-control form-select bg-secondary text-white border-secondary"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.branchInfo.id} value={branch.branchInfo.id}>
                {branch.branchInfo.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label text-light">Upload Picture</label>
        <input
          type="file"
          className="form-control bg-secondary text-white border-secondary"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="img-thumbnail mt-2"
            style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
          />
        )}
      </div>

      {/* Status Switch in Edit Mode */}
      <div className="mb-3">
        <label className="form-label text-light">Status</label>
        <div className="d-flex align-items-center gap-3">
          <label className="switch">
            <input
              type="checkbox"
              checked={newStatus === "ACTIVE"}
              onChange={handleStatusToggle}
            />
            <span className="slider round"></span>
          </label>
          <span className="text-light">{newStatus}</span>
        </div>
      </div>

      <button
        onClick={onSave}
        className="btn btn-primary w-100"
        disabled={isUploading}
      >
        {isUploading ? "Uploading Image..." : "Save Changes"}
      </button>
    </>
  );
};

const ViewDetails = ({ employee, onEdit, onDelete, currentStatus }) => (
  <div className="container">
    <div className="row justify-content-center g-4">
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center flex-column text-center mb-2">
         <img
                    src={`${employee.picture || "default-avatar-url"}`}
                    alt={employee.fullName}
                    onError={(e) =>
                      (e.target.src =
                        "https://images.unsplash.com/photo-1633332755192-727a05c4013d")
                    }
                    className="rounded-circle me-3"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />     
        <h3 className="text-light mb-2">{employee.fullName}</h3>
        <p className="text-light fs-3 fw-bold ">{employee.role}</p>
      </div>

      <div className="col-12 col-md-10">
        <EmployeeInfo employee={employee} />
      </div>
    </div>

    <div className="d-flex gap-3 mt-4 flex-column flex-md-row">
      <button
        onClick={onEdit}
        className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
      >
        <FiEdit2 /> <span>Edit</span>
      </button>
      <button
        onClick={onDelete}
        className="btn btn-danger w-70 d-flex align-items-center justify-content-center gap-2"
      >
        <FiAlertCircle /> <span>Delete</span>
      </button>
    </div>
  </div>
);

const EmployeeInfo = ({ employee }) => {
  return (
    <ul className="list-unstyled fs-5">
      <li>
        <strong>Email:</strong> {employee.email}
      </li>
      <li>
        <strong>Phone:</strong> {employee.phone}
      </li>
      <li>
        <strong>Date of Birth:</strong>{" "}
        {new Date(employee.dob).toLocaleDateString()}
      </li>
      <li>
        <strong>Bank Name:</strong> {employee.bankName}
      </li>
      <li>
        <strong>Bank Account:</strong> {employee.bankAccount}
      </li>
      <li>
        <strong>Salary:</strong> ${employee.salary}
      </li>
    </ul>
  );
};


export default EmployeeDetails;
