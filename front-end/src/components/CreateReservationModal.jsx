import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
const CreateReservationModal = ({
  reservationType,
  userId,
  foodData,
  isOpen,
  onClose,
  availableTable,
  branchid,
  getCustomerProfileByPhone,
  addReservation,
}) => {
  const [customerPhone, setCustomerPhone] = useState("");
  const [reservationInfo, setReservationInfo] = useState({
    branchId: branchid,
    tableIds: [],
    customer: { customerId: 0, name: "", email: "" },
    date: "",
    time: "",
    amountGuest: 0,
    typeId: 1,
    order: {
      branchId: branchid,
      tableIds: [],
      staffId: userId,
      customer: { customerId: 0,
        newCustomer:{
                      name: "", email: ""
        }
      },
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
    branchId: branchid,
    date: "",
    time: "",
    amountGuest: "",
  });

  const { data: tables = [] } = useQuery({
    queryKey: ["availableTable", request],
    queryFn: () => availableTable(request),
    onError: (error) => {
      toast.error(`Failed to fetch tables: ${error.message}`);
    },
  });
  const createReaservation = useMutation({
    mutationFn: addReservation, // Pass the function, not its return value
    onSuccess: () => {},
    onError: (error) => {
      toast.error(`Failed to create reservation: ${error.message}`);
    },
  });

  useEffect(() => {
    if (
      reservationInfo.date &&
      reservationInfo.time &&
      reservationInfo.amountGuest
    ) {
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
      const selectedTableIds = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => parseInt(option.value, 10));

      setReservationInfo((prevState) => {
        const updatedTableIds = [...prevState.tableIds];

        // Add only new IDs to the array
        selectedTableIds.forEach((id) => {
          if (!updatedTableIds.includes(id)) {
            updatedTableIds.push(id);
          }
        });

        return {
          ...prevState,
          tableIds: updatedTableIds,
          order: {
            ...prevState.order,
            tableIds: updatedTableIds,
          },
        };
      });
    } else if (name === "dateTime") {
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

  const handleRemoveTable = (tableId) => {
    setReservationInfo((prevState) => {
      const updatedTableIds = prevState.tableIds.filter((id) => id !== tableId);
      return {
        ...prevState,
        tableIds: updatedTableIds,
        order: {
          ...prevState.order,
          tableIds: updatedTableIds,
        },
      };
    });
  };

  const handleSave = () => {
    createReaservation.mutate(reservationInfo, {
      onSuccess: () => {
        // Reset the modal's state
        setReservationInfo({
          branchId: branchid,
          tableIds: [],
          customer: { customerId: null, name: "", email: "" },
          date: "",
          time: "",
          amountGuest: 0,
          typeId: 1,
          order: {
            branchId: branchid,
            tableIds: [],
            staffId: userId,
            customer: { customerId: null },
            orderItems: {
              creates: [],
              updates: [],
            },
            note: "",
          },
        });

        setCustomerPhone("");

        toast.success("Reservation created successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to create reservation: ${error.message}`);
      },
    });
  };

  const handleCustomerSearch = async () => {
    if (!customerPhone) {
      toast.error("Please enter a phone number to search.");
      return;
    }

    try {
      const response = await getCustomerProfileByPhone(customerPhone);

      if (response && response.length > 0) {
        toast.success(`Customer found`);

        const customer = response[0]; // Assuming the first result is the desired customer
        setReservationInfo((prevState) => ({
          ...prevState,
          customer: {
            ...prevState.customer,
            customerId: customer.customerId,
            name: customer.fullName,
            email: customer.email,
          },
        }));
        toast.success(`Customer found: ${customer.fullName}`);
      } else {
        setReservationInfo((prevState) => ({
          ...prevState,
          customer: {
            ...prevState.customer,
            customerId: 0, // Clear customerId if no customer is found
          },
        }));
        toast.warning("No customer found with the given phone number.");
      }
    } catch (error) {
      toast.error("Error fetching customer profile.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-reservation-modal-overlay">
      <div className="create-reservation-modal-content">
        <h2 className="create-reservation-modal-title">
          Create New Reservation
        </h2>

        <div className="create-reservation-modal-body">
          <div className="create-reservation-info">
            <h3 className="create-reservation-modal-section-title">
              Reservation Info
            </h3>

            <label className="create-reservation-modal-label">
              Customer Name
              <input
                type="text"
                name="name"
                value={reservationInfo.customer.name}
                onChange={handleChange}
                className="create-reservation-modal-input"
              />
              {reservationInfo.customer.customerId > 0 ? (
                <small className="text-success">Customer found!</small>
              ) : reservationInfo.customer.customerId === 0 ? (
                <small className="text-danger">No customer found</small>
              ) : null}
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
              Customer Phone
              <input
                type="text"
                name="phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="create-reservation-modal-input"
              />
              <Button
                variant="outline-primary"
                className="mt-2"
                onClick={handleCustomerSearch}
              >
                <FaSearch /> Search
              </Button>
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

            <div className="selected-tables">
              <h4>Selected Tables:</h4>
              {reservationInfo.tableIds.length > 0 ? (
                <ul>
                  {reservationInfo.tableIds.map((tableId) => {
                    const table = tables.find((t) => t.id === tableId);
                    return (
                      <li key={tableId}>
                        {`Table ${table?.number || tableId} (Capacity: ${
                          table?.capacity || "N/A"
                        })`}
                        <button
                          onClick={() => handleRemoveTable(tableId)}
                          className="remove-table-button"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No tables selected.</p>
              )}
            </div>

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
