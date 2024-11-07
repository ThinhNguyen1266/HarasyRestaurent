import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  FiArrowDown,
  FiArrowUp,
  FiCalendar,
  FiShoppingBag,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const [revenueView, setRevenueView] = useState("monthly");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [...Array(31)].map((_, i) => `Day ${i + 1}`);
  const years = ["2019", "2020", "2021", "2022", "2023"];

  const [branch1Data, setBranch1Data] = useState([
    50000, 55000, 45000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000,
    100000,
  ]);
  const [branch2Data, setBranch2Data] = useState([
    75000, 70000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000,
    120000, 195000,
  ]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Harasy Ha Noi",
        data: branch1Data,
        backgroundColor: "rgba(143,217,251, 0.4)",
        borderColor: "rgb(143,217,251)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(143,217,251, 0.8)",
      },
      {
        label: "Harasy Ho Chi Minh",
        data: branch2Data,
        backgroundColor: "rgba(255,75,51, 0.4)",
        borderColor: "rgb(255,75,51)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,75,51, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: $${context.raw.toLocaleString()}`,
        },
      },
      title: {
        display: true,
        text: "Monthly Branch Revenue Comparison",
        font: {
          size: 20,
        },
        color: "#FFFFFF",
      },
    },
    animation: {
      duration: 1000,
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Months",
          color: "#FFFFFF",
        },
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Revenue ($)",
          color: "#FFFFFF",
        },
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const kpiData = {
    totalRevenue: { value: "$1,435,000", change: 12.5 },
    totalCustomers: { value: "15,234", change: -2.3 },
    successfulOrders: { value: "8,945", change: 5.7 },
    newCustomers: { value: "1,123", change: 8.9 },
  };

  const topDishes = [
    { name: "Special Burger", revenue: "$25,000", quantity: 2500 },
    { name: "Classic Pizza", revenue: "$22,000", quantity: 2200 },
    { name: "Chicken Wings", revenue: "$18,000", quantity: 1800 },
    { name: "Caesar Salad", revenue: "$15,000", quantity: 1500 },
    { name: "Ice Cream Sundae", revenue: "$12,000", quantity: 1200 },
  ];

  const getLineChartData = () => {
    switch (revenueView) {
      case "daily":
        return {
          labels: days,
          datasets: [
            {
              label: "Revenue Trend",
              data: Array(31)
                .fill()
                .map(() => Math.floor(Math.random() * 50000) + 10000),
              borderColor: "rgb(143,217,251, 0.8)",
              backgroundColor: "rgb(143,217,251, 0.4)",
              tension: 0.4,
              fill: false,
            },
          ],
        };
      case "yearly":
        return {
          labels: years,
          datasets: [
            {
              label: "Revenue Trend",
              data: [300000, 400000, 600000, 800000, 1000000],
              borderColor: "rgb(143,217,251, 0.8)",
              backgroundColor: "rgb(143,217,251, 0.4)",
              tension: 0.4,
              fill: false,
            },
          ],
        };
      default:
        return {
          labels: months,
          datasets: [
            {
              label: "Revenue Trend",
              data: [
                120000, 150000, 180000, 220000, 250000, 280000, 310000, 350000,
                380000, 410000, 450000, 500000,
              ],
              borderColor: "rgb(143,217,251, 0.8)",
              backgroundColor: "rgb(143,217,251, 0.4)",
              tension: 0.4,
              fill: false,
            },
          ],
        };
    }
  };

  const pieChartData = {
    labels: ["Harasy Ha Noi", "Harasy Ho Chi Minh"],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: ["rgba(143,217,251, 0.8)", "rgba(255,75,51, 0.8)"],
        borderColor: ["rgb(20, 20, 20)"],
        hoverOffset: 10,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#FFFFFF",
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top", labels: { color: "#FFFFFF" } },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: $${context.raw.toLocaleString()}`,
        },
      },
      title: {
        display: true,
        text: "Branch Revenue Comparison",
        font: { size: 20 },
        color: "#FFFFFF",
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "#FFFFFF" },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "#FFFFFF" },
      },
    },
  };
  return (
    <div className="container p-3 mt-5 text-white">
      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        {/* Total Revenue Card */}
        <div className="col-lg-3 col-md-6">
          <div
            className="p-3"
            style={{ backgroundColor: "#141414", borderRadius: "5px" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-light">Total Revenue</p>
                <h3 className="fw-bold">{kpiData.totalRevenue.value}</h3>
              </div>
              <FiCalendar className="text-info fs-2" />
            </div>
            <div
              className={`d-flex align-items-center mt-2 ${
                kpiData.totalRevenue.change > 0 ? "text-success" : "text-danger"
              }`}
            >
              {kpiData.totalRevenue.change > 0 ? (
                <FiArrowUp />
              ) : (
                <FiArrowDown />
              )}
              <span className="ms-1">
                {Math.abs(kpiData.totalRevenue.change)}%
              </span>
            </div>
          </div>
        </div>

        {/* Successful Orders KPI Card */}
        <div className="col-lg-3 col-md-6">
          <div
            className="p-3"
            style={{ backgroundColor: "#141414", borderRadius: "5px" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-light">Successful Orders</p>
                <h3 className="fw-bold">{kpiData.successfulOrders.value}</h3>
              </div>
              <FiShoppingBag className="text-success fs-2" />
            </div>
            <div
              className={`d-flex align-items-center mt-2 ${
                kpiData.successfulOrders.change > 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {kpiData.successfulOrders.change > 0 ? (
                <FiArrowUp />
              ) : (
                <FiArrowDown />
              )}
              <span className="ms-1">
                {Math.abs(kpiData.successfulOrders.change)}%
              </span>
            </div>
          </div>
        </div>

        {/* Total Customers KPI Card */}
        <div className="col-lg-3 col-md-6">
          <div
            className="p-3"
            style={{ backgroundColor: "#141414", borderRadius: "5px" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-light">Total Customers</p>
                <h3 className="fw-bold">{kpiData.totalCustomers.value}</h3>
              </div>
              <FiUser className="fs-2" style={{ color: "purple" }} />
            </div>
            <div
              className={`d-flex align-items-center mt-2 ${
                kpiData.totalCustomers.change > 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {kpiData.totalCustomers.change > 0 ? (
                <FiArrowUp />
              ) : (
                <FiArrowDown />
              )}
              <span className="ms-1">
                {Math.abs(kpiData.totalCustomers.change)}%
              </span>
            </div>
          </div>
        </div>

        {/* New Customers KPI Card */}
        <div className="col-lg-3 col-md-6">
          <div
            className="p-3"
            style={{ backgroundColor: "#141414", borderRadius: "5px" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-light">New Customers</p>
                <h3 className="fw-bold">{kpiData.newCustomers.value}</h3>
              </div>
              <FiUserPlus className="text-warning fs-2" />
            </div>
            <div
              className={`d-flex align-items-center mt-2 ${
                kpiData.newCustomers.change > 0 ? "text-success" : "text-danger"
              }`}
            >
              {kpiData.newCustomers.change > 0 ? (
                <FiArrowUp />
              ) : (
                <FiArrowDown />
              )}
              <span className="ms-1">
                {Math.abs(kpiData.newCustomers.change)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div
            className="p-3"
            style={{ backgroundColor: "#141414", borderRadius: "5px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Revenue Trend</h5>
              <div className="btn-group">
                <button
                  className={`btn ${
                    revenueView === "daily" ? "btn-primary" : "btn-dark"
                  }`}
                  onClick={() => setRevenueView("daily")}
                >
                  Daily
                </button>
                <button
                  className={`btn ${
                    revenueView === "monthly" ? "btn-primary" : "btn-dark"
                  }`}
                  onClick={() => setRevenueView("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`btn ${
                    revenueView === "yearly" ? "btn-primary" : "btn-dark"
                  }`}
                  onClick={() => setRevenueView("yearly")}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div style={{ height: "300px" }}>
              <Line data={getLineChartData()} options={lineChartOptions} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="p-3 h-100"
            style={{
              backgroundColor: "#141414",
              borderRadius: "5px",
            }}
          >
            <h5 className="mb-3">Revenue Distribution</h5>
            <div style={{ height: "300px" }}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        className="p-3 mb-4"
        style={{ backgroundColor: "#141414", borderRadius: "5px" }}
      >
        <div style={{ height: "400px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>

      {/* Top Selling Dishes Table */}
      <div
        className="p-3 mb-4"
        style={{ backgroundColor: "#141414", borderRadius: "5px" }}
      >
        <h5 className="mb-3">Top Selling Dishes</h5>
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Dish Name</th>
                <th className="text-end">Revenue</th>
                <th className="text-end">Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {topDishes.map((dish, index) => (
                <tr key={index}>
                  <td>{dish.name}</td>
                  <td className="text-end">{dish.revenue}</td>
                  <td className="text-end">{dish.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
