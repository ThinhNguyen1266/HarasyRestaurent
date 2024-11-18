import React, { useMemo, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import EmployeeDetails from "../components/EmployeeDetails";
import useAuth from "../hooks/useAuth";

// Example constant data for staffList based on your provided information
const initialStaffList = [
  {
    id: 1,
    fullName: "Lani Bruen",
    avatar: null, // Placeholder if no avatar URL is provided
    role: "BRANCH_MANAGER",
    branchName: "Arch N. Emmy",
    phone: "1-233-444-2222",
    email: "pohgfde@gmail.com", // Set to null if no email is provided
  },
  {
    id: 2,
    fullName: "Lani CRUE",
    avatar: null, // Placeholder if no avatar URL is provided
    role: "WAITER",
    branchName: "Arch N. Emmy",
    phone: "1-555-442-1111",
    email: "wsxed@gmail.com", // Set to null if no email is provided
  },
  {
    id: 3,
    fullName: "Lani ABAMA",
    avatar: null, // Placeholder if no avatar URL is provided
    role: "RECEPTIONIST",
    branchName: "Arch N. Emmy",
    phone: "1-777-888-1111",
    email: "asfg@gmail.com", // Set to null if no email is provided
  },
  {
    id: 4,
    fullName: "Lani ABULACEN",
    avatar: null, // Placeholder if no avatar URL is provided
    role: "WAITER",
    branchName: "Arch N. Emmy",
    phone: "1-390-555-3333",
    email: "qwert@gmail.com", // Set to null if no email is provided
  },
  {
    id: 5,
    fullName: "Lani VODIMORE",
    avatar: null, // Placeholder if no avatar URL is provided
    role: "CHEF",
    branchName: "Arch N. Emmy",
    phone: "1-242-113-311",
    email: "assd@gmail.com", // Set to null if no email is provided
  },
  {
    id: 6,
    fullName: "Lani BATOCOM",
    avatar: null, // Placeholder if no avatar URL is provided
    role: "CHEF",
    branchName: "Arch N. Emmy",
    phone: "1-123-211-2334",
    email: "abc@gmail.com", // Set to null if no email is provided
  },
  // Add more employees if needed, using the same structure
];

const WorkforceList = () => {
  const { user } = useAuth();
  const [staffList, setStaffList] = useState(initialStaffList);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const roles = useMemo(
    () => ["All", ...new Set(staffList.map((e) => e.role))],
    [staffList]
  );

  const filteredEmployees = useMemo(
    () =>
      staffList.filter(
        (e) =>
          (e.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false) &&
          (selectedRole === "All" || e.role === selectedRole) &&
          e.branchName === user.branchName &&
          e.fullName !== user.fullName
      ),
    [staffList, searchTerm, selectedRole, user.branchName]
  );

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setEditedEmployee({ ...employee });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update the staffList with the edited employee details
    setStaffList((prevList) =>
      prevList.map((emp) =>
        emp.id === editedEmployee.id ? editedEmployee : emp
      )
    );
    setIsEditing(false); // Exit editing mode
    setSelectedEmployee(null); // Close the modal
  };

  const handleDelete = () => {
    setStaffList((prevList) =>
      prevList.filter((emp) => emp.id !== selectedEmployee.id)
    );
    setSelectedEmployee(null);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-white">Workforce Directory</h1>
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        roles={roles}
      />

      {filteredEmployees.length === 0 ? (
        <NoResults />
      ) : (
        <EmployeeTable
          employees={filteredEmployees}
          onSelect={handleEmployeeClick}
        />
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

// Component for search and filter
const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  roles,
}) => (
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
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  </div>
);

// Component for "No Results" message
const NoResults = () => (
  <div className="text-center py-5">
    <FiMessageSquare className="mb-2" size={40} color="white" />
    <h3 className="text-white">No employees found</h3>
    <p className="text-white">Try adjusting your search criteria.</p>
  </div>
);

// Component for employee table
const EmployeeTable = ({ employees, onSelect }) => (
  <div className="table-responsive">
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          {["Employee", "Role", "Branch", "Contact", "Actions"].map(
            (header) => (
              <th key={header} scope="col" className="text-uppercase small">
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  </div>
);

// Component for individual employee row
const EmployeeRow = ({ employee, onSelect }) => (
  <tr>
    <td className="d-flex align-items-center">
      <img
        src={
          employee.avatar
            ? `https://${employee.avatar}`
            : "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
        }
        alt={employee.fullName}
        className="rounded-circle me-3"
        style={{ width: "40px", height: "40px", objectFit: "cover" }}
        onError={(e) =>
          (e.target.src =
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d")
        }
      />
      <div>
        <p className="mb-0 text-white">{employee.fullName}</p>
        <small className="">{employee.email || "N/A"}</small>
      </div>
    </td>
    <td>{employee.role}</td>
    <td>{employee.branchName || "N/A"}</td>
    <td>{employee.phone || "N/A"}</td>
    <td className="text-end">
      <button
        onClick={() => onSelect(employee)}
        className="btn btn-link text-info p-0"
      >
        View Details
      </button>
    </td>
  </tr>
);

export default WorkforceList;
