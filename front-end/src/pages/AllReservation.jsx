import React, { useState } from "react";
import "../assets/styles/AllReservation.css";
import Sidebar from "../components/Sidebar";
import ReservationModal from "../components/ReservationModal"; // Import modal component

const reservations = [
  {
    id: 1,
    status: "Pending",
    table: "Table 2",
    date: "30, April - 10:30 AM",
    customer: "Nguyen Van A",
    phone: "0387678789",
    orders: ["Steak Tartare", "Lobster Risotto"],
    price: "540,000",
    guests: 6,
  },
  {
    id: 2,
    status: "Approved",
    table: "Table 2",
    date: "30, April - 10:30 AM",
    customer: "Nguyen Van B",
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
    customer: "Nguyen Van C",
    phone: "0387678789",
    orders: [],
    price: "720,000",
    guests: 4,
  },
  {
    id: 4,
    status: "Pending",
    table: "Table 2",
    date: "28, April - 10:30 AM",
    customer: "Nguyen Van D",
    phone: "0387678789",
    orders: ["Sushi", "Salmon Roll"],
    price: "400,000",
    guests: 3,
  },
];

const ReservationItem = ({ reservation, onDetailClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "yellow";
      case "Approved":
        return "green";
      case "Done":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div className="reservation-item">
      <div
        className="status-indicator"
        style={{ backgroundColor: getStatusColor(reservation.status) }}
      ></div>
      <div className="reservation-details">
        <p>
          <strong>{reservation.table}</strong> <br />
          Book date - time: {reservation.date} <br />
          Customer name: {reservation.customer} <br />
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

const ReservationsPage = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleDetailClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  // Extract unique dates from reservations
  const uniqueDates = [
    ...new Set(reservations.map((res) => res.date.split(" - ")[0])),
  ];

  const groupedReservations = {
    Pending: reservations.filter((res) => res.status === "Pending"),
    Approved: reservations.filter((res) => res.status === "Approved"),
    Done: reservations.filter((res) => res.status === "Done"),
  };

  // Filter reservations based on search and date selection
  const filteredReservations = Object.keys(groupedReservations).reduce(
    (acc, status) => {
      acc[status] = groupedReservations[status].filter(
        (res) =>
          res.phone.includes(searchPhone) &&
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
        <h1>View All Reservations</h1>

        {/* Search and Dropdown Filter */}
        <div className="search-row row justify-content-end mb-3">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Phone Number"
              className="form-control"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
          </div>
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
          <h2>Pending</h2>
          {filteredReservations.Pending.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onDetailClick={handleDetailClick}
            />
          ))}
        </div>

        <div className="reservation-group">
          <h2>Approved</h2>
          {filteredReservations.Approved.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onDetailClick={handleDetailClick}
            />
          ))}
        </div>

        <div className="reservation-group">
          <h2>Done</h2>
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
          <ReservationModal
            reservation={selectedReservation}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
