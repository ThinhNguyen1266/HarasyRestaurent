import React, { useState } from "react";
import { Modal, Button, Form, ListGroup, InputGroup } from "react-bootstrap";
import "../assets/styles/CreateOrder.css";

const CreateOrder = ({ show, handleClose }) => {
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

  // Constant for table numbers
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

  const handleCreateOrder = () => handleClose();

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
      dialogClassName="custom-create-order-modal"
    >
      <Modal.Header className="modal-header-custom">
        <Modal.Title className="modal-title-custom">Create New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <InputGroup className="mb-3 custom-search">
          <Form.Control
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <ListGroup className="custom-item-list">
          {filteredItems.map((item) => (
            <ListGroup.Item
              key={item}
              className="custom-item-list-item"
              onClick={() => handleAddItem(item)}
              action
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="selected-items-title">
          Selected Items (Total: {totalItemsCount}):
        </h5>
        <ListGroup className="selected-items-list">
          {Object.entries(selectedItems).map(([item, count]) => (
            <ListGroup.Item key={item} className="selected-item">
              x{count} {item}
              <Button
                variant="outline-light"
                size="sm"
                className="remove-item-button"
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {/* Dropdown for Table Selection */}
        <Form.Group className="table-dropdown">
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
      <Modal.Footer className="modal-footer-custom">
        <Button
          variant="outline-light"
          onClick={handleClose}
          className="modal-cancel-button"
        >
          Cancel
        </Button>
        <Button
          variant="outline-warning"
          onClick={handleCreateOrder}
          className="modal-create-button"
        >
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateOrder;
    