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
  const updateReservationStatus = async ({ id, status }) => {
    try {
        console.log("id", id);
        console.log(status);
        
      const response = await axiosPrivate.put(`/reserve/${id}`, {
        status,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getRerservationCus,
    updateReservationStatus
  };
};

export default useReservationApi;
