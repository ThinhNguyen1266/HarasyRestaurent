// CreateReservationModal.jsx
import React, { useState } from "react";
import "../assets/styles/CreateReservationModal.css";

const CreateReservationModal = ({ isOpen, onClose }) => {
  const [reservationInfo, setReservationInfo] = useState({
    table: "",
    dateTime: "",
    guests: "",
    orders: "",
    customerName: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setReservationInfo({ ...reservationInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Handle saving the reservation data
    console.log("Reservation created:", reservationInfo);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="create-reservation-modal-overlay">
      <div className="create-reservation-modal-content">
        <h2 className="create-reservation-modal-title">Create New Reservation</h2>
        
        <div className="create-reservation-modal-body">
          <div className="create-reservation-info">
            <h3 className="create-reservation-modal-section-title">Reservation Info</h3>
            <label className="create-reservation-modal-label">
              Table
              <input
                type="text"
                name="table"
                value={reservationInfo.table}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
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
              <input
                type="number"
                name="guests"
                value={reservationInfo.guests}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
            <label className="create-reservation-modal-label">
              Order
              <input
                type="text"
                name="orders"
                value={reservationInfo.orders}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>
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
