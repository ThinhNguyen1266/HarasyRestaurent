import React, { useState } from "react";
import "../assets/styles/CreateReservationModal.css";

const CreateReservationModal = ({ isOpen, onClose }) => {
  const [reservationInfo, setReservationInfo] = useState({
    branchId: 1, // Hardcoded for now or could be dynamically passed
    tableIds: [],
    customer: { customerId: 2 }, // Assuming customerId is provided
    date: "",
    time: "",
    amountGuest: "",
    type: "GENERAL", // Default type is "GENERAL"
    order: {
      branchId: 1, // Hardcoded or passed as prop
      tableIds: [],
      staffId: 3, // Hardcoded for now or could be dynamically passed
      customer: { customerId: 2 },
      orderItems: {
        creates: [],
        updates: [],
      },
      note: "", // Can be added to the form if necessary
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [availableFoods] = useState([
    { id: 1, name: "Vegetable Mixups" },
    { id: 2, name: "Chinese Takeout Dish" },
    { id: 3, name: "Pasta" },
    { id: 4, name: "Garlic Bread" },
    { id: 5, name: "Pizza" },
    { id: 6, name: "Caesar Salad" },
    { id: 7, name: "Sushi" },
    { id: 8, name: "Miso Soup" },
    { id: 9, name: "Burger" },
    { id: 10, name: "Fries" },
    { id: 11, name: "Tacos" },
    { id: 12, name: "Nachos" },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  const tables = [
    "Table 1", "Table 2", "Table 3", "Table 4", "Table 5",
    "Table 6", "Table 7", "Table 8", "Table 9", "Table 10"
  ];

  const reservationTypes = [
    { id: 1, name: "GENERAL" },
    { id: 2, name: "BIRTHDAY" },
    { id: 3, name: "FUNERAL" }
  ];

  const handleChange = (e) => {
    setReservationInfo({
      ...reservationInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Reservation created:", reservationInfo);
    onClose();
  };

  const handleGuestChange = (operation) => {
    setReservationInfo((prevState) => {
      const currentGuests = parseInt(prevState.amountGuest || "0", 10);
      const updatedGuests = operation === "increment" ? currentGuests + 1 : currentGuests - 1;
      return {
        ...prevState,
        amountGuest: updatedGuests >= 0 ? updatedGuests.toString() : "0",
      };
    });
  };

  const handleOrderSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectFood = (food) => {
    setReservationInfo((prevState) => {
      const updatedOrderItems = { ...prevState.order.orderItems };
      const foodIndex = updatedOrderItems.creates.findIndex(item => item.foodId === food.id);
      if (foodIndex !== -1) {
        updatedOrderItems.creates[foodIndex].quantity += 1;
      } else {
        updatedOrderItems.creates.push({ foodId: food.id, quantity: 1 });
      }
      return {
        ...prevState,
        order: { ...prevState.order, orderItems: updatedOrderItems },
      };
    });
    setSearchTerm(""); // Clear search after selecting food
    setShowDropdown(false); // Hide the dropdown
  };

  const handleRemoveFood = (foodId) => {
    setReservationInfo((prevState) => {
      const updatedOrderItems = { ...prevState.order.orderItems };
      const foodIndex = updatedOrderItems.creates.findIndex(item => item.foodId === foodId);
      if (foodIndex !== -1) {
        updatedOrderItems.creates[foodIndex].quantity -= 1;
        if (updatedOrderItems.creates[foodIndex].quantity <= 0) {
          updatedOrderItems.creates.splice(foodIndex, 1);
        }
      }
      return {
        ...prevState,
        order: { ...prevState.order, orderItems: updatedOrderItems },
      };
    });
  };

  const filteredFoods = availableFoods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="create-reservation-modal-overlay">
      <div className="create-reservation-modal-content">
        <h2 className="create-reservation-modal-title">Create New Reservation</h2>

        <div className="create-reservation-modal-body">
          <div className="create-reservation-info">
            <h3 className="create-reservation-modal-section-title">Reservation Info</h3>
            
            {/* Reservation Type Select */}
            <label className="create-reservation-modal-label">
              Reservation Type
              <select
                name="type"
                value={reservationInfo.type}
                onChange={handleChange}
                className="create-reservation-modal-input"
              >
                {reservationTypes.map((type) => (
                  <option key={type.id} value={type.name}>{type.name}</option>
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

            {/* Table Dropdown */}
            <label className="create-reservation-modal-label">
              Table
              <select
                name="tableIds"
                value={reservationInfo.tableIds}
                onChange={handleChange}
                className="create-reservation-modal-input"
                multiple
              >
                {tables.map((table, index) => (
                  <option key={index} value={table}>{table}</option>
                ))}
              </select>
            </label>

            <label className="create-reservation-modal-label">
              Amount of Guests
              <div className="create-reservation-modal-input-wrapper">
                <input
                  type="number"
                  name="amountGuest"
                  value={reservationInfo.amountGuest}
                  onChange={handleChange}
                  className="create-reservation-modal-input"
                />
              </div>
            </label>
            {/* Show Order Section Only If Type Is Not General */}
          {reservationInfo.type !== "GENERAL" && (
            <div className="create-reservation-modal-label">
              <h3 className="create-reservation-modal-section-title">Order</h3>
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
                        key={food.id}
                        className="create-reservation-modal-dropdown-item"
                        onClick={() => handleSelectFood(food)}
                      >
                        {food.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="create-reservation-modal-orders-list">
                {reservationInfo.order.orderItems.creates.length > 0 && (
                  <ul>
                    {reservationInfo.order.orderItems.creates.map((item, index) => (
                      <li key={index}>
                        x{item.quantity} {availableFoods.find(food => food.id === item.foodId).name}
                        <button
                          className="remove-food-button"
                          onClick={() => handleRemoveFood(item.foodId)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
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
