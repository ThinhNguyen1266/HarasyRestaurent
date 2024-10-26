import { useState, useEffect } from "react";
import { MdRestaurantMenu } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";
import "../assets/styles/Chef_Menu.css";
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
          description:
            "Tender calamari rings, lightly breaded and fried until golden",
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
          available: true,
        },
        {
          id: 102,
          name: "Bruschetta",
          price: "$8.99",
          description:
            "Toasted bread topped with fresh tomatoes, garlic, and basil",
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
          description:
            "Fresh Atlantic salmon with herbs and lemon butter sauce",
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
const Chef_Menu = () => {
  const [menuData, setMenuData] = useState(staticMenuData);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Cập nhật các thẻ mở rộng dựa trên từ khóa tìm kiếm
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setExpandedCategories([]); // Nếu không có từ khóa, đóng tất cả các thẻ
    } else {
      // Tìm các danh mục có ít nhất một item khớp với từ khóa
      const matchingCategories = menuData.categories
        .filter((category) =>
          category.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .map((category) => category.id);
      setExpandedCategories(matchingCategories); // Mở các danh mục khớp
    }
  }, [searchTerm, menuData]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleItemStatus = (categoryId, itemId) => {
    setMenuData((prev) => {
      const updatedCategories = prev.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId
                  ? { ...item, available: !item.available }
                  : item
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
        toast.error(`${updatedItem.name} is now Unavailable!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (updatedItem) {
        toast.success(`${updatedItem.name} is now Available!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
    <div className="main-content">
      <Sidebar />
      <ToastContainer />
      <div className="container my-4">
        <div className="text-center mt-4 mb-4">
          <MdRestaurantMenu className="text-success fs-1 me-2" />
          <h1 className="text-white">Menu Management</h1>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="accordion" id="menuAccordion">
          {filteredMenuData.categories.map((category) => (
            <div key={category.id} className="accordion-item mb-3">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={expandedCategories.includes(category.id)}
                >
                  {category.name}
                </button>
              </h2>

              {expandedCategories.includes(category.id) && (
                <div className="accordion-collapse show">
                  <div className="accordion-body">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex align-items-center mb-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded me-3"
                          style={{
                            width: "64px",
                            height: "64px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="flex-grow-1">
                          <h5 className="fw-semibold">{item.name}</h5>
                          <p className="text-white small mb-1">
                            {item.description}
                          </p>
                          <p className="text-success fw-bold">{item.price}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            {item.available ? (
                              <FaCheckCircle className="text-success me-2" />
                            ) : (
                              <FaTimesCircle className="text-danger me-2" />
                            )}
                            <span
                              className={`fw-medium ${
                                item.available ? "text-success" : "text-danger"
                              }`}
                            >
                              {item.available ? "Available" : "Unavailable"}
                            </span>
                          </div>

                          <button
                            onClick={() =>
                              toggleItemStatus(category.id, item.id)
                            }
                            className={`btn ${
                              item.available
                                ? "btn-outline-danger"
                                : "btn-outline-success"
                            } ms-3`}
                          >
                            {item.available
                              ? "Mark Unavailable"
                              : "Mark Available"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chef_Menu;
