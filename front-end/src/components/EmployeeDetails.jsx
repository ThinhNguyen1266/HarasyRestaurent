import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiMail, FiPhone } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useStaffApi from "../hooks/api/UseStaffApi";
import uploadImage from "../services/uploadImage";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useBranchApi from "../hooks/api/useBranchApi";

const EmployeeDetails = ({
  employee,
  onClose,
  isEditing,
  onEdit,
  onDelete,
}) => {
  const { updateStaff, deactiveStaff } = useStaffApi();
  const queryClient = useQueryClient();
  const [editedEmployee, setEditedEmployee] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  // Fetch branches data for preloading
  const { getBranchesStaff } = useBranchApi();
  const { data: branches = [], isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranchesStaff,
    onError: (error) => {
      toast.error(`Failed to fetch branches: ${error.message}`);
    },
  });

  useEffect(() => {
    if (employee) {
      setEditedEmployee({ ...employee });
    } else {
      setEditedEmployee({
        role: "",
        branchId: "",
        bankName: "",
        bankAccount: "",
        picture: "",
        salary: 0,
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

  const deactivateStaffMutation = useMutation({
    mutationFn: deactiveStaff,
    onSuccess: () => {
      queryClient.invalidateQueries("staffList");
      toast.success("Employee deactivated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to deactivate employee: ${error.message}`);
    },
  });

  const handleSave = () => {
    if (isUploading) {
      toast.warn("Please wait for the image upload to complete.");
      return;
    }
    if (editedEmployee) {
      updateStaffMutation.mutate(editedEmployee);
      onClose();
    } else {
      toast.error("No employee data to save");
    }
  };

  const handleDeactivate = (id) => {
    deactivateStaffMutation.mutate(id); // Deactivate the employee by ID
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
              onClick={onClose}
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
                branches={branches} // Pass the branches data here
              />
            ) : (
              <ViewDetails
                employee={employee}
                onEdit={onEdit}
                onDelete={handleDeactivate}
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
  branches, // Accept branches as a prop
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
      {["role", "branchId", "bankName", "bankAccount", "salary"].map((field) => (
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
          ) : field === "branchId" ? (
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
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          ) : (
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
          )}
        </div>
      ))}

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

const ViewDetails = ({ employee, onEdit, onDelete }) => (
  <div className="container">
    <div className="row justify-content-center g-4">
      <div className="col-12 col-md-5 text-center mb-4">
        <img
          src={
            employee.picture ||
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
          }
          alt={employee.fullName}
          className="rounded-circle mb-3"
          style={{ width: "128px", height: "128px", objectFit: "cover" }}
        />
        <h3
          className="text-light"
          style={{
            wordWrap: "break-word", // Ensure name breaks into a new line if it's too long
            overflowWrap: "break-word", // A more modern approach to handle long words
            whiteSpace: "normal", // Ensures text can wrap normally
          }}
        >
          {employee.fullName}
        </h3>
        <p className="text-muted">{employee.role}</p>
      </div>

      <div className="col-12 col-md-7">
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
        onClick={() => onDelete(employee.id)}
        className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
      >
        <FiTrash2 /> <span>Deactivate</span>
      </button>
    </div>
  </div>
);

const EmployeeInfo = ({ employee }) => {
  return (
    <ul className="list-unstyled">
      <li>
        <strong>Email:</strong> {employee.email}
      </li>
      <li>
        <strong>Phone:</strong> {employee.phone}
      </li>
      <li>
        <strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}
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
