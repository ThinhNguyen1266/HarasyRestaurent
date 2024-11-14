import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/Sidebar";
import ViewOrderDetail from "../components/ViewOrderDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/OrderReceipt.css";

function OrderReceipt() {
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [currentOrderItems, setCurrentOrderItems] = useState([]);
  const [currentTable, setCurrentTable] = useState(""); // Added for table
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: 351,
      date: "05 Feb 2023",
      time: "08:38 PM",
      table: "Table 1",
      items: [
        "Vegetable Mixups",
        "Chinese Takeout Dish",
        "Pasta",
        "Garlic Bread",
        "Pizza",
        "Caesar Salad",
        "Sushi",
        "Miso Soup",
      ],
      details: [
        "Vegetable Fritters with Egg",
        "Fresh Prawn mix salad",
        "Tomato Basil Pasta",
        "Garlic Bread with Cheese",
        "Pepperoni Pizza",
        "Caesar Salad with Dressing",
        "Salmon Nigiri",
        "Traditional Miso Soup",
      ],
      price: "3,500,000",
    },
    // Other orders...
  ]);

  const handleConfirm = () => {
    const isConfirmed = window.confirm("Are you sure you want to confirm the order payment?");
  };

  const handleShowOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleCloseOrderDetail = () => setShowOrderDetail(false);

  return (
    <div className="order-receipt-d-flex">
      <Sidebar />
      <div className="order-receipt-main-content">
        <div className="order-receipt-page">
          <div className="order-receipt-header-row">
            <h1 className="order-receipt-title">View Orders</h1>
          </div>
          <div className="order-receipt-button-row"></div>
          <div className="order-receipt-list">
            {orders.map((order, index) => (
              <Card
                key={index}
                className="order-receipt-card"
                onClick={() => handleShowOrderDetail(order)}
              >
                <Card.Header className="order-receipt-header">
                  Order {order.id}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {order.time}, {order.date}
                  </Card.Text>
                  <Card.Text className="order-receipt-table">
                    {order.table}
                  </Card.Text>
                  <div className="order-receipt-items-container">
                    {(Array.isArray(order.items) ? order.items : []).map(
                      (item, idx) => (
                        <div key={idx} className="order-receipt-item">
                          <span className="order-receipt-item-name">{item}</span>
                          <span className="order-receipt-item-details">
                            {order.details[idx]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <Card.Footer>
                    <div className="order-receipt-footer-content">
                      <div className="order-receipt-item-count">
                        x{order.items ? order.items.length : 0} items
                      </div>
                      <div className="order-receipt-total-price">
                        Total: {order.price}
                      </div>
                    </div>
                    <Button
                      variant="warning"
                      className="order-receipt-update-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirm();
                      }}
                    >
                      Payment Confirm
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ViewOrderDetail
        show={showOrderDetail}
        handleClose={handleCloseOrderDetail}
        order={selectedOrder}
      />
    </div>
  );
}

export default OrderReceipt;
