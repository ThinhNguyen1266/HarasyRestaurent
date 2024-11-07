import React from 'react';
import { FiEdit2, FiTrash2, FiMail, FiPhone } from "react-icons/fi";

// Employee Details Modal Component
const EmployeeDetails = ({ employee, onClose, onEdit, isEditing, onSave, onDelete, editedEmployee, setEditedEmployee }) => (
  <div className="modal fade show d-flex justify-content-center align-items-center" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content bg-dark text-white rounded">
        <div className="modal-header">
          <h2 className="modal-title">Employee Details</h2>
          <button onClick={onClose} className="btn-close btn-close-white" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {isEditing ? (
            <EditingForm fields={["fullName", "role", "email", "phone", "branch"]} editedEmployee={editedEmployee} setEditedEmployee={setEditedEmployee} onSave={onSave} />
          ) : (
            <ViewDetails employee={employee} onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
      </div>
    </div>
  </div>
);

// Form for Editing Employee
const EditingForm = ({ fields, editedEmployee, setEditedEmployee, onSave }) => (
  <div>
    {fields.map((field) => (
      <div className="mb-3" key={field}>
        <label className="form-label text-light">{field}</label>
        <input
          type="text"
          value={editedEmployee[field]}
          onChange={(e) => setEditedEmployee({ ...editedEmployee, [field]: e.target.value })}
          className="form-control bg-secondary text-white border-secondary"
        />
      </div>
    ))}
    <button onClick={onSave} className="btn btn-primary w-100">Save Changes</button>
  </div>
);

// Viewing Employee Details
const ViewDetails = ({ employee, onEdit, onDelete }) => (
  <div>
    <div className="text-center mb-4">
      <img
        src={`https://${employee.avatar}`}
        alt={employee.fullName}
        className="rounded-circle mb-3"
        style={{ width: "128px", height: "128px", objectFit: "cover" }}
        onError={(e) => (e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d")}
      />
      <h3 className="text-light">{employee.fullName}</h3>
      <p className="text-muted">{employee.role}</p>
    </div>
    <EmployeeInfo employee={employee} />
    <div className="d-flex gap-3 mt-4">
      <button onClick={onEdit} className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
        <FiEdit2 /> <span>Edit</span>
      </button>
      <button onClick={onDelete} className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2">
        <FiTrash2 /> <span>Delete</span>
      </button>
    </div>
  </div>
);

const EmployeeInfo = ({ employee }) => (
  <div>
    <DetailRow icon={<FiMail className="text-muted" />} text={employee.email || "N/A"} />
    <DetailRow icon={<FiPhone className="text-muted" />} text={employee.phone || "N/A"} />
    <DetailRow label="Branch:" text={employee.branchName || "N/A"} />
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
