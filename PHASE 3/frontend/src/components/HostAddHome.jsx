import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHome.css";
import { useNavigate } from "react-router-dom";
const HostAddHome = () => {
  let navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  const goToAddListing = (property) => {
    navigate("/hostaddnew");
  };

  const removeProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      await axios.delete(
        `http://localhost:4000/admin/host/listings/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (confirm("ARE YOU SURE TO DELETE THIS LISTING?")) {
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property.id !== propertyId)
        );
        console.log(`Property with ID ${propertyId} has been deleted.`);
      }
    } catch (err) {
      console.error(`Error deleting property with ID ${propertyId}:`, err);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/host/listings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        setProperties(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const ishost = localStorage.getItem("userRole");
    if (!token) {
      console.warn("No token found. Redirecting to login page...");
      navigate("/adminlogin");
      return;
    }
    if (ishost !== "host") {
      console.warn("You are not a host. Redirecting to login page...");
      navigate("/adminlogin");
      return;
    }
  }, [navigate]);

  return (
    <>
      <div className="addoption">
        <span>Click Here To Add New Listings</span>
        <button onClick={goToAddListing}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="listings-container">
        {properties.map((property) => (
          <div key={property.id} className="listing-card">
            <img
              src={property.image}
              alt={property.title}
              className="property-image"
            />
            <div className="property-details">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-type">{property.type}</p>
              <p className="property-info">
                {property.guests} guests · {property.bedrooms} bedrooms ·{" "}
                {property.bathrooms} bathrooms
              </p>
              <p className="property-price">${property.price} per night</p>
              <p className="property-rating">Rating: {property.rating} ⭐</p>

              <button onClick={() => removeProperty(property.id)}>
                Remove Property
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HostAddHome;
