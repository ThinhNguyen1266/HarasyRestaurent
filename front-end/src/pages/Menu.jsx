import React from "react";

function Menu({ data }) {
  console.log(data);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Menu</h1>
      <div className="row">
        {data.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Rating: {product.rating}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
