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
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  FiArrowDown,
  FiArrowUp,
  FiCalendar,
  FiDollarSign,
  FiShoppingBag,
} from "react-icons/fi";
import useOrderApi from "../hooks/api/useOrderApi";

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

  const [todayRevenue, setTodayRevenue] = useState(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);

  const [thisMonthRevenue, setThisMonthRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);

  const [totalOrders, setTotalOrders] = useState(0);

  const [totalRevenue, setTotalRevenue] = useState(0);

  const [branchRevenueData, setBranchRevenueData] = useState([]);

  const [branchesMonthlyRevenue, setBranchesMonthlyRevenue] = useState([]);

  const [topDish, setTopDishes] = useState([]);

  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [yearlyRevenueData, setYearlyRevenueData] = useState([]);

  const {
    getDailyRevenue,
    getMonthRevenue,
    getMonthDailyRevenue,
    getYearMonthlyRevenue,
    getAllYearRevenue,
    getTotalOrder,
    getTotalRevenue,
    getBranchesRevenue,
    getBranchesMonthlyRevenue,
    getBestseller,
  } = useOrderApi();

  useEffect(() => {
    const fetchRevenues = async () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      // Daily Revenue Date Strings
      const todayString = today.toISOString().split("T")[0];
      const yesterdayString = yesterday.toISOString().split("T")[0];

      // Monthly Revenue Information
      const thisMonth = today.getMonth() + 1;
      const thisYear = today.getFullYear();
      const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
      const lastMonthYear = thisMonth === 1 ? thisYear - 1 : thisYear;

      try {
        // ** Fetch Today and Yesterday Revenue for KPI Cards **
        const todayResponse = await getDailyRevenue(todayString);
        const yesterdayResponse = await getDailyRevenue(yesterdayString);
        setTodayRevenue(todayResponse.revenue || 0);
        setYesterdayRevenue(yesterdayResponse.revenue || 0);

        // ** Fetch This Month and Last Month Revenue for KPI Cards **
        const thisMonthResponse = await getMonthRevenue(thisMonth, thisYear);
        const lastMonthResponse = await getMonthRevenue(
          lastMonth,
          lastMonthYear
        );
        setThisMonthRevenue(thisMonthResponse.revenue || 0);
        setLastMonthRevenue(lastMonthResponse.revenue || 0);

        // Fetch Daily Revenue
        if (revenueView === "daily") {
          const todayResponse = await getDailyRevenue(todayString);
          const yesterdayResponse = await getDailyRevenue(yesterdayString);
          setTodayRevenue(todayResponse.revenue || 0);
          setYesterdayRevenue(yesterdayResponse.revenue || 0);

          const monthDailyResponse = await getMonthDailyRevenue(
            thisMonth,
            thisYear
          );
          const sortedData = (monthDailyResponse || []).sort(
            (a, b) => new Date(a.day) - new Date(b.day)
          );

          setDailyRevenueData(sortedData);
        }

        // Fetch Monthly Revenue
        if (revenueView === "monthly") {
          const thisMonthResponse = await getMonthRevenue(thisMonth, thisYear);
          const lastMonthResponse = await getMonthRevenue(
            lastMonth,
            lastMonthYear
          );
          setThisMonthRevenue(thisMonthResponse.revenue || 0);
          setLastMonthRevenue(lastMonthResponse.revenue || 0);

          const yearMonthlyResponse = await getYearMonthlyRevenue(thisYear);
          const transformedData = [...yearMonthlyResponse]
            .map((data) => ({
              month: months[data.month - 1],
              revenue: data.revenue,
            }))
            .sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));

          setMonthlyRevenueData(transformedData);
        }

        // Fetch Yearly Revenue
        if (revenueView === "yearly") {
          const allYearRevenueResponse = await getAllYearRevenue();
          const transformedYearlyData = allYearRevenueResponse
            .map((data) => ({
              year: data.year,
              revenue: data.revenue,
            }))
            .sort((a, b) => a.year - b.year);

          setYearlyRevenueData(transformedYearlyData);
        }

        // Fetch Total Orders (Independent of revenueView)
        const totalOrdersResponse = await getTotalOrder();
        setTotalOrders(totalOrdersResponse.orders || 0);

        // Fetch Total Revenue (Independent of revenueView)
        const totalRevenueResponse = await getTotalRevenue();
        setTotalRevenue(totalRevenueResponse.revenue || 0);

        // Fetch Branches Revenue for Pie Chart (Independent of revenueView)
        const branchesRevenueResponse = await getBranchesRevenue();
        const pieChartTransformedData = branchesRevenueResponse.map(
          (branch) => ({
            branchName: branch.branchName.trim(),
            revenue: branch.revenue,
          })
        );
        setBranchRevenueData(pieChartTransformedData);

        // Fetch Branches Monthly Revenue for Bar Chart
        const branchesMonthlyResponse = await getBranchesMonthlyRevenue();
        const transformedBranchesData = Object.entries(
          branchesMonthlyResponse
        ).map(([month, branches]) => ({
          month: months[parseInt(month, 10) - 1],
          branches: branches.map((branch) => ({
            branchName: branch.branchName.trim(),
            revenue: branch.revenue,
          })),
        }));
        setBranchesMonthlyRevenue(transformedBranchesData);

        // Fetch Best Sellers
        const bestSellersResponse = await getBestseller();
        setTopDishes(
          bestSellersResponse.map((dish) => ({
            name: dish.foodName,
            revenue: dish.revenue,
            quantity: dish.quantity,
          }))
        );
      } catch (error) {
        console.error("Error fetching revenues:", error);
      }
    };

    fetchRevenues();
  }, [revenueView]);

  const revenueChange =
    yesterdayRevenue > 0
      ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100
      : 0;

  const monthlyRevenueChange =
    lastMonthRevenue > 0
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 0;

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

  const barChartData = {
    labels: branchesMonthlyRevenue.map((data) => data.month || "Unknown Month"),
    datasets:
      branchesMonthlyRevenue[0]?.branches?.map((branch, index) => ({
        label: branch.branchName || "Unknown Branch",
        data: branchesMonthlyRevenue.map((monthData) => {
          const branchData = monthData.branches.find(
            (b) => b.branchName === branch.branchName
          );
          return branchData ? branchData.revenue : 0;
        }),

        backgroundColor:
          index % 2 === 0 ? "rgba(143,217,251, 0.4)" : "rgba(255,75,51, 0.4)",
        borderColor: index % 2 === 0 ? "rgb(143,217,251)" : "rgb(255,75,51)",
        borderWidth: 2,
        hoverBackgroundColor:
          index % 2 === 0 ? "rgba(143,217,251, 0.8)" : "rgba(255,75,51, 0.8)",
      })) || [],
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
          labels: dailyRevenueData.map(
            (data) => `Day ${new Date(data.day).getDate()}`
          ),
          datasets: [
            {
              label: "Revenue Trend",
              data: dailyRevenueData.map((data) => data.revenue),
              borderColor: "rgb(143,217,251, 0.8)",
              backgroundColor: "rgb(143,217,251, 0.4)",
              tension: 0.4,
              fill: false,
            },
          ],
        };
      case "yearly":
        return {
          labels: yearlyRevenueData.map((data) => data.year),
          datasets: [
            {
              label: "Revenue Trend",
              data: yearlyRevenueData.map((data) => data.revenue),
              borderColor: "rgb(143,217,251, 0.8)",
              backgroundColor: "rgb(143,217,251, 0.4)",
              tension: 0.4,
              fill: false,
            },
          ],
        };
      default:
        return {
          labels: monthlyRevenueData.map((data) => data.month),
          datasets: [
            {
              label: "Revenue Trend",
              data: monthlyRevenueData.map((data) => data.revenue),
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
    labels: branchRevenueData.map((branch) => branch.branchName),
    datasets: [
      {
        data: branchRevenueData.map((branch) => branch.revenue),
        backgroundColor: ["rgba(255,75,51, 0.8)", "rgba(143,217,251, 0.8)"],
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
            style={{
              backgroundColor: "#141414",
              borderRadius: "5px",
              height: "100%",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-light">Total Revenue</p>
                <h3 className="fw-bold">${totalRevenue.toLocaleString()}</h3>
              </div>
              <FiCalendar className="text-info fs-2" />
            </div>
          </div>
        </div>

        {/* Total Orders KPI Card */}
        <div className="col-lg-3 col-md-6">
          <div
            className="p-3"
            style={{
              backgroundColor: "#141414",
              borderRadius: "5px",
              height: "100%",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-light">Total Orders</p>
                <h3 className="fw-bold">{totalOrders.toLocaleString()}</h3>
              </div>
              <FiShoppingBag className="text-success fs-2" />
            </div>
          </div>
        </div>

        {/* Today Revenue KPI Card */}
        <div className="col-lg-3 col-md-6">
          <div
            className="p-3"
            style={{ backgroundColor: "#141414", borderRadius: "5px" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-light">Today Revenue</p>
                <h3 className="fw-bold">${todayRevenue.toLocaleString()}</h3>
              </div>
              <FiDollarSign className="fs-2" style={{ color: "purple" }} />
            </div>
            <div
              className={`d-flex align-items-center mt-2 ${
                revenueChange > 0 ? "text-success" : "text-danger"
              }`}
            >
              {revenueChange > 0 ? <FiArrowUp /> : <FiArrowDown />}
              <span className="ms-1">
                {Math.abs(revenueChange).toFixed(2)}% compared to yesterday
              </span>
            </div>
          </div>
        </div>

        {/* This Month Revenue KPI Card */}
        <div className="col-lg-3 col-md-6">
          <div
            className="p-3"
            style={{ backgroundColor: "#141414", borderRadius: "5px" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-light">This Month Revenue</p>
                <h3 className="fw-bold">
                  ${thisMonthRevenue.toLocaleString()}
                </h3>
              </div>
              <FiDollarSign className="text-warning fs-2" />
            </div>
            <div
              className={`d-flex align-items-center mt-2 ${
                monthlyRevenueChange > 0 ? "text-success" : "text-danger"
              }`}
            >
              {monthlyRevenueChange > 0 ? <FiArrowUp /> : <FiArrowDown />}
              <span className="ms-1">
                {Math.abs(monthlyRevenueChange).toFixed(2)}% compared to last
                month
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

        {/* Pie Chart */}
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
          <Bar data={barChartData} options={options} />
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
              {topDish.map((dish, index) => (
                <tr key={index}>
                  <td>{dish.name}</td>
                  <td className="text-end">{dish.revenue} $</td>
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
