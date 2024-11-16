import React, { useState } from "react";
import useStaffApi from "../hooks/api/UseStaffApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import EmployeeDetails from "../components/EmployeeDetails";
import "../assets/styles/WorkForceList.css";

const WorkforceList = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const { getStaffList, createStaff, updateStaff, deleteStaff } = useStaffApi();

  // Fetch the staff list using react-query's useQuery
  const { data: staffList = [], refetch } = useQuery({
    queryKey: ["staffList"],
    queryFn: getStaffList,
    onError: (error) => toast.error(`Failed to fetch staff: ${error.message}`),
  });

  const handleRefetch = () => queryClient.invalidateQueries("staffList");

  // Ensure staffList is not undefined
  const branchFilteredStaff = (staffList || []).filter(
    (employee) =>
      employee.fullName !== user.fullName &&
      (user.role === "ADMIN"
        ? staffList
        : employee.branchId === user.branchId && employee.status === "ACTIVE")
  );

  // Filter staff based on search term and role filter
  const filteredStaff = branchFilteredStaff.filter((employee) => {
    const matchesSearchTerm =
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRoleFilter = roleFilter
      ? employee.role.toLowerCase() === roleFilter.toLowerCase()
      : true;

    return matchesSearchTerm && matchesRoleFilter;
  });

  // Extract unique roles from staff list for filtering
  const uniqueRoles = [
    ...new Set((branchFilteredStaff || []).map((employee) => employee.role)),
  ];

  return (
    <div className="workforce-container">
      <h1 className="workforce-title">Workforce Directory</h1>

      {/* Search and filter inputs */}
      <div className="workforce-search-filters d-flex justify-content-between gap-3">
        <input
          type="text"
          className="workforce-search-input form-control"
          placeholder={
            user.role === "ADMIN" ? "Search by name" : "Search by name or role"
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
          <select
            className="workforce-role-select form-control"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Filter by role</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
       
      </div>

      <button
        onClick={() => navigate("/workforce/create")}
        className="btn btn-success my-4"
      >
        {user.role === "ADMIN" ? "Add Manager" : "Add Employee"}
      </button>

      <EmployeeTable
        user={user}
        employees={filteredStaff}
        onSelect={setSelectedEmployee}
      />

      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          refetch={handleRefetch}
          onClose={() => {
            setSelectedEmployee(null);
            setIsEditing(false);
          }}
          onEdit={() => {
            setIsEditing(true);
            setEditedEmployee({ ...selectedEmployee });
          }}
          isEditing={isEditing}
          editedEmployee={editedEmployee}
          setEditedEmployee={setEditedEmployee}
        />
      )}

      {isAdding && (
        <EmployeeDetails
          employee={selectedEmployee}
          refetch={handleRefetch}
          onClose={() => {
            setSelectedEmployee(null);
            setIsEditing(false);
          }}
          onEdit={() => {
            setIsEditing(true);
            setEditedEmployee({ ...selectedEmployee });
          }}
          isEditing={isEditing}
          editedEmployee={editedEmployee}
          setEditedEmployee={setEditedEmployee}
        />
      )}
    </div>
  );
};

const EmployeeTable = ({ user, employees, onSelect }) => (
  <div className="table-responsive">
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          {user.role === "ADMIN" && <th>Branch name</th>}
          <th>Phone Number</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees
          .sort((a, b) => {
            // If a or b is null, return 0 to leave their order unchanged
            if (a?.branchName === null && b?.branchName === null) return 0;
            if (a?.branchName === null) return 1; // Move nulls to the end
            if (b?.branchName === null) return -1; // Move nulls to the end
          
            // Normal sorting by branchName
            return a.branchName.localeCompare(b.branchName);
          })
          .map((employee) => (
            <tr key={employee.id} onClick={() => onSelect(employee)}>
              <td>{employee.fullName}</td>
              <td>{employee.role}</td>
              {user.role === "ADMIN" && <td>{employee.branchName}</td>}
              <td>{employee.phone}</td>
              <td
                style={{
                  color:
                    employee.status === "ACTIVE"
                      ? "green"
                      : employee.status === "INACTIVE"
                      ? "yellow"
                      : employee.status === "DELETED"
                      ? "red"
                      : "black", // Default color if none of the conditions are met
                      fontWeight: "bold",}}
              >
                {employee.status}
              </td>

              <td>
                <button className="workforce-employee-details-btn">
                  Details
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default WorkforceList;
