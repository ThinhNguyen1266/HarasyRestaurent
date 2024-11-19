import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/Venues.css";
import "../hooks/api/useBranchApi";
import useBranchApi from "../hooks/api/useBranchApi";

function Venues() {
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
    <div className="venues-container">
      <div className="venues-header">
        <h1>OUR LOCATIONS</h1>
      </div>
      <div className="venues-cities">
        {branches.map((branch) => (
          <Link
            to={`/venues/${branch.id}`}
            className="city-link"
            key={branch.id}
          >
            <div className="city">
              <div
                className="city-image"
                style={{
                  backgroundImage: `url(${branch.image})`,
                }}
              ></div>
              <div className="city-name">{branch.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Venues;
