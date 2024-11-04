import useAxiosPrivate from "../useAxiosPrivate";
import axios from "../../services/axios";
const useBranchApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getBranchesStaff = async () => {
    try {
      const branchesData = (await axios.get("/staff/branches")).data;
      return branchesData;
    } catch (error) {
      throw error;
    }
  };
  const getBranchManagers = async () => {
    try {
      const response = await axiosPrivate.get("/staff/BRANCH_MANAGER");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch branch managers:", error);
      throw error;
    }
  };
  const getBranchbyID = async (id) => {
    try {
      const response = await axiosPrivate.get(`/branch/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch branch with ID ${id}:`, error);
      throw error;
    }
  };

  const createBranch = async (newBranch) => {
    try {
      // Chỉ lấy các trường có giá trị và không rỗng
      const payload = {
        name: newBranch.name,
        location: newBranch.location,
        image: newBranch.image,
        phone: newBranch.phone,
        manager: newBranch.manager,
        status: newBranch.status,
        workingHours: newBranch.workingHours.filter(
          (hour) => hour.dayOfWeek && hour.openingTime && hour.closingTime
        ),
        tables: newBranch.tables.filter(
          (table) => table.number && table.capacity
        ),
        menus: newBranch.menus.filter((menu) => menu.type),
      };

      // Xóa các trường không có giá trị (null hoặc undefined) khỏi payload
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
      const branch = (
        await axiosPrivate.put(`/branch/${updatedBranch.id}`, updatedBranch)
      ).data;
      return branch;
    } catch (error) {
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
