import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    userName: "",
    phoneNumber: "",
    acceptTerms: false,
    receiveUpdates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-4 offset-md-4">
          <form className="register-container" onSubmit={handleSubmit}>
            <h3 className="text-center">Create an account</h3>
            <div className="form-group">
              <label htmlFor="email">
                EMAIL <span className="required">*</span>
              </label>
              <input
                type="text"
                name="email"
                className="custom-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                FULL NAME <span className="required">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                className="custom-input"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                PHONE NUMBER <span className="required">*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="custom-input"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                USERNAME <span className="required">*</span>
              </label>
              <input
                type="text"
                name="userName"
                className="custom-input"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                PASSWORD <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="custom-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                DATE OF BIRTH <span className="required">*</span>
              </label>
              <div className="dob-container">
                <select
                  name="dobMonth"
                  className="dob-select"
                  value={formData.dobMonth}
                  onChange={handleChange}
                  required
                >
                  <option value="">Month</option>
                </select>

                <select
                  name="dobDay"
                  className="dob-select"
                  value={formData.dobDay}
                  onChange={handleChange}
                  required
                >
                  <option value="">Day</option>
                </select>

                <select
                  name="dobYear"
                  className="dob-select"
                  value={formData.dobYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Year</option>
                </select>
              </div>
            </div>

            <button type="submit" className="custom-button">
              Continue
            </button>

            <div className="text-center mt-3">
              <Link to="/login" className="link">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
