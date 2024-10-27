import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup, InputGroup } from 'react-bootstrap';
import '../assets/styles/CreateOrder.css';

const UpdateOrder = ({ show, handleClose, initialItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableItems, setAvailableItems] = useState([
    'Vegetable Mixups', 'Chinese Takeout Dish', 'Pasta', 'Garlic Bread', 
    'Pizza', 'Caesar Salad', 'Sushi', 'Miso Soup', 'Burger', 'Fries', 
    'Tacos', 'Nachos'
  ]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    // Initialize selectedItems based on initialItems prop when the component mounts
    const initialSelectedItems = initialItems.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    setSelectedItems(initialSelectedItems);
  }, [initialItems]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddItem = (item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [item]: (prevItems[item] || 0) + 1 // Increase count or initialize to 1
    }));
  };

  const handleRemoveItem = (item) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[item] > 1) {
        updatedItems[item] -= 1; // Decrement count if more than 1
      } else {
        delete updatedItems[item]; // Remove item if count is 1
      }
      return updatedItems;
    });
  };

  const handleUpdateOrder = () => {
    // Logic to save updated order
    handleClose(); // Close the modal after updating the order
  };

  const filteredItems = availableItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItemsCount = Object.values(selectedItems).reduce((sum, count) => sum + count, 0);

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="custom-create-order-modal">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">Update Order</Modal.Title>
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
          {filteredItems.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="custom-item-list-item"
              onClick={() => handleAddItem(item)}
              action
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="selected-items-title">Selected Items (Total: {totalItemsCount}):</h5>
        <ListGroup className="selected-items-list">
          {Object.entries(selectedItems).map(([item, count], index) => (
            <ListGroup.Item key={index} className="selected-item">
              x{count} {item}
              <Button
                variant="outline-light"
                size="sm"
                className="remove-item-button"
                onClick={() => handleRemoveItem(item)}
              >
                -
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        <Button variant="outline-light" onClick={handleClose} className="modal-cancel-button">
          Cancel
        </Button>
        <Button variant="outline-warning" onClick={handleUpdateOrder} className="modal-create-button">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOrder;
