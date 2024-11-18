import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStaffApi from "../hooks/api/UseStaffApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import EmployeeDetails from "../components/EmployeeDetails";
import "../assets/styles/WorkForceList.css";
import useBranchApi from "../hooks/api/useBranchApi";
const WorkforceList = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const { branchId: paramBranchId } = useParams();

  // Use branchId from URL if available, but override for branch managers
  const curenUserBranchId = user.role === "BRANCH_MANAGER" ? user.branchId : paramBranchId || user.branchId;
  
  const { getStaffByBranchId } = useStaffApi(); 
  const { data: staffList = [] } = useQuery({
    queryKey: ["staffList", curenUserBranchId],
    queryFn: () => getStaffByBranchId(curenUserBranchId),
    onError: (error) => toast.error(`Failed to fetch staff: ${error.message}`),
  });
  

  

  
  

  const handleRefetch = () => queryClient.invalidateQueries(["staffList", curenUserBranchId]);

  // Filter out the logged-in user from the staff list
  const branchFilteredStaff = staffList.filter((employee) => {
    return employee.fullName !== user.fullName; // Only exclude the current user
  });
  

  const filteredStaff = branchFilteredStaff.filter((employee) => {
    const matchesSearchTerm =
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoleFilter = roleFilter
      ? employee.role.toLowerCase() === roleFilter.toLowerCase()
      : true;
    return matchesSearchTerm && matchesRoleFilter;
  });

  const uniqueRoles = [...new Set(branchFilteredStaff.map((employee) => employee.role))];

  return (
    <div className="workforce-container">
      <h1 className="workforce-title">Workforce Directory - Branch {curenUserBranchId}</h1>

      {/* Search and filter inputs */}
      <div className="workforce-search-filters d-flex justify-content-between gap-3">
        <input
          type="text"
          className="workforce-search-input form-control"
          placeholder="Search by name or role"
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
        onClick={() => // Thay đổi trong WorkforceList khi gọi navigate
          navigate("/workforce/create", { state: { userbranchId: curenUserBranchId } })}
        className="btn btn-success my-4"
      >
        Add Employee
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
    </div>
  );
};

const EmployeeTable = ({ user, employees, onSelect }) => (
  <div className="table-responsive">
    {employees.length === 0 ? (
      <div className="text-center text-white my-4">
        <h4>No employees found.</h4>
      </div>
    ) : (
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            {user.role === "ADMIN" && <th>Branch Name</th>}
            <th>Phone Number</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees
            .sort((a, b) => {
              if (a?.branchName === null && b?.branchName === null) return 0;
              if (a?.branchName === null) return 1;
              if (b?.branchName === null) return -1;
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
                        : "black",
                    fontWeight: "bold",
                  }}
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
    )}
  </div>
);


export default WorkforceList;
