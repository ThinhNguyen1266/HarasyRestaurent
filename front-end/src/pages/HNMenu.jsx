import React, { useState } from "react";
import "../assets/styles/HCMMenu.css";

function HNMenu() {
  const [activeCategory, setActiveCategory] = useState("Dinner Menu");
  const [hoveredItem, setHoveredItem] = useState({ category: "", index: null });

  const categories = [
    "Lunch Menu",
    "Dinner Menu",
    "Signature Prix Fixe",
    "Drinks",
    "Dessert",
  ];

  const menuItems = {
    "Lunch Menu": {
      Appetizers: [
        { name: "Caesar Salad", price: "$12.99" },
        { name: "Bruschetta", price: "$9.99" },
      ],
      Entrees: [
        { name: "Grilled Chicken Sandwich", price: "$14.99" },
        { name: "Pasta Primavera", price: "$13.99" },
      ],
    },
    "Dinner Menu": {
      Appetizers: [
        {
          name: "Lobster Risotto",
          price: "$29.99",
          description: "butter poached lobster tail, butternut squash, sage",
          image: require("../assets/img/lobster.png"),
        },
        { name: "Seared Foie Gras", price: "$28.99" },
        { name: "Steak Tartare", price: "$28.99" },
      ],
      Entrees: [
        {
          name: "Beef Wellington",
          price: "$69.99",
          description:
            "potato purée, glazed root vegetables, red wine demi-glace",
          image: require("../assets/img/beef.jpg"),
        },
        { name: "Crispy Skin Salmon", price: "$29.99" },
        { name: "Filet Mignon", price: "$65.99" },
      ],
    },
    "Signature Prix Fixe": {
      Starters: [{ name: "Amuse-Bouche", price: "$15.99" }],
      Mains: [{ name: "Duck Confit", price: "$55.99" }],
    },
    Drinks: {
      Cocktails: [
        { name: "Margarita", price: "$11.99" },
        { name: "Old Fashioned", price: "$10.99" },
      ],
      Wines: [
        { name: "Chardonnay", price: "$8.99" },
        { name: "Cabernet Sauvignon", price: "$9.99" },
      ],
    },
    Dessert: {
      Sweets: [
        { name: "Chocolate Cake", price: "$7.99" },
        { name: "Creme Brulee", price: "$8.99" },
      ],
    },
  };

  const handleCategoryClick = (category) => setActiveCategory(category);

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
          {Object.keys(menuItems[activeCategory]).map((subCategory) => (
            <div key={subCategory}>
              <h4 className="menu-subcategory-title">
                {subCategory.toUpperCase()}
              </h4>
              {menuItems[activeCategory][subCategory].map((item, index) => (
                <div
                  key={index}
                  className="menu-item"
                  onMouseEnter={() =>
                    setHoveredItem({ category: subCategory, index })
                  }
                  onMouseLeave={() =>
                    setHoveredItem({ category: "", index: null })
                  }
                >
                  <div className="menu-item-content">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">{item.price}</p>
                  </div>
                  {hoveredItem.category === subCategory &&
                    hoveredItem.index === index &&
                    item.image && (
                      <div className="item-hover-content">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-image"
                        />
                        <p className="item-description">{item.description}</p>
                      </div>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HNMenu;
