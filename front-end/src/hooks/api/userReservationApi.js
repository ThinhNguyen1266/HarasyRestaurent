import axios from "../../services/axios";
import useAxiosPrivate from "../useAxiosPrivate";
import useAuth from "../useAuth"; 
const useReservationApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const getRerservationCus = async (page) => {
    try {
        console.log(`/branch/${user.branchId}/reserve`);
        
      const cusReservation = await axiosPrivate.get(`/branch/${user.branchId}/reserve`, {
        params: { page },
      });
      console.log(cusReservation);
      
      return await cusReservation;
    } catch (error) {
      throw error;
    }
  };

  const getReservationType = async () => {
    try {
      const reservationType = await axiosPrivate.get(`/reserve/type`);
      return await reservationType;
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
    updateReservationStatus,
    getReservationType
  };
};

export default useReservationApi;
