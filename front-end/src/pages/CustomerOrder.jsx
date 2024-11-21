import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "../assets/styles/CustomerOrder.css";
import useOrderApi from "../hooks/api/useOrderApi";
import useAuth from "../hooks/useAuth";

const CustomerOrder = () => {
  const { user } = useAuth();
  const { getCustomerOrders } = useOrderApi();

  const [page, setPage] = useState(0); // Current page
  const [size] = useState(); // Page size
  const [selectedOrder, setSelectedOrder] = useState(null); // For Modal
  const { data, isLoading } = useQuery({
    queryKey: ["orderdata", page],
    queryFn: () => getCustomerOrders(page, size),
    onError: (error) => toast.error(`Failed to fetch orders: ${error.message}`),
    keepPreviousData: true, // Retains previous data while fetching new data
  });

  const orders = data?.content || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleViewOrderItems = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="customer-order-container">
      <h1 className="section-title">Order History</h1>

      {/* Order List */}
      <div className="order-list">
        {isLoading ? (
          <p className="loading-text">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="no-orders-text">No orders found.</p>
        ) : (
          <div className="order-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="card-body">
                  <h5 className="order-title">Order #{order.id}</h5>
                  <p className="order-info">Branch: {order.branch.name}</p>
                  <p className="order-info">Total: ${order.total}</p>
                  <p className="order-info">Payment: {order.paymentStatus}</p>
                  <p className="order-info">
                    Tables:{" "}
                    {order.tables
                      .map((table) => `Table ${table.number}`)
                      .join(", ")}
                  </p>
                  <button
                    className="btn-view-items"
                    onClick={() => handleViewOrderItems(order)}
                  >
                    View Items
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
          className="btn-pagination"
        >
          Previous
        </button>
        <span className="page-info text-white">
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page === totalPages - 1}
          onClick={() => handlePageChange(page + 1)}
          className="btn-pagination"
        >
          Next
        </button>
      </div>

      {/* Modal for Order Items */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Order Items for #{selectedOrder.id}
                </h5>
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="order-items-container">
                  {selectedOrder.orderItems.map((item, index) => (
                    <div key={index} className="order-item-card">
                      <h5 className="cusitem-name">{item.name}</h5>
                      <p className="item-info">
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p className="item-info">
                        <strong>Price:</strong> ${item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-close-modal-footer"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrder;
