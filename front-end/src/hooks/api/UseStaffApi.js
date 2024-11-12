import useAxiosPrivate from "../useAxiosPrivate";
import axios from "../../services/axios";

const useStaffApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const getStaffList = async () => {
    try {
      const response = await axios.get(`/staff`);
      const staffList = response.data; // Access 'data' from the response
      console.log("data", staffList);
      return staffList;
    } catch (error) {
      throw error;
    }
  };
  

  return { getStaffList };
};

export default useStaffApi;
