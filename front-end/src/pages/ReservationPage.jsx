import React, { useState, useMemo } from "react";
import "../assets/styles/AllReservation.css";
import ReservationModal from "../components/ReservationModal";
import CreateReservationModal from "../components/CreateReservationModal";
import Sidebar from "../components/Sidebar";
import useReservationApi from "../hooks/api/userReservationApi";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import EditReservationModal from "../components/EditReservationModal";
import useMenuApi from "../hooks/api/useMenuApi";
import useAuth from "../hooks/useAuth";
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
          <strong>Tables:</strong>
          <ul>
            {reservation.table.map((table) => (
              <li key={table}>Table {table}</li>
            ))}
          </ul>
          <br />
          <strong>Book date - time:</strong> {reservation.date} <br />
          <strong>Customer name:</strong> {reservation.customer} <br />
          <strong>Phone number:</strong> {reservation.phone}
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
        onClick={() => onEditClick(reservation)} // Open the edit modal
      >
        Edit
      </button>
    </div>
  );
};

const ReservationsPage = () => {
  const{user}=useAuth()

  const { getMenubyBranchID, getRerservationCus, getReservationType, getAvailableTablelist, getCustomerProfileByPhone,addReservation} =
    useMenuApi();
  const [page, setPage] = useState(0);
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editReservation, setEditReservation] = useState(null);

  const queryClient = useQueryClient();

  // Fetch reservations
  const {
    data: reservationData = { content: [], totalPages: 1 },
    isLoading: isLoadingReservations,
  } = useQuery({
    queryKey: ["reservation", page],
    queryFn: () => getRerservationCus(page),
    onError: (error) => {
      toast.error(`Failed to fetch reservations: ${error.message}`);
    },
  });

  
  // Fetch food data
  const { data: menuData = [], isLoading: isLoadingFood } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenubyBranchID,
    onError: (error) => {
      toast.error(`Failed to fetch menu: ${error.message}`);
    },
  });

  // Map food data into a flattened structure
  const foodData = menuData
    .flatMap((menu) => menu.menuItems)
    .filter((item) => item.status === "AVAILABLE") // Filter available items
    .map(({ foodId, name }) => ({
      id: foodId,
      name,
    }));

  // Fetch reservation types
  const { data: type = [], isLoading: isLoadingTypes } = useQuery({
    queryKey: ["resType"],
    queryFn: getReservationType,
    onError: (error) => {
      toast.error(`Failed to fetch reservation types: ${error.message}`);
    },
  });
  const allReservations = reservationData.content.map((res) => ({
    id: res.id,
    status: res.status,
    table: res.order.tables.map((table) => table.number),
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
    type: res.type,
  }));

  const filteredReservations = useMemo(() => {
    let result = allReservations;
    if (searchPhone.trim()) {
      result = result.filter((res) =>
        res.phone.toLowerCase().includes(searchPhone.trim().toLowerCase())
      );
    }
    if (selectedDate) {
      result = result.filter((res) => res.date.startsWith(selectedDate));
    }
    return result;
  }, [searchPhone, selectedDate, allReservations]);

  const uniqueDates = useMemo(
    () => [...new Set(allReservations.map((res) => res.date.split(" - ")[0]))],
    [allReservations]
  );

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < reservationData.totalPages - 1) setPage(page + 1);
  };

  const handleDetailClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleEditClick = (reservation) => {
    setEditReservation(reservation);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    queryClient.invalidateQueries("reservationData");
    setSelectedReservation(null);
  };

  const handleCloseCreateModal = () => {
    queryClient.invalidateQueries("reservationData");
    setIsCreateModalOpen(false);
  };

  return (
    <div className="reservations-page">
      <div className="main-content">
        <Sidebar />
        <h1 className="reservations-title">View All Reservations</h1>
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
            <button
              className="btn btn-warning"
              onClick={() => setIsCreateModalOpen(true)}
            >
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

        {selectedReservation && (
          <ReservationModal
            reservation={selectedReservation}
            onClose={handleCloseModal}
          />
        )}
        <CreateReservationModal
          userId={user.id}
          branchid={user.branchId}
          foodData={foodData}
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          addReservation={addReservation}
          getCustomerProfileByPhone={getCustomerProfileByPhone}
          reservationType={type}
          type={type}
          availableTable={getAvailableTablelist}
        />
        {isEditModalOpen && (
          <EditReservationModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            reservation={editReservation}
            foodData={foodData}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
