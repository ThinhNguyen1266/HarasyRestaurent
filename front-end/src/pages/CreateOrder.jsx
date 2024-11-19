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
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useMenuApi from "../hooks/api/useMenuApi";

import "../assets/styles/MenuOrder.css";
import useAuth from "../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

function CreateMenu() {
  const { user } = useAuth();
  const { getMenubyBranchID, createOrder, getCustomerProfileByPhone } =
    useMenuApi();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [orderNote, setOrderNote] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [email, setEmail] = useState(""); // State for email input
  const [fullName, setFullName] = useState(""); // State for fullName input
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Receive the table IDs passed from the TableList page
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
      // Fetch customer profile by phone
      const response = await getCustomerProfileByPhone(customerPhone);

      if (response && response.length > 0) {
        const customer = response[0]; // Assuming the first result is the desired customer
        setCustomerId(customer.customerId);
        setIsNewCustomer(false);
        toast.success(`Customer found: ${customer.fullName}`);
      } else {
        toast.warning("No customer found with the given phone number.");
        setIsNewCustomer(true);
        console.log("isnewcus: ", isNewCustomer);
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
    setCartItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
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

  const handleNoteChange = (e) => {
    setOrderNote(e.target.value);
  };

  // Filter and group menu items by type and sort foods by ID
  const groupedMenuItems = menuData
    ?.filter((menu) => menu.status === "AVAILABLE") // Filter available menus
    .map((menu) => ({
      ...menu,
      foods: menu.menuItems
        .filter((food) => food.status === "AVAILABLE") // Filter available foods
        .sort((a, b) => a.id - b.id), // Sort foods by id
    }));

  const filteredMenuItems =
    groupedMenuItems
      ?.flatMap((menu) =>
        menu.menuItems.map((food) => ({
          ...food,
          menuType: menu.type, // Add menu type to food
        }))
      )
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []; // Ensure it returns an empty array if no data

  const totalItems = Object.values(cartItems).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const goToSelectTable = () => {
    // Pass the order details and table IDs to the next step
    navigate("/selecttable", { state: { tableIds, cartItems, orderNote } });
  };

  //call api create order
  const saveOrderMutate = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create order: ${error.message}`);
    },
  });

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
      updates: [], // Add any updates logic if needed
    };

    const orderData = {
      branchId: user.branchId,
      tableIds: tableIds,
      staffId: user.id, // Assuming staffId is available from `user`
      customer: customerData,
      orderItems,
      note: orderNote,
    };

    saveOrderMutate.mutate(orderData);
    console.log("orderData: ", JSON.stringify(orderData, null, 2));
  };

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
              {/* Menu Type as h3 */}
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

        <Col md={4}>
          <div className="bg-dark text-white p-4 rounded">
            <h4 className="mb-3">Confirm Order</h4>
            <div className="mb-3">
              <label className="form-label text-white">Customer Phone: </label>
              <input
                type="text"
                name="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="form-control"
                required
              />
              <Button
                variant="outline-primary"
                className="mt-2"
                onClick={handleCustomerSearch}
              >
                <FaSearch /> Search
              </Button>
            </div>
            {isNewCustomer && (
              <div className="mb-3">
                <label className="form-label text-white">Email: </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
                <label className="form-label text-white">Full Name: </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            )}
            {!isNewCustomer && (
              <p className="text-white">Customer ID: {customerId}</p>
            )}
            <p className="text-white">Selected Tables: {tableIds.join(", ")}</p>
            {totalItems > 0 ? (
              <ListGroup variant="flush">
                {Object.entries(cartItems).map(([itemId, quantity]) => {
                  const item = filteredMenuItems.find(
                    (item) => item.id === parseInt(itemId)
                  );
                  return (
                    <ListGroup.Item
                      key={itemId}
                      className="d-flex justify-content-between align-items-center bg-dark text-white border-0 py-2 px-3 mb-2 rounded shadow-sm"
                      style={{ border: "1px solid #444" }}
                    >
                      <div>
                        <FaCheckCircle className="text-success me-2" />
                        <span>{item.name}</span> <br />
                        <small className="text-white">
                          Price: {item.price}
                        </small>
                      </div>
                      <Badge bg="info" pill>
                        x{quantity}
                      </Badge>
                    </ListGroup.Item>
                  );
                })}

                <Form.Group className="mt-3">
                  <Form.Label className="text-white">Order Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={orderNote}
                    onChange={handleNoteChange}
                    placeholder="Add any special instructions for your order"
                  />
                </Form.Group>
                <Button
                  variant="success"
                  className="mt-3 w-100"
                  onClick={handleConfirmOrder}
                >
                  Confirm
                </Button>
              </ListGroup>
            ) : (
              <p className="text-white">No items selected</p>
            )}
          </div>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

export default CreateMenu;
