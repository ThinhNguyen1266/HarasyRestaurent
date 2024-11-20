import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useBranchApi from "../hooks/api/useBranchApi";

import uploadImage from "../services/uploadImage";
import { toast, ToastContainer } from "react-toastify";

import "../assets/styles/EditBranch.css";
import MenuDetailModal from "../components/MenuDetailModal";
import { FaTrash } from "react-icons/fa";

const EditBranch = () => {
  const handleDelete = (branchId) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      deleteBranchMutate.mutate(branchId, {
        onSuccess: () => {
          toast.success("Branch deleted successfully!");
          navigate("/branch");
        },
      });
    }
  };
  const [isMenuTypeEnabled, setIsMenuTypeEnabled] = useState(false);
  const queryClient = useQueryClient();
  const { branchId } = useParams();
  const navigate = useNavigate();
  const {
    getBranchbyID,
    updateBranch,
    getBranchManagers,
    getMenubyBranchID,
    deleteBranch,
  } = useBranchApi();

  const { data: menus, isLoading: isMenusLoading } = useQuery({
    queryKey: ["menus", branchId],
    queryFn: () => getMenubyBranchID(branchId, true),
    onError: (error) => toast.error(`Failed to fetch menu: ${error.message}`),
  });
  const deleteBranchMutate = useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries(["branches"]);
    },
    onError: (error) => {
      toast.error(`Failed to delete branch: ${error.message}`);
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: "",
    imageFile: null,
    phone: "",
    managerId: "",
    status: "",
    workingHours: [{ dayOfWeek: "", openingTime: "", closingTime: "" }],
    tables: [{ number: "", capacity: "" }],
    menus: [{ type: "", status: "" }],
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const { data: managers = [], isLoading: isLoadingManagers } = useQuery({
    queryKey: ["branchManagers"],
    queryFn: getBranchManagers,
    onError: (error) =>
      toast.error(`Failed to fetch managers: ${error.message}`),
  });

  const { data: branchData, isLoading: isBranchLoading } = useQuery({
    queryKey: ["branch", branchId],
    queryFn: () => getBranchbyID(branchId),
    onError: (error) => toast.error(`Failed to fetch branch: ${error.message}`),
  });

  useEffect(() => {
    if (branchData) {
      console.log("Branch data after reload:", branchData);
      setFormData({
        ...branchData.branchInfo,
        managerId: branchData.branchInfo.managerId || "",
        imageFile: null,
        workingHours: Array.isArray(branchData.branchInfo.workingHours)
          ? branchData.branchInfo.workingHours
          : [{ dayOfWeek: "", openingTime: "", closingTime: "" }],
        tables: branchData.tables || [{ number: "", capacity: "" }],
        menus: branchData.menus?.map((menu) => ({
          id: menu.id || null,
          type: menu.type,
          status: menu.status || "AVAILABLE",
        })) || [{ type: "", status: "AVAILABLE" }],
      });
      setPreviewUrl(branchData.image);
    }
  }, [branchData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditBranch = (imageUrl) => {
    const payload = {
      branchInfo: {
        id: branchId,
        name: formData.name,
        location: formData.location,
        image: imageUrl || formData.image,
        phone: formData.phone,
        status: formData.status,
        managerId: formData.managerId,
      },
      workingHours: {
        creates: formData.workingHours
          .filter(
            (hour) =>
              hour.dayOfWeek && hour.openingTime && hour.closingTime && !hour.id
          ) // Chỉ tạo mới nếu không có id
          .map((hour) => ({
            dayOfWeek: hour.dayOfWeek,
            openingTime: `${hour.openingTime}:00`,
            closingTime: `${hour.closingTime}:00`,
          })),
        updates: formData.workingHours
          .filter(
            (hour) =>
              hour.id && hour.dayOfWeek && hour.openingTime && hour.closingTime
          ) // Chỉ cập nhật nếu có id
          .map((hour) => ({
            id: hour.id, // Thêm id để xác định đối tượng cần cập nhật
            dayOfWeek: hour.dayOfWeek,
            openingTime: `${hour.openingTime}:00`,
            closingTime: `${hour.closingTime}:00`,
          })),
      },
      tables: {
        creates: formData.tables
          .filter((table) => table.number && table.capacity && !table.id) // Chỉ tạo mới nếu không có id
          .map((table) => ({
            number: table.number,
            capacity: table.capacity.toString(), // Đảm bảo capacity là một chuỗi
          })),
        updates: formData.tables
          .filter((table) => table.id && table.number && table.capacity) // Chỉ cập nhật nếu có id
          .map((table) => ({
            id: table.id, // Thêm id để xác định đối tượng cần cập nhật
            number: table.number,
            capacity: table.capacity.toString(),
          })),
      },
      menus: {
        creates: formData.menus
          .filter((menu) => menu.type && !menu.id) // Menu không có id sẽ được tạo mới
          .map((menu) => ({
            type: menu.type,
            status: menu.status,
          })),
        updates: formData.menus
          .filter((menu) => menu.id && menu.type) // Menu có id sẽ được cập nhật
          .map((menu) => ({
            id: menu.id, // Chắc chắn rằng mỗi menu có id nếu nó sẽ được cập nhật
            type: menu.type,
            status: menu.status,
          })),
      },
    };

    // Kiểm tra payload
    console.log("Payload sent to API:", JSON.stringify(payload, null, 2));

    // Gửi payload đến API
    saveBranchMutate.mutate(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.imageFile) {
      uploadImageMutate.mutate(formData.imageFile);
    } else {
      handleEditBranch();
    }
  };

  const uploadImageMutate = useMutation({
    mutationFn: uploadImage,
    onSuccess: (imageUrl) => handleEditBranch(imageUrl),
    onError: (error) => toast.error(`Failed to upload image: ${error.message}`),
  });

  const saveBranchMutate = useMutation({
    mutationFn: updateBranch,
    onSuccess: () => {
      toast.success("Branch updated successfully!");
      queryClient.invalidateQueries(["branches"]);
      navigate("/branch");
    },
    onError: (error) =>
      toast.error(`Failed to update branch: ${error.message}`),
  });

  const addWorkingHour = () => {
    setFormData((prev) => {
      const previousDay = prev.workingHours[prev.workingHours.length - 1];
      const newDay = {
        dayOfWeek: "",
        openingTime: previousDay ? previousDay.openingTime : "",
        closingTime: previousDay ? previousDay.closingTime : "",
      };
      return {
        ...prev,
        workingHours: [...prev.workingHours, newDay],
      };
    });
  };

  const addTable = () =>
    setFormData((prev) => ({
      ...prev,
      tables: [...prev.tables, { number: "", capacity: "" }],
    }));

  const addMenu = () => {
    setFormData((prev) => ({
      ...prev,
      menus: [...prev.menus, { type: "", id: null }], // Thêm id=null để xác định là menu mới
    }));
  };

  const removeMenu = (index) => {
    setFormData((prev) => ({
      ...prev,
      menus: prev.menus.filter((_, i) => i !== index),
    }));
  };

  if (isBranchLoading) return <p>Loading branch data...</p>;

  return (
    <div className="container my-4">
      <h1 className="text-white">Edit Branch</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label text-white">Branch Name</label>
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
              <label className="form-label text-white">Location</label>
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
              <label className="form-label text-white">Phone</label>
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
              <label className="form-label text-white">Manager</label>
              <select
                name="managerId"
                value={formData.managerId}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select a manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Upload Image</label>
              <input
                type="file"
                name="imageFile"
                onChange={handleInputChange}
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

              <hr className="cr-info-divider" />
              <h5 className="orange-text">WARNING!!!</h5>
              <strong className="text-white ">
                <input
                  type="checkbox"
                  checked={isMenuTypeEnabled}
                  onChange={() => setIsMenuTypeEnabled((prev) => !prev)}
                  className="form-check-input mx-1"
                />
                Editing the menu will be on another page, so when you click on
                the menu, all the data you have changed before will be lost. Are
                you sure you want to edit the menu?
              </strong>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label text-white">Status</label>
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

            {/* Working Hours */}
            <div className="mb-3">
              <label className="form-label text-white">Working Hours</label>
              {formData.workingHours.map((hour, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <select
                    value={hour.dayOfWeek}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: prev.workingHours.map((h, i) =>
                          i === index ? { ...h, dayOfWeek: e.target.value } : h
                        ),
                      }))
                    }
                    className="form-select me-2"
                  >
                    <option value="">Select Day</option>
                    {[
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ].map((day) =>
                      !formData.workingHours.some((h) => h.dayOfWeek === day) ||
                      hour.dayOfWeek === day ? (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ) : null
                    )}
                  </select>
                  <input
                    type="time"
                    value={hour.openingTime}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: prev.workingHours.map((h, i) =>
                          i === index
                            ? { ...h, openingTime: e.target.value }
                            : h
                        ),
                      }))
                    }
                    className="form-control me-2"
                  />
                  <input
                    type="time"
                    value={hour.closingTime}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: prev.workingHours.map((h, i) =>
                          i === index
                            ? { ...h, closingTime: e.target.value }
                            : h
                        ),
                      }))
                    }
                    className="form-control me-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addWorkingHour}
                className="btn btn-secondary btn-sm mt-2"
              >
                Add Working Hour
              </button>
            </div>

            {/* Tables */}
            <div className="mb-3">
              <label className="form-label text-white">Tables</label>
              {formData.tables.map((table, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="number"
                    placeholder="Table Number"
                    value={table.number}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tables: prev.tables.map((t, i) =>
                          i === index ? { ...t, number: e.target.value } : t
                        ),
                      }))
                    }
                    className="form-control me-2"
                  />
                  <input
                    type="number"
                    placeholder="Capacity"
                    value={table.capacity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tables: prev.tables.map((t, i) =>
                          i === index ? { ...t, capacity: e.target.value } : t
                        ),
                      }))
                    }
                    className="form-control me-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addTable}
                className="btn btn-secondary btn-sm mt-2"
              >
                Add Table
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Menus</label>
              <div className="d-flex flex-wrap">
                {menus?.map((menu, index) => (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-primary me-2"
                    disabled={!isMenuTypeEnabled}
                  >
                    {menu.type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
        <button
          onClick={() => handleDelete(branchId)}
          className="btn btn-danger mt-4 mx-3"
        >
          <FaTrash />
          Delete
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditBranch;
