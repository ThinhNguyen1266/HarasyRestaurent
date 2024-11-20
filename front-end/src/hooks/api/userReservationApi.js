import axios from "../../services/axios";
import useAxiosPrivate from "../useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../useAuth"; 
const useReservationApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const getRerservationCus = async (page) => {
    try {
      const cusReservation = await axiosPrivate.get(`/branch/${user.branchId}/reserve`, {
        params: { page },
      });
      return cusReservation;
    } catch (error) {
      throw error;
    }
  };
  const updateReservationStatus = async ({ tableId, status }) => {
    try {
      const response = await axiosPrivate.put(`/table/${tableId}`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating table status:", error);
      throw error;
    }
  };

  return {
    getRerservationCus,
    updateReservationStatus
  };
};

export default useReservationApi;
