import { useState, useEffect } from "react";
import { MdRestaurantMenu } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";
import "../assets/styles/ChefMenu.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFoodAPi from "../hooks/api/useFoodAPi";
import { Button } from "react-bootstrap";

const ChefMenu = () => {
  const { user } = useAuth();
  const { updateFoodStatus, getMenubyBranchID } = useFoodAPi();
  const branchId = user ? user.branchId : null;
  const queryClient = useQueryClient();

  // Fetch menu items
  const { data: menus, isLoading: isMenusLoading } = useQuery({
    queryKey: ["menus", branchId],
    queryFn: () => getMenubyBranchID(branchId, true),
    onError: (error) => toast.error(`Failed to fetch menu: ${error.message}`),
  });

  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setExpandedCategories([]);
    } else if (menus?.length > 0) {
      const matchingCategories = menus
        .filter((menu) =>
          menu.menuItems.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .map((menu) => menu.id);
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
      toast.success("Food status updated successfully");
      queryClient.invalidateQueries(["menus", branchId]);
    },
    onError: (error) => {
      toast.error(`Failed to update food status: ${error.message}`);
    },
  });

  const handleFoodSwitch = (id, currentStatus) => {
    const newStatus = currentStatus === "AVAILABLE" ? "INACTIVE" : "ACTIVE";
    mutation.mutate({ foodId: id, status: newStatus });
  };

  const filteredMenus = menus?.filter((menu) =>
    menu.menuItems.some((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="chef-menu-main">
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
          {!isMenusLoading && filteredMenus?.length > 0 ? (
            filteredMenus.map((menu) => (
              <div key={menu.id} className="chef-menu-accordion-item">
                <h2 className="chef-menu-accordion-header">
                  <button
                    className="chef-menu-accordion-button"
                    type="button"
                    onClick={() => toggleCategory(menu.id)}
                  >
                    {menu.type}
                  </button>
                </h2>

                {expandedCategories.includes(menu.id) && (
                  <div className="chef-menu-accordion-body">
                    {menu.menuItems
                      .filter((item) =>
                        item.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((item) => (
                        <div key={item.id} className="chef-menu-item">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="chef-menu-item-image"
                          />
                          <div className="chef-menu-item-details">
                            <h2>{item.name}</h2>
                          </div>
                          <h5 className="chef-menu-item-price">
                            Price: {item.price}
                          </h5>
                          <Button
                            onClick={() =>
                              handleFoodSwitch(item.foodId, item.status)
                            }
                            variant={
                              item.status === "AVAILABLE" ? "success" : "danger"
                            }
                            className="d-flex align-items-center"
                            size="lg"
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                              borderRadius: "8px",
                              padding: "10px 20px",
                            }}
                          >
                            {item.status === "AVAILABLE" ? (
                              <FaCheckCircle style={{ marginRight: "8px" }} />
                            ) : (
                              <FaTimesCircle style={{ marginRight: "8px" }} />
                            )}
                            {item.status === "AVAILABLE"
                              ? "AVAILABLE"
                              : "UNAVAILABLE"}
                          </Button>
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
