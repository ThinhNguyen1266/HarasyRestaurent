import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/Sidebar";
import CreateOrder from "../components/CreateOder"; // Make sure the import path is correct
import UpdateOrder from "../components/UpdateOrder";
import ViewOrderDetail from "../components/ViewOrderDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/OrderWaiter.css";

function OrderWaiter() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showUpdateOrder, setShowUpdateOrder] = useState(false);
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
    },
    // Other orders...
  ]);

  const handleShowCreateOrder = () => setShowCreateOrder(true);
  const handleCloseCreateOrder = () => setShowCreateOrder(false);

  const handleShowUpdateOrder = (items, table) => {
    setCurrentOrderItems(Array.isArray(items) ? items : []);
    setCurrentTable(table || ""); // Set the current table
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

  const handleUpdateOrder = (updatedItems, updatedTable) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.items === currentOrderItems
          ? { ...order, items: updatedItems, table: updatedTable } // Update items and table
          : order
      )
    );
    handleCloseUpdateOrder();
  };

  return (
    <div className="order-waiter-d-flex">
      <Sidebar />
      <div className="order-waiter-main-content">
        <div className="order-waiter-page">
          <div className="order-waiter-header-row">
            <h1 className="order-waiter-title">View Orders</h1>
          </div>
          <div className="order-waiter-button-row">
            <Button
              className="order-waiter-create-order-button"
              onClick={handleShowCreateOrder}
            >
              Create Order
            </Button>
          </div>
          <div className="order-waiter-list">
            {orders.map((order, index) => (
              <Card
                key={index}
                className="order-waiter-card"
                onClick={() => handleShowOrderDetail(order)}
              >
                <Card.Header className="order-waiter-header">
                  Order {order.id}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {order.time}, {order.date}
                  </Card.Text>
                  <Card.Text className="order-waiter-table">
                    {order.table}
                  </Card.Text>
                  <div className="order-waiter-items-container">
                    {(Array.isArray(order.items) ? order.items : []).map(
                      (item, idx) => (
                        <div key={idx} className="order-waiter-item">
                          <span className="order-waiter-item-name">{item}</span>
                          <span className="order-waiter-item-details">
                            {order.details[idx]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <Card.Footer>
                    <div className="order-waiter-item-count">
                      x{order.items ? order.items.length : 0} items
                    </div>
                    <Button
                      variant="warning"
                      className="order-waiter-update-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowUpdateOrder(order.items || [], order.table);
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
        initialTable={currentTable} // Pass the current table
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
