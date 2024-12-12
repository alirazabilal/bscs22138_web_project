import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHome.css";
import { useNavigate } from "react-router-dom";
const AdminHome = () => {
  let navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  const goToAddListing = (property) => {
    navigate("/adminaddlisting");
  };

  const removeProperty = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:4000/listings/${propertyId}`);
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
    const token = localStorage.getItem("tokenadmin");
    if (!token) {
      console.warn("No admin token found. Redirecting to login page...");
      navigate("/adminlogin");
      return;
    }

    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/listings");
        setProperties(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, [navigate]);

  return (
    <>
      <div className="addoption">
        <span>Click Here To Add New Listings</span>
        <button onClick={goToAddListing}>
          <i class="fa-solid fa-plus"></i>
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

export default AdminHome;
