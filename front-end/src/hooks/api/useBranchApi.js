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

  const createBranch = async (newBranch) => {
    try {
      const branch = (
        await axiosPrivate.post("/branch", {
          name: newBranch.name,
          location: newBranch.location,
          image: newBranch.image,
          phone: newBranch.phone,
          manager: newBranch.manager,
          status: newBranch.status,
          workingHours: newBranch.workingHours,
          tables: newBranch.tables,
          menus: newBranch.menus,
        })
      ).data;
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

  return { getBranchesStaff, createBranch, updateBranch, deleteBranch };
};

export default useBranchApi;
