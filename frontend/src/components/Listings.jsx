import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import "./Listings.css";

const Listings = ({ selectedCategory }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = () => {
      const mockData = [
        {
          image: "https://via.placeholder.com/300x150?text=Property+1",
          title: "Beautiful Beach House",
          type: "Entire home",
          guests: 6,
          bedrooms: 3,
          bathrooms: 2,
          price: 150,
          rating: 4.5,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+2",
          title: "Cozy Mountain Cabin",
          type: "Private room",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 100,
          rating: 4.7,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+3",
          title: "Downtown Apartment",
          type: "Entire home",
          guests: 4,
          bedrooms: 2,
          bathrooms: 1,
          price: 120,
          rating: 4.2,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+4",
          title: "Spacious Loft",
          type: "Private room",
          guests: 3,
          bedrooms: 1,
          bathrooms: 1,
          price: 90,
          rating: 4.0,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+5",
          title: "Modern Studio",
          type: "Entire home",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 80,
          rating: 4.5,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+6",
          title: "Charming Cottage",
          type: "Entire home",
          guests: 5,
          bedrooms: 2,
          bathrooms: 1,
          price: 110,
          rating: 4.6,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+7",
          title: "Luxury Villa",
          type: "Entire home",
          guests: 8,
          bedrooms: 4,
          bathrooms: 3,
          price: 300,
          rating: 4.9,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+8",
          title: "Quaint Farmhouse",
          type: "Private room",
          guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          price: 150,
          rating: 4.4,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+9",
          title: "Sleek City Condo",
          type: "Entire home",
          guests: 3,
          bedrooms: 1,
          bathrooms: 1,
          price: 130,
          rating: 4.3,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+10",
          title: "Rustic Log Cabin",
          type: "Private room",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 85,
          rating: 4.2,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+11",
          title: "Elegant Penthouse",
          type: "Entire home",
          guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          price: 250,
          rating: 4.8,
        },
        {
          image: "https://via.placeholder.com/300x150?text=Property+12",
          title: "Chic Studio Apartment",
          type: "Private room",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 95,
          rating: 4.6,
        },
      ];

      setTimeout(() => {
        setProperties(mockData);
      }, 1000);
    };

    fetchProperties();
  }, []); 

  const filteredProperties = selectedCategory
    ? properties.filter((property) =>
        property.title.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    : properties;

  return (
    <div className="listings-container">
      {filteredProperties.map((property, index) => (
        <ListingCard key={index} property={property} />
      ))}
    </div>
  );
};

export default Listings;
