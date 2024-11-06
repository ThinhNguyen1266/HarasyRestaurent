import React, { useState, useMemo } from "react";
import { FiMessageSquare } from "react-icons/fi";
import useStaffApi from "../hooks/api/UseStaffApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import EmployeeDetails from "../components/EmployeeDetails";
import "../assets/styles/BranchManagement.css";

const WorkforceList = () => {
  const { user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const { getStaffList } = useStaffApi();
    const { data: staffList = [] } = useQuery({
      queryKey: ["staffList"],
      queryFn: getStaffList,
      onError: (error) => toast.error(`Failed to fetch branches: ${error.message}`),
    });

  const roles = useMemo(() => ["All", ...new Set(staffList.map((e) => e.role))], [staffList]);

  const filteredEmployees = useMemo(
    () =>
      staffList.filter(
        (e) =>
          (e.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) &&
          (selectedRole === "All" || e.role === selectedRole) &&
          e.branchName === user.branchName&&
          e.fullName!==user.fullName
      ),
    [staffList, searchTerm, selectedRole, user.branchName]
  );

  const handleEmployeeClick = (employee) => { setSelectedEmployee(employee); setIsEditing(false); };
  const handleEdit = () => { setIsEditing(true); setEditedEmployee({ ...selectedEmployee }); };
  const handleSave = () => { setSelectedEmployee(editedEmployee); setIsEditing(false); };
  const handleDelete = () => setSelectedEmployee(null);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-white">Workforce Directory</h1>
      <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedRole={selectedRole} setSelectedRole={setSelectedRole} roles={roles} />

      {filteredEmployees.length === 0 ? (
        <NoResults />
      ) : (
        <EmployeeTable employees={filteredEmployees} onSelect={handleEmployeeClick} />
      )}

      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onEdit={handleEdit}
          isEditing={isEditing}
          onSave={handleSave}
          onDelete={handleDelete}
          editedEmployee={editedEmployee}
          setEditedEmployee={setEditedEmployee}
        />
      )}
    </div>
  );
};

// Component tìm kiếm và lọc
const SearchAndFilter = ({ searchTerm, setSearchTerm, selectedRole, setSelectedRole, roles }) => (
  <div className="row mb-4">
    <div className="col-md-6 mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <select
        className="form-select"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        {roles.map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    </div>
  </div>
);

// Hiển thị kết quả không tìm thấy
const NoResults = () => (
  <div className="text-center py-5">
    <FiMessageSquare className="mb-2" size={40} color="white" />
    <h3 className="text-white">No employees found</h3>
    <p className="text-white">Try adjusting your search criteria.</p>
  </div>
);

// Component bảng nhân viên
const EmployeeTable = ({ employees, onSelect }) => (
  <div className="table-responsive">
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          {["Employee", "Role", "Branch", "Contact", "Actions"].map((header) => (
            <th key={header} scope="col" className="text-uppercase small">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => <EmployeeRow key={employee.id} employee={employee} onSelect={onSelect} />)}
      </tbody>
    </table>
  </div>
);

// Component hàng trong bảng nhân viên
const EmployeeRow = ({ employee, onSelect }) => (
  <tr>
    <td className="d-flex align-items-center">
      <img
        src={`https://${employee.avatar || "default-avatar-url"}`}
        alt={employee.fullName}
        onError={(e) => (e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d")}
        className="rounded-circle me-3"
        style={{ width: "40px", height: "40px", objectFit: "cover" }}
      />
      <div>
        <p className="mb-0 text-white">{employee.fullName}</p>
        <small className="text-muted">{employee.email || "N/A"}</small>
      </div>
    </td>
    <td>{employee.role}</td>
    <td>{employee.branchName || "N/A"}</td>
    <td>{employee.phone || "N/A"}</td>
    <td className="text-end">
      <button onClick={() => onSelect(employee)} className="btn btn-link text-info p-0">
        View Details
      </button>
    </td>
  </tr>
);

export default WorkforceList;
