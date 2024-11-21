import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useBranchApi from "../hooks/api/useBranchApi";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Card, Row, Col, Button, Pagination } from "react-bootstrap"; // React-Bootstrap components

const AllOrder = () => {
  const { id } = useParams(); // Get branch ID from URL
  const { getOrderbyBranchID } = useBranchApi(); // Custom hook to fetch orders

  const [currentPage, setCurrentPage] = useState(1); // Manage the current page

  // Use React Query to fetch orders by branch ID with pagination
  const {
    data: ordersData = { content: [], totalPages: 1 },
    isLoading: isOrderLoading,
    error,
  } = useQuery({
    queryKey: ["order", id, currentPage], // Add currentPage to the queryKey
    queryFn: () => getOrderbyBranchID(id, currentPage), // Pass the page number to the API
    onError: (error) => toast.error(`Failed to fetch orders: ${error.message}`),
    keepPreviousData: true, // To maintain data while switching pages
  });

  // Handle loading state
  if (isOrderLoading) {
    return <div>Loading orders...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white mb-4">
        All Orders for Branch {id}
      </h1>

      {/* Display the list of orders */}
      {ordersData.content.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <Row>
          {ordersData.content.map((order) => (
            <Col key={order.id} md={6} lg={4} className="mb-4">
              {/* Horizontal Card */}
              <Card className="text-white bg-dark">
                <Card.Body>
                  <Row>
                    <Col
                      xs={12}
                      sm={4}
                      className="d-flex flex-column justify-content-center"
                    >
                      <h5>Order #{order.id}</h5>
                      <p>
                        <strong>Staff:</strong> {order.staff?.name || "Unknown"}
                      </p>
                      <p>
                        <strong>Customer: </strong>
                        {order.customer.name}
                      </p>
                      <p>
                        <strong>Total:</strong> ${order.total.toFixed(2)}
                      </p>
                    </Col>

                    {/* Right Section: Order Items */}
                    <Col xs={12} sm={8}>
                      <h6>Order Items:</h6>
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="mb-2">
                          <p>
                            <strong>{item.name}</strong> - {item.quantity} x $
                            {item.price.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination Controls */}
      <Pagination>
        <Pagination.Prev
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
        />
        {/* Display page numbers */}
        {[...Array(ordersData.totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            handlePageChange(
              currentPage < ordersData.totalPages
                ? currentPage + 1
                : ordersData.totalPages
            )
          }
        />
      </Pagination>
    </div>
  );
};

export default AllOrder;
