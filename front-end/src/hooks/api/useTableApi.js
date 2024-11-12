import useAxiosPrivate from "../useAxiosPrivate";
import axios from "../../services/axios";
import useAuth from "../useAuth";

const useTableApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth(); // Lấy thông tin user từ useAuth

  const getTablelist = async () => {
    try {
      const branchId = user?.branchId; // Lấy branchId từ thông tin user
      if (!branchId) throw new Error("Branch ID not found"); // Kiểm tra nếu không có branchId

      const tableData = (await axios.get(`/branch/${branchId}/tables`)).data;
      console.log("table data:", tableData); // Gọi API với branchId
      return tableData;
    } catch (error) {
      console.error("Error fetching table data:", error);
      throw error;
    }
  };

  const updateTableStatus = async ({ tableId, status }) => {
    try {
      const response = await axiosPrivate.put(`/table/${tableId}`, {
        status,
      }); // Gọi API PUT để cập nhật trạng thái của bàn
      return response.data;
    } catch (error) {
      console.error("Error updating table status:", error);
      throw error;
    }
  };

  return { getTablelist, updateTableStatus };
};

export default useTableApi;
