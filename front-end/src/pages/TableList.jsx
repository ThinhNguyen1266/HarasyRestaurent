import React, { useState } from "react";
import { FaCheck, FaTimes, FaChair, FaUsers } from "react-icons/fa";
import { Card, Row, Col, Badge, Container, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import "../assets/styles/TableList.css";

const TableList = () => {
  const [tables, setTables] = useState([
    { id: 1, name: "Table 1", capacity: 4, available: true },
    { id: 2, name: "Table 2", capacity: 2, available: false },
    { id: 3, name: "Table 3", capacity: 6, available: true },
    { id: 4, name: "Table 4", capacity: 4, available: true },
    { id: 5, name: "Table 5", capacity: 8, available: false },
    { id: 6, name: "Table 6", capacity: 2, available: true },
    { id: 7, name: "Table 7", capacity: 2, available: true },
    { id: 8, name: "Table 8", capacity: 2, available: true },
  ]);

  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const availableTables = tables.filter((table) => table.available).length;
  const unavailableTables = tables.length - availableTables;

  const handleTableSwitch = (id) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, available: !table.available } : table
      )
    );
  };

  const filteredTables = showAvailableOnly
    ? tables.filter((table) => table.available)
    : tables;

  return (
    <div className="layout">
      <Sidebar /> {/* Sidebar component */}
      <div className="main-content">
        <h1 className="text-center text-white mb-4 pt-5">Table</h1>

        <Container className="py-5">
          <Row className="g-4 content">
            <Row className="header-content">
              <Col xs="auto" className="text-center">
                <Form.Check
                  type="checkbox"
                  id="available-tables"
                  label="Show Available Only"
                  className="mb-4 custom-checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                />
              </Col>
              <Col xs="auto" className="text-center count-table">
                <div className="count-available">
                  <Badge pill bg="success" className="fs-5">
                    {availableTables}
                  </Badge>
                  <p>Available</p>
                </div>
                <div>
                  <Badge pill bg="danger" className="fs-5">
                    {unavailableTables}
                  </Badge>
                  <p>Unavailable</p>
                </div>
              </Col>
            </Row>
            {filteredTables.map((table) => (
              <Col xs={12} sm={6} lg={4} key={table.id}>
                <Card
                  className={`${
                    table.available ? "border-success" : "border-danger"
                  } border-top-4 border-4`}
                >
                  <Card.Body className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-white">{table.name}</h5>
                      <Form>
                        <Form.Check
                          type="switch"
                          id={`table-switch-${table.id}`}
                          checked={table.available}
                          onChange={() => handleTableSwitch(table.id)}
                          className=" custom-switch"
                        />
                      </Form>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-white">
                      <FaChair className="me-2 text-white" />
                      <span>Capacity: {table.capacity}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-white">
                      <FaUsers className="me-2 text-white" />
                      <span>
                        {table.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <div className="mt-3">
                      {table.available ? (
                        <span className="text-success d-flex align-items-center">
                          <FaCheck className="me-1" /> Ready for seating
                        </span>
                      ) : (
                        <span className="text-danger d-flex align-items-center">
                          <FaTimes className="me-1" /> Currently occupied
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TableList;
