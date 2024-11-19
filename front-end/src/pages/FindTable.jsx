import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegClock, FaRegUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/FindTable.css";

const FindTable = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const branch = params.get("branch") || "ha-noi";

  const branchTitle =
    branch === "ho-chi-minh"
      ? "Reservation at Harasy Ho Chi Minh | Restaurant"
      : "Reservation at Harasy Ha Noi | Restaurant";

  const generateTimeOptions = () => {
    const times = [];
    let hour = 13;
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

  const timeOptions = generateTimeOptions();

  const mockTimeOptions = [
    { time: "5:45", available: true },
    { time: "6:00", available: true },
    { time: "6:15", available: false },
    { time: "7:15", available: true },
    { time: "7:30", available: false },
  ];

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
                      <Form.Select className="form-select">
                        <option>2 people</option>
                        <option>4 people</option>
                        <option>6 people</option>
                      </Form.Select>
                    </div>
                  </Col>

                  <Col md={3} className="col-style">
                    <Form.Control type="date" className="form-control" />
                  </Col>
                  <Col md={3} className="col-style">
                    <div className="time-picker-wrapper">
                      <FaRegClock className="clock-icon" />
                      <Form.Select className="form-select">
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
                    >
                      Find a table
                    </Button>
                  </Col>
                </Row>

                <div className="time-options d-flex justify-content-between">
                  {mockTimeOptions.map((option, index) => (
                    <Button
                      as={Link}
                      to={
                        option.available
                          ? `/reservationdetails?branch=${branch}&time=${option.time}`
                          : "#"
                      }
                      key={index}
                      className={`time-btn d-flex align-items-center justify-content-center ${
                        !option.available ? "disabled" : ""
                      }`}
                      disabled={!option.available}
                    >
                      <FaRegClock
                        style={{
                          marginRight: "8px",
                          fontSize: "16px",
                        }}
                      />
                      {option.time}
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
