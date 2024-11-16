import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useBranchApi from "../hooks/api/useBranchApi";
import uploadImage from "../services/uploadImage";
import { toast, ToastContainer } from "react-toastify";

const EditBranch = () => {
  const queryClient = useQueryClient();
  const { branchId } = useParams();
  const navigate = useNavigate();
  const { getBranchbyID, updateBranch, getBranchManagers } = useBranchApi();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: "",
    imageFile: null,
    phone: "",
    manager: "",
    status: "",
    workingHours: [{ dayOfWeek: "", openingTime: "", closingTime: "" }],
    tables: [{ number: "", capacity: "" }],
    menus: [{ type: "" }],
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
        manager: branchData.manager || "",
        imageFile: null,
        workingHours: Array.isArray(branchData.branchInfo.workingHours)
          ? branchData.branchInfo.workingHours
          : [{ dayOfWeek: "", openingTime: "", closingTime: "" }],
        tables: branchData.tables || [{ number: "", capacity: "" }],
        menus: branchData.menus?.map((menu) => ({ type: menu.type })) || [
          { type: "" },
        ],
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
        manager: formData.manager,
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
          })),
        updates: formData.menus
          .filter((menu) => menu.id && menu.type) // Menu có id sẽ được cập nhật
          .map((menu) => ({
            id: menu.id, // Chắc chắn rằng mỗi menu có id nếu nó sẽ được cập nhật
            type: menu.type,
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

  const addMenu = () =>
    setFormData((prev) => ({
      ...prev,
      menus: [...prev.menus, { type: "" }],
    }));
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
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select a Manager</option>
                {isLoadingManagers ? (
                  <option>Loading managers...</option>
                ) : (
                  managers.map((manager) => (
                    <option key={manager.phone} value={manager.fullName}>
                      {manager.fullName}
                    </option>
                  ))
                )}
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
                    <option value="MONDAY">Monday</option>
                    <option value="TUESDAY">Tuesday</option>
                    <option value="WEDNESDAY">Wednesday</option>
                    <option value="THURSDAY">Thursday</option>
                    <option value="FRIDAY">Friday</option>
                    <option value="SATURDAY">Saturday</option>
                    <option value="SUNDAY">Sunday</option>
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

            {/* Menus */}
            <div className="mb-3">
              <label className="form-label text-white">Menus</label>
              {formData.menus.map((menu, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <select
                    value={menu.type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        menus: prev.menus.map((m, i) =>
                          i === index ? { ...m, type: e.target.value } : m
                        ),
                      }))
                    }
                    className="form-select me-2"
                  >
                    <option value="">Select Menu Type</option>
                    <option value="BREAKFAST">BREAKFAST</option>
                    <option value="LUNCH">LUNCH</option>
                    <option value="DINNER">DINNER</option>
                    <option value="DESSERT">DESSERT</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMenu(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addMenu}
                className="btn btn-secondary btn-sm mt-2"
              >
                Add Menu
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditBranch;
