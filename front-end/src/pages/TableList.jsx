import React, { useState } from "react";
import { FaCheck, FaTimes, FaChair, FaUsers } from "react-icons/fa";
import {
  Card,
  Row,
  Col,
  Badge,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import "../assets/styles/TableList.css";
import useTableApi from "../hooks/api/useTableApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const TableList = () => {
  const queryClient = useQueryClient();
  const { getTablelist, updateTableStatus } = useTableApi();
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]); // State để lưu danh sách bàn được chọn
  const navigate = useNavigate();
  const {
    data: tableData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: getTablelist,
    onError: (error) => {
      console.error(`Failed to fetch tables: ${error.message}`);
    },
  });

  const mutation = useMutation({
    mutationFn: updateTableStatus,
    onSuccess: () => {
      console.log("Table status updated successfully");
      queryClient.invalidateQueries("tables");
    },
    onError: (error) => {
      console.error(`Failed to update table status: ${error.message}`);
    },
  });

  if (isLoading)
    return <h1 className="text-center text-white">Loading tables...</h1>;
  if (error)
    return (
      <h1 className="text-center text-danger">
        Error loading tables: {error.message}
      </h1>
    );

  const tables =
    tableData?.map((table) => ({
      id: table.id,
      number: table.number,
      capacity: table.capacity,
      status: table.status,
    })) || [];

  const filteredTables = showAvailableOnly
    ? tables.filter((table) => table.status === "AVAILABLE")
    : tables;

  const handleTableSelect = (id) => {
    if (selectedTables.includes(id)) {
      setSelectedTables(selectedTables.filter((tableId) => tableId !== id)); // Bỏ chọn bàn
    } else {
      setSelectedTables([...selectedTables, id]); // Thêm bàn vào danh sách được chọn
    }
  };

  const handleTableSwitch = (id, currentStatus) => {
    const newStatus =
      currentStatus === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";
    mutation.mutate({ tableId: id, status: newStatus });
  };

  const availableTables = tables.filter(
    (table) => table.status === "AVAILABLE"
  ).length;
  const unavailableTables = tables.length - availableTables;

  const handleAddOrder = () => {
    navigate("/createorder", { state: { tableIds: selectedTables } });
    console.log("selected: ", selectedTables);
  };
  return (
    <div className="layout">
      <Sidebar />
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
              <Col>
                {selectedTables.length > 0 && (
                  <div className="text-center ">
                    <Button variant="primary" onClick={handleAddOrder}>
                      Create Order
                    </Button>
                  </div>
                )}
              </Col>
              <Col xs="auto" className="text-center count-table">
                <div className="count-available">
                  <Badge pill bg="success" className="fs-5">
                    {availableTables}
                  </Badge>
                  <p className="text-white">Available</p>
                </div>
                <div>
                  <Badge pill bg="danger" className="fs-5">
                    {unavailableTables}
                  </Badge>
                  <p className="text-white">Unavailable</p>
                </div>
              </Col>
            </Row>
            {filteredTables.map((table) => (
              <Col xs={12} sm={6} lg={4} key={table.id}>
                <Card
                  onClick={() => handleTableSelect(table.id)}
                  className={`${
                    table.status === "AVAILABLE"
                      ? "border-success"
                      : "border-danger"
                  } ${
                    selectedTables.includes(table.id) ? "selected-table" : ""
                  } border-top-4 border-4`}
                >
                  <Card.Body className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-white">{`Table ${table.number}`}</h5>
                      <Form>
                        <Form.Check
                          type="switch"
                          id={`table-switch-${table.id}`}
                          checked={table.status === "AVAILABLE"}
                          onChange={() =>
                            handleTableSwitch(table.id, table.status)
                          }
                          className="custom-switch"
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
                        {table.status === "AVAILABLE"
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>
                    <div className="mt-3">
                      {table.status === "AVAILABLE" ? (
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
