import React, { useState } from "react";
import {
  Button,
  InputGroup,
  Row,
  Col,
  Container,
  Form,
  Table,
} from "react-bootstrap";

import useFoodApi from "../hooks/api/useFoodAPi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";

const FoodManagementPage = () => {
  const { getFoodlist } = useFoodApi();
  const navigate = useNavigate();
  const handleAddFood = () => {
    navigate("/food/create");
  };

  const handleEditFood = (foodId) => {
    navigate(`/food/${foodId}`); // Correct template literal usage
  };

  const {
    data: foodData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoodlist,
    onError: (error) => {
      console.error(`Failed to fetch food data: ${error.message}`);
    },
  });

  const [categories] = useState([
    "All",
    "Main Course",
    "Drink",
    "Mexican",
    "Asian",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFoods = foodData.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" || food.categoryName === selectedCategory;
    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container className="food-management-page__container">
      {/* Header */}
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h1 className="text-white text-bold">Food Management</h1>
        </Col>
        <Col>
          <button
            onClick={handleAddFood}
            className="btn d-flex align-items-center"
            style={{ backgroundColor: "#ff6600", color: "white" }}
          >
            <FaPlus className="me-2" />
            Add New Food
          </button>
        </Col>
      </Row>

      {/* Search and Category Filter */}
      <Row className="food-management-page__search-group mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col className="d-flex flex-wrap gap-2 food-management-page__category-buttons">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category
                  ? "secondary"
                  : "outline-secondary"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Col>
      </Row>

      {/* Display food in a responsive table */}
      <div className="table-responsive">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Image</th>
              <th>Food Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3">Loading foods...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3">Error fetching foods: {error.message}</td>
              </tr>
            ) : (
              filteredFoods.map((food) => (
                <tr
                  key={food.id}
                  onClick={() => handleEditFood(food.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td className="text-center">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="food-management-page__table-img"
                      style={{
                        borderRadius: "8px",
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{food.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        food.status === "ACTIVE" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {food.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default FoodManagementPage;
