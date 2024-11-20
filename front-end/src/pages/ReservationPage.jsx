import React, { useState, useMemo } from "react";
import "../assets/styles/AllReservation.css";
import ReservationModal from "../components/ReservationModal";
import CreateReservationModal from "../components/CreateReservationModal";
import Sidebar from "../components/Sidebar";
import useReservationApi from "../hooks/api/userReservationApi";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import EditReservationModal from "../components/EditReservationModal";

const ReservationItem = ({ reservation, onDetailClick, onEditClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "yellow";
      case "APPROVED":
        return "green";
      case "DONE":
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
      <button
        className="detail-button"
        onClick={() => onEditClick(reservation)}  // Open the edit modal
      >
        Edit
      </button>
    </div>
  );
};


const ReservationsPage = () => {
  const { getRerservationCus, updateReservationStatus } = useReservationApi();
  const [page, setPage] = useState(0); // Track the current page
  const { data: reservationData = { content: [], totalPages: 1 }, isLoading } =
    useQuery({
      queryKey: ["reservation", page], // Include `page` in the query key
      queryFn: () => getRerservationCus(page),
      onError: (error) => {
        toast.error(`Failed to fetch reservations: ${error.message}`);
      },
    });
  console.log("res", reservationData);
  
  const allReservations = reservationData.content.map((res) => ({
    id: res.id,
    status: res.status,
    table: res.order.tables.map((table) => `Table ${table.number}`).join(", "),
    date: `${new Date(res.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })} - ${new Date(`1970-01-01T${res.time}`).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    customer: res.customer.name,
    phone: res.customer.phone || "N/A",
    email: res.customer.email,
    orders: res.order.orderItems.map((item) => item.name),
    price: res.order.total.toLocaleString(),
    guests: res.amountGuest,
  }));

  const [searchPhone, setSearchPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editReservation, setEditReservation] = useState(null);
  
  const handleDetailClick = (reservation) => {
    setSelectedReservation(reservation);
  };
  
  const handleEditClick = (reservation) => {
    setEditReservation(reservation);
    setIsEditModalOpen(true);  // Open the edit modal
  };
  
  const queryClient = useQueryClient();

  const handleCloseModal = () => {
    queryClient.invalidateQueries("reservation");
    setSelectedReservation(null);
  };

  const handleCreateNewClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSaveReservation = (newReservation) => {
    console.log("New reservation:", newReservation);
    // TODO: Implement saving logic here
  };

  const filteredReservations = useMemo(() => {
    let result = allReservations;

    // Apply phone search filter
    if (searchPhone.trim()) {
      result = result.filter((res) => res.phone.includes(searchPhone.trim()));
    }

    // Apply date filter
    if (selectedDate) {
      result = result.filter(
        (res) => res.date.split(" - ")[0] === selectedDate
      );
    }

    return result;
  }, [searchPhone, selectedDate, allReservations]);

  const uniqueDates = useMemo(
    () => [...new Set(allReservations.map((res) => res.date.split(" - ")[0]))],
    [allReservations]
  );

  // Pagination Controls
  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < reservationData.totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="reservations-page">
      <div className="main-content">
        <Sidebar />
        <h1 className="revervations-title">View All Reservations</h1>

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
          <div className="col-md-2">
            <button className="btn btn-warning" onClick={handleCreateNewClick}>
              Create
            </button>
          </div>
        </div>

        <div className="reservation-group">
          {filteredReservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onDetailClick={handleDetailClick}
              onEditClick={handleEditClick}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button
            className="btn btn-secondary"
            onClick={handlePrevPage}
            disabled={page === 0}
          >
            Previous
          </button>
          <span className="mx-2">
            {page + 1} of {reservationData.totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={handleNextPage}
            disabled={page === reservationData.totalPages - 1}
          >
            Next
          </button>
        </div>

        {/* Show Modal if a reservation is selected */}
        {selectedReservation && (
          <ReservationModal
            reservation={selectedReservation}
            onClose={handleCloseModal}
          />
        )}

        {/* Show Create Reservation Modal */}
        <CreateReservationModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onSave={handleSaveReservation}
        />
        {isEditModalOpen && (
          <EditReservationModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            reservation={editReservation}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
