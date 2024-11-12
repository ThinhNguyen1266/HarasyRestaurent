import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup, InputGroup } from "react-bootstrap";
import "../assets/styles/UpdateOrder.css";

const UpdateOrder = ({ show, handleClose, initialItems, initialTable, onUpdateOrder }) => {
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
    const initialSelectedItems = Array.isArray(initialItems)
      ? initialItems.reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {})
      : {};
    setSelectedItems(initialSelectedItems);
    setSelectedTable(initialTable || ""); // Set the initial table value
  }, [initialItems, initialTable]);

  const tableNumbers = Array.from({ length: 10 }, (_, i) => `Table ${i + 1}`);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleAddItem = (item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [item]: (prevItems[item] || 0) + 1,
    }));
  };

  const handleRemoveItem = (item) => {
    const totalItemCount = Object.keys(selectedItems).length;
    if (totalItemCount === 1 && selectedItems[item] === 1) {
      alert("You cannot remove the last item from the order.");
      return;
    }

    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[item] > 1) updatedItems[item] -= 1;
      else delete updatedItems[item];
      return updatedItems;
    });
  };

  const handleUpdateOrder = () => {
    const updatedItems = Object.entries(selectedItems).flatMap(([item, count]) =>
      Array(count).fill(item)
    );

    if (!selectedTable) {
      alert("You must select a table before updating the order.");
      return;
    }

    onUpdateOrder(updatedItems, selectedTable); // Pass updated items and table to onUpdateOrder
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
      dialogClassName="update-order-modal-content"
    >
      <Modal.Header className="update-order-header">
        <Modal.Title className="update-order-title">Update Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="update-order-body">
        <InputGroup className="mb-3 update-order-search">
          <Form.Control
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <ListGroup className="update-order-item-list">
          {filteredItems.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="update-order-item"
              onClick={() => handleAddItem(item)}
              action
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="update-order-selected-title">
          Selected Items (Total: {totalItemsCount}):
        </h5>
        <ListGroup className="update-order-selected-list">
          {Object.entries(selectedItems).map(([item, count], index) => (
            <ListGroup.Item key={index} className="update-order-selected-item">
              x{count} {item}
              <Button
                variant="outline-light"
                size="sm"
                className="update-order-remove-button"
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer className="update-order-footer">
        <Button
          variant="outline-light"
          onClick={handleClose}
          className="update-order-cancel-button"
        >
          Cancel
        </Button>
        <Button
          variant="outline-warning"
          onClick={handleUpdateOrder}
          className="update-order-confirm-button"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOrder;
