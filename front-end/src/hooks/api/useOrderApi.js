import useAxiosPrivate from "../useAxiosPrivate";
const useOrderApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const getOrderInTimebyBranchID = async (id) => {
    try {
      const response = await axiosPrivate.get(`/orderInTime/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch order with BranchID ${id}:`, error);
      throw error;
    }
  };

  const getDailyRevenue = async (date) => {
    try {
      const response = await axiosPrivate.get(`/revenue/day?date=${date}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch daily revenue for date ${date}:`, error);
      throw error;
    }
  };

  const getMonthRevenue = async (month, year) => {
    try {
      const response = await axiosPrivate.get(
        `/revenue/month?month=${month}&year=${year}`
      );
      return response;
    } catch (error) {
      console.error(
        `Failed to fetch monthly revenue for month ${month} and ${year}:`,
        error
      );
      throw error;
    }
  };

  const getTotalOrder = async () => {
    try {
      const response = await axiosPrivate.get(`/totalOrder`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch total order:`, error);
      throw error;
    }
  };

  const getTotalRevenue = async () => {
    try {
      const response = await axiosPrivate.get(`/revenue/all`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch total order:`, error);
      throw error;
    }
  };

  const getBranchesRevenue = async () => {
    try {
      const response = await axiosPrivate.get(`/revenue/branches`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch total order:`, error);
      throw error;
    }
  };

  const getBranchesMonthlyRevenue = async () => {
    try {
      const response = await axiosPrivate.get(`/revenue/branches/monthly`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch total order:`, error);
      throw error;
    }
  };

  const getMonthDailyRevenue = async (month, year) => {
    try {
      const response = await axiosPrivate.get(
        `/revenue/month/daily?month=${month}&year=${year}`
      );

      return response;
    } catch (error) {
      console.error(
        `Failed to fetch monthly revenue for month ${month} and ${year}:`,
        error
      );
      throw error;
    }
  };

  const getYearMonthlyRevenue = async (year) => {
    try {
      const response = await axiosPrivate.get(
        `/revenue/year/monthly?year=${year}`
      );

      return response;
    } catch (error) {
      console.error(
        `Failed to fetch monthly revenue for month  ${year}:`,
        error
      );
      throw error;
    }
  };

  const getAllYearRevenue = async () => {
    try {
      const response = await axiosPrivate.get(`/revenue/all-years`);

      return response;
    } catch (error) {
      console.error(`Failed to fetch monthly revenue for month:`, error);
      throw error;
    }
  };

  const getBestseller = async () => {
    try {
      const response = await axiosPrivate.get(`/bestSeller`);

      return response;
    } catch (error) {
      console.error(`Failed to fetch monthly revenue for month:`, error);
      throw error;
    }
  };

  return {
    getOrderInTimebyBranchID,
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
  };
};

export default useOrderApi;
