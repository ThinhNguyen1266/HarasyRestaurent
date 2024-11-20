import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegClock, FaRegUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axiosPublic from "../services/axios";
import "../assets/styles/FindTable.css";

const FindTable = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const branchId = params.get("branchId");
  const branch = params.get("branch");
  const [request, setRequest] = useState({
    branchId: branchId,
    date: "",
    time: "",
    amnountGuest: "1",
  });
  const [reserveTimeOptions, setReserveTimeOptions] = useState([]);
  const branchTitle = `Reservation at ${branch.split("-").join(" ")} `;

  const generateTimeOptions = () => {
    const times = [];
    let hour = 0;
    let minute = 0;

    while (hour <= 23) {
      const formattedHour = hour < 10 ? `0${hour}` : hour;
      const formattedMinute = minute === 0 ? "00" : minute;
      times.push(`${formattedHour}:${formattedMinute}`);
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }

    return times;
  };
  console.log(request);
  const timeOptions = generateTimeOptions();
  const guestOption = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const canFindTime = () => {
    for (const key in request) {
      if (Object.prototype.hasOwnProperty.call(request, key)) {
        const element = request[key];
        if (element == null || element == "") return false;
      }
    }
    return true;
  };

  const findTime = async (request) => {
    const res = await axiosPublic.post("/reserve/availableTime", request);
    setReserveTimeOptions(res.data.availableReservations);
  };

  return (
    <div className="findtable-page">
      <Container
        fluid
        className="h-100 d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col md={12} className="text-center">
            <div className="brandfb-logo">
              <Link to="/">
                <img
                  src={require("../assets/img/logo.png")}
                  alt="Logo"
                  className="d-inline-block align-top"
                />
              </Link>
            </div>
            <div className="findtable-box">
              <h2 className="findtable-title">{branchTitle}</h2>
              <div className="reservation-steps">
                <h3 className="steps-title">
                  <span className="active-step">1. FIND A TABLE</span>
                  &nbsp;&nbsp;
                  <span>2. YOUR DETAILS</span>
                </h3>
                <hr className="steps-divider" />
              </div>
              <Form className="table-form">
                <Row className="mb-3 g-0 align-items-center justify-content-center">
                  <Col md={3} className="col-style">
                    <div className="user-picker-wrapper">
                      <FaRegUser className="user-icon" />
                      <Form.Select
                        className="form-select"
                        onChange={(e) => {
                          setRequest({
                            ...request,
                            amnountGuest: e.target.value,
                          });
                          console.log(request);
                        }}
                      >
                        {guestOption.map((a) => (
                          <option value={a}>{a} peoples</option>
                        ))}
                      </Form.Select>
                    </div>
                  </Col>

                  <Col md={3} className="col-style">
                    <Form.Control
                      type="date"
                      className="form-control "
                      onChange={(e) => {
                        setRequest({ ...request, date: e.target.value });
                      }}
                    />
                  </Col>
                  <Col md={3} className="col-style">
                    <div className="time-picker-wrapper">
                      <FaRegClock className="clock-icon" />
                      <Form.Select
                        className="form-select"
                        onChange={(e) => {
                          setRequest({ ...request, time: e.target.value });
                        }}
                      >
                        {timeOptions.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Col>
                  <Col md={3} className="col-style">
                    <Button
                      style={{
                        backgroundColor: "#fb8500",
                        color: "#000000",
                        border: "#fb8500",
                        fontWeight: "bold",
                      }}
                      className="w-100"
                      onClick={() => {
                        findTime(request);
                      }}
                      disabled={!canFindTime()}
                    >
                      Find a table
                    </Button>
                  </Col>
                </Row>

                <div className="time-options d-flex justify-content-between">
                  {reserveTimeOptions.map((option, index) => (
                    <Button
                      as={Link}
                      to={
                        option.available
                          ? `/reservationdetails?branch=${branch}&time=${option}`
                          : "#"
                      }
                      key={index}
                      className={`time-btn d-flex align-items-center justify-content-center`}
                    >
                      <FaRegClock
                        style={{
                          marginRight: "8px",
                          fontSize: "16px",
                        }}
                      />
                      {option}
                    </Button>
                  ))}
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindTable;
