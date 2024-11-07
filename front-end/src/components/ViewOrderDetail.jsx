import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import "../assets/styles/ViewOrderDetail.css";

const ViewOrderDetail = ({ show, handleClose, order }) => {
  if (!order) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="large-view-order-modal custom-view-order-modal"
    >
      <Modal.Header className="view-order-header">
        <Modal.Title className="view-order-title">Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="view-order-body">
        <div className="view-order-info">
          <p className="view-order-date-time">
            <strong>Date:</strong> {order.date}
            <br />
            <strong>Time:</strong> {order.time}
            <br />
            <strong>Table:</strong> {order.table} {/* Added table number */}
          </p>
          <p className="view-order-item-count">Total Items: {order.items.length}</p>
        </div>
        <ListGroup variant="flush" className="view-order-items-list">
          {order.items.map((item, idx) => (
            <ListGroup.Item key={idx} className="view-order-item">
              <div className="view-order-item-info">
                <span className="view-order-item-name">{item}</span>
                <span className="view-order-item-description">
                  {order.details[idx] || "No description available"}
                </span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer className="view-order-footer">
        <Button
          variant="outline-light"
          onClick={handleClose}
          className="view-order-close-button"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewOrderDetail;
