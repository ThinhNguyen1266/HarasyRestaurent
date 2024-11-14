import React, { useState } from "react";
import "../assets/styles/CusReservation.css";
import Sidebar from "../components/Sidebar";
import CusReservationDetail from "../components/CusReservationDetail";
import CusHistoryReservationDetail from "../components/CusHistoryReservationDetail";
const reservations = [
  {
    id: 2,
    status: "Current",
    table: "Table 2",
    date: "30, April - 10:30 AM",
    Venue: "Hanoi",
    phone: "0387678789",
    orders: ["Beef Wellington", "Chinese Takeout Dish"],
    price: "650,000",
    guests: 5,
  },
  {
    id: 3,
    status: "Done",
    table: "Table 2",
    date: "29, April - 10:30 AM",
    Venue: "Hanoi",
    phone: "0387678789",
    orders: [],
    price: "720,000",
    guests: 4,
  },
  {
    id: 4,
    status: "Done",
    table: "Table 2",
    date: "28, April - 10:30 AM",
    Venue: "Hanoi",
    phone: "0387678789",
    orders: ["Sushi", "Salmon Roll"],
    price: "400,000",
    guests: 3,
  },
];

const ReservationItem = ({ reservation, onDetailClick }) => {
  return (
    <div className="reservation-item">
      <div className="reservation-details">
        <p>
          <strong>{reservation.table}</strong> <br />
          Book date - time: {reservation.date} <br />
          Venue: {reservation.Venue} <br />
          Phone number: {reservation.phone}
        </p>
      </div>
      <button
        className="detail-button"
        onClick={() => onDetailClick(reservation)}
      >
        Detail
      </button>
    </div>
  );
};

const CusReservation = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedReservation1, setSelectedReservation1] = useState(null);
  const handleDetailClickCancel = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleDetailClick = (reservation) => {
    setSelectedReservation1(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  const handleCloseModal1 = () => {
    setSelectedReservation1(null);
  };

  // Extract unique dates from reservations
  const uniqueDates = [
    ...new Set(reservations.map((res) => res.date.split(" - ")[0])),
  ];

  const groupedReservations = {
    Current: reservations.filter((res) => res.status === "Current"),
    Done: reservations.filter((res) => res.status === "Done"),
  };

  // Filter reservations based on search and date selection
  const filteredReservations = Object.keys(groupedReservations).reduce(
    (acc, status) => {
      acc[status] = groupedReservations[status].filter(
        (res) =>
          (selectedDate === "" || res.date.includes(selectedDate))
      );
      return acc;
    },
    {}
  );

  return (
    <div className="reservations-page">
      <div className="main-content">
        <Sidebar />
        <h1 className="revervations-title">View All Reservations</h1>

        {/* Search and Dropdown Filter */}
        <div className="search-row row justify-content-end mb-3">
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">All Dates</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reservation Groups by Status */}
        <div className="reservation-group">
          <h2>Your current reservation</h2>
          {filteredReservations.Current.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onDetailClick={handleDetailClickCancel}
            />
          ))}
        </div>

        <div className="reservation-group">
          <h2>Reservation history</h2>
          {filteredReservations.Done.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onDetailClick={handleDetailClick}
            />
          ))}
        </div>

        {/* Show Modal if a reservation is selected */}
        {selectedReservation && (
          <CusReservationDetail
            reservation={selectedReservation}
            onClose={handleCloseModal}
          />
        )}

        {selectedReservation1 && (
          <CusHistoryReservationDetail
            reservation={selectedReservation1}
            onClose={handleCloseModal1}
          />
        )}
      </div>
    </div>
  );
};

export default CusReservation;
