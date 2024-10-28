import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/ReservationModal.css";

const ReservationModal = ({ reservation, onClose }) => {
  if (!reservation) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-lg modal-content" onClick={(e) => e.stopPropagation()}>
        
        <h2 className="modal-title text-center">Reservation</h2>

        <div className="modal-body">
          <div className="reservation-detail">
            <div className="row">
              <div className="col-6"><strong>ID</strong></div>
              <div className="col-6 text-end">{reservation.id}</div>
            </div>
            <div className="row">
              <div className="col-6"><strong>Book date - time</strong></div>
              <div className="col-6 text-end">{reservation.date}</div>
            </div>
            <div className="row">
              <div className="col-6"><strong>Customer Name</strong></div>
              <div className="col-6 text-end">{reservation.customer}</div>
            </div>
            <div className="row">
              <div className="col-6"><strong>Phone Number</strong></div>
              <div className="col-6 text-end">{reservation.phone}</div>
            </div>
            <div className="row">
              <div className="col-6"><strong>Table</strong></div>
              <div className="col-6 text-end">{reservation.table}</div>
            </div>
            <div className="row">
              <div className="col-6"><strong>Amount of Guests</strong></div>
              <div className="col-6 text-end">{reservation.guests || "N/A"}</div>
            </div>
            <div className="row">
              <div className="col-4"><strong>Orders</strong></div>
              <div className="col-8">
                <ul className="order-list">
                  {reservation.orders.map((order, index) => (
                    <li key={index}>{order}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-6"><strong>Price</strong></div>
              <div className="col-6 text-end">{reservation.price || "N/A"}</div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-warning w-100 check-button">Check</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
