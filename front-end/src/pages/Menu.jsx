import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/Menu.css";
import "../hooks/api/useBranchApi";
import useBranchApi from "../hooks/api/useBranchApi";

function Menu() {
  const { getBranchesHome } = useBranchApi();

  const { data: branches = [] } = useQuery({
    queryKey: ["branchesHome"],
    queryFn: getBranchesHome,
    onError: (error) => {
      toast.error(`Failed to fetch branches: ${error.message}`);
    },
  });

  console.log(branches);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>OUR MENUS</h1>
      </div>
      <div className="menu-cities">
        {branches.map((branch) => (
          <div key={branch.id} className="menu-city">
            <div
              className="menu-city-image"
              style={{
                backgroundImage: `url(${branch.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="menu-city-name">{branch.name.toUpperCase()}</div>
            <Link to={`/branch/${branch.id}/menus`} className="menu-button">
              VIEW THE MENU
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
