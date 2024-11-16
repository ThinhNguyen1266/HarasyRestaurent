import useAxiosPrivate from "../useAxiosPrivate";
import axios from "../../services/axios";
const useBranchApi = () => {
  const axiosPrivate = useAxiosPrivate();

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
      // Ensure workingHours is an array before applying filter
      const workingHours = Array.isArray(updatedBranch.workingHours)
        ? updatedBranch.workingHours.filter(
            (hour) => hour.dayOfWeek && hour.openingTime && hour.closingTime
          )
        : [];

      const payload = {
        branchInfo: {
          id: updateBranch.id,
          name: updatedBranch.name,
          location: updatedBranch.location,
          image: updatedBranch.image,
          phone: updatedBranch.phone,
          manager: updatedBranch.manager,
          status: updatedBranch.status,
        },
        workingHours: {}, // Assuming this is for another purpose
        tables: {
          creates: updatedBranch.tables.creates,
          updates: updatedBranch.tables.updates,
        },
        menus: {
          creates: updatedBranch.menus.creates,
          updates: updatedBranch.menus.updates,
        },
      };

      // Sending the update request to the backend
      const branch = await axiosPrivate.put(
        `/branch/${updatedBranch.branchInfo.id}`,
        payload
      ).data;
      console.log("Branch data sent:", payload);
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

  return {
    getBranchesStaff,
    createBranch,
    updateBranch,
    deleteBranch,
    getBranchManagers,
    getBranchbyID,
  };
};

export default useBranchApi;
