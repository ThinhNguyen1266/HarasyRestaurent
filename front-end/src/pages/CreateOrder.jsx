// CreateMenu.jsx
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
import "../assets/styles/MenuOrder.css";

function CreateMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [orderNote, setOrderNote] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Receive the table IDs passed from the TableList page
  const tableIds = location.state?.tableIds || [];

  const menuItems = [
    { id: 1, name: "Caesar Salad" },
    { id: 2, name: "Bruschetta" },
    { id: 3, name: "Grilled Chicken Sandwich" },
    { id: 4, name: "Pasta Primavera" },
    { id: 5, name: "Lobster Risotto" },
    { id: 6, name: "Seared Foie Gras" },
    { id: 7, name: "Steak Tartare" },
    { id: 8, name: "Beef Wellington" },
    { id: 9, name: "Crispy Skin Salmon" },
    { id: 10, name: "Filet Mignon" },
    { id: 11, name: "Amuse-Bouche" },
    { id: 12, name: "Duck Confit" },
    { id: 13, name: "Margarita" },
    { id: 14, name: "Old Fashioned" },
    { id: 15, name: "Chardonnay" },
    { id: 16, name: "Cabernet Sauvignon" },
    { id: 17, name: "Chocolate Cake" },
    { id: 18, name: "Creme Brulee" },
  ];

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

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = Object.values(cartItems).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const goToSelectTable = () => {
    // Pass the order details and table IDs to the next step
    navigate("/selecttable", { state: { tableIds, cartItems, orderNote } });
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="text-white">Menu of Ha Noi</h1>
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
          <Row>
            {filteredMenuItems.map((item) => (
              <Col key={item.id} sm={12} md={6}>
                <div className="menu-item bg-dark text-white rounded d-flex justify-content-between align-items-center p-3">
                  <span className="menu-item-name">{item.name}</span>
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
        </Col>

        <Col md={4}>
          <div className="bg-dark text-white p-4 rounded">
            <h4 className="mb-3">Confirm Order</h4>
            {totalItems > 0 ? (
              <ListGroup variant="flush">
                {Object.entries(cartItems).map(([itemId, quantity]) => {
                  const item = menuItems.find(
                    (item) => item.id === parseInt(itemId)
                  );
                  return (
                    <ListGroup.Item
                      key={itemId}
                      className="d-flex justify-content-between align-items-center bg-dark text-white border-0 py-2 px-3 mb-2 rounded shadow-sm"
                      style={{ border: "1px solid #444" }}
                    >
                      <div className="d-flex align-items-center">
                        <FaCheckCircle className="text-success me-2" />
                        <span>{item.name}</span>
                      </div>
                      <Badge bg="info" pill>
                        x{quantity}
                      </Badge>
                    </ListGroup.Item>
                  );
                })}
                <p className="text-white">
                  Selected Tables: {tableIds.join(", ")}
                </p>
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
                  onClick={goToSelectTable}
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
    </Container>
  );
}

export default CreateMenu;
