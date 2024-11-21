import React, { useEffect, useState } from "react";
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
  const { getMenubyBranchID, getOrderByID, updateOrder } = useMenuApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [orderNote, setOrderNote] = useState("");
  const [status, setSatus] = useState("");
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

  useEffect(() => {
    if (order) {
      setOrderNote(order.note || ""); // Set note from order to orderNote
    }
  }, [order]);

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
      queryClient.invalidateQueries(["order", id]);
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

  const addToCart = (item, quantity = 1) => {
    console.log("itemid", item.foodId); // Log foodId, not id
    setCartItems((prev) => ({
      ...prev,
      [item.foodId]: getCurrentQuantity(item.foodId) + quantity, // Use foodId as the key
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      const currentQuantity = getCurrentQuantity(itemId);

      if (currentQuantity > 1) {
        updatedCart[itemId] = currentQuantity - 1;
      } else {
        delete updatedCart[itemId];
      }

      return updatedCart;
    });
  };

  const getCurrentQuantity = (itemId) => {
    return (
      cartItems[itemId] ||
      order.orderItems.find((item) => item.foodId === itemId)?.quantity ||
      0
    );
  };

  // Submit updated order
  const handleUpdateOrder = () => {
    const validStatuses = ["PENDING", "COOKED"]; // Các trạng thái hợp lệ

    const creates = Object.entries(cartItems)
      .filter(([foodId, quantity]) => {
        return (
          !order.orderItems.some(
            (item) => item.foodId === parseInt(foodId, 10)
          ) && quantity > 0 // Chỉ thêm nếu quantity > 0
        );
      })
      .map(([foodId, quantity]) => ({
        foodId: parseInt(foodId, 10),
        quantity,
        status: "PENDING", // Mặc định là PENDING khi thêm mới
      }));

    const updates = order.orderItems
      .filter((item) => cartItems[item.foodId] !== undefined)
      .map((item) => ({
        foodId: item.foodId,
        quantity: cartItems[item.foodId],
        status: validStatuses.includes(item.status) ? item.status : "PENDING",
      }));

    const updatedOrder = {
      orderItems: {
        creates,
        updates,
      },
      note: orderNote,
    };

    mutation.mutate({ id, updatedOrder });
  };

  const updateItemStatus = (foodId, newStatus) => {
    setCartItems((prev) => ({
      ...prev,
      [foodId]: {
        ...prev[foodId],
        status: newStatus,
      },
    }));
  };
  const selectedItems = order?.orderItems.map((item) => ({
    ...item,
    totalPrice: item.price * (cartItems[item.foodId] || item.quantity),
    quantity: cartItems[item.foodId] || item.quantity,
  }));

  const groupedMenuItems = menuData
    ?.filter((menu) => menu.status === "AVAILABLE")
    .map((menu) => ({
      ...menu,
      foods: menu.menuItems
        .filter((food) => food.status === "AVAILABLE")
        .sort((a, b) => a.id - b.id),
    }));

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
                  <Col key={item.foodId} sm={12} md={6}>
                    <div className="menu-item bg-dark text-white rounded d-flex justify-content-between align-items-center p-3">
                      <div>
                        <span className="menu-item-name">{item.name}</span>
                        <br />
                        <small className="text-white">
                          Price: {item.price}
                        </small>
                      </div>
                      <div className="menu-item-actions d-flex align-items-center">
                        {!selectedItems.some(
                          (selectedItem) => selectedItem.foodId === item.foodId
                        ) && (
                          <>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => addToCart(item)}
                              className="mx-2"
                            >
                              Add
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeFromCart(item)}
                              className="mx-2"
                            >
                              Remove
                            </Button>
                          </>
                        )}
                        <Badge bg="primary" className="mx-2">
                          x{getCurrentQuantity(item.foodId)}
                        </Badge>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Col>
        <Col md={4} className="text-white">
          <h2>Order Details # {order.id}</h2>
          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>
          <p>
            <strong>
              Tables: {order.tables.map((t) => t.number).join(", ")}{" "}
            </strong>
          </p>
          <p>
            <strong>Staff:</strong> {order.staff.name}
          </p>
          <p>
            <strong>Customer:</strong> {order.customer.name}
          </p>

          <h3>Selected Items</h3>
          <ListGroup>
            {selectedItems.map((item) => (
              <ListGroup.Item
                key={item.foodId}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.foodId)}
                      disabled={item.quantity === 1} // Ngăn giảm về dưới 1
                      className="me-2"
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10) || 1;
                        addToCart(item, newQuantity - item.quantity); // Cập nhật chênh lệch
                      }}
                      style={{ width: "60px", textAlign: "center" }}
                    />
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => addToCart(item)}
                      className="ms-2"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>${item.totalPrice.toFixed(2)}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Form.Group className="mt-4">
            <Form.Label>Order Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)} // Cập nhật orderNote khi nhập
              placeholder="Add a note..."
            />
          </Form.Group>
          <Button
            variant="success"
            className="mt-3"
            onClick={handleUpdateOrder}
          >
            Update Order
          </Button>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
}

export default EditOrder;
