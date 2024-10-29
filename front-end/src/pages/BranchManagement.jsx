import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import "../assets/styles/BranchManagement.css";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import useBranchApi from "../hooks/api/useBranchApi";
import uploadImage from "../services/uploadImage";

const BranchManagement = () => {
  const queryClient = useQueryClient();
  const { getBranchesStaff, createBranch, updateBranch, deleteBranch } =
    useBranchApi();
  const { data: branches = [], isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranchesStaff,
    onError: (error) => {
      toast.error(`Failed to fetch branches: ${error.message}`);
    },
  });

  const uploadImageMutate = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      toast.success("Image uploaded successfully!");
    },
    onError: (error) => {
      toast.error(`Image uploaded fail!`);
    },
  });

  const saveBranchMutate = useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
    },
    onError: (error) => {
      toast.error(`Failed to create branches: ${error.message}`);
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
      toast.error(`Failed to delete branches: ${error.message}`);
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    phone: "",
    manager: "",
    image: "",
    imageFile: null,
    status: "INACTIVE",
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleOpenModal = (mode, branch = null) => {
    setModalMode(mode);
    if (branch) {
      setFormData({ ...branch, id: branch.id });
      setPreviewUrl(branch.image);
    } else {
      setFormData({
        id: "",
        name: "",
        location: "",
        phone: "",
        manager: "",
        image: "",
        imageFile: null,
        status: "INACTIVE",
      });
      setPreviewUrl(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setFormData({
      id: "",
      name: "",
      location: "",
      phone: "",
      manager: "",
      image: "",
      imageFile: null,
      status: "",
    });
    setPreviewUrl(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      if (formData.imageFile) {
        uploadImageMutate.mutate(formData.imageFile, {
          onSuccess: (data) => {
            saveBranchMutate.mutate({ ...formData, image: data });
          },
        });
      } else {
        saveBranchMutate.mutate(formData);
      }
    } else {
      console.log("hi");
      if (formData.imageFile) {
        uploadImageMutate.mutate(formData.imageFile, {
          onSuccess: (data) => {
            updateBranchMutate.mutate({ ...formData, image: data });
          },
        });
      } else {
        updateBranchMutate.mutate(formData);
      }
    }

    setIsModalOpen(false);
  };

  const handleDelete = (branchId) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      deleteBranchMutate.mutate(branchId, {
        onSuccess: () => {
          toast.success("Branch deleted successfully!");
        },
      });
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
            <h1>....Loading</h1>
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
                          branch.status === "active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {branch.status}
                      </span>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
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
                        <label className="form-label">location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
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
                        <label className="form-label">Upload Image</label>
                        <input
                          type="file"
                          name="imageFile"
                          onChange={handleInputChange} // No value attribute for file input
                          className="form-control"
                        />
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                              width: "100%",
                              marginTop: "10px",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="INACTIVE">Inactive</option>
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
