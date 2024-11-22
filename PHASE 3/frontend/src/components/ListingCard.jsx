import React from "react";
import "./ListingCard.css";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ property }) => {
  const navigate = useNavigate();

  const goToMovieDetails = (property) => {
    navigate(`/details/${property.id}`, { state: { property } });
  };

  return (
    <div className="listing-card">
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

        <button onClick={() => goToMovieDetails(property)}>View Details</button>
      </div>
    </div>
  );
};

export default ListingCard;
