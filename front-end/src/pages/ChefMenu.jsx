import { useState, useEffect } from "react";
import { MdRestaurantMenu } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";
import "../assets/styles/ChefMenu.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBranchApi from "../hooks/api/useBranchApi";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFoodAPi from "../hooks/api/useFoodAPi";

const ChefMenu = () => {
  const { user } = useAuth();
  const { updateFoodStatus, getMenubyBranchID } = useFoodAPi();
  const branchId = user ? user.branchId : null;
  const queryClient = useQueryClient();
  const { data: menus, isLoading: isMenusLoading } = useQuery({
    queryKey: ["menus", branchId],
    queryFn: () => getMenubyBranchID(branchId, true),
    onError: (error) => toast.error(`Failed to fetch menu: ${error.message}`),
  });
  console.log(menus);

  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setExpandedCategories([]);
    } else {
      const matchingCategories = menus.categories
        .filter((category) =>
          category.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .map((category) => category.id);
      setExpandedCategories(matchingCategories);
    }
  }, [searchTerm, menus]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle status toggle
  const mutation = useMutation({
    mutationFn: updateFoodStatus,
    onSuccess: () => {
      console.log("Food status updated successfully");
      queryClient.invalidateQueries("menus");
    },
    onError: (error) => {
      console.error(`Failed to update food status: ${error.message}`);
    },
  });

  const handleFoodSwitch = (id, currentStatus) => {
    const newStatus = currentStatus === "AVAILABLE" ? "INACTIVE" : "ACTIVE";
    mutation.mutate({ foodId: id, status: newStatus });
    console.log("foodID: ", id);
    console.log("status", currentStatus);
    console.log(" new status", newStatus);
  };

  return (
    <div className="chef-menu-main">
      <Sidebar />
      <ToastContainer />
      <div className="chef-menu-content">
        <div className="chef-menu-header text-center">
          <MdRestaurantMenu className="chef-menu-icon" />
          <h1>Menu Management</h1>
        </div>

        <div className="chef-menu-search mb-4">
          <input
            type="text"
            className="chef-menu-search-bar"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="chef-menu-accordion" id="menuAccordion">
          {menus && menus.length > 0 ? (
            menus.map((menu) => (
              <div key={menu.id} className="chef-menu-accordion-item">
                <h2 className="chef-menu-accordion-header">
                  <button
                    className="chef-menu-accordion-button"
                    type="button"
                    onClick={() => toggleCategory(menu.id)}
                  >
                    {menu.type} {/* Assuming `type` is available from API */}
                  </button>
                </h2>

                {expandedCategories.includes(menu.id) && (
                  <div className="chef-menu-accordion-body">
                    {menu.menuItems.map((item) => (
                      <div key={item.id} className="chef-menu-item">
                        <img
                          src={item.image} // Ensure image URL is correct
                          alt={item.name}
                          className="chef-menu-item-image"
                        />
                        <div className="chef-menu-item-details">
                          <h5>{item.name}</h5>
                          <p className="chef-menu-item-desc">
                            {item.description}
                          </p>
                          <p className="chef-menu-item-price">{item.price}</p>
                        </div>

                        {/* Button to toggle food status */}
                        <button
                          onClick={() =>
                            handleFoodSwitch(item.foodId, item.status)
                          }
                          className={`chef-menu-status-btn ${
                            item.status === "AVAILABLE"
                              ? "btn-success"
                              : "btn-danger"
                          }`}
                        >
                          {item.status === "AVAILABLE" ? (
                            <FaCheckCircle />
                          ) : (
                            <FaTimesCircle />
                          )}
                          {item.status === "AVAILABLE"
                            ? "AVAILABLE"
                            : "UNAVAILABLE"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No menu items found.</div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ChefMenu;
