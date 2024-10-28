import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import "../assets/styles/BranchManagement.css";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getBranches } from "../services/branchRequest";
const BranchManagement = () => {
  const queryClient = useQueryClient();
  const { data: branches = [], isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
    onError: (error) => {
      toast.error(`Failed to fetch branches: ${error.message}`);
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add, edit
  // const [currentBranch, setCurrentBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    manager: "",
    image: "",
    status: "active",
  });

  const handleOpenModal = (mode, branch = null) => {
    setModalMode(mode);
    if (branch) {
      // setCurrentBranch(branch);
      setFormData(branch);
    } else {
      setFormData({
        name: "",
        address: "",
        phone: "",
        manager: "",
        image: "",
        status: "active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setCurrentBranch(null);
    setFormData({
      name: "",
      address: "",
      phone: "",
      manager: "",
      image: "",
      status: "active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      const newBranch = {
        ...formData,
      };

      toast.success("Branch added successfully!");
    } else {
      toast.success("Branch updated successfully!");
    }
    handleCloseModal();
  };

  const handleDelete = (branchId) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      toast.success("Branch deleted successfully!");
    }
  };

  return (
    <>
      <div className="main-content">
        <Sidebar />
        <div className="container py-4">
          <ToastContainer />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-center text-white">Branch Management</h1>
            <button
              onClick={() => handleOpenModal("add")}
              className="btn d-flex align-items-center"
              style={{ backgroundColor: "#ff6600", color: "white" }}
            >
              <FaPlus className="me-2" />
              Add New Branch
            </button>
          </div>

          {isLoading ? (
            <h1>...laoding</h1>
          ) : (
            <div className="row g-4">
              {branches.map((branch) => (
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
                        <strong>Address:</strong> {branch.address}
                        <br />
                        <strong>Phone:</strong> {branch.phone}
                        <br />
                        <strong>Manager:</strong> {branch.manager}
                      </p>
                      <span
                        className={`badge ${
                          branch.status === "active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {branch.status}
                      </span>
                    </div>
                    <div className="card-footer d-flex justify-content-end ">
                      <button
                        onClick={() => handleOpenModal("edit", branch)}
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

          {isModalOpen && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {modalMode === "add" ? "Add New Branch" : "Edit Branch"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Branch Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Manager</label>
                        <input
                          type="text"
                          name="manager"
                          value={formData.manager}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input
                          type="text"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {modalMode === "add" ? "Add Branch" : "Update Branch"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BranchManagement;
