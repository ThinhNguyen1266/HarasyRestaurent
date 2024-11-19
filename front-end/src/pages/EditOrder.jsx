import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useMenuApi from "../hooks/api/useMenuApi";
import "../assets/styles/MenuOrder.css";
import useAuth from "../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

function EditOrder() {
  const { user } = useAuth();
  const { getMenubyBranchID, getOrderByID, updateOrder } = useMenuApi(); // Ensure updateOrder is in useMenuApi
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [orderNote, setOrderNote] = useState("");
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch order details
  const {
    data: order,
    isLoading: isOrderLoading,
    error: orderError,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderByID(id),
    onError: (error) => {
      toast.error(`Error fetching order: ${error.message}`);
    },
  });

  // Fetch menu data
  const {
    data: menuData,
    isLoading: isMenuLoading,
    error: menuError,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenubyBranchID,
    onError: (error) => {
      toast.error(`Failed to fetch menus: ${error.message}`);
    },
  });

  // Mutation to update order
  const mutation = useMutation({
    mutationFn: ({ id, updatedOrder }) => updateOrder(id, updatedOrder),
    onSuccess: () => {
      toast.success("Order updated successfully!");
      queryClient.invalidateQueries(["order", id]); // Refresh order data
    },
    onError: (error) => {
      toast.error(
        `Failed to update order: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  // Handle search input
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Add food to cart
  const addToCart = (item) => {
    setCartItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  // Remove food from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  // Submit updated order
  const handleUpdateOrder = () => {
    // Map cartItems to creates (newly added items)
    const creates = Object.entries(cartItems)
      .filter(([foodId, quantity]) => {
        return !order.orderItems.some(
          (item) => item.foodId === parseInt(foodId, 10)
        ); // Only create if foodId is not in existing order
      })
      .map(([foodId, quantity]) => ({
        foodId: parseInt(foodId, 10),
        quantity,
      }));

    // Map existing orderItems to updates (items that exist in the order)
    const updates = order.orderItems
      .filter((item) => cartItems[item.foodId]) // Only update if item exists in the cart
      .map((item) => ({
        foodId: item.foodId,
        quantity: cartItems[item.foodId], // Update quantity based on cart item
      }));

    console.log("Creates:", creates);
    console.log("Updates:", updates);

    const updatedOrder = {
      orderItems: {
        creates, // Newly added items
        updates, // Existing order items with updated quantities
      },
      note: orderNote || order.note, // Preserve existing note if no new note is set
    };

    mutation.mutate({ id, updatedOrder });
  };

  // Group menu items by type and filter available foods
  const groupedMenuItems = menuData
    ?.filter((menu) => menu.status === "AVAILABLE")
    .map((menu) => ({
      ...menu,
      foods: menu.foods
        .filter((food) => food.status === "AVAILABLE")
        .sort((a, b) => a.id - b.id),
    }));

  // Filter menu items based on search term
  const filteredMenuItems =
    groupedMenuItems
      ?.flatMap((menu) =>
        menu.foods.map((food) => ({
          ...food,
          menuType: menu.type,
        }))
      )
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  if (isOrderLoading || isMenuLoading) return <p>Loading...</p>;
  if (orderError) return <p>Error fetching order: {orderError.message}</p>;
  if (menuError) return <p>Error fetching menu: {menuError.message}</p>;
  if (!order || !menuData) return <p>No data available</p>;

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="text-white">Edit Order for {user.branchName}</h1>
        </Col>
        <Col md={5}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for a dish..."
              value={searchTerm}
              onChange={handleSearch}
              className="me-2"
            />
            <Button variant="primary">
              <FaSearch />
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          {groupedMenuItems.map((menu) => (
            <div key={menu.id} className="mb-4">
              <h4 className="text-white">{menu.type}</h4>
              <Row>
                {menu.foods.map((item) => (
                  <Col key={item.id} sm={12} md={6}>
                    <div className="menu-item bg-dark text-white rounded d-flex justify-content-between align-items-center p-3">
                      <div>
                        <span className="menu-item-name">{item.name}</span>
                        <br />
                        <small className="text-white">
                          Price: {item.price}
                        </small>
                      </div>
                      <div className="menu-item-actions d-flex align-items-center">
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => addToCart(item)}
                          className="me-2"
                        >
                          Add
                        </Button>
                        {cartItems[item.id] && (
                          <>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </Button>
                            <Badge bg="secondary" className="ms-2">
                              x{cartItems[item.id]}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Col>
        <Col md={4} className="text-white">
          <h2>Order Details</h2>
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>
          <p>
            <strong>Branch:</strong> {order.branch.name}
          </p>
          <p>
            <strong>Staff:</strong> {order.staff.name}
          </p>
          <p>
            <strong>Customer:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Total:</strong> ${order.total}
          </p>
          <p>
            <strong>Note:</strong> {order.note}
          </p>

          <h3>Order Items</h3>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.foodId}>
                <strong>{item.name}</strong> - {item.quantity} x ${item.price} =
                ${item.total}
              </li>
            ))}
          </ul>
          <Form.Group className="mt-4">
            <Form.Label>Order Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="Add a note..."
            />
          </Form.Group>
          <Button
            variant="success"
            className="mt-3"
            onClick={handleUpdateOrder}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Updating..." : "Update Order"}
          </Button>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

export default EditOrder;
