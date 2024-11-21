import React, { useState, useEffect } from "react";
import "../assets/styles/CreateReservationModal.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useReservationApi from "../hooks/api/userReservationApi";
import { useNavigate } from "react-router-dom";

const EditReservationModal = ({ isOpen, onClose, reservation, foodData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);  
  const navigate = useNavigate();
  // Initialize selected foods with quantities
  const [selectedFoods, setSelectedFoods] = useState(
    reservation.selectedFoods || []
  );

  useEffect(() => {
    if (reservation) {
      const dateParts = reservation.date.split(" ");
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
      const month = monthMap[dateParts[1]] || "01";
      const day = dateParts[0].padStart(2, "0");
      const time = reservation.time || "00:00";
      const formattedDateTime = `${new Date().getFullYear()}-${month}-${day}T${time}`;
    }
  }, [reservation]);

  const handleSave = () => {
    console.log("Reservation updated:", { ...reservation, selectedFoods });
    onClose();
  };

  const handleOrderSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectFood = (foodName) => {
    setSelectedFoods((prevFoods) => {
      const existingFood = prevFoods.find((f) => f.name === foodName);
      if (existingFood) {
        return prevFoods.map((f) =>
          f.name === foodName ? { ...f, quantity: f.quantity + 1 } : f
        );
      }
      return [...prevFoods, { name: foodName, quantity: 1 }];
    });
  };

  const handleRemoveFood = (foodName) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((f) => f.name !== foodName));
  };

  const handleQuantityChange = (foodName, increment) => {
    setSelectedFoods((prevFoods) =>
      prevFoods.map((f) =>
        f.name === foodName
          ? { ...f, quantity: Math.max(1, f.quantity + increment) }
          : f
      )
    );
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


  

  const filteredFoods = foodData.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`create-reservation-modal-overlay ${isOpen ? "open" : ""}`}>
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
                className="create-reservation-modal-input"
                readOnly
              />
            </label>
            <label className="create-reservation-modal-label">
              Type
              <input
                type="text"
                value={reservation.type}
                className="create-reservation-modal-input"
                readOnly
              />
            </label>
            <label className="create-reservation-modal-label">
              Amount of Guests
              <input
                type="number"
                name="guests"
                value={reservation.guests}
                className="create-reservation-modal-input"
                readOnly
              />
            </label>

            {["BIRTHDAY", "FUNERAL"].includes(reservation.type) && (
              <button
              className="create-reservation-modal-button create-reservation-modal-save"
              onClick={()=>navigate(`/order/${reservation.orderId}`)}
            >
              Edit order
            </button>
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
                value={reservation.customer}
                className="create-reservation-modal-input"
                readOnly
              />
            </label>
            <label className="create-reservation-modal-label">
              Phone Number
              <input
                type="text"
                value={reservation.phone}
                className="create-reservation-modal-input"
                readOnly
              />
            </label>
            <label className="create-reservation-modal-label">
              Email
              <input
                type="email"
                value={reservation.email}
                className="create-reservation-modal-input"
                readOnly
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReservationModal;
