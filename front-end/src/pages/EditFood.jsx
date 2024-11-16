import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFoodAPi from "../hooks/api/useFoodAPi";
import uploadImage from "../services/uploadImage";
import { toast, ToastContainer } from "react-toastify";
import { FaTrash } from "react-icons/fa6";

const EditFood = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getFoodById, updateFood, deleteFood } = useFoodAPi();

  const deleteFoodMutate = useMutation({
    mutationFn: deleteFood,
    onSuccess: () => {
      queryClient.invalidateQueries("foods");
    },
    onError: (error) => {
      toast.error(`Failed to delete food: ${error.message}`);
    },
  });

  const { data: foodData, isLoading: isFoodLoading } = useQuery({
    queryKey: ["food", foodId],
    queryFn: () => getFoodById(foodId),
    onError: (error) => toast.error(`Failed to fetch food: ${error.message}`),
  });

  useEffect(() => {
    if (foodData) {
      setFormData({
        ...foodData,
        imageFile: null,
      });
      setPreviewUrl(foodData.image);
    }
  }, [foodData]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    imageFile: null,
    price: "",
    pointsPrice: "",
    categoryId: "",
    status: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For enabling/disabling form inputs

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.imageFile) {
      uploadImageMutate.mutate(formData.imageFile);
    } else {
      handleEditFood();
    }
  };

  const uploadImageMutate = useMutation({
    mutationFn: uploadImage,
    onSuccess: (imageUrl) => handleEditFood(imageUrl),
    onError: (error) => toast.error(`Failed to upload image: ${error.message}`),
  });

  const handleEditFood = (imageUrl) => {
    const payload = {
      name: formData.name,
      description: formData.description,
      image: imageUrl || formData.image,
      price: formData.price,
      categoryId: formData.categoryId,
      pointsPrice: formData.pointsPrice,
      status: formData.status,
    };
    saveFoodMutate.mutate({ id: foodId, ...payload });
  };

  const saveFoodMutate = useMutation({
    mutationFn: updateFood,
    onSuccess: () => {
      toast.success("Food updated successfully!");
      navigate("/food");
    },
    onError: (error) => toast.error(`Failed to update food: ${error.message}`),
  });

  const handleDelete = (foodId) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      deleteFoodMutate.mutate(foodId, {
        onSuccess: () => {
          toast.success("Food deleted successfully!");
          navigate("/food"); // Navigate to food list after successful deletion
        },
      });
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-white">Edit Food</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3">
            <label className="form-label text-white">Food Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
              disabled={!isEditing}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-control"
              disabled={!isEditing}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Points Price</label>
            <input
              type="text"
              name="pointsPrice"
              value={formData.pointsPrice}
              onChange={handleInputChange}
              className="form-control"
              disabled={!isEditing}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control"
              disabled={!isEditing}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Upload Image</label>
            <input
              type="file"
              name="imageFile"
              onChange={handleInputChange}
              className="form-control"
              disabled={!isEditing}
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
            <label className="form-label text-white">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="form-select"
              disabled={!isEditing}
            >
              <option value="">Select Category</option>
              <option value="1">Main Course</option>
              <option value="2">Drink</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
              disabled={!isEditing}
            >
              <option value="">Select Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Information Section Before Checkbox */}
          <div className="alert alert-warning mb-3 mx-2" role="alert">
            <strong>Warning:</strong> Editing this food item can impact the
            system and affect its availability. Please confirm that you're sure
            before proceeding with changes.
          </div>

          <div className="form-check mb-3 mx-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="editCheckbox"
              onChange={() => setIsEditing((prev) => !prev)}
            />
            <label
              className="form-check-label text-white"
              htmlFor="editCheckbox"
            >
              Do you want to edit?
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={!isEditing}
        >
          Save Change
        </button>
        <button
          onClick={() => handleDelete(foodId)}
          className="btn btn-danger mt-4 mx-3 "
        >
          <FaTrash />
          Delete
        </button>

        <button
          onClick={() => navigate("/food")}
          className="btn btn-secondary mt-4  "
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default EditFood;
