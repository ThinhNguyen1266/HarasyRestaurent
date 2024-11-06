import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/Sidebar";
import CreateOrder from "../components/CreateOder";
import UpdateOrder from "../components/UpdateOrder";
import ViewOrderDetail from "../components/ViewOrderDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/OrderWaiter.css";

function OrderWaiter() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showUpdateOrder, setShowUpdateOrder] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [currentOrderItems, setCurrentOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: 351,
      date: "05 Feb 2023",
      time: "08:38 PM",
      table: "Table 1", // Added table information
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
    },
    // Other orders...
  ]);

  const handleShowCreateOrder = () => setShowCreateOrder(true);
  const handleCloseCreateOrder = () => setShowCreateOrder(false);

  const handleShowUpdateOrder = (items) => {
    setCurrentOrderItems(Array.isArray(items) ? items : []);
    setShowUpdateOrder(true);
  };

  const handleCloseUpdateOrder = () => setShowUpdateOrder(false);

  const handleShowOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleCloseOrderDetail = () => setShowOrderDetail(false);

  const handleCreateOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    handleCloseCreateOrder();
  };

  const handleUpdateOrder = (updatedItems) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.items === currentOrderItems ? { ...order, items: updatedItems } : order
      )
    );
    handleCloseUpdateOrder();
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content">
        <div className="order-page">
          <div className="header-row">
            <h1>View Orders</h1>
          </div>
          <div className="button-row">
            <Button
              className="create-order-button"
              onClick={handleShowCreateOrder}
            >
              Create Order
            </Button>
          </div>
          <div className="order-list">
            {orders.map((order, index) => (
              <Card
                key={index}
                className="order-card"
                onClick={() => handleShowOrderDetail(order)}
              >
                <Card.Header className="order-header">
                  Order {order.id}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {order.date}, {order.time}
                  </Card.Text>
                  <Card.Text className="order-table">
                    {order.table} {/* Display table number */}
                  </Card.Text>
                  <div className="order-items-container">
                    {(Array.isArray(order.items) ? order.items : []).map(
                      (item, idx) => (
                        <div key={idx} className="order-item">
                          <span className="item-name">{item}</span>
                          <span className="item-details">
                            {order.details[idx]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <Card.Footer>
                    <div className="item-count">
                      x{order.items ? order.items.length : 0} items
                    </div>
                    <Button
                      variant="warning"
                      className="update-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowUpdateOrder(order.items || []);
                      }}
                    >
                      Update
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <CreateOrder
        show={showCreateOrder}
        handleClose={handleCloseCreateOrder}
        onCreateOrder={handleCreateOrder}
      />
      <UpdateOrder
        show={showUpdateOrder}
        handleClose={handleCloseUpdateOrder}
        initialItems={currentOrderItems}
        onUpdateOrder={handleUpdateOrder}
      />
      <ViewOrderDetail
        show={showOrderDetail}
        handleClose={handleCloseOrderDetail}
        order={selectedOrder}
      />
    </div>
  );
}

export default OrderWaiter;
