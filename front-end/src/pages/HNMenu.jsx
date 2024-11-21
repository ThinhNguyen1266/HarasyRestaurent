import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/BranchMenu.css";
import useBranchApi from "../hooks/api/useBranchApi";

function HNMenu() {
  const { branchId } = useParams();
  console.log("branchId from useParams:", branchId);

  const { getBranchMenu } = useBranchApi();

  const { data: branchData, isLoading: isBranchLoading } = useQuery({
    queryKey: ["branch", branchId],
    queryFn: () => getBranchMenu(branchId),
    onError: (error) => toast.error(`Failed to fetch branch: ${error.message}`),
  });

  console.log("Branch Data (raw):", branchData);

  const [activeCategory, setActiveCategory] = useState("DESSERT");
  const [hoveredItem, setHoveredItem] = useState({ category: "", index: null });

  if (isBranchLoading) {
    return <div className="branch-container">Loading...</div>;
  }

  if (!branchData || !branchData) {
    return <div className="branch-container">No data available</div>;
  }

  const categories = Array.from(new Set(branchData.map((menu) => menu.type)));
  console.log("Categories:", categories);

  const handleCategoryClick = (category) => setActiveCategory(category);

  const filteredItems = branchData.filter(
    (menu) => menu.type.toLowerCase() === activeCategory.toLowerCase()
  );
  console.log("Filtered Items:", filteredItems);

  return (
    <div className="branch-container">
      <div className="branch-header"></div>

      <div className="menu-section">
        <h2 className="menu-title">MENU</h2>
        <h3 className="menu-location">HA NOI</h3>
        <p className="menu-location-link">View location</p>

        <div className="menu-categories">
          {categories.map((category) => (
            <span
              key={category}
              className={category === activeCategory ? "active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="menu-category">
          {filteredItems.length > 0 ? (
            filteredItems.map((menu) => (
              <div key={menu.id}>
                <h4 className="menu-subcategory-title">
                  {menu.type.toUpperCase()}
                </h4>
                {menu.menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="menu-item"
                    onMouseEnter={() =>
                      setHoveredItem({ category: menu.type, index })
                    }
                    onMouseLeave={() =>
                      setHoveredItem({ category: "", index: null })
                    }
                  >
                    <div className="menu-item-content">
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">${item.price}</p>
                    </div>
                    {hoveredItem.category === menu.type &&
                      hoveredItem.index === index && (
                        <div className="item-hover-content">
                          <p className="item-description">
                            Status: {item.status}
                          </p>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No items available for this category</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HNMenu;
