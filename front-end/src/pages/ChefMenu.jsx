import { useState, useEffect } from "react";
import { MdRestaurantMenu } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";
import "../assets/styles/ChefMenu.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const staticMenuData = {
  categories: [
    {
      id: 1,
      name: "Appetizers",
      items: [
        {
          id: 101,
          name: "Crispy Calamari",
          price: "$12.99",
          description: "Tender calamari rings, lightly breaded and fried until golden",
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
          available: true,
        },
        {
          id: 102,
          name: "Bruschetta",
          price: "$8.99",
          description: "Toasted bread topped with fresh tomatoes, garlic, and basil",
          image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f",
          available: true,
        },
      ],
    },
    {
      id: 2,
      name: "Main Course",
      items: [
        {
          id: 201,
          name: "Grilled Salmon",
          price: "$24.99",
          description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
          image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab",
          available: true,
        },
        {
          id: 202,
          name: "Beef Tenderloin",
          price: "$29.99",
          description: "Premium cut beef served with roasted vegetables",
          image: "https://images.unsplash.com/photo-1558030006-450675393462",
          available: false,
        },
      ],
    },
    {
      id: 3,
      name: "Desserts",
      items: [
        {
          id: 301,
          name: "Chocolate Lava Cake",
          price: "$8.99",
          description: "Warm chocolate cake with a molten center",
          image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
          available: true,
        },
        {
          id: 302,
          name: "Tiramisu",
          price: "$7.99",
          description: "Classic Italian dessert with coffee-soaked ladyfingers",
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
          available: true,
        },
      ],
    },
  ],
};

const ChefMenu = () => {
  const [menuData, setMenuData] = useState(staticMenuData);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setExpandedCategories([]);
    } else {
      const matchingCategories = menuData.categories
        .filter((category) =>
          category.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .map((category) => category.id);
      setExpandedCategories(matchingCategories);
    }
  }, [searchTerm, menuData]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const toggleItemStatus = (categoryId, itemId) => {
    setMenuData((prev) => {
      const updatedCategories = prev.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, available: !item.available } : item
              ),
            }
          : category
      );
      return { ...prev, categories: updatedCategories };
    });

    setTimeout(() => {
      const updatedItem = menuData.categories
        .find((category) => category.id === categoryId)
        .items.find((item) => item.id === itemId);

      if (updatedItem && updatedItem.available) {
        toast.error(`${updatedItem.name} is now Unavailable!`);
      } else if (updatedItem) {
        toast.success(`${updatedItem.name} is now Available!`);
      }
    }, 0);
  };

  const filteredMenuData = {
    ...menuData,
    categories: menuData.categories.map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
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
          {filteredMenuData.categories.map((category) => (
            <div key={category.id} className="chef-menu-accordion-item">
              <h2 className="chef-menu-accordion-header">
                <button
                  className="chef-menu-accordion-button"
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                </button>
              </h2>

              {expandedCategories.includes(category.id) && (
                <div className="chef-menu-accordion-body">
                  {category.items.map((item) => (
                    <div key={item.id} className="chef-menu-item">
                      <img src={item.image} alt={item.name} className="chef-menu-item-image" />
                      <div className="chef-menu-item-details">
                        <h5>{item.name}</h5>
                        <p className="chef-menu-item-desc">{item.description}</p>
                        <p className="chef-menu-item-price">{item.price}</p>
                      </div>
                      <div className="chef-menu-item-status">
                        {item.available ? (
                          <FaCheckCircle className="chef-menu-status-icon text-success" />
                        ) : (
                          <FaTimesCircle className="chef-menu-status-icon text-danger" />
                        )}
                        <span className={item.available ? "text-success" : "text-danger"}>
                          {item.available ? "Available" : "Unavailable"}
                        </span>
                        <button
                          onClick={() => toggleItemStatus(category.id, item.id)}
                          className={`chef-menu-toggle-button ${
                            item.available ? "btn-outline-danger" : "btn-outline-success"
                          }`}
                        >
                          {item.available ? "Mark Unavailable" : "Mark Available"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefMenu;
