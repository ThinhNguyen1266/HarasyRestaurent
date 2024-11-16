import React, { useState } from "react";
import uploadImage from "../services/uploadImage";
import { toast, ToastContainer } from "react-toastify";
import useFoodApi from "../hooks/api/useFoodAPi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Form, Button, Col, Row, Image, Container } from "react-bootstrap";
const CreateFood = () => {
  const navigate = useNavigate();
  const { createFood } = useFoodApi();
  const uploadImageMutate = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      toast.success("Image uploaded successfully!");
      handleCreateFood(data);
    },
    onError: (error) => {
      toast.error(`Failed to upload image: ${error.message}`);
    },
  });
  const saveFoodMutate = useMutation({
    mutationFn: createFood,
    onSuccess: () => {
      toast.success("Food created successfully!");
      navigate("/food");
    },
    onError: (error) => {
      toast.error(`Failed to create food: ${error.message}`);
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: null,
    price: "",
    pointsPrice: "",
    categoryId: "",
  });
  const [previewUrl, setPreviewUrl] = useState(null);

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

  const handleCreateFood = (imageUrl) => {
    const payload = {
      name: formData.name,
      description: formData.description,
      image: imageUrl,
      price: formData.price,
      categoryId: formData.categoryId,
      pointsPrice: formData.pointsPrice,
    };
    console.log("data", payload);
    saveFoodMutate.mutate(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.imageFile) {
      uploadImageMutate.mutate(formData.imageFile);
    } else {
      handleCreateFood("");
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-white">Create New Food</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Column 1 */}

          <div className="mb-3">
            <label className="form-label text-white">Food Name</label>
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
            <label className="form-label text-white">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-control"
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
            >
              <option value="">Select Category</option>
              <option value="1">Main Course</option>
              <option value="2">Drink</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Create Branch
        </button>
        <ToastContainer position="top-right" autoClose={3000} />
      </form>
    </div>
  );
};

export default CreateFood;
