import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useMenuApi from "../hooks/api/useMenuApi"; // Hook lấy dữ liệu menu từ API
import { toast } from "react-toastify";
import "../assets/styles/MenuDetailModal.css";

const MenuDetailModal = ({ isOpen, menuId, onClose }) => {
  const { getMenuByID } = useMenuApi();

  // Sử dụng useQuery để lấy dữ liệu menu theo menuId
  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menudetail", menuId],
    queryFn: () => {
      console.log("Fetching menu data for menuId:", menuId); // Log menuId to confirm it's being passed correctly
      return getMenuByID(menuId);
    },
    onError: (err) => {
      console.error("Error fetching menu detail:", err); // Log the error message
      toast.error(`Failed to fetch menu detail: ${err.message}`);
    },
    onSuccess: (data) => {
      console.log("Fetched menu data:", data); // Log the fetched data
      if (data && data.data) {
        console.log("Data from response:", data.data); // Log specific data
      }
    },
  });

  console.log("Modal status isOpen:", isOpen);

  // Hiển thị loading
  if (isLoading) return <div className="text-white">Loading...</div>;

  // Hiển thị lỗi nếu có
  if (isError) return <div className="text-white">Error: {error.message}</div>;

  // Nếu không có menuId hoặc dữ liệu không hợp lệ
  if (!responseData?.data) return null;

  if (!isOpen) {
    console.log("Modal is not open");
    return null;
  } else {
    console.log("Modal is open, rendering content...");
  }

  const menu = responseData.data; // Lấy menu từ response

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-white">{menu.type}</h2>
        <p>Status: {menu.status}</p>

        <div>
          <h4>Foods:</h4>
          <ul>
            {menu.foods && menu.foods.length > 0 ? (
              menu.foods.map((food, index) => (
                <li key={index}>
                  {food.name} - {food.price}$ ({food.status})
                </li>
              ))
            ) : (
              <p>No foods available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailModal;
