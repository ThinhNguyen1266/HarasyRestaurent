import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import useOrderApi from "../hooks/api/useOrderApi";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OrderWaiter() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const branchId = user.branchId;
  const { getOrderInTimebyBranchID } = useOrderApi();

  const { data: orderIntimeData, isLoading: isOrderIntimeLoading } = useQuery({
    queryKey: ["orderIntime", branchId],
    queryFn: () => getOrderInTimebyBranchID(branchId),
    onError: (error) =>
      toast.error(`Failed to fetch orderInTime: ${error.message}`),
  });
  console.log(orderIntimeData);
  if (isOrderIntimeLoading) return <p>Loading orders...</p>;
  if (!orderIntimeData?.length) return <p>No orders found.</p>;

  const handleCardClick = (id) => {
    navigate(`/order/${id}`); // Navigate with order ID
  };

  return (
    <Container>
      <Row className="order-list">
        {orderIntimeData.map((order) => (
          <Col md={6}>
            <Card
              key={order.id}
              className="mb-3 order-card"
              onClick={() => handleCardClick(order.id)} // Attach click handler
              style={{ cursor: "pointer" }} // Add pointer cursor for UX
            >
              <Card.Body>
                <Card.Title>
                  Order #{order.id} - {order.paymentStatus}
                </Card.Title>

                <Card.Text>
                  <strong>Customer:</strong> {order.customer.name} <br />
                  <strong>Table:</strong>{" "}
                  {order.tables.map((t) => t.number).join(", ")} <br />
                  <strong>Total:</strong> ${order.total} <br />
                  <strong>Note:</strong> {order.note || "No note"} <br />
                </Card.Text>
                <Card.Text>
                  <strong>Order Items:</strong>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.foodId}>
                        {item.name} x {item.quantity} - Price: ${item.total} -{" "}
                        {item.status} - Cooked : {item.cooked}
                      </li>
                    ))}
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OrderWaiter;
