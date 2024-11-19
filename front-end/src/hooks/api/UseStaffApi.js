import useAxiosPrivate from "../useAxiosPrivate";
import axios from "../../services/axios";

const useStaffApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const getStaffList = async () => {
    try {
      const response = await axiosPrivate.get(`/staff`);
      console.log("Raw Response: ", response);
      return response;
    } catch (error) {
      console.error("Error Fetching Staff List: ", error);
      throw error;
    }
  };
  const getStaffByBranchId = async (branchId) => {
    try {
      const response = await axiosPrivate.get(`/staff/${branchId}`);
      console.log("Raw Response: ", response);
      return response;
    } catch (error) {
      console.error("Error Fetching Staff List: ", error);
      throw error;
    }
  };

  const updateStaff = async (employee) => {
    try {
      const response = await axiosPrivate.put(`/staff/${employee.id}`, employee);
      if (response && response.data) {
        return response.data; // Assuming your API returns an object
      } else {
        throw new Error("No data in response");
      }
    } catch (error) {
      throw new Error(`Error updating staff: ${error.message}`);
    }
  };
  
  
  
  const createStaff = async (newStaff) => {
    try {
      // Chỉ lấy các trường có giá trị và không rỗng
      const payload = {
        username: newStaff.username,
        password: newStaff.password,
        email: newStaff.email,
        fullName: newStaff.fullName,
        phone: newStaff.phone,
        dob: newStaff.dob,
        branchId: newStaff.branchId,
        role: newStaff.role,
        bankName: newStaff.bankName,
        bankAccount: newStaff.bankAccount,
        picture: newStaff.picture,
        salary: newStaff.salary,
      };

      // Xóa các trường không có giá trị (null hoặc undefined) khỏi payload
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, v]) => v != null && v.length !== 0)
      );

      const employee = (
        await axiosPrivate.post("/regis/staff", filteredPayload)
      ).data;
      console.log("it work");

      return employee;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  return {
    getStaffList,
    getStaffByBranchId,
    updateStaff,
    createStaff,
  };
};

export default useStaffApi;
