import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Card,
} from "react-bootstrap";
import { FaCheckCircle, FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useMenuApi from "../hooks/api/useMenuApi";
import "../assets/styles/MenuOrder.css";
import useAuth from "../hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

function CreateMenu() {
  const { user } = useAuth();
  const { getMenubyBranchID, createOrder, getCustomerProfileByPhone } =
    useMenuApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [orderNote, setOrderNote] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const tableIds = location.state?.tableIds || [];

  const {
    data: menuData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenubyBranchID,
    onError: (error) => {
      console.error(`Failed to fetch menus: ${error.message}`);
    },
  });

  const handleCustomerSearch = async () => {
    if (!customerPhone) {
      toast.error("Please enter a phone number to search.");
      return;
    }

    try {
      const response = await getCustomerProfileByPhone(customerPhone);
      if (response && response.length > 0) {
        const customer = response[0];
        setCustomerId(customer.customerId);
        setIsNewCustomer(false);
        toast.success(`Customer found: ${customer.fullName}`);
      } else {
        toast.warning("No customer found with the given phone number.");
        setIsNewCustomer(true);
      }
    } catch (error) {
      toast.error("Error fetching customer profile.");
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToCart = (item) => {
    const foodId = item.foodId; // Use foodId here instead of item.id
    setCartItems((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
  };

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

  const groupedMenuItems = menuData
    ?.filter((menu) => menu.status === "AVAILABLE")
    .map((menu) => ({
      ...menu,
      foods: menu.menuItems
        .filter((food) => food.status === "AVAILABLE")
        .sort((a, b) => a.foodId - b.foodId), // Use foodId here if necessary
    }));

  const filteredMenuItems =
    groupedMenuItems
      ?.flatMap((menu) =>
        menu.menuItems.map((food) => ({
          ...food,
          menuType: menu.type,
        }))
      )
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  const handleConfirmOrder = () => {
    if (!Object.keys(cartItems).length) {
      alert("Your cart is empty!");
      return;
    }

    const customerData = isNewCustomer
      ? {
          newCustomer: {
            email: email,
            fullName: fullName,
          },
        }
      : {
          customerId: customerId,
        };

    const orderItems = {
      creates: Object.entries(cartItems).map(([foodId, quantity]) => ({
        foodId: parseInt(foodId, 10),
        quantity,
      })),
      updates: [],
    };

    const orderData = {
      branchId: user.branchId,
      tableIds: tableIds,
      staffId: user.id,
      customer: customerData,
      orderItems,
      note: orderNote,
    };

    saveOrderMutate.mutate(orderData);
    console.log("orderData: ", JSON.stringify(orderData, null, 2));
  };

  const saveOrderMutate = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create order: ${error.message}`);
    },
  });

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error.message}</p>;
  if (!menuData) return <p className="text-white">No data available</p>;

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="text-white">Menu of {user.branchName}</h1>
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
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => addToCart(item)}
                          className="me-2"
                        >
                          Add
                        </Button>
                        {cartItems[item.foodId] && (
                          <>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeFromCart(item.foodId)}
                            >
                              Remove
                            </Button>
                            <Badge bg="secondary" className="ms-2">
                              x{cartItems[item.foodId]}
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

        <Col md={4}>
          <div className="bg-dark text-white p-4 rounded">
            <h4 className="mb-3">Confirm Order</h4>
            <Form.Group className="mb-3">
              <Form.Label>Customer Phone</Form.Label>
              <Form.Control
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              <Button
                variant="outline-primary"
                className="mt-2"
                onClick={handleCustomerSearch}
              >
                <FaSearch /> Search
              </Button>
            </Form.Group>
            <strong>CustomerID: {customerId}</strong>

            {isNewCustomer && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
            {Object.entries(cartItems).length > 0 ? (
              Object.entries(cartItems).map(([foodId, quantity]) => {
                const foodItem = filteredMenuItems.find(
                  (item) => item.foodId === parseInt(foodId)
                );
                return foodItem ? (
                  <Card key={foodId} className="mb-3 text-white">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <Card.Title className="mb-0">
                          {foodItem.name}
                        </Card.Title>
                        <span className="ms-2">(x{quantity})</span>
                      </div>
                      <div>
                        <FaCheckCircle className="text-success fs-3" />
                      </div>
                    </Card.Body>
                  </Card>
                ) : null;
              })
            ) : (
              <p>Your cart is empty.</p>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Order Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" onClick={handleConfirmOrder}>
              Confirm Order
            </Button>
          </div>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

export default CreateMenu;
