import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/Sidebar";
import CreateOrder from "../components/CreateOder";
import UpdateOrder from "../components/UpdateOrder";
import ViewOrderDetail from "../components/ViewOrderDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/OrderReceipt.css";

function OrderReceipt() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showUpdateOrder, setShowUpdateOrder] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [currentOrderItems, setCurrentOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCloseCreateOrder = () => setShowCreateOrder(false);
  const handleCloseUpdateOrder = () => setShowUpdateOrder(false);
  const handleCloseOrderDetail = () => setShowOrderDetail(false);

  const orders = [
    // Order data...
  ];

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  return (
    <div className="order-receipt-d-flex">
      <Sidebar />
      <div className="order-receipt-main-content">
        <div className="order-receipt-page">
          <div className="order-receipt-header-row">
            <h1 className="order-receipt-title">View Orders</h1>
          </div>
          <div className="order-receipt-list">
            {orders.map((order, index) => (
              <Card
                key={index}
                className="order-receipt-card"
                onClick={() => handleCardClick(order)}
              >
                <Card.Header className="order-receipt-header">
                  Order {order.id}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {order.date}, {order.time}
                  </Card.Text>
                  <div className="order-receipt-items-container">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-receipt-item">
                        <span className="order-receipt-item-name">{item}</span>
                        <span className="order-receipt-item-details">
                          {order.details[idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Card.Footer>
                    <div className="order-receipt-item-count">
                      x{order.items.length} items
                    </div>
                    <Button
                      variant="success"
                      className="order-receipt-complete-button"
                    >
                      Complete
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <CreateOrder show={showCreateOrder} handleClose={handleCloseCreateOrder} />
      <UpdateOrder
        show={showUpdateOrder}
        handleClose={handleCloseUpdateOrder}
        initialItems={currentOrderItems}
      />
      {selectedOrder && (
        <ViewOrderDetail
          show={showOrderDetail}
          handleClose={handleCloseOrderDetail}
          order={selectedOrder}
        />
      )}
    </div>
  );
}

export default OrderReceipt;
