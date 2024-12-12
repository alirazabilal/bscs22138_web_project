import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Book.css";

const AddListing = () => {
  const [formData, setFormData] = useState({
    id: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    title: "",
    type: "",
    guests: 0,
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    rating: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
    rating6: 0,
    rating7: 0,
    detail1: "",
    detail2: "",
    detail3: "",
    detail4: "",
    detail5: "",
    detail6: "",
    list1: "",
    list2: "",
    list3: "",
    list4: "",
    list5: "",
    list6: "",
    list7: "",
    list8: "",
    list9: "",
    list10: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        isNaN(value) ||
        name.startsWith("detail") ||
        name.startsWith("list") ||
        name.startsWith("image")
          ? value
          : parseFloat(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/admin/listings", formData);
      console.log("Listing added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding listing:", error);
      setError("There was an issue adding the listing. Please try again.");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("tokenadmin");
    if (!token) {
      console.warn("No admin token found. Redirecting to login page...");
      navigate("/adminlogin");
      return;
    }
  }, [navigate]);
  return (
    <div className="book-container">
      <h2 className="heading">Add A New Listing</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label className="form-label">
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
            </label>
            <input
              className="form-input"
              type={
                key === "id" ||
                key.includes("rating") ||
                key === "guests" ||
                key === "price" ||
                key === "bedrooms" ||
                key === "bathrooms"
                  ? "number"
                  : "text"
              }
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required={[
                "id",
                "image",
                "title",
                "type",
                "guests",
                "bedrooms",
                "bathrooms",
                "price",
                "rating",
              ].includes(key)}
            />
          </div>
        ))}
        {error && <div className="error-message">{error}</div>}
        <button className="submit-button" type="submit">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
