import React, { useState, useEffect } from "react";
import "../assets/styles/CreateReservationModal.css";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useReservationApi from "../hooks/api/userReservationApi";
import { useMutation } from "@tanstack/react-query";
const EditReservationModal = ({ isOpen, onClose, reservation, foodData }) => {
  console.log("r1", reservation);

  const [searchTerm, setSearchTerm] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (reservation) {
      // Fix for invalid time value error:
      // Combine date and time to create a valid datetime string
      const dateParts = reservation.date.split(" "); // Split "04 Nov" to ["04", "Nov"]
      const monthMap = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      const month = monthMap[dateParts[1]] || "01"; // Map month to 2-digit format
      const day = dateParts[0].padStart(2, "0"); // Ensure day is two digits

      const time = reservation.time || "00:00"; // Default to "00:00" if no time

      const formattedDateTime = `${new Date().getFullYear()}-${month}-${day}T${time}`;
    }
  });
  console.log("ressssssss", reservation);

  const handleChange = (e) => {};

  const handleSave = () => {
    console.log("Reservation updated:", reservation);
    onClose();
  };

  const handleGuestChange = (operation) => {};

  const handleOrderSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectFood = (foodName) => {
    
  };
  const { updateReservationStatus } = useReservationApi();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateReservationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries("reservation");
    },
    onError: (error) => {
      console.error(`Failed to update reservation status: ${error.message}`);
    },
  });
  const handleRemoveFood = (food) => {};

  const filteredFoods = foodData.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="create-reservation-modal-overlay">
      <div className="create-reservation-modal-content">
        <h2 className="create-reservation-modal-title">Edit Reservation</h2>

        <div className="create-reservation-modal-body">
          <div className="create-reservation-info">
            <h3 className="create-reservation-modal-section-title">
              Reservation Info
            </h3>
            <label className="create-reservation-modal-label">
              Table
              <div className="create-reservation-modal-orders-list mt-1">
                {reservation.table.length > 0 && (
                  <ul className="d-flex">
                    {Array.isArray(reservation.table) ? (
                      reservation.table.map((table, index) => (
                        <li key={index}>{table}</li>
                      ))
                    ) : (
                      <li>{reservation.table}</li>
                    )}
                  </ul>
                )}
              </div>
            </label>
            <label className="create-reservation-modal-label">
              Date-Time
              <input
                type="text"
                value={reservation.date}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
            <label className="create-reservation-modal-label">
              Type
              <input
                name=""
                value={reservation.type}
                className="create-reservation-modal-input"
              />
            </label>
            <label className="create-reservation-modal-label">
              Amount of Guests
              <div className="create-reservation-modal-input-wrapper">
                <input
                  type="number"
                  name="guests"
                  value={reservation.guests}
                  onChange={handleChange}
                  className="create-reservation-modal-input"
                />
              </div>
            </label>

            {/* Order Section with Search and Dropdown */}
            {["BIRTHDAY", "FUNERAL"].includes(reservation.type) && (
              <>
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
                            key={food.id}
                            className="create-reservation-modal-dropdown-item"
                            onClick={() => handleSelectFood(food.name)} // Use food.name here
                          >
                            {food.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
                <div className="create-reservation-modal-orders-list">
                  {Object.keys(reservation.orders).length > 0 && (
                    <ul>
                      {Object.entries(reservation.orders).map(
                        ([food, quantity], index) => (
                          <li key={index}>
                            {quantity} {food}
                            <button
                              className="remove-food-button"
                              onClick={() => handleRemoveFood(food)}
                            >
                              Remove
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="create-customer-info">
            <h3 className="create-reservation-modal-section-title">
              Customer Info
            </h3>
            <label className="create-reservation-modal-label">
              Name
              <input
                type="text"
                name="customerName"
                value={reservation.customer}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
            <label className="create-reservation-modal-label">
              Phone Number
              <input
                type="text"
                name="phoneNumber"
                value={reservation.phone}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
            <label className="create-reservation-modal-label">
              Email
              <input
                type="email"
                name="email"
                value={reservation.email}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
          </div>
        </div>

        <div className="create-reservation-modal-actions">
        {["BIRTHDAY", "FUNERAL"].includes(reservation.type) && (
          <button
            className="create-reservation-modal-button create-reservation-modal-save"
            onClick={handleSave}
          >
            Save
          </button>)}
          <button
            className="create-reservation-modal-button create-reservation-modal-cancel"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReservationModal;
