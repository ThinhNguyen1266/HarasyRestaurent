import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/Sidebar";
import CreateOrder from "../components/CreateOder";
import UpdateOrder from "../components/UpdateOrder";
import ViewOrderDetail from "../components/ViewOrderDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/OrderChef.css";

function OrderChef() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showUpdateOrder, setShowUpdateOrder] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [currentOrderItems, setCurrentOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCloseCreateOrder = () => setShowCreateOrder(false);
  const handleCloseUpdateOrder = () => setShowUpdateOrder(false);
  const handleCloseOrderDetail = () => setShowOrderDetail(false);

  const orders = [
    {
      id: 351,
      date: "05 Feb 2023",
      time: "08:38 PM",
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
  ];

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  return (
    <div className="order-chef-d-flex">
      <Sidebar />
      <div className="order-chef-main-content">
        <div className="order-chef-page">
          <div className="order-chef-header-row">
            <h1 className="order-chef-title">View Orders</h1>
          </div>
          <div className="order-chef-list">
            {orders.map((order, index) => (
              <Card
                key={index}
                className="order-chef-card"
                onClick={() => handleCardClick(order)}
              >
                <Card.Header className="order-chef-header">
                  Order {order.id}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {order.date}, {order.time}
                  </Card.Text>
                  <div className="order-chef-items-container">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-chef-item">
                        <span className="order-chef-item-name">{item}</span>
                        <span className="order-chef-item-details">
                          {order.details[idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Card.Footer>
                    <div className="order-chef-item-count">
                      x{order.items.length} items
                    </div>
                    <Button
                      variant="warning"
                      className="order-chef-done-button"
                    >
                      Done
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

export default OrderChef;
