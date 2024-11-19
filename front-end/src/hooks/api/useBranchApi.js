import axios from "../../services/axios";
import useAxiosPrivate from "../useAxiosPrivate";
const useBranchApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getBranchHome = async (id) => {
    try {
      const branchesData = await axios.get(`/branch/home/${id}`);
      return branchesData.data;
    } catch (error) {
      throw error;
    }
  };

  const getBranchMenu = async (id) => {
    try {
      const branchesData = await axios.get(`/branch/${id}/menus`);
      return branchesData.data;
    } catch (error) {
      throw error;
    }
  };

  const getBranchesHome = async () => {
    try {
      const branchesData = await axios.get("/branches/home");
      return branchesData.data;
    } catch (error) {
      throw error;
    }
  };

  const getBranchesStaff = async () => {
    try {
      const branchesData = await axiosPrivate.get("/branches");
      return branchesData;
    } catch (error) {
      throw error;
    }
  };

  const getBranchManagers = async () => {
    try {
      const params = {
        role: "BRANCH_MANAGER",
        status: "ACTIVE",
      };

      const response = await axiosPrivate.get("/staff/search", { params });
      console.log("Full Response:", response);

      return response;
    } catch (error) {
      console.error("Failed to fetch branch managers:", error);
      throw error;
    }
  };

  const getBranchbyID = async (id) => {
    try {
      const response = await axiosPrivate.get(`/branch/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch branch with ID ${id}:`, error);
      throw error;
    }
  };

  const createBranch = async (newBranch) => {
    try {
      const payload = {
        branchInfo: {
          name: newBranch.name,
          location: newBranch.location,
          image: newBranch.image,
          phone: newBranch.phone,

          manager: newBranch.manager,
          status: newBranch.status,
          workingHours: newBranch.workingHours.filter(
            (hour) => hour.dayOfWeek && hour.openingTime && hour.closingTime
          ),
        },
        workingHours: {},
        tables: {
          creates: newBranch.tables.filter(
            (table) => table.number && table.capacity
          ),
        },
        menus: {
          creates: newBranch.menus.filter((menu) => menu.type),
        },
      };
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, v]) => v != null && v.length !== 0)
      );

      const branch = (await axiosPrivate.post("/branch", filteredPayload)).data;
      return branch;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  const updateBranch = async (updatedBranch) => {
    try {
      const workingHours = Array.isArray(updatedBranch.workingHours)
        ? updatedBranch.workingHours.filter(
            (hour) => hour.dayOfWeek && hour.openingTime && hour.closingTime
          )
        : [];

      const payload = {
        branchInfo: {
          id: updatedBranch.branchInfo.id,
          name: updatedBranch.branchInfo.name,
          location: updatedBranch.branchInfo.location,
          image: updatedBranch.branchInfo.image,
          phone: updatedBranch.branchInfo.phone,
          manager: updatedBranch.branchInfo.manager,
          status: updatedBranch.branchInfo.status,
        },
        workingHours: {}, // Assuming this is for another purpose
        tables: {
          creates: updatedBranch.tables.creates || [],
          updates: updatedBranch.tables.updates || [],
        },
        menus: {
          creates: updatedBranch.menus.creates || [],
          updates: updatedBranch.menus.updates || [],
        },
      };

      // Sending the update request to the backend
      const branch = await axiosPrivate.put(
        `/branch/${updatedBranch.branchInfo.id}`,
        payload
      ).data;
      console.log("Branch data sent:", JSON.stringify(payload, null, 2));
      return branch;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  const deleteBranch = async (branchId) => {
    try {
      const branch = await axiosPrivate.delete(`/branch/${branchId}`);
      return branch;
    } catch (error) {
      throw error;
    }
  };

  const getMenubyBranchID = async (id, includeAll = true) => {
    try {
      // Thêm tham số includeAll vào URL
      const response = await axiosPrivate.get(`/branch/${id}/menus`, {
        params: {
          includeAll: includeAll,
        },
      });
      return response;
    } catch (error) {
      console.error(`Failed to fetch menus for branch with ID ${id}:`, error);
      throw error;
    }
  };

  return {
    getBranchesStaff,
    getBranchHome,
    createBranch,
    updateBranch,
    deleteBranch,
    getBranchManagers,
    getBranchbyID,
    getBranchesHome,
    getBranchMenu,
    getMenubyBranchID,
  };
};

export default useBranchApi;
