import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CreateReservationModal = ({
  reservationType,
  foodData,
  isOpen,
  onClose,
  availableTable,
}) => {
  const [reservationInfo, setReservationInfo] = useState({
    branchId: 1,
    tableIds: [],
    customer: { customerId: 2, name: "", email: "" },
    date: "",
    time: "",
    amountGuest: "",
    typeId: 1,
    order: {
      branchId: 1,
      tableIds: [],
      staffId: 3,
      customer: { customerId: 2 },
      orderItems: {
        creates: [],
        updates: [],
      },
      note: "",
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [request, setRequest] = useState({
    branchId: 1,
    date: "",
    time: "",
    amountGuest: "",
  });

  const {
    data: tables = [],
    refetch,
  } = useQuery({
    queryKey: ["availableTable", request],
    queryFn: () => availableTable(request),
    onError: (error) => {
      toast.error(`Failed to fetch tables: ${error.message}`);
    },
  });
  console.log("resinfo",reservationInfo);
  
  useEffect(() => {
    if (reservationInfo.date && reservationInfo.time && reservationInfo.amountGuest) {
      setRequest((prevRequest) => ({
        ...prevRequest,
        date: reservationInfo.date,
        time: reservationInfo.time,
        amountGuest: reservationInfo.amountGuest,
      }));
    }
  }, [reservationInfo.date, reservationInfo.time, reservationInfo.amountGuest]);

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
  
    if (name === "tableIds") {
      // Handle multiple select for table IDs
      const selectedTableIds = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => parseInt(option.value, 10));
  
      setReservationInfo((prevState) => ({
        ...prevState,
        tableIds: selectedTableIds,
        order: {
          ...prevState.order,
          tableIds: selectedTableIds,
        },
      }));
    } else if (name === "dateTime") {
      // Handle date-time field
      const [date, time] = value.split("T");
      setReservationInfo((prevState) => ({
        ...prevState,
        date,
        time,
      }));
      setRequest((prevRequest) => ({
        ...prevRequest,
        date,
        time,
      }));
    } else {
      // Handle other inputs
      setReservationInfo((prevState) => ({
        ...prevState,
        [name]: value,
        customer: {
          ...prevState.customer,
          ...(name === "name" || name === "email" ? { [name]: value } : {}),
        },
      }));
    }
  };
  

  const handleSave = () => {
    console.log("Reservation created:", reservationInfo);
    onClose();
  };

  const handleOrderSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectFood = (food) => {
    setReservationInfo((prevState) => {
      const updatedOrderItems = { ...prevState.order.orderItems };
      const foodIndex = updatedOrderItems.creates.findIndex(
        (item) => item.foodId === food.id
      );
      if (foodIndex !== -1) {
        updatedOrderItems.creates[foodIndex].quantity += 1;
      } else {
        updatedOrderItems.creates.push({ foodId: food.id, quantity: 1 });
      }
      return {
        ...prevState,
        order: { ...prevState.order, orderItems: updatedOrderItems },
      };
    });
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleRemoveFood = (foodId) => {
    setReservationInfo((prevState) => {
      const updatedOrderItems = { ...prevState.order.orderItems };
      const foodIndex = updatedOrderItems.creates.findIndex(
        (item) => item.foodId === foodId
      );
      if (foodIndex !== -1) {
        updatedOrderItems.creates[foodIndex].quantity -= 1;
        if (updatedOrderItems.creates[foodIndex].quantity <= 0) {
          updatedOrderItems.creates.splice(foodIndex, 1);
        }
      }
      return {
        ...prevState,
        order: { ...prevState.order, orderItems: updatedOrderItems },
      };
    });
  };

  const filteredFoods = foodData.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="create-reservation-modal-overlay">
      <div className="create-reservation-modal-content">
        <h2 className="create-reservation-modal-title">Create New Reservation</h2>

        <div className="create-reservation-modal-body">
          <div className="create-reservation-info">
            <h3 className="create-reservation-modal-section-title">Reservation Info</h3>

            <label className="create-reservation-modal-label">
              Customer Name
              <input
                type="text"
                name="name"
                value={reservationInfo.customer.name}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>

            <label className="create-reservation-modal-label">
              Customer Email
              <input
                type="email"
                name="email"
                value={reservationInfo.customer.email}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>

            <label className="create-reservation-modal-label">
              Reservation Type
              <select
                name="typeId"
                value={reservationInfo.typeId}
                onChange={handleChange}
                className="create-reservation-modal-input"
              >
                {reservationType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="create-reservation-modal-label">
              Date-Time
              <input
                type="datetime-local"
                name="dateTime"
                value={`${reservationInfo.date}T${reservationInfo.time}`}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>

            <label className="create-reservation-modal-label">
              Table
              <select
                name="tableIds"
                value={reservationInfo.tableIds}
                onChange={handleChange}
                className="create-reservation-modal-input"
                multiple
              >
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {`Table ${table.number} (Capacity: ${table.capacity})`}
                  </option>
                ))}
              </select>
            </label>

            <label className="create-reservation-modal-label">
              Amount of Guests
              <input
                type="number"
                name="amountGuest"
                value={reservationInfo.amountGuest}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
            </label>

          </div>
        </div>

        <div className="create-reservation-modal-footer">
          <button
            onClick={handleSave}
            className="create-reservation-modal-button create-reservation-modal-save"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="create-reservation-modal-button create-reservation-modal-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReservationModal;
