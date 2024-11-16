import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiMail, FiPhone } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useStaffApi from "../hooks/api/UseStaffApi";
import uploadImage from "../services/uploadImage";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

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
      toast.success("Employee deactivate successfully");
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
    // if ()
  };

  // This is the function that is passed to the `onDelete` prop
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
}) => {
  const [previewUrl, setPreviewUrl] = useState(editedEmployee.picture || null);
  const { user } = useAuth();

  const uploadImageMutate = useMutation({
    mutationFn: uploadImage,
    onMutate: () => setIsUploading(true),
    onSuccess: (data) => {
      console.log("Image uploaded successfully!");
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
      {["role", "branchId", "bankName", "bankAccount", "salary"].map(
        (field) => (
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
                {user.role === "ADMIN" && <option value="BRANCH_MANAGER">Branch Manager</option>}
                <option value="WAITER">Waiter</option>
                <option value="CHEF">Chef</option>
                <option value="RECEPTIONIST">Receptionist</option>
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
        )
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
        <FiTrash2 /> <span>Deactivate</span>{" "}
        {/* Change button text to 'Deactivate' */}
      </button>
    </div>
  </div>
);

const EmployeeInfo = ({ employee }) => (
  <div className="mx-3">
    <DetailRow icon={<FiMail />} text={employee.email || "N/A"} />
    <DetailRow icon={<FiPhone />} text={employee.phone || "N/A"} />
    <DetailRow label="Branch ID:" text={employee.branchId || "N/A"} />
    <DetailRow label="Role:" text={employee.role || "N/A"} />
    <DetailRow label="Bank Name:" text={employee.bankName || "N/A"} />
    <DetailRow label="Bank Account:" text={employee.bankAccount || "N/A"} />
    <DetailRow
      label="Salary:"
      text={employee.salary ? `$${employee.salary}` : "N/A"}
    />
  </div>
);

const DetailRow = ({ icon, label, text }) => (
  <div className="d-flex align-items-center mb-2">
    {icon && <span className="me-2">{icon}</span>}
    {label && <span className="fw-bold me-1">{label}</span>}
    <span>{text}</span>
  </div>
);

export default EmployeeDetails;
