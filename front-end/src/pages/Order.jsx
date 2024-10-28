import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/Sidebar";
import CreateOrder from "../components/CreateOder";
import UpdateOrder from "../components/UpdateOrder";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/Order.css";

function Order() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showUpdateOrder, setShowUpdateOrder] = useState(false);
  const [currentOrderItems, setCurrentOrderItems] = useState([]);

  const handleShowCreateOrder = () => setShowCreateOrder(true);
  const handleCloseCreateOrder = () => setShowCreateOrder(false);

  const handleShowUpdateOrder = (items) => {
    setCurrentOrderItems(items);
    setShowUpdateOrder(true);
  };

  const handleCloseUpdateOrder = () => setShowUpdateOrder(false);

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
    {
      id: 352,
      date: "05 Feb 2023",
      time: "08:38 PM",
      items: [
        "Vegetable Mixups",
        "Chinese Takeout Dish",
        "Burger",
        "Fries",
        "Tacos",
        "Nachos",
        "Steak",
        "Mashed Potatoes",
      ],
      details: [
        "Vegetable Fritters with Egg",
        "Fresh Prawn mix salad",
        "Double Cheeseburger",
        "Seasoned Fries",
        "Chicken Tacos",
        "Loaded Nachos",
        "Grilled Steak",
        "Creamy Mashed Potatoes",
      ],
    },
    {
      id: 353,
      date: "06 Feb 2023",
      time: "09:10 AM",
      items: ["Sandwich", "Salad", "Soup", "Fruit", "Water"],
      details: [
        "Chicken Sandwich",
        "Garden Salad",
        "Tomato Basil Soup",
        "Mixed Fruit Bowl",
        "Mineral Water",
      ],
    },
    {
      id: 354,
      date: "06 Feb 2023",
      time: "12:30 PM",
      items: ["Pizza", "Burger", "Hot Dog", "French Fries", "Soft Drink"],
      details: [
        "Margherita Pizza",
        "Cheeseburger",
        "Classic Hot Dog",
        "Crispy French Fries",
        "Cola",
      ],
    },
    {
      id: 355,
      date: "07 Feb 2023",
      time: "07:00 PM",
      items: [
        "Pasta",
        "Steak",
        "Caesar Salad",
        "Mushroom Soup",
        "Garlic Bread",
      ],
      details: [
        "Fettuccine Alfredo",
        "Sirloin Steak",
        "Caesar Salad with Parmesan",
        "Creamy Mushroom Soup",
        "Garlic Bread",
      ],
    },
    {
      id: 356,
      date: "08 Feb 2023",
      time: "05:00 PM",
      items: ["Sushi Roll", "Sashimi", "Tempura", "Miso Soup", "Green Tea"],
      details: [
        "California Roll",
        "Assorted Sashimi",
        "Shrimp Tempura",
        "Miso Soup with Seaweed",
        "Matcha Green Tea",
      ],
    },
    {
      id: 357,
      date: "08 Feb 2023",
      time: "08:30 PM",
      items: ["Tacos", "Burrito", "Nachos", "Quesadilla", "Margarita"],
      details: [
        "Spicy Chicken Tacos",
        "Beef Burrito",
        "Cheese Nachos",
        "Cheese Quesadilla",
        "Classic Margarita",
      ],
    },
  ];

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
              <Card key={index} className="order-card">
                <Card.Header className="order-header">
                  Order {order.id}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {order.date}, {order.time}
                  </Card.Text>
                  <div className="order-items-container">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <span className="item-name">{item}</span>
                        <span className="item-details">
                          {order.details[idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Card.Footer>
                    <div className="item-count">
                      x{order.items.length} items
                    </div>
                    <Button
                      variant="warning"
                      className="update-button"
                      onClick={() => handleShowUpdateOrder(order.items)}
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
      />
      <UpdateOrder
        show={showUpdateOrder}
        handleClose={handleCloseUpdateOrder}
        initialItems={currentOrderItems}
      />
    </div>
  );
}

export default Order;
