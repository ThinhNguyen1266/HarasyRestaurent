import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegClock, FaRegUser } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";
import axiosPublic from "../services/axios";
import useBranchApi from "../hooks/api/useBranchApi";
import "../assets/styles/FindTable.css";

const FindTable = () => {
  const { branchId } = useParams();
  const { getBranchHome } = useBranchApi();
  const [request, setRequest] = useState({
    branchId: branchId,
    date: "",
    time: "",
    amnountGuest: "1",
  });

  const { data: branchData } = useQuery({
    queryKey: ["branchHome", branchId],
    queryFn: () => getBranchHome(branchId),
    onError: (error) => toast.error(`Failed to fetch branch: ${error.message}`),
  });

  const [filterTimeOptions, setFilterTimeOptions] = useState([]);
  const [reserveTimeOptions, setReserveTimeOptions] = useState([]);
  const branchTitle = `Reservation at ${branchData?.name}`;

  const getChunkTime = (reserveTimeOptions) => {
    const chunks = [];
    let chunkSize = 4;
    for (let i = 0; i < reserveTimeOptions.length; i += chunkSize) {
      const chunk = reserveTimeOptions.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };

  const isWithinWorkingHours = (workingHours, selectedDate, selectedTime) => {
    const dayOfWeek = moment(selectedDate).format("dddd").toUpperCase(); // Lấy thứ (ví dụ: MONDAY)
    const workingHour = workingHours.find((w) => w.dayOfWeek === dayOfWeek);

    if (!workingHour) {
      return false; // Không tìm thấy giờ làm việc cho ngày được chọn
    }

    const openingTime = moment(workingHour.openingTime, "HH:mm:ss");
    const closingTime = moment(workingHour.closingTime, "HH:mm:ss");
    const selectedTimeMoment = moment(selectedTime, "HH:mm");

    return selectedTimeMoment.isBetween(openingTime, closingTime, null, "[)");
  };

  const filterTime = (workingHours, selectedDate) => {
    const dayOfWeek = moment(selectedDate).format("dddd").toUpperCase(); // Lấy thứ
    const workingHour = workingHours.find((w) => w.dayOfWeek === dayOfWeek);

    if (!workingHour) {
      return []; // Không có giờ làm việc cho ngày này
    }

    const openingTime = moment(workingHour.openingTime, "HH:mm:ss");
    const closingTime = moment(workingHour.closingTime, "HH:mm:ss");

    const times = generateTimeOptions(); // Sử dụng hàm `generateTimeOptions` từ code của bạn
    return times.filter((time) => {
      const timeMoment = moment(time, "HH:mm");
      return timeMoment.isBetween(openingTime, closingTime, null, "[)");
    });
  };

  const handleDateChange = (selectedDate) => {
    setRequest({ ...request, date: selectedDate });
    const validTimes = filterTime(branchData?.workingHours || [], selectedDate);
    setFilterTimeOptions(validTimes);
  };

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
        if (element == null || element === "") return false;
      }
    }
    return true;
  };

  const findTime = async (request) => {
    const { date, time } = request;
    if (!isWithinWorkingHours(branchData?.workingHours || [], date, time)) {
      toast.error("Selected time is outside working hours.");
      return;
    }
    try {
      const res = await axiosPublic.post("/reserve/availableTime", request);
      setReserveTimeOptions(res.data.availableReservations);
    } catch (error) {
      toast.error("Failed to find available times.");
    }
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
                      min={moment().format("YYYY-MM-DD")}
                      onChange={(e) => handleDateChange(e.target.value)}
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
                        {filterTimeOptions.map((time, index) => (
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

                {getChunkTime(reserveTimeOptions).map((chunk) => (
                  <Row>
                    <div className="time-options d-flex justify-content-between ">
                      {chunk.map((option, index) => (
                        <Col md={3}>
                          <Button
                            as={Link}
                            to={`/reservationdetails?branchid=${branchData?.id}&branch=${branchData?.name}&time=${option}&guests=${request.amnountGuest}&location=${branchData?.location}&date=${request.date}`}
                            key={index}
                            className={`time-btn d-flex align-items-center justify-content-center mx-1`}
                          >
                            <FaRegClock
                              style={{
                                marginRight: "8px",
                                fontSize: "16px",
                              }}
                            />
                            {option}
                          </Button>
                        </Col>
                      ))}
                    </div>
                  </Row>
                ))}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindTable;
