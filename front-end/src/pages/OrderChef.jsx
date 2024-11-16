import { useState } from "react";
import { MdRestaurantMenu } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";
import "../assets/styles/OrderChef.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const staticMenuData = {
  orders: [
    {
      id: 352,
      table: 5,
      items: [
        { id: 1, name: "Crispy Calamari", status: "Cooking", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0" },
        { id: 2, name: "Bruschetta", status: "Cooking", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f" },
        { id: 3, name: "Grilled Salmon", status: "Done", image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab" },
      ]
    },
    {
      id: 353,
      table: 3,
      items: [
        { id: 4, name: "Chocolate Lava Cake", status: "Done", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" },
        { id: 5, name: "Tiramisu", status: "Done", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9" },
      ]
    }
  ]
};

const OrderChef = () => {
  const [orderData, setOrderData] = useState(staticMenuData.orders);

  const toggleDishStatus = (orderId, itemId) => {
    setOrderData((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === itemId
                  ? { ...item, status: item.status === "Done" ? "Cooking" : "Done" }
                  : item
              ),
            }
          : order
      )
    );
  };

  const isOrderComplete = (order) => order.items.every((item) => item.status === "Done");

  return (
    <div className="chef-menu-main">
      <Sidebar />
      <ToastContainer />
      <div className="chef-menu-content">
        <div className="chef-menu-header text-center">
          <MdRestaurantMenu className="chef-menu-icon" />
          <h1>Order Management</h1>
        </div>

        <div className="chef-menu-orders">
          {orderData.map((order) => (
            <div key={order.id} className="chef-menu-accordion-item">
              <div className="chef-menu-accordion-header d-flex align-items-center justify-content-between">
                <h2>Order {order.id} - Table {order.table}</h2>
                <span className={`order-status ${isOrderComplete(order) ? "text-success" : "text-warning"}`}>
                  {isOrderComplete(order) ? "Done!" : `${order.items.filter(item => item.status === "Done").length}/${order.items.length} dishes`}
                </span>
              </div>

              <div className="chef-menu-accordion-body">
                {order.items.map((item) => (
                  <div key={item.id} className="chef-menu-item">
                    <img src={item.image} alt={item.name} className="chef-menu-item-image" />
                    <div className="chef-menu-item-details">
                      <h5>{item.name}</h5>
                      <span className={`chef-menu-item-status ${item.status === "Done" ? "text-success" : "text-warning"}`}>
                        {item.status === "Done" ? <FaCheckCircle /> : <FaTimesCircle />} {item.status}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleDishStatus(order.id, item.id)}
                      className={`chef-menu-toggle-button ${item.status === "Done" ? "btn-outline-danger" : "btn-outline-success"}`}
                    >
                      {item.status === "Done" ? "Mark as Cooking" : "Mark as Done"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderChef;
