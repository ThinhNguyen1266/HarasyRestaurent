import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiX, FiPlus } from "react-icons/fi";

const FoodManagementPage = () => {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs",
      category: "Seafood",
      image: "images.unsplash.com/photo-1567121938596-6d9d9686f0e7",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      description: "Classic Italian pizza with fresh basil",
      category: "Italian",
      image: "images.unsplash.com/photo-1585238342024-78d387f4a707",
    },
    {
      id: 3,
      name: "Chicken Curry",
      description: "Spicy Indian curry with tender chicken",
      category: "Indian",
      image: "images.unsplash.com/photo-1565557623262-b51c2513a641",
    },
  ]);

  const [categories] = useState([
    "All",
    "Seafood",
    "Italian",
    "Indian",
    "Mexican",
    "Asian",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingFood) {
      setFormData(editingFood);
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        image: "",
      });
    }
  }, [editingFood]);

  const handleAddEdit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.description)
      validationErrors.description = "Description is required";
    if (!formData.category) validationErrors.category = "Category is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingFood) {
      setFoods(
        foods.map((food) =>
          food.id === editingFood.id
            ? { ...formData, id: editingFood.id }
            : food
        )
      );
    } else {
      setFoods([...foods, { ...formData, id: Date.now() }]);
    }

    setIsModalOpen(false);
    setEditingFood(null);
    setFormData({ name: "", description: "", category: "", image: "" });
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setFoods(foods.filter((food) => food.id !== id));
    }
  };

  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;
    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Food Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Add new food item"
          >
            <FiPlus className="mr-2" /> Add New Food
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search foods"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
                transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={`https://${food.image}`}
                alt={food.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1495195134817-aeb325a55b65";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {food.name}
                </h3>
                <p className="text-gray-600 mb-2">{food.description}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {food.category}
                </span>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingFood(food);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    aria-label={`Edit ${food.name}`}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(food.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    aria-label={`Delete ${food.name}`}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {editingFood ? "Edit" : "Add"} Food Item
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingFood(null);
                    setErrors({});
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <FiX />
                </button>
              </div>
              <form onSubmit={handleAddEdit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    rows="3"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories
                      .filter((cat) => cat !== "All")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="image">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter image URL"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingFood ? "Update" : "Add"} Food Item
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodManagementPage;
