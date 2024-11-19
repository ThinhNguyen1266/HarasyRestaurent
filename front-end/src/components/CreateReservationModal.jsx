import React, { useState } from "react";
import "../assets/styles/CreateReservationModal.css";

const CreateReservationModal = ({ isOpen, onClose }) => {
  const [reservationInfo, setReservationInfo] = useState({
    table: "",
    dateTime: "",
    guests: "",
    orders: {},
    customerName: "",
    phoneNumber: "",
    email: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [availableFoods] = useState([
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
  const [showDropdown, setShowDropdown] = useState(false);

  // List of tables (10 tables)
  const tables = ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Table 6", "Table 7", "Table 8", "Table 9", "Table 10"];

  const handleChange = (e) => {
    setReservationInfo({ ...reservationInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Reservation created:", reservationInfo);
    onClose();
  };

  const handleGuestChange = (operation) => {
    setReservationInfo((prevState) => {
      const currentGuests = parseInt(prevState.guests || "0", 10);
      const updatedGuests = operation === "increment" ? currentGuests + 1 : currentGuests - 1;
      return {
        ...prevState,
        guests: updatedGuests >= 0 ? updatedGuests.toString() : "0",
      };
    });
  };

  const handleOrderSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectFood = (food) => {
    setReservationInfo((prevState) => {
      const updatedOrders = { ...prevState.orders };
      if (updatedOrders[food]) {
        updatedOrders[food] += 1;
      } else {
        updatedOrders[food] = 1;
      }
      return {
        ...prevState,
        orders: updatedOrders,
      };
    });
    setSearchTerm(""); // Clear search after selecting food
    setShowDropdown(false); // Hide the dropdown
  };

  const handleRemoveFood = (food) => {
    setReservationInfo((prevState) => {
      const updatedOrders = { ...prevState.orders };
      if (updatedOrders[food] > 1) {
        updatedOrders[food] -= 1;
      } else {
        delete updatedOrders[food];
      }
      return {
        ...prevState,
        orders: updatedOrders,
      };
    });
  };

  const filteredFoods = availableFoods.filter((food) =>
    food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="create-reservation-modal-overlay">
      <div className="create-reservation-modal-content">
        <h2 className="create-reservation-modal-title">Create New Reservation</h2>

        <div className="create-reservation-modal-body">
          <div className="create-reservation-info">
            <h3 className="create-reservation-modal-section-title">Reservation Info</h3>
            
            {/* Table Dropdown */}
            <label className="create-reservation-modal-label">
              Table
              <select
                name="table"
                value={reservationInfo.table}
                onChange={handleChange}
                className="create-reservation-modal-input"
              >
                <option value="" disabled>Select a table</option>
                {tables.map((table, index) => (
                  <option key={index} value={table}>{table}</option>
                ))}
              </select>
            </label>

            <label className="create-reservation-modal-label">
              Date-Time
              <input
                type="datetime-local"
                name="dateTime"
                value={reservationInfo.dateTime}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
            <label className="create-reservation-modal-label">
              Amount of Guests
              <div className="create-reservation-modal-input-wrapper">
                <input
                  type="number"
                  name="guests"
                  value={reservationInfo.guests}
                  onChange={handleChange}
                  className="create-reservation-modal-input"
                />
              </div>
            </label>

            {/* Order Section with Search and Dropdown */}
            <label className="create-reservation-modal-label">
              Order
              <div className="create-reservation-modal-order-search">
                <input
                  type="text"
                  placeholder="Search for foods..."
                  value={searchTerm}
                  onChange={handleOrderSearch}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="create-reservation-modal-input"
                />
                {showDropdown && (
                  <div className="create-reservation-modal-dropdown">
                    {filteredFoods.map((food) => (
                      <div
                        key={food}
                        className="create-reservation-modal-dropdown-item"
                        onClick={() => handleSelectFood(food)}
                      >
                        {food}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </label>
            <div className="create-reservation-modal-orders-list">
              {Object.keys(reservationInfo.orders).length > 0 && (
                <ul>
                  {Object.entries(reservationInfo.orders).map(([food, quantity], index) => (
                    <li key={index}>
                      x{quantity} {food}
                      <button
                        className="remove-food-button"
                        onClick={() => handleRemoveFood(food)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="create-customer-info">
            <h3 className="create-reservation-modal-section-title">Customer Info</h3>
            <label className="create-reservation-modal-label">
              Name
              <input
                type="text"
                name="customerName"
                value={reservationInfo.customerName}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
            <label className="create-reservation-modal-label">
              Phone Number
              <input
                type="text"
                name="phoneNumber"
                value={reservationInfo.phoneNumber}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
            <label className="create-reservation-modal-label">
              Email
              <input
                type="email"
                name="email"
                value={reservationInfo.email}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
          </div>
        </div>

        <div className="create-reservation-modal-actions">
          <button
            className="create-reservation-modal-button create-reservation-modal-save"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="create-reservation-modal-button create-reservation-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReservationModal;
