import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Card,
  Col,
  Row,
  Alert,
  Container,
  Spinner,
} from "react-bootstrap";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import useFoodAPi from "../hooks/api/useFoodAPi";
import useMenuApi from "../hooks/api/useMenuApi";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AddFoodInMenu = () => {
  const { user } = useAuth(); // Fetch user role
  const { menuId } = useParams();
  const { getFoodlist } = useFoodAPi();
  const { getMenuByID, addFoodToMenu, deleteFoodFromMenu } = useMenuApi();
  const [selectedItemsForDelete, setSelectedItemsForDelete] = useState([]);
  const queryClient = useQueryClient();

  const [selectedFoodIds, setSelectedFoodIds] = useState([]);

  // Fetch food data
  const {
    data: foodData = [],
    isLoading: isFoodsLoading,
    error: foodError,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoodlist,
    onError: (error) =>
      toast.error(`Failed to fetch food data: ${error.message}`),
  });

  const activeFoodData = foodData.filter((item) => item.status === "ACTIVE");

  // Fetch menu data
  const {
    data: menus,
    isLoading: isMenusLoading,
    error: menusError,
  } = useQuery({
    queryKey: ["menus", menuId],
    queryFn: () => getMenuByID(menuId),
    onError: (error) => toast.error(`Failed to fetch menu: ${error.message}`),
  });

  // Handle food selection
  const toggleFoodSelection = (foodId) => {
    setSelectedFoodIds(
      (prevSelected) =>
        prevSelected.includes(foodId)
          ? prevSelected.filter((id) => id !== foodId) // Remove if already selected
          : [...prevSelected, foodId] // Add if not selected
    );
  };

  const toggleMenuItemSelection = (foodId) => {
    setSelectedItemsForDelete(
      (prevSelected) =>
        prevSelected.includes(foodId)
          ? prevSelected.filter((id) => id !== foodId) // Remove if already selected
          : [...prevSelected, foodId] // Add if not selected
    );
  };

  // Submit selected food IDs to the menu
  const handleAddFood = async () => {
    try {
      if (selectedFoodIds.length === 0) {
        toast.warn("Please select at least one food item.");
        return;
      }
      const response = await addFoodToMenu(menuId, selectedFoodIds);
      console.log("selectedFoodIDs", selectedFoodIds);
      toast.success("Food added to menu successfully!");
      setSelectedFoodIds([]);
      queryClient.invalidateQueries(["menus"]);
    } catch (error) {
      toast.error(`Failed to add food to menu: ${error.message}`);
    }
  };

  const handleDeleteMenuItems = async () => {
    try {
      if (selectedItemsForDelete.length === 0) {
        toast.warn("Please select at least one menu item to delete.");
        return;
      }
      await deleteFoodFromMenu(menuId, selectedItemsForDelete);
      toast.success("Selected food items removed from menu!");
      setSelectedItemsForDelete([]);
      queryClient.invalidateQueries(["menus"]);
    } catch (error) {
      toast.error(`Failed to delete menu items: ${error.message}`);
    }
  };

  return (
    <Container className="bg-dark p-5">
      <div className="max-w-4xl mx-auto bg-dark rounded-lg shadow-lg p-6">
        <h1 className="text-center text-white mb-4">Available Food</h1>

        {/* Display error if foodData fetch fails */}
        {foodError && (
          <Alert variant="danger">
            <p>{foodError.message}</p>
          </Alert>
        )}

        {/* Loading State for food data */}
        {isFoodsLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
            <p className="text-white mt-3">Loading food data...</p>
          </div>
        )}

        {/* Food Items List */}
        {user?.role === "ADMIN" && (
          <Row className="g-4">
            {activeFoodData.map((item) => {
              const isAlreadyInMenu = menus?.menuItems?.some(
                (menuItem) => menuItem.foodId === item.id
              );

              return (
                <Col key={item.id} md={4}>
                  <Card className="shadow-lg rounded-lg bg-dark text-light">
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <Card.Title className="text-white">
                            {item.name}
                          </Card.Title>
                          <Card.Text className="mb-2 text-white">
                            {item.categoryName}
                          </Card.Text>
                          <Card.Text>
                            {item.description} -{" "}
                            <span className="text-warning">{item.price}</span>$
                          </Card.Text>
                        </div>

                        {isAlreadyInMenu ? (
                          <Button
                            variant="secondary"
                            disabled
                            className="align-self-start"
                          >
                            Already Selected
                          </Button>
                        ) : (
                          // Only allow selection if user is ADMIN
                          user?.role === "ADMIN" && (
                            <Button
                              variant={
                                selectedFoodIds.includes(item.id)
                                  ? "success"
                                  : "outline-success"
                              }
                              aria-label={`Select ${item.name}`}
                              className="align-self-start"
                              onClick={() => toggleFoodSelection(item.id)}
                            >
                              <FaCheck className="me-2" />
                              {selectedFoodIds.includes(item.id)
                                ? "Selected"
                                : "Select"}
                            </Button>
                          )
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        {/* Add Food to Menu Button */}
        {user?.role === "ADMIN" && (
          <div className="text-center mt-4">
            <Button
              variant="primary"
              onClick={handleAddFood}
              disabled={selectedFoodIds.length === 0}
            >
              <FaPlus className="me-2" />
              Add Selected Food to Menu
            </Button>
          </div>
        )}
      </div>

      {/* Menu Details Section */}
      {menusError && (
        <Alert variant="danger">
          <p>{menusError.message}</p>
        </Alert>
      )}

      {isMenusLoading && (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="light" />
          <p className="text-white mt-3">Loading menu details...</p>
        </div>
      )}

      {menus && Array.isArray(menus.menuItems) && !isMenusLoading && (
        <div className="mt-5">
          <Card className="shadow-lg rounded-lg bg-dark text-light">
            <Card.Body>
              <Card.Title className="text-center text-primary">
                Menu Details # {menus.id}
              </Card.Title>
              <p>
                <strong>Type:</strong> {menus.type}
              </p>

              {/* Styled Menu Items List */}
              <h3 className="mb-3">Menu Items</h3>
              <Row className="g-3">
                {menus.menuItems.map((item) => (
                  <Col key={item.foodId} md={3}>
                    <Card className="text-center bg-info text-white">
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>

                        {/* Only show delete button for ADMIN */}
                        {user?.role === "ADMIN" && (
                          <Button
                            variant={
                              selectedItemsForDelete.includes(item.foodId)
                                ? "danger"
                                : "outline-danger"
                            }
                            className="mt-2"
                            onClick={() => toggleMenuItemSelection(item.foodId)}
                          >
                            <FaTrash className="me-2" />
                            {selectedItemsForDelete.includes(item.foodId)
                              ? "Selected"
                              : "Select to Delete"}
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Only show delete button for ADMIN */}
      {user?.role === "ADMIN" && (
        <div className="text-center mt-4">
          <Button
            variant="danger"
            onClick={handleDeleteMenuItems}
            disabled={selectedItemsForDelete.length === 0}
          >
            <FaTrash className="me-2" />
            Delete Selected Menu Items
          </Button>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default AddFoodInMenu;
