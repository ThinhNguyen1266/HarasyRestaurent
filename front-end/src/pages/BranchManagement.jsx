import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBranchApi from "../hooks/api/useBranchApi";

const BranchManagement = () => {
  const navigate = useNavigate();
  const { getBranchesStaff } = useBranchApi();

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranchesStaff,

    onError: (error) => {
      toast.error(`Failed to fetch branches: ${error.message}`);
    },
  });
  console.log(branches);

  const handleAddBranch = () => {
    navigate("/branch/create");
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center text-white">Branch Management</h1>
        <button
          onClick={handleAddBranch}
          className="btn d-flex align-items-center"
          style={{ backgroundColor: "#ff6600", color: "white" }}
        >
          <FaPlus className="me-2" />
          Add New Branch
        </button>
      </div>
      {isLoading ? (
        <h1 className="text-center text-white">Loading...</h1>
      ) : (
        <div className="row g-4">
          {branches?.map((branch) => (
            <div key={branch.id} className="col-md-4">
              <div
                className="card h-100"
                style={{
                  backgroundColor: "#141414", // New background color
                  color: "white", // Ensure text is readable
                  borderRadius: "10px", // Optional: Add rounded corners
                  border: "1px solid #333", // Optional: Add a border
                }}
                onClick={() => navigate(`/branch/${branch.branchInfo.id}`)}
              >
                <img
                  src={branch.branchInfo.image}
                  className="card-img-top"
                  alt={branch.branchInfo.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{branch.branchInfo.name}</h5>
                  <p className="card-text">
                    <strong>Address:</strong> {branch.branchInfo.location}
                    <br />
                    <strong>Phone:</strong> {branch.branchInfo.phone}
                    <br />
                    <strong>Manager:</strong> {branch.branchInfo.managerName}
                  </p>
                  <span
                    className={`badge ${
                      branch.branchInfo.status === "ACTIVE"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {branch.branchInfo.status === "ACTIVE"
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <button
                    onClick={() => navigate(`/branch/${branch.branchInfo.id}`)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(branch.branchInfo.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BranchManagement;
