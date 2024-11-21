import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaEnvelope,
  FaLocationCrosshairs,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/HNVenues.css";
import useBranchApi from "../hooks/api/useBranchApi";

function HNVenues() {
  const { branchId } = useParams();

  const { getBranchHome } = useBranchApi();

  const { data: branchData, isLoading: isBranchLoading } = useQuery({
    queryKey: ["branchHome", branchId],
    queryFn: () => getBranchHome(branchId),
    onError: (error) => toast.error(`Failed to fetch branch: ${error.message}`),
  });

  if (isBranchLoading) {
    return <div className="hnvenues-container">Loading...</div>;
  }

  if (!branchData) {
    return <div className="hnvenues-container">No data available</div>;
  }

  console.log(branchData);
  return (
    <div className="hnvenues-container">
      <div
        className="hnvenues-header"
        style={{
          backgroundImage: `url(${branchData.image})`,
        }}
      >
        <h1>{branchData.name || "Branch Name"}</h1>
        <div className="hnvenues-buttons">
          <Link to={`/findtable/${branchId}`} className="btn">
            BOOK A TABLE
          </Link>
          <Link
            to={`/menu/${branchData.name?.toLowerCase().replace(/ /g, "-")}`}
            className="btn"
          >
            VIEW THE MENU
          </Link>
        </div>
      </div>
      <div className="hnvenues-cities">
        <div className="city-info">
          <h2>{branchData.name || "Branch Name"}</h2>
          <p>
            <FaLocationDot className="icon" />
            {branchData.location || "Branch Location"}
          </p>
          <p>
            <FaPhone className="icon" />
            {branchData.phone || "Branch Phone"}
          </p>
          <p>
            <FaEnvelope className="icon" />
            harasy@gmail.com
          </p>
          <p>
            <FaLocationCrosshairs className="icon" />
            Get directions
          </p>
        </div>

        <div className="opening-hours">
          <h2>OPENING HOURS</h2>
          {[
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ].map((day) => {
            const workingHour = branchData.workingHours?.find(
              (hour) => hour.dayOfWeek === day
            );

            return (
              <div className="hours-row" key={day}>
                <span className="day">{day}</span>
                <span className="time">
                  {workingHour
                    ? `${workingHour.openingTime} - ${workingHour.closingTime}`
                    : "Closed"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HNVenues;
