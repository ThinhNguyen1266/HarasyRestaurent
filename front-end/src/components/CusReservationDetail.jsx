import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/CusReservationDetail.css";

const CusReservationDetail = ({ reservation, onClose, onCancel }) => {
  if (!reservation) return null;

  // Function to handle reservation cancellation
  const handleCancel = () => {
    const isConfirmed = window.confirm("Are you sure you want to cancel the reservation?");
    // if (isConfirmed) {
    //   onCancel(reservation.id); 
    // }
  };

  return (
    <div className="cus-reservation-overlay" onClick={onClose}>
      <div className="cus-reservation-dialog cus-reservation-modal" onClick={(e) => e.stopPropagation()}>
        
        <h2 className="cus-reservation-title">Reservation</h2>

        <div className="cus-reservation-body">
          <div className="cus-reservation-detail">
            <div className="cus-reservation-row">
              <div className="cus-reservation-label"><strong>ID</strong></div>
              <div className="cus-reservation-value">{reservation.id}</div>
            </div>
            <div className="cus-reservation-row">
              <div className="cus-reservation-label"><strong>Book date - time</strong></div>
              <div className="cus-reservation-value">{reservation.date}</div>
            </div>
            <div className="cus-reservation-row">
              <div className="cus-reservation-label"><strong>Venue</strong></div>
              <div className="cus-reservation-value">{reservation.Venue}</div>
            </div>
            <div className="cus-reservation-row">
              <div className="cus-reservation-label"><strong>Phone Number</strong></div>
              <div className="cus-reservation-value">{reservation.phone}</div>
            </div>
            <div className="cus-reservation-row">
              <div className="cus-reservation-label"><strong>Table</strong></div>
              <div className="cus-reservation-value">{reservation.table}</div>
            </div>
            <div className="cus-reservation-row">
              <div className="cus-reservation-label"><strong>Amount of Guests</strong></div>
              <div className="cus-reservation-value">{reservation.guests || "N/A"}</div>
            </div>
            <div className="cus-reservation-row">
              <div className="cus-reservation-label"><strong>Orders</strong></div>
              <div className="cus-reservation-orders">
                <ul className="cus-reservation-order-list">
                  {reservation.orders.map((order, index) => (
                    <li key={index} className="cus-reservation-order-item">{order}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="cus-reservation-row">
              <div className="cus-reservation-label"><strong>Price</strong></div>
              <div className="cus-reservation-value">{reservation.price || "N/A"}</div>
            </div>
          </div>
        </div>
        
        <div className="cus-reservation-footer">
          <button className="cus-reservation-button" onClick={handleCancel}>Cancel Reservation</button>
        </div>
      </div>
    </div>
  );
};

export default CusReservationDetail;
