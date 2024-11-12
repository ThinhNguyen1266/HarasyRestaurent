import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup, InputGroup } from "react-bootstrap";
import "../assets/styles/CreateOrder.css";

const CreateOrder = ({ show, handleClose, onCreateOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availableItems] = useState([
    "Vegetable Mixups",
    "Chinese Takeout Dish",
    "Pasta",
    "Garlic Bread",
    "Pizza",
    "Caesar Salad",
    "Sushi",
    "Miso Soup",
    "Burger",
    "Fries",
    "Tacos",
    "Nachos",
  ]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    if (!show) {
      setSelectedItems({});
      setSelectedTable("");
      setSearchTerm("");
    }
  }, [show]);

  const tableNumbers = Array.from({ length: 10 }, (_, i) => `Table ${i + 1}`);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleAddItem = (item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [item]: (prevItems[item] || 0) + 1,
    }));
  };

  const handleRemoveItem = (item) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[item] > 1) updatedItems[item] -= 1;
      else delete updatedItems[item];
      return updatedItems;
    });
  };

  const handleCreateOrder = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert("You cannot create an order with no items.");
      return;
    }

    if (!selectedTable) {
      alert("You must select a table before creating an order.");
      return;
    }

    const newOrder = {
      id: Math.floor(Math.random() * 1000) + 1,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      table: selectedTable, // Include table number
      items: Object.keys(selectedItems),
      details: Object.keys(selectedItems).map((item) => `${item} Details`),
    };

    onCreateOrder(newOrder);
    setSelectedItems({});
    setSelectedTable("");
    handleClose();
  };

  const filteredItems = availableItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItemsCount = Object.values(selectedItems).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="create-order-modal-content"
    >
      <Modal.Header className="create-order-header">
        <Modal.Title className="create-order-title">Create New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="create-order-body">
        <InputGroup className="mb-3 create-order-search">
          <Form.Control
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <ListGroup className="create-order-item-list">
          {filteredItems.map((item) => (
            <ListGroup.Item
              key={item}
              className="create-order-item"
              onClick={() => handleAddItem(item)}
              action
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="create-order-selected-title">
          Selected Items (Total: {totalItemsCount}):
        </h5>
        <ListGroup className="create-order-selected-list">
          {Object.entries(selectedItems).map(([item, count]) => (
            <ListGroup.Item key={item} className="create-order-selected-item">
              x{count} {item}
              <Button
                variant="outline-light"
                size="sm"
                className="create-order-remove-button"
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Group className="create-order-table-dropdown">
          <Form.Label>Select Table Number</Form.Label>
          <Form.Select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="">Choose a table</option>
            {tableNumbers.map((table, index) => (
              <option key={index} value={table}>
                {table}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="create-order-footer">
        <Button
          variant="outline-light"
          onClick={handleClose}
          className="create-order-cancel-button"
        >
          Cancel
        </Button>
        <Button
          variant="outline-warning"
          onClick={handleCreateOrder}
          className="create-order-confirm-button"
        >
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateOrder;
