import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/ReservationModal.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useReservationApi from "../hooks/api/userReservationApi";

const ReservationModal = ({ reservation, onClose }) => {
  // Hooks must be called unconditionally
  const { updateReservationStatus } = useReservationApi();
  const queryClient = useQueryClient();

  // Mutation for updating reservation status
  const mutation = useMutation({
    mutationFn: updateReservationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries("reservation");
      // Close the modal after successful update
    },
    onError: (error) => {
      console.error(`Failed to update reservation status: ${error.message}`);
    },
  });

  // Ensure reservation check logic is defined separately
  const handleCheckClick = (id, currentStatus) => {
    const newStatus = reservation.status === "PENDING" ? "APPROVED" : "DONE";
    console.log("res id2", id);
    mutation.mutate({ id, status: newStatus });
    onClose();
  };

  if (!reservation) return null;

  return (
    <div className="resmodal-overlay" onClick={onClose}>
      <div
        className="resmodal-dialog modal-lg modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="resmodal-title text-center">Reservation</h2>

        <div className="modal-body">
          <div className="reservation-detail">
            <div className="row">
              <div className="col-6">
                <strong>ID</strong>
              </div>
              <div className="col-6 text-end">{reservation.id}</div>
            </div>
            <div className="row">
              <div className="col-6">
                <strong>Book date - time</strong>
              </div>
              <div className="col-6 text-end">{reservation.date}</div>
            </div>
            <div className="row">
              <div className="col-6">
                <strong>Customer Name</strong>
              </div>
              <div className="col-6 text-end">{reservation.customer}</div>
            </div>
            <div className="row">
              <div className="col-6">
                <strong>Phone Number</strong>
              </div>
              <div className="col-6 text-end">{reservation.phone}</div>
            </div>
            <div className="row">
              <div className="col-6">
                <strong>Table</strong>
              </div>
              <div className="col-6 text-end">
                {Array.isArray(reservation.table) ? (
                  <ul>
                    {reservation.table.map((table, index) => (
                      <li key={index}>Table {table}</li>
                    ))}
                  </ul>
                ) : (
                  reservation.table
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <strong>Amount of Guests</strong>
              </div>
              <div className="col-6 text-end">
                {reservation.guests || "N/A"}
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <strong>Orders</strong>
              </div>
              <div className="col-8">
                <ul className="resorder-list">
                  {reservation.orders.map((order, index) => (
                    <li key={index}>{order}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <strong>Price</strong>
              </div>
              <div className="col-6 text-end">{reservation.price || "N/A"}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-warning w-100 check-button"
            onClick={() => handleCheckClick(reservation.id, reservation.status)}
          >
            {reservation.status === "PENDING" ? "APPROVED" : "DONE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
