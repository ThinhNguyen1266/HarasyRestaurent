import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/BranchManagement.css";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useBranchApi from "../hooks/api/useBranchApi";

const BranchManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getBranchesStaff, updateBranch, deleteBranch } = useBranchApi();

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranchesStaff,
    onError: (error) => {
      toast.error(`Failed to fetch branches: ${error.message}`);
    },
  });

  const updateBranchMutate = useMutation({
    mutationFn: updateBranch,
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
    },
    onError: (error) => {
      toast.error(`Failed to update branches: ${error.message}`);
    },
  });

  const deleteBranchMutate = useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
    },
    onError: (error) => {
      toast.error(`Failed to delete branch: ${error.message}`);
    },
  });

  const handleDelete = (branchId) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      deleteBranchMutate.mutate(branchId);
    }
  };

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
        <h1>Loading...</h1>
      ) : (
        <div className="row g-4">
          {branches?.map((branch) => (
            <div key={branch.id} className="col-md-4">
              <div className="card h-100">
                <img
                  src={branch.image}
                  className="card-img-top"
                  alt={branch.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{branch.name}</h5>
                  <p className="card-text">
                    <strong>Address:</strong> {branch.location}
                    <br />
                    <strong>Phone:</strong> {branch.phone}
                    <br />
                    <strong>Manager:</strong> {branch.manager}
                  </p>
                  <span
                    className={`badge ${
                      branch.status === "active" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {branch.status}
                  </span>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <button
                    onClick={() => navigate(`/branch/${branch.id}`)}
                    className="btn btn-warning btn-sm"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(branch.id)}
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
